declare module "models/application/Base" {
    export interface Base {
        id: number;
    }
}
declare module "types/Includes" {
    export type Includes<TModel> = TModel | boolean | undefined;
}
declare module "types/ResourceGetRequest" {
    export type ResourceGetRequest<TIncludes> = {
        includes?: TIncludes;
    };
}
declare module "types/ResourceIdentifier" {
    export type ResourceIdentifier = string | number;
}
declare module "types/ResourceResult" {
    export type ResourceResult<TResource> = TResource | null;
}
declare module "types/ResourcesResult" {
    export type ResourcesResult<TResource> = TResource[];
}
declare module "types/ResourcesSearchRequest" {
    export type ResourceSearchRequest<TIncludes> = {
        includes?: TIncludes;
        search: string;
    };
}
declare module "types/SwapiClientConfiguration" {
    export type SwapiClientConfiguration = {
        swapiBaseUrl: string;
    };
}
declare module "types/index" {
    export * from "types/Includes";
    export * from "types/ResourceGetRequest";
    export * from "types/ResourceIdentifier";
    export * from "types/ResourceResult";
    export * from "types/ResourcesResult";
    export * from "types/ResourcesSearchRequest";
    export * from "types/SwapiClientConfiguration";
}
declare module "models/application/Planet" {
    import { Includes, ResourcesResult } from "types/index";
    import { Base } from "models/application/Base";
    import { Film, FilmIncludes } from "models/application/Film";
    import { Person, PersonIncludes } from "models/application/Person";
    export type PlanetIncludes = Includes<{
        residents: PersonIncludes;
        films: FilmIncludes;
    }>;
    export interface Planet extends Base {
        climate: string;
        diameter: string;
        gravity: string;
        name: string;
        orbitalPeriod: string;
        population: string;
        rotationPeriod: string;
        surfaceWater: string;
        terrain: string;
        residents: ResourcesResult<Person>;
        films: ResourcesResult<Film>;
    }
}
declare module "models/application/Species" {
    import { Includes, ResourceResult, ResourcesResult } from "types/index";
    import { Base } from "models/application/Base";
    import { Film, FilmIncludes } from "models/application/Film";
    import { Person, PersonIncludes } from "models/application/Person";
    import { Planet, PlanetIncludes } from "models/application/Planet";
    export type SpeciesIncludes = Includes<{
        films?: FilmIncludes;
        people?: PersonIncludes;
        planet?: PlanetIncludes;
    }>;
    export interface Species extends Base {
        averageHeight: string;
        averageLifespan: string;
        classification: string;
        designation: string;
        eyeColors: string;
        hairColors: string;
        language: string;
        name: string;
        skin_colors: string;
        films: ResourcesResult<Film>;
        homeworld: ResourceResult<Planet>;
        people: ResourcesResult<Person>;
    }
}
declare module "models/application/Starship" {
    import { Includes, ResourcesResult } from "types/index";
    import { Base } from "models/application/Base";
    import { Person, PersonIncludes } from "models/application/Person";
    export type StarshipIncludes = Includes<{
        pilots?: PersonIncludes;
    }>;
    export interface Starship extends Base {
        cargoCapacity: string;
        consumables: string;
        costInCredits: string;
        crew: string;
        hyperdriveRating: string;
        length: string;
        manufacturer: string;
        maxAtmospheringSpeed: string;
        mglt: string;
        model: string;
        name: string;
        passengers: string;
        starshipClass: string;
        pilots: ResourcesResult<Person>;
    }
}
declare module "models/application/Vehicle" {
    import { Includes, ResourcesResult } from "types/index";
    import { Film, FilmIncludes } from "models/application/Film";
    import { Person, PersonIncludes } from "models/application/Person";
    export type VehicleIncludes = Includes<{
        pilots?: PersonIncludes;
        films?: FilmIncludes;
    }>;
    export interface Vehicle {
        cargoCapacity: string;
        consumables: string;
        costInCredits: string;
        crew: string;
        length: string;
        manufacturer: string;
        maxAtmospheringSpeed: string;
        model: string;
        name: string;
        passengers: string;
        vehicleClass: string;
        pilots: ResourcesResult<Person>;
        films: ResourcesResult<Film>;
    }
}
declare module "models/application/Person" {
    import { Includes, ResourceResult, ResourcesResult } from "types/index";
    import { Base } from "models/application/Base";
    import { Film, FilmIncludes } from "models/application/Film";
    import { Planet, PlanetIncludes } from "models/application/Planet";
    import { Species, SpeciesIncludes } from "models/application/Species";
    import { Starship, StarshipIncludes } from "models/application/Starship";
    import { Vehicle, VehicleIncludes } from "models/application/Vehicle";
    export type PersonSearch = {
        name?: string;
    };
    export type PersonIncludes = Includes<{
        films?: FilmIncludes;
        homeworld?: PlanetIncludes;
        species?: SpeciesIncludes;
        starships?: StarshipIncludes;
        vehicles?: VehicleIncludes;
    }>;
    export interface Person extends Base {
        birthYear: string;
        eyeColor: string;
        gender: string;
        hairColor: string;
        height: number;
        mass: number;
        name: string;
        skinColor: string;
        films: ResourcesResult<Film>;
        homeworld: ResourceResult<Planet>;
        species: ResourcesResult<Species>;
        starships: ResourcesResult<Starship>;
        vehicles: ResourcesResult<Vehicle>;
    }
}
declare module "models/application/Film" {
    import { Includes, ResourcesResult } from "types/index";
    import { Base } from "models/application/Base";
    import { Person, PersonIncludes } from "models/application/Person";
    import { Species, SpeciesIncludes } from "models/application/Species";
    import { Starship, StarshipIncludes } from "models/application/Starship";
    export type FilmIncludes = Includes<{
        species?: SpeciesIncludes;
        starships?: StarshipIncludes;
        characters?: PersonIncludes;
    }>;
    export interface Film extends Base {
        title: string;
        episodeId: number;
        openingCrawl: string;
        director: string;
        producer: string;
        releaseDate: string;
        characters: ResourcesResult<Person>;
        species: ResourcesResult<Species>;
        starships: ResourcesResult<Starship>;
    }
}
declare module "models/application/index" {
    export * from "models/application/Base";
    export * from "models/application/Film";
    export * from "models/application/Person";
    export * from "models/application/Planet";
    export * from "models/application/Species";
    export * from "models/application/Starship";
}
declare module "models/swapi/Base" {
    export enum ResourceType {
        Film = "films",
        People = "people",
        Planet = "planets",
        Species = "species",
        Starship = "starships",
        Vehicle = "vehicles"
    }
    /**
     * ResourceUrl String
     *
     * e.g. "https://swapi.co/api/people/1/",
     */
    export type ResourceUrl = string;
    export default interface Resource {
        url: ResourceUrl;
        id: string;
        /**
         * "2014-12-09T13:50:51.644000Z"
         */
        created: string;
        /**
         * "2014-12-20T21:17:56.891000Z"
         */
        edited: string;
    }
}
declare module "models/swapi/Film" {
    import Resource, { ResourceUrl } from "models/swapi/Base";
    export default interface Film extends Resource {
        title: string;
        episode_id: number;
        opening_crawl: string;
        director: string;
        producer: string;
        release_date: string;
        characters: ResourceUrl[];
        planets: ResourceUrl[];
        starships: ResourceUrl[];
        vehicles: ResourceUrl[];
        species: ResourceUrl[];
    }
}
declare module "models/swapi/PagedResults" {
    export default interface PagedResults<T> {
        count: number;
        next?: string;
        previous: string;
        results: T[];
    }
}
declare module "models/swapi/People" {
    import Resource, { ResourceUrl } from "models/swapi/Base";
    export default interface People extends Resource {
        birth_year: string;
        eye_color: string;
        films: ResourceUrl[];
        gender: string;
        hair_color: string;
        height: string;
        homeworld: string;
        mass: string;
        name: string;
        skin_color: string;
        species: ResourceUrl[];
        starships: ResourceUrl[];
        vehicles: ResourceUrl[];
    }
}
declare module "models/swapi/Planet" {
    import Resource, { ResourceUrl } from "models/swapi/Base";
    export default interface Planet extends Resource {
        name: string;
        rotation_period: string;
        orbital_period: string;
        diameter: string;
        climate: string;
        gravity: string;
        terrain: string;
        surface_water: string;
        population: string;
        residents: ResourceUrl[];
        films: ResourceUrl[];
    }
}
declare module "models/swapi/Species" {
    import Resource, { ResourceUrl } from "models/swapi/Base";
    export default interface Species extends Resource {
        name: string;
        classification: string;
        designation: string;
        average_height: string;
        skin_colors: string;
        hair_colors: string;
        eye_colors: string;
        average_lifespan: string;
        homeworld: string;
        language: string;
        people: ResourceUrl[];
        films: ResourceUrl[];
    }
}
declare module "models/swapi/Starship" {
    import Resource, { ResourceUrl } from "models/swapi/Base";
    export default interface Starship extends Resource {
        name: string;
        model: string;
        manufacturer: string;
        cost_in_credits: string;
        length: string;
        max_atmosphering_speed: string;
        crew: string;
        passengers: string;
        cargo_capacity: string;
        consumables: string;
        hyperdrive_rating: string;
        MGLT: string;
        starship_class: string;
        pilots: ResourceUrl[];
        films: ResourceUrl[];
    }
}
declare module "models/swapi/Vehicle" {
    import Resource, { ResourceUrl } from "models/swapi/Base";
    export default interface Vehicle extends Resource {
        name: string;
        model: string;
        manufacturer: string;
        cost_in_credits: string;
        length: string;
        max_atmosphering_speed: string;
        crew: string;
        passengers: string;
        cargo_capacity: string;
        consumables: string;
        vehicle_class: string;
        pilots: ResourceUrl[];
        films: ResourceUrl[];
    }
}
declare module "models/swapi/index" {
    export type { default as Base } from "models/swapi/Base";
    export { ResourceType, ResourceUrl } from "models/swapi/Base";
    export type { default as Film } from "models/swapi/Film";
    export type { default as PagedResults } from "models/swapi/PagedResults";
    export type { default as People } from "models/swapi/People";
    export type { default as Planet } from "models/swapi/Planet";
    export type { default as Species } from "models/swapi/Species";
    export type { default as Starship } from "models/swapi/Starship";
    export type { default as Vehicle } from "models/swapi/Vehicle";
}
declare module "utilities/ResourceUtility" {
    import { ResourceIdentifier } from "types/index";
    export function getResourceIdFromResourceIdentifier(resourceIdentifier: ResourceIdentifier): number;
}
declare module "utilities/index" {
    export * as Resource from "utilities/ResourceUtility";
}
declare module "models/mapping/FilmMappers" {
    import * as Application from "models/application/index";
    import * as Swapi from "models/swapi/index";
    export function filmFromResource(resource: Swapi.Film): Application.Film;
}
declare module "models/mapping/PersonMapper" {
    import * as Application from "models/application/index";
    import * as Swapi from "models/swapi/index";
    export function personFromResource(resource: Swapi.People): Application.Person;
}
declare module "models/mapping/PlanetMapper" {
    import * as Application from "models/application/index";
    import * as Swapi from "models/swapi/index";
    export function planetFromResource(resource: Swapi.Planet): Application.Planet;
}
declare module "models/mapping/SpeciesMapper" {
    import * as Application from "models/application/index";
    import * as Swapi from "models/swapi/index";
    export function specieFromResource(resource: Swapi.Species): Application.Species;
}
declare module "models/mapping/StarshipMapper" {
    import * as Application from "models/application/index";
    import * as Swapi from "models/swapi/index";
    export function starshipFromResource(resource: Swapi.Starship): Application.Starship;
}
declare module "models/mapping/index" {
    export * from "models/mapping/FilmMappers";
    export * from "models/mapping/PersonMapper";
    export * from "models/mapping/PlanetMapper";
    export * from "models/mapping/SpeciesMapper";
    export * from "models/mapping/StarshipMapper";
}
declare module "models/index" {
    export * as Application from "models/application/index";
    export * as Swapi from "models/swapi/index";
    export * as Mapping from "models/mapping/index";
}
declare module "cache/index" {
    export default class Cache {
        private data;
        put(key: string, value: unknown): undefined;
        get<TModel>(key: string): TModel | null;
        clear(): void;
    }
}
declare module "clients/SwapiClient" {
    import { Application } from "models/index";
    import { SwapiClientConfiguration, ResourceIdentifier, ResourceResult, ResourcesResult } from "types/index";
    import { Logger } from "winston";
    import Cache from "cache/index";
    export class SwapiClient {
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
        getPlanet(planetId: ResourceIdentifier, includes?: Application.PlanetIncludes): Promise<ResourceResult<Application.Planet>>;
    }
}
declare module "clients/index" {
    export * from "clients/SwapiClient";
}
declare module "index" {
    export * as Clients from "clients/index";
    export * as Models from "models/index";
    export * as Types from "types/index";
    export { default as Cache } from "cache/index";
}
declare module "types/ReactHookResourceResult" {
    export type ReactHookResourceResult<TModel> = [pending: boolean, error: boolean, data: TModel];
}
//# sourceMappingURL=index.d.ts.map