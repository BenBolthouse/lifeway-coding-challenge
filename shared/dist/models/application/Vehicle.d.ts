import { Includes, ResourcesResult } from "../../types";
import { Film, FilmIncludes } from "./Film";
import { Person, PersonIncludes } from "./Person";
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
//# sourceMappingURL=Vehicle.d.ts.map