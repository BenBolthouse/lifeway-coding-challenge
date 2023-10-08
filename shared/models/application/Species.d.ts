import { Includes } from "../../types";
import { Base } from "./Base";
import { FilmIncludes } from "./Film";
import { PersonIncludes } from "./Person";
export type SpeciesIncludes = Includes<{
    films?: FilmIncludes;
    people?: PersonIncludes;
}>;
export interface Species extends Base {
    average_height: string;
    average_lifespan: string;
    classification: string;
    designation: string;
    eye_colors: string;
    hair_colors: string;
    homeworld: string;
    language: string;
    name: string;
    skin_colors: string;
}
