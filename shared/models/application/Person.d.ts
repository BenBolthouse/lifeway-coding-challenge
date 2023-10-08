import { Includes } from "../../types";
import { Base } from "./Base";
import { Film, FilmIncludes } from "./Film";
import { Species, SpeciesIncludes } from "./Species";
import { Starship, StarshipIncludes } from "./Starship";
import { Vehicle, VehicleIncludes } from "./Vehicle";
export type PersonIncludes = Includes<{
    films?: FilmIncludes;
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
    homeworld: string;
    mass: number;
    name: string;
    skinColor: string;
    films: Film[];
    species: Species[];
    starships: Starship[];
    vehicles: Vehicle[];
}
