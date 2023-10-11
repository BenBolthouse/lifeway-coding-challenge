import { Includes, ResourcesResult } from "../../types";
import { Base } from "./Base";
import { Film, FilmIncludes } from "./Film";
import { Person, PersonIncludes } from "./Person";
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
//# sourceMappingURL=Planet.d.ts.map