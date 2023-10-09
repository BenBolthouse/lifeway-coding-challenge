"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specieFromResource = void 0;
var Utilities = require("../../utilities");
function specieFromResource(resource) {
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
exports.specieFromResource = specieFromResource;
