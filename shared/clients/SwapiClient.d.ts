import { Application } from "../models";
import { SwapiConfiguration, ResourceIdentifier } from "../types";
import { Logger } from "winston";
import Cache from "../cache";
export default class SwapiClient {
    baseUrl: string;
    logger: Logger;
    cache?: Cache;
    constructor(configuration: SwapiConfiguration, logger: Logger, cache?: Cache);
    private getResource;
    private searchResources;
    getPerson(personId: ResourceIdentifier, includes?: Application.PersonIncludes): Promise<Application.Person | null>;
    getPeople(personIds: ResourceIdentifier[], includes?: Application.PersonIncludes): Promise<Application.Person[]>;
    searchPeople(searchTerm: string, includes?: Application.PersonIncludes): Promise<Application.Person[]>;
    getStarship(starshipId: ResourceIdentifier, includes?: Application.StarshipIncludes): Promise<Application.Starship | null>;
    getStarships(starshipIds: ResourceIdentifier[], includes?: Application.StarshipIncludes): Promise<Application.Starship[]>;
    getFilm(filmId: ResourceIdentifier, includes?: Application.FilmIncludes): Promise<Application.Film | null>;
    getFilms(filmIds: ResourceIdentifier[], includes?: Application.FilmIncludes): Promise<Application.Film[]>;
}
