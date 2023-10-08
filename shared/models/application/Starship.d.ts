import { Includes } from "../../types";
import { Base } from "./Base";
import { Person, PersonIncludes } from "./Person";
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
    pilots: Person[];
}
