import { Base } from "./Base";
import { Film, FilmIncludes } from "./Film";
import { Person, PersonIncludes } from "./Person";

export type PlanetIncludes = boolean | {
  residents: PersonIncludes
  films: FilmIncludes
}

export interface Planet extends Base {
  climate: string
  diameter: string
  gravity: string
  name: string
  orbitalPeriod: string
  population: string
  rotationPeriod: string
  surfaceWater: string
  terrain: string
  residents: Person[]
  films: Film[]
}
