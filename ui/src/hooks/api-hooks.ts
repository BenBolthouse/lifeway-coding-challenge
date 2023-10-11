/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { Models, Types } from "lifeway-coding-challenge-shared";

type UseGetResource<TResource> = {
  get: (id: number) => () => void
  pending: boolean
  error: boolean
  data: Types.ResourceResult<TResource>
}

type UseSearchResource<TResource> = {
  search: (searchTerm: string) => () => void
  pending: boolean
  error: boolean
  data: Types.ResourcesResult<TResource>
}

export function useGetResource<TModel, TIncludes>(resourceType: Models.Swapi.ResourceType, id?: number, includes?: TIncludes): UseGetResource<TModel> {
  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<unknown>(null);

  function get(id: number) {
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
        result
          .json()
          .then((newData) => {
            setData(newData);
            setError(false);
            setPending(false);
          });
      })
      .catch(() => {
        setData(null);
        setError(true);
        setPending(false);
      });

      return () => abortController.abort();
  }

  useEffect(() => {id && get(id)}, [id])

  return {
    get,
    pending,
    error,
    data: data as Types.ResourceResult<TModel>,
  };
}

export function useSearchResources<TModel, TIncludes>(resourceType: Models.Swapi.ResourceType, includes?: TIncludes): UseSearchResource<TModel> {
  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<unknown>(null);

  function search(searchTerm: string) {
    const abortController = new AbortController();

    const result = () => abortController.abort();

    if (searchTerm === "") return result;

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
        result
          .json()
          .then((newData) => {
            setData(newData);
            setError(false);
            setPending(false);
          });
      })
      .catch(() => {
        setData(null);
        setError(true);
        setPending(false);
      });

      return result;
  }

  return {
    search,
    pending,
    error,
    data: data as Types.ResourcesResult<TModel>,
  };
}

/**
 * Returns a function to retrieve a person resource by ID and any included
 * related resources.
 *
 * @param includes Includes object to model the response.
 */
export function useGetPerson(id?: number, includes?: Models.Application.PersonIncludes): UseGetResource<Models.Application.Person> {
  return useGetResource(Models.Swapi.ResourceType.People, id, includes);
}

/**
 * Returns a function to search for people resources by name and any included
 * related resources.
 *
 * @param includes Includes object to model the response.
 */
export function useSearchPeople(includes?: Models.Application.PersonIncludes): UseSearchResource<Models.Application.Person> {
  return useSearchResources(Models.Swapi.ResourceType.People, includes);
}
