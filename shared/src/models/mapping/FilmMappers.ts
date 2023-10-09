import * as Application from "../application";
import * as Swapi from "../swapi";
import * as Utilities from "../../utilities";

export function filmFromResource(resource: Swapi.Film): Application.Film {
  return {
    id: Utilities.Resource.getResourceIdFromResourceIdentifier(resource.url),
    director: resource.director,
    episodeId: resource.episode_id,
    openingCrawl: resource.opening_crawl,
    producer: resource.producer,
    releaseDate: resource.release_date,
    title: resource.title,
    characters: [],
    species: [],
    starships: [],
  };
}
