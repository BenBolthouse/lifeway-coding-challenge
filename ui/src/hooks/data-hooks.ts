// The goal here is for us to establish patterns for GET single by ID, GET
// multiple by search (and so on) in a generic way. Because we are using an
// includes pattern for our general data retrieval, this gives us an excellent
// opportunity to graph off of different "entrypoints" and then get the entities
// related to those entrypoints, and continue traversing the graph in this
// manner.
//
// The spec requires that a person should be retrieved by ID and that people
// should be searchable by name. So naturally, "person" or "people" will be our
// initial entrypoint, and we will graph away from that point.
//
// The hook functions at the bottom of the file illustrate the pattern of using
// the generic functions (at the top) to define an entrypoint to the graph and
// then "explore" the graph via includes.

import React from "react";
import { Models, Types } from "lifeway-coding-challenge-shared";

function useGetResource<TResource, TIncludes>(resourceType: Models.Swapi.ResourceType, id?: number, includes?: TIncludes): [
  (id: number) => () => void,
  Types.ResourceResult<TResource>,
  boolean,
  boolean,
] {
  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Types.ResourceResult<TResource>>(null);

  function get(id: number) {
    const abortController = new AbortController();

    setPending(true);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/${resourceType}/get/${id}/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        includes,
      }),
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

  // To give users the option to use the id parameter of the hook call, if id is
  // defined or if defined and changed, call get(id).
  React.useEffect(() => { id && get(id); }, [id]);

  return [
    get,
    data,
    pending,
    error,
  ];
}

function useSearchResources<TResource, TIncludes>(resourceType: Models.Swapi.ResourceType, includes?: TIncludes): [
  (searchTerm: string) => () => void,
  Types.ResourcesResult<TResource>,
  boolean,
  boolean,
] {
  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Types.ResourcesResult<TResource>>([]);

  function search(searchTerm: string) {
    const abortController = new AbortController();

    const result = () => abortController.abort();

    if (searchTerm === "") return result;

    setPending(true);

    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/${resourceType}/search/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        includes,
        search: searchTerm,
      }),
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
        setData([]);
        setError(true);
        setPending(false);
      });

    return result;
  }

  return [
    search,
    data,
    pending,
    error,
  ];
}

export function useGetPerson(id?: number, includes?: Models.Application.PersonIncludes) {
  return useGetResource<Models.Application.Person, Models.Application.PersonIncludes>(Models.Swapi.ResourceType.People, id, includes);
}

export function useSearchPeople(includes?: Models.Application.PersonIncludes) {
  return useSearchResources<Models.Application.Person, Models.Application.PersonIncludes>(Models.Swapi.ResourceType.People, includes);
}
