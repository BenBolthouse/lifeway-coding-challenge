import { ResourceType } from "../models/swapi/Base";
import { ResourceIdentifier } from "../types";

export function getResourceIdFromResourceIdentifier(resourceIdentifier: ResourceIdentifier): number {
  if (typeof resourceIdentifier === "string") {
    const regex = new RegExp(`(?<=https://swapi.dev/api/(${Object.values(ResourceType).join("|")})/)\\d+`);

    return parseInt(resourceIdentifier.match(regex)![0]);
  }
  else {
    return resourceIdentifier;
  }
}
