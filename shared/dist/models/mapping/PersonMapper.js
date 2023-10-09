"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personFromResource = void 0;
var Utilities = require("../../utilities");
function personFromResource(resource) {
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
exports.personFromResource = personFromResource;
