"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchPeople = exports.useGetPerson = exports.useSearchResources = exports.useGetResource = void 0;
var react_1 = require("react");
var Base_1 = require("../models/swapi/Base");
/**
 * Not a publicly accessible function. Exported for internal uses.
 */
function useGetResource(resourceType, includes) {
    var baseUrl = process.env.REACT_APP_API_BASE_URL;
    var _a = (0, react_1.useState)(false), pending = _a[0], setPending = _a[1];
    var _b = (0, react_1.useState)(false), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(null), data = _c[0], setData = _c[1];
    var abortController = (0, react_1.useState)(new AbortController())[0];
    function execute(id) {
        // Kill any existing fetches.
        abortController.abort();
        setPending(true);
        var body = {
            includes: includes,
        };
        fetch("".concat(baseUrl, "/api/").concat(resourceType, "/").concat(id, "/"), {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            signal: abortController.signal,
        })
            .then(function (result) {
            setData(result.json());
            setError(false);
        })
            .catch(function () {
            setData(null);
            setError(true);
        })
            .finally(function () {
            setPending(false);
        });
    }
    return [
        execute,
        pending,
        error,
        data,
    ];
}
exports.useGetResource = useGetResource;
/**
 * Not a publicly accessible function. Exported for internal uses.
 */
function useSearchResources(resourceType, includes) {
    var baseUrl = process.env.REACT_APP_API_BASE_URL;
    var _a = (0, react_1.useState)(false), pending = _a[0], setPending = _a[1];
    var _b = (0, react_1.useState)(false), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(null), data = _c[0], setData = _c[1];
    var abortController = (0, react_1.useState)(new AbortController())[0];
    function execute(searchTerm) {
        // Kill any existing fetches.
        abortController.abort();
        setPending(true);
        var body = {
            includes: includes,
            search: searchTerm,
        };
        fetch("".concat(baseUrl, "/api/").concat(resourceType, "/search/"), {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            signal: abortController.signal,
        })
            .then(function (result) {
            setData(result.json());
            setError(false);
        })
            .catch(function () {
            setData(null);
            setError(true);
        })
            .finally(function () {
            setPending(false);
        });
    }
    return [
        execute,
        pending,
        error,
        data,
    ];
}
exports.useSearchResources = useSearchResources;
/**
   * Returns a function to retrieve a person resource by ID and any included
   * related resources.
   *
   * @param includes Includes object to model the response.
   */
function useGetPerson(includes) {
    return useGetResource(Base_1.ResourceType.People, includes);
}
exports.useGetPerson = useGetPerson;
/**
 * Returns a function to search for people resources by name and any included
 * related resources.
 *
 * @param includes Includes object to model the response.
 */
function useSearchPeople(includes) {
    return useSearchResources(Base_1.ResourceType.People, includes);
}
exports.useSearchPeople = useSearchPeople;
