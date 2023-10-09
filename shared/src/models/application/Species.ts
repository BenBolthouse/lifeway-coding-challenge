import { Includes, ResourceResult, ResourcesResult } from "../../types";
import { Base } from "./Base";
import { Film, FilmIncludes } from "./Film";
import { Person, PersonIncludes } from "./Person";
import { Planet, PlanetIncludes } from "./Planet";

export type SpeciesIncludes = Includes<{
  films?: FilmIncludes
  people?: PersonIncludes
  planet?: PlanetIncludes
}>

export interface Species extends Base {
  averageHeight: string
  averageLifespan: string
  classification: string
  designation: string
  eyeColors: string
  hairColors: string
  language: string
  name: string
  skin_colors: string
  films: ResourcesResult<Film>
  homeworld: ResourceResult<Planet>
  people: ResourcesResult<Person>
}; // eslint-disable-line
