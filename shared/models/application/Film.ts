import { Includes, ResourcesResult } from "../../types";
import { Base } from "./Base";
import { Person, PersonIncludes } from "./Person";
import { Species, SpeciesIncludes } from "./Species";
import { Starship, StarshipIncludes } from "./Starship";

export type FilmIncludes = Includes<{
  species?: SpeciesIncludes
  starships?: StarshipIncludes
  characters?: PersonIncludes
}>

export interface Film extends Base {
  title: string
  episodeId: number
  openingCrawl: string
  director: string
  producer: string
  releaseDate: string
  characters: ResourcesResult<Person>
  species: ResourcesResult<Species>
  starships: ResourcesResult<Starship>
}; // eslint-disable-line
