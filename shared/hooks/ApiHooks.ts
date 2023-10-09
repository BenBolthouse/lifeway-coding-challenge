import React from "react";
import { Application, Swapi } from "../models";
import { ReactHookResourceResult, ResourceGetRequest, ResourceResult, ResourceSearchRequest, ResourcesResult } from "../types";

/**
 * Not a publicly accessible function. Exported for internal uses.
 */
export function useGetResource<TModel, TIncludes>(resourceType: Swapi.ResourceType, includes?: TIncludes): ReactHookResourceResult<number, ResourceResult<TModel>> {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<unknown>(null);
  const [abortController] = React.useState(new AbortController());

  function execute(id: number) {
    // Kill any existing fetches.
    abortController.abort();

    setPending(true);

    const body: ResourceGetRequest<TIncludes> = {
      includes,
    };

    fetch(`${baseUrl}/api/${resourceType}/${id}/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: abortController.signal,
    })
      .then((result) => {
        setData(result.json());
        setError(false);
      })
      .catch(() => {
        setData(null);
        setError(true);
      })
      .finally(() => {
        setPending(false);
      });
  }

  return [
    execute,
    pending as boolean,
    error as boolean,
    data as ResourceResult<TModel>,
  ];
}

/**
 * Not a publicly accessible function. Exported for internal uses.
 */
export function useSearchResources<TModel, TIncludes>(resourceType: Swapi.ResourceType, includes?: TIncludes): ReactHookResourceResult<string, ResourcesResult<TModel>> {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<unknown>(null);
  const [abortController] = React.useState(new AbortController());

  function execute(searchTerm: string) {
    // Kill any existing fetches.
    abortController.abort();

    setPending(true);

    const body: ResourceSearchRequest<TIncludes> = {
      includes,
      search: searchTerm,
    };

    fetch(`${baseUrl}/api/${resourceType}/search/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: abortController.signal,
    })
      .then((result) => {
        setData(result.json());
        setError(false);
      })
      .catch(() => {
        setData(null);
        setError(true);
      })
      .finally(() => {
        setPending(false);
      });
  }

  return [
    execute,
    pending as boolean,
    error as boolean,
    data as ResourcesResult<TModel>,
  ];
}

/**
   * Returns a function to retrieve a person resource by ID and any included
   * related resources.
   *
   * @param includes Includes object to model the response.
   */
export function useGetPerson(includes?: Application.PersonIncludes): ReactHookResourceResult<number, ResourceResult<Application.Person>> {
  return useGetResource(Swapi.ResourceType.People, includes);
}

/**
 * Returns a function to search for people resources by name and any included
 * related resources.
 *
 * @param includes Includes object to model the response.
 */
export function useSearchPeople(includes?: Application.PersonIncludes): ReactHookResourceResult<string, ResourcesResult<Application.Person>> {
  return useSearchResources(Swapi.ResourceType.People, includes);
}
