"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.starshipFromResource = void 0;
var Utilities = require("../../utilities");
function starshipFromResource(resource) {
    return {
        id: Utilities.Resource.getResourceIdFromResourceIdentifier(resource.url),
        cargoCapacity: resource.cargo_capacity,
        consumables: resource.consumables,
        costInCredits: resource.cost_in_credits,
        crew: resource.crew,
        hyperdriveRating: resource.hyperdrive_rating,
        length: resource.length,
        manufacturer: resource.manufacturer,
        maxAtmospheringSpeed: resource.max_atmosphering_speed,
        mglt: resource.MGLT,
        model: resource.model,
        name: resource.name,
        passengers: resource.passengers,
        starshipClass: resource.starship_class,
        pilots: [],
    };
}
exports.starshipFromResource = starshipFromResource;
