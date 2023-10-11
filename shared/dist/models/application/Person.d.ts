import { Includes, ResourceResult, ResourcesResult } from "../../types";
import { Base } from "./Base";
import { Film, FilmIncludes } from "./Film";
import { Planet, PlanetIncludes } from "./Planet";
import { Species, SpeciesIncludes } from "./Species";
import { Starship, StarshipIncludes } from "./Starship";
import { Vehicle, VehicleIncludes } from "./Vehicle";
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
//# sourceMappingURL=Person.d.ts.map