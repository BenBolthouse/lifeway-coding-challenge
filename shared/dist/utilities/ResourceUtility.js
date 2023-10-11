"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResourceIdFromResourceIdentifier = void 0;
const Base_1 = require("../models/swapi/Base");
function getResourceIdFromResourceIdentifier(resourceIdentifier) {
    if (typeof resourceIdentifier === "string") {
        const regex = new RegExp(`(?<=https://swapi.dev/api/(${Object.values(Base_1.ResourceType).join("|")})/)\\d+`);
        return parseInt(resourceIdentifier.match(regex)[0]);
    }
    else {
        return resourceIdentifier;
    }
}
exports.getResourceIdFromResourceIdentifier = getResourceIdFromResourceIdentifier;
