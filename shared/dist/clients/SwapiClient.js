"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapiClient = void 0;
const models_1 = require("../models");
class SwapiClient {
    baseUrl;
    logger;
    cache;
    /**
     * Client for retrieving and consolidating data from the Star Wars API (Swapi).
     * Create a singleton instance of this for your project. Optionally accepts a
     * cache instance to cache responses.
     */
    constructor(configuration, logger, cache) {
        this.baseUrl = configuration.swapiBaseUrl;
        this.logger = logger;
        this.cache = cache;
    }
    async getResource(resourceType, resourceId) {
        let result = null;
        const uri = (typeof resourceId === "string") ? resourceId : `${this.baseUrl}/${resourceType}/${resourceId}/`;
        const meta = { caching: !!this.cache, uri, };
        if (this.cache) {
            result = this.cache.get(uri);
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
            .then((response) => response.ok ? response.json() : null)
            .then((result) => {
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
    async searchResources(resourceType, searchTerm) {
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
            .then((response) => response.json().then((page) => page.results))
            .then((results) => {
            this.logger.debug(`Resolved with ${results.length} search results.`, meta);
            if (this.cache) {
                this.logger.error(`Caching ${results.length} resolved resources.`, meta);
                results.forEach((result) => this.cache.put(result.url, result));
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
    async getPerson(personId, includes) {
        const resource = await this.getResource(models_1.Swapi.ResourceType.People, personId);
        if (!resource)
            return null;
        const person = models_1.Mapping.personFromResource(resource);
        if (includes !== undefined && includes !== false && includes !== true) {
            if (includes.films)
                person.films = await this.getFilms(resource.films, includes.films);
            if (includes.starships)
                person.starships = await this.getStarships(resource.starships, includes.starships);
            if (includes.species)
                person.species = await this.getSpecies(resource.species, includes.species);
        }
        return person;
    }
    async getPeople(personIds, includes) {
        const promises = [];
        personIds.forEach((personId) => promises.push(this.getPerson(personId, includes)));
        const people = (await Promise.all(promises)).filter((person) => person !== null);
        return people;
    }
    async searchPeople(searchTerm, includes) {
        const resources = await this.searchResources(models_1.Swapi.ResourceType.People, searchTerm);
        const people = [];
        for (const resource of resources) {
            const person = models_1.Mapping.personFromResource(resource);
            if (includes !== undefined && includes !== true && includes !== false) {
                if (includes.films)
                    person.films = await this.getFilms(resource.films, includes.films);
                if (includes.homeworld)
                    person.homeworld = await this.getPlanet(resource.homeworld, includes.homeworld);
                if (includes.starships)
                    person.starships = await this.getStarships(resource.starships, includes.starships);
            }
            people.push(person);
        }
        return people;
    }
    async getStarship(starshipId, includes) {
        const resource = await this.getResource(models_1.Swapi.ResourceType.Starship, starshipId);
        if (!resource)
            return null;
        const starship = models_1.Mapping.starshipFromResource(resource);
        if (includes !== undefined && includes !== true && includes !== false) {
            if (includes.pilots)
                starship.pilots = await this.getPeople(resource.pilots, includes.pilots);
        }
        return starship;
    }
    async getStarships(starshipIds, includes) {
        const promises = [];
        starshipIds.forEach((starshipId) => promises.push(this.getStarship(starshipId, includes)));
        const starships = (await Promise.all(promises)).filter((starship) => starship !== null);
        return starships;
    }
    async getFilm(filmId, includes) {
        const resource = await this.getResource(models_1.Swapi.ResourceType.Film, filmId);
        if (!resource)
            return null;
        const film = models_1.Mapping.filmFromResource(resource);
        if (includes !== undefined && includes !== true && includes !== false) {
            if (includes.characters)
                film.characters = await this.getPeople(resource.characters, includes.characters);
            if (includes.starships)
                film.starships = await this.getStarships(resource.starships, includes.starships);
        }
        return film;
    }
    async getFilms(filmIds, includes) {
        const promises = [];
        filmIds.forEach((filmId) => promises.push(this.getFilm(filmId, includes)));
        const films = (await Promise.all(promises)).filter((film) => film !== null);
        return films;
    }
    async getSpecie(speciesId, includes) {
        const resource = await this.getResource(models_1.Swapi.ResourceType.Species, speciesId);
        if (!resource)
            return null;
        const species = models_1.Mapping.specieFromResource(resource);
        if (includes !== undefined && includes !== false && includes !== true) {
            if (includes.films)
                species.films = await this.getFilms(resource.films, includes.films);
            if (includes.people)
                species.people = await this.getPeople(resource.people, includes.people);
        }
        return species;
    }
    async getSpecies(speciesIds, includes) {
        const promises = [];
        speciesIds.forEach((speciesId) => promises.push(this.getSpecie(speciesId, includes)));
        const species = (await Promise.all(promises)).filter((species) => species !== null);
        return species;
    }
    async getPlanet(planetId, includes) {
        const resource = await this.getResource(models_1.Swapi.ResourceType.Planet, planetId);
        if (!resource)
            return null;
        const planet = models_1.Mapping.planetFromResource(resource);
        if (includes !== undefined && includes !== false && includes !== true) {
            if (includes.films)
                planet.films = await this.getFilms(resource.films, includes.films);
            if (includes.residents)
                planet.residents = await this.getPeople(resource.residents, includes.residents);
        }
        return planet;
    }
}
exports.SwapiClient = SwapiClient;
