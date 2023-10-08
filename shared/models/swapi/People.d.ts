import Resource, { ResourceUrl } from "./Base";
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
