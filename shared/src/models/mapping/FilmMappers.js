"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmFromResource = void 0;
var Utilities = require("../../utilities");
function filmFromResource(resource) {
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
exports.filmFromResource = filmFromResource;
