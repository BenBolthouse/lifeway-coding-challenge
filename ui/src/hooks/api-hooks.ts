/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState } from "react";
import { Models, Types } from "lifeway-coding-challenge-shared";

export function useGetResource<TModel, TIncludes>(resourceType: Models.Swapi.ResourceType, id: number, includes?: TIncludes): Types.ReactHookResourceResult<Types.ResourceResult<TModel>> {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<unknown>(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    setPending(true);

    const body: Types.ResourceGetRequest<TIncludes> = {
      includes,
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/${resourceType}/get/${id}/`, {
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
        setPending(false);
      })
      .catch(() => {
        setData(null);
        setError(true);
        setPending(false);
      });

    return () => abortController.abort();
  }, []);

  return [
    pending,
    error,
    data as Types.ResourceResult<TModel>,
  ];
}

export function useSearchResources<TModel, TIncludes>(resourceType: Models.Swapi.ResourceType, searchTerm: string, includes?: TIncludes): Types.ReactHookResourceResult<Types.ResourcesResult<TModel>> {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<unknown>(null);

  React.useEffect(() => {
    const abortController = new AbortController();

    setPending(true);

    const body: Types.ResourceSearchRequest<TIncludes> = {
      includes,
      search: searchTerm,
    };

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/${resourceType}/search/`, {
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
        setPending(false);
      })
      .catch(() => {
        setData(null);
        setError(true);
        setPending(false);
      });

    return () => abortController.abort();
  }, [
    searchTerm,
  ])

  return [
    pending,
    error,
    data as Types.ResourcesResult<TModel>,
  ];
}

/**
 * Returns a function to retrieve a person resource by ID and any included
 * related resources.
 *
 * @param includes Includes object to model the response.
 */
export function useGetPerson(id: number, includes?: Models.Application.PersonIncludes): Types.ReactHookResourceResult<Types.ResourceResult<Models.Application.Person>> {
  return useGetResource(Models.Swapi.ResourceType.People, id, includes);
}

/**
 * Returns a function to search for people resources by name and any included
 * related resources.
 *
 * @param includes Includes object to model the response.
 */
export function useSearchPeople(searchTerm: string, includes?: Models.Application.PersonIncludes): Types.ReactHookResourceResult<Types.ResourcesResult<Models.Application.Person>> {
  return useSearchResources(Models.Swapi.ResourceType.People, searchTerm, includes);
}
