import * as Application from "../application";
import * as Swapi from "../swapi";
import * as Utilities from "../../utilities";

export function planetFromResource(resource: Swapi.Planet): Application.Planet {
  return {
    id: Utilities.Resource.getResourceIdFromResourceIdentifier(resource.url),
    climate: resource.climate,
    diameter: resource.diameter,
    gravity: resource.gravity,
    name: resource.name,
    orbitalPeriod: resource.orbital_period,
    population: resource.population,
    rotationPeriod: resource.rotation_period,
    surfaceWater: resource.surface_water,
    terrain: resource.terrain,
    films: [],
    residents: [],
  };
}
