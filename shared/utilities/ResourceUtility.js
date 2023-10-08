"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceIdFromResourceIdentifier = void 0;
var models_1 = require("../models");
function getResourceIdFromResourceIdentifier(resourceIdentifier) {
    if (typeof resourceIdentifier === "string") {
        var regex = new RegExp("(?<=https://swapi.dev/api/(".concat(Object.values(models_1.Swapi.ResourceType).join("|"), ")/)\\d+"));
        return parseInt(resourceIdentifier.match(regex)[0]);
    }
    else {
        return resourceIdentifier;
    }
}
exports.getResourceIdFromResourceIdentifier = getResourceIdFromResourceIdentifier;
