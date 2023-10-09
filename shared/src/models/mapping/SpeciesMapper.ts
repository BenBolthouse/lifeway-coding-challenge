import * as Application from "../application";
import * as Swapi from "../swapi";
import * as Utilities from "../../utilities";

export function specieFromResource(resource: Swapi.Species): Application.Species {
  return {
    id: Utilities.Resource.getResourceIdFromResourceIdentifier(resource.url),
    averageHeight: resource.average_height,
    averageLifespan: resource.average_lifespan,
    classification: resource.classification,
    designation: resource.designation,
    eyeColors: resource.eye_colors,
    hairColors: resource.hair_colors,
    language: resource.language,
    name: resource.name,
    skin_colors: resource.skin_colors,
    films: [],
    homeworld: null,
    people: [],
  };
}
