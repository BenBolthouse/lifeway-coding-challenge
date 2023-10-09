import * as Application from "../application";
import * as Swapi from "../swapi";
import * as Utilities from "../../utilities";

export function personFromResource(resource: Swapi.People): Application.Person {
  return {
    id: Utilities.Resource.getResourceIdFromResourceIdentifier(resource.url),
    birthYear: resource.birth_year,
    eyeColor: resource.eye_color,
    gender: resource.gender,
    hairColor: resource.hair_color,
    height: parseInt(resource.height),
    mass: parseInt(resource.mass),
    name: resource.name,
    skinColor: resource.skin_color,
    films: [],
    homeworld: null,
    species: [],
    starships: [],
    vehicles: [],
  };
}
