import { Application } from "../models";
import { SwapiClientConfiguration, ResourceIdentifier, ResourceResult, ResourcesResult } from "../types";
import { Logger } from "winston";
import Cache from "../cache";
export declare class SwapiClient {
    baseUrl: string;
    logger: Logger;
    cache?: Cache;
    /**
     * Client for retrieving and consolidating data from the Star Wars API (Swapi).
     * Create a singleton instance of this for your project. Optionally accepts a
     * cache instance to cache responses.
     */
    constructor(configuration: SwapiClientConfiguration, logger: Logger, cache?: Cache);
    private getResource;
    private searchResources;
    /**
     * Gets a person by a numerical ID or a Swapi resource URL.
     *
     * @param personId The ID of the person to get.
     * @param includes The related resources to include in the response.
     * @returns A person object or null if not found.
     */
    getPerson(personId: ResourceIdentifier, includes?: Application.PersonIncludes): Promise<ResourceResult<Application.Person>>;
    getPeople(personIds: ResourceIdentifier[], includes?: Application.PersonIncludes): Promise<ResourcesResult<Application.Person>>;
    searchPeople(searchTerm: string, includes?: Application.PersonIncludes): Promise<ResourcesResult<Application.Person>>;
    getStarship(starshipId: ResourceIdentifier, includes?: Application.StarshipIncludes): Promise<ResourceResult<Application.Starship>>;
    getStarships(starshipIds: ResourceIdentifier[], includes?: Application.StarshipIncludes): Promise<ResourcesResult<Application.Starship>>;
    getFilm(filmId: ResourceIdentifier, includes?: Application.FilmIncludes): Promise<ResourceResult<Application.Film>>;
    getFilms(filmIds: ResourceIdentifier[], includes?: Application.FilmIncludes): Promise<ResourcesResult<Application.Film>>;
    getSpecie(speciesId: ResourceIdentifier, includes?: Application.SpeciesIncludes): Promise<ResourceResult<Application.Species>>;
    getSpecies(speciesIds: ResourceIdentifier[], includes?: Application.SpeciesIncludes): Promise<ResourcesResult<Application.Species>>;
}
