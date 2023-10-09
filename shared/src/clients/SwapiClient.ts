import { Application, Mapping, Swapi } from "../models";
import { SwapiClientConfiguration, ResourceIdentifier, ResourceResult, ResourcesResult } from "../types";
import { Logger } from "winston";
import Cache from "../cache";

export class SwapiClient {
  baseUrl: string;
  logger: Logger;
  cache?: Cache;

  /**
   * Client for retrieving and consolidating data from the Star Wars API (Swapi).
   * Create a singleton instance of this for your project. Optionally accepts a
   * cache instance to cache responses.
   */
  constructor(configuration: SwapiClientConfiguration, logger: Logger, cache?: Cache) {
    this.baseUrl = configuration.swapiBaseUrl;
    this.logger = logger;
    this.cache = cache;
  }

  private async getResource<TResult>(resourceType: Swapi.ResourceType, resourceId: ResourceIdentifier): Promise<ResourceResult<TResult>> {
    let result: TResult | null = null;

    const uri = (typeof resourceId === "string") ? resourceId : `${this.baseUrl}/${resourceType}/${resourceId}/`;

    const meta = { caching: !!this.cache, uri, };

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
      .then((response: Response) => response.ok ? response.json() : null)
      .then((result: (TResult & { url: string }) | null) => {
        if (!result) {
          this.logger.debug(`Resource ${uri} does not exist.`, meta);
          return null;
        }

        this.logger.debug(`Resolved ${uri}.`, meta);

        if (this.cache) {
          this.logger.error(`Caching resolved resource ${uri}.`, meta);
          this.cache.put(result.url, result);
        }

        return result;
      })
      .catch(() => {
        this.logger.error("Request to Swapi API failed.", meta);
        return null;
      });

    return result;
  }

  private async searchResources<TResult>(resourceType: Swapi.ResourceType, searchTerm: string): Promise<TResult[]> {
    const uri = `${this.baseUrl}/${resourceType}/?search=${searchTerm}`;

    const meta = { caching: !!this.cache, uri, };

    this.logger.debug(`Requesting ${uri}...`, meta);

    return await fetch(uri, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => response.json().then((page) => page.results))
      .then((results: (TResult & { url: string })[]) => {
        this.logger.debug(`Resolved with ${results.length} search results.`, meta);

        if (this.cache) {
          this.logger.error(`Caching ${results.length} resolved resources.`, meta);
          results.forEach((result) => this.cache!.put(result.url, result));
        }

        return results;
      })
      .catch(() => {
        this.logger.error("Request to Swapi API failed.", meta);
        return [];
      });
  }

  /**
   * Gets a person by a numerical ID or a Swapi resource URL.
   *
   * @param personId The ID of the person to get.
   * @param includes The related resources to include in the response.
   * @returns A person object or null if not found.
   */
  public async getPerson(personId: ResourceIdentifier, includes?: Application.PersonIncludes): Promise<ResourceResult<Application.Person>> {
    const resource = await this.getResource<Swapi.People>(Swapi.ResourceType.People, personId);

    if (!resource) return null;

    const person = Mapping.personFromResource(resource);

    if (includes !== undefined && includes !== false && includes !== true) {
      if (includes.films) person.films = await this.getFilms(resource.films, includes.films);
      if (includes.starships) person.starships = await this.getStarships(resource.starships, includes.starships);
      if (includes.species) person.species = await this.getSpecies(resource.species, includes.species);
    }

    return person;
  }

  public async getPeople(personIds: ResourceIdentifier[], includes?: Application.PersonIncludes): Promise<ResourcesResult<Application.Person>> {
    const promises: Promise<ResourceResult<Application.Person>>[] = [];

    personIds.forEach((personId) => promises.push(this.getPerson(personId, includes)));

    const people = (await Promise.all(promises)).filter((person) => person !== null);

    return people as Application.Person[];
  }

  public async searchPeople(searchTerm: string, includes?: Application.PersonIncludes): Promise<ResourcesResult<Application.Person>> {
    const resources = await this.searchResources<Swapi.People>(Swapi.ResourceType.People, searchTerm);

    const people: ResourcesResult<Application.Person> = [];

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

    return people as ResourcesResult<Application.Person>;
  }

  public async getStarship(starshipId: ResourceIdentifier, includes?: Application.StarshipIncludes): Promise<ResourceResult<Application.Starship>> {
    const resource = await this.getResource<Swapi.Starship>(Swapi.ResourceType.Starship, starshipId);

    if (!resource) return null;

    const starship = Mapping.starshipFromResource(resource);

    if (includes !== undefined && includes !== true && includes !== false) {
      if (includes.pilots) starship.pilots = await this.getPeople(resource.pilots, includes.pilots);
    }

    return starship as ResourceResult<Application.Starship>;
  }

  public async getStarships(starshipIds: ResourceIdentifier[], includes?: Application.StarshipIncludes): Promise<ResourcesResult<Application.Starship>> {
    const promises: Promise<ResourceResult<Application.Starship>>[] = [];

    starshipIds.forEach((starshipId) => promises.push(this.getStarship(starshipId, includes)));

    const starships = (await Promise.all(promises)).filter((starship) => starship !== null);

    return starships as ResourcesResult<Application.Starship>;
  }

  public async getFilm(filmId: ResourceIdentifier, includes?: Application.FilmIncludes): Promise<ResourceResult<Application.Film>> {
    const resource = await this.getResource<Swapi.Film>(Swapi.ResourceType.Film, filmId);

    if (!resource) return null;

    const film = Mapping.filmFromResource(resource);

    if (includes !== undefined && includes !== true && includes !== false) {
      if (includes.characters) film.characters = await this.getPeople(resource.characters, includes.characters);
      if (includes.starships) film.starships = await this.getStarships(resource.starships, includes.starships);
    }

    return film as ResourceResult<Application.Film>;
  }

  public async getFilms(filmIds: ResourceIdentifier[], includes?: Application.FilmIncludes): Promise<ResourcesResult<Application.Film>> {
    const promises: Promise<ResourceResult<Application.Film>>[] = [];

    filmIds.forEach((filmId) => promises.push(this.getFilm(filmId, includes)));

    const films = (await Promise.all(promises)).filter((film) => film !== null);

    return films as ResourcesResult<Application.Film>;
  }

  public async getSpecie(speciesId: ResourceIdentifier, includes?: Application.SpeciesIncludes): Promise<ResourceResult<Application.Species>> {
    const resource = await this.getResource<Swapi.Species>(Swapi.ResourceType.Species, speciesId);

    if (!resource) return null;

    const species = Mapping.specieFromResource(resource);

    if (includes !== undefined && includes !== false && includes !== true) {
      if (includes.films) species.films = await this.getFilms(resource.films, includes.films);
      if (includes.people) species.people = await this.getPeople(resource.people, includes.people);
    }

    return species as ResourceResult<Application.Species>;
  }

  public async getSpecies(speciesIds: ResourceIdentifier[], includes?: Application.SpeciesIncludes): Promise<ResourcesResult<Application.Species>> {
    const promises: Promise<ResourceResult<Application.Species>>[] = [];

    speciesIds.forEach((speciesId) => promises.push(this.getSpecie(speciesId, includes)));

    const species = (await Promise.all(promises)).filter((species) => species !== null);

    return species as ResourcesResult<Application.Species>;
  }
}
