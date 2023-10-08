import { Application, Mapping, Swapi } from "../models";
import { SwapiConfiguration, ResourceIdentifier } from "../types";
import { Logger } from "winston";
import Cache from "../cache";

type LogMeta = {
  uri: string
  caching: boolean
}

export default class SwapiClient {
  baseUrl: string;
  logger: Logger;
  cache?: Cache;

  constructor(configuration: SwapiConfiguration, logger: Logger, cache?: Cache) {
    this.baseUrl = configuration.swapiBaseUrl;
    this.logger = logger;
    this.cache = cache;
  }

  private async getResource<TResult>(resourceType: Swapi.ResourceType, resourceId: ResourceIdentifier): Promise<TResult | null> {
    let result: TResult | null = null;

    const uri = (typeof resourceId === "string") ? resourceId : `${this.baseUrl}/${resourceType}/${resourceId}/`;

    const meta: LogMeta = {
      caching: !!this.cache,
      uri,
    };

    if (this.cache) {
      result = this.cache.get<TResult>(uri);
    }

    if (result) {
      this.logger.debug(`Found resource ${uri} from cache lookup.`, meta);
      return result;
    }

    this.logger.debug(`Requesting ${uri}...`, meta);

    result = await fetch(uri, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        this.logger.debug(`Resolved ${uri}.`, meta);

        const resource = result.json();

        if (this.cache) {
          this.logger.error(`Caching resolved resource ${uri}.`, meta);
          this.cache.put(uri, resource);
        }

        return resource;
      })
      .catch(() => {
        this.logger.error("Request to Swapi API failed.", meta);
        return null;
      });

    return result;
  }

  private async searchResources<TResult>(resourceType: Swapi.ResourceType, searchTerm: string): Promise<TResult[]> {
    return await fetch(`${this.baseUrl}/${resourceType}/?search=${searchTerm}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .catch(() => []);
  }

  public async getPerson(personId: ResourceIdentifier, includes?: Application.PersonIncludes): Promise<Application.Person | null> {
    const resource = await this.getResource<Swapi.People>(Swapi.ResourceType.People, personId);

    if (!resource) return null;

    const person = Mapping.personFromResource(resource);

    console.log(resource);

    if (includes !== undefined && includes !== true && includes !== false) {
      if (includes.films) {
        person.films = await this.getFilms(resource.films, includes.films);
      }
      if (includes.starships) {
        person.starships = await this.getStarships(resource.starships, includes.starships);
      }
    }

    return person;
  }

  public async getPeople(personIds: ResourceIdentifier[], includes?: Application.PersonIncludes): Promise<Application.Person[]> {
    const promises: Promise<Application.Person | null>[] = [];

    personIds.forEach((personId) => promises.push(this.getPerson(personId, includes)));

    const people = (await Promise.all(promises)).filter((person) => person !== null);

    return people as Application.Person[];
  }

  public async searchPeople(searchTerm: string, includes?: Application.PersonIncludes): Promise<Application.Person[]> {
    const resources = await this.searchResources<Swapi.People>(Swapi.ResourceType.People, searchTerm);

    const people: Application.Person[] = [];

    for (const resource of resources) {
      const person = Mapping.personFromResource(resource);

      if (includes !== undefined && includes !== true && includes !== false) {
        if (includes.films) {
          person.films = await this.getFilms(resource.films, includes.films);
        }
        if (includes.starships) {
          person.starships = await this.getStarships(resource.starships, includes.starships);
        }
      }

      people.push(person);
    }

    return people;
  }

  public async getStarship(starshipId: ResourceIdentifier, includes?: Application.StarshipIncludes): Promise<Application.Starship | null> {
    const resource = await this.getResource<Swapi.Starship>(Swapi.ResourceType.Starship, starshipId);

    if (!resource) return null;

    const starship = Mapping.starshipFromResource(resource);

    if (includes !== undefined && includes !== true && includes !== false) {
      if (includes.pilots) {
        starship.pilots = await this.getPeople(resource.pilots, includes.pilots);
      }
    }

    return starship;
  }

  public async getStarships(starshipIds: ResourceIdentifier[], includes?: Application.StarshipIncludes): Promise<Application.Starship[]> {
    const promises: Promise<Application.Starship | null>[] = [];

    starshipIds.forEach((starshipId) => promises.push(this.getStarship(starshipId, includes)));

    const starships = (await Promise.all(promises)).filter((starship) => starship !== null);

    return starships as Application.Starship[];
  }

  public async getFilm(filmId: ResourceIdentifier, includes?: Application.FilmIncludes): Promise<Application.Film | null> {
    const resource = await this.getResource<Swapi.Film>(Swapi.ResourceType.Film, filmId);

    if (!resource) {
      return null;
    }

    const film = Mapping.filmFromResource(resource);

    if (includes !== undefined && includes !== true && includes !== false) {
      if (includes.characters) {
        film.characters = await this.getPeople(resource.characters, includes.characters);
      }
      if (includes.starships) {
        film.starships = await this.getStarships(resource.starships, includes.starships);
      }
    }

    return film;
  }

  public async getFilms(filmIds: ResourceIdentifier[], includes?: Application.FilmIncludes): Promise<Application.Film[]> {
    const promises: Promise<Application.Film | null>[] = [];

    filmIds.forEach((filmId) => promises.push(this.getFilm(filmId, includes)));

    const films = (await Promise.all(promises)).filter((film) => film !== null);

    return films as Application.Film[];
  }
}
