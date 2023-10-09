import { Application } from "../models";
import { ReactHookResourceResult, ResourceResult, ResourcesResult } from "../types";
import { ResourceType } from "../models/swapi/Base";
/**
 * Not a publicly accessible function. Exported for internal uses.
 */
export declare function useGetResource<TModel, TIncludes>(resourceType: ResourceType, includes?: TIncludes): ReactHookResourceResult<number, ResourceResult<TModel>>;
/**
 * Not a publicly accessible function. Exported for internal uses.
 */
export declare function useSearchResources<TModel, TIncludes>(resourceType: ResourceType, includes?: TIncludes): ReactHookResourceResult<string, ResourcesResult<TModel>>;
/**
   * Returns a function to retrieve a person resource by ID and any included
   * related resources.
   *
   * @param includes Includes object to model the response.
   */
export declare function useGetPerson(includes?: Application.PersonIncludes): ReactHookResourceResult<number, ResourceResult<Application.Person>>;
/**
 * Returns a function to search for people resources by name and any included
 * related resources.
 *
 * @param includes Includes object to model the response.
 */
export declare function useSearchPeople(includes?: Application.PersonIncludes): ReactHookResourceResult<string, ResourcesResult<Application.Person>>;
