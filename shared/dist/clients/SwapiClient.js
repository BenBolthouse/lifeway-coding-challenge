"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapiClient = void 0;
var models_1 = require("../models");
var SwapiClient = /** @class */ (function () {
    /**
     * Client for retrieving and consolidating data from the Star Wars API (Swapi).
     * Create a singleton instance of this for your project. Optionally accepts a
     * cache instance to cache responses.
     */
    function SwapiClient(configuration, logger, cache) {
        this.baseUrl = configuration.swapiBaseUrl;
        this.logger = logger;
        this.cache = cache;
    }
    SwapiClient.prototype.getResource = function (resourceType, resourceId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, uri, meta;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        uri = (typeof resourceId === "string") ? resourceId : "".concat(this.baseUrl, "/").concat(resourceType, "/").concat(resourceId, "/");
                        meta = { caching: !!this.cache, uri: uri, };
                        if (this.cache) {
                            result = this.cache.get(uri);
                        }
                        if (result) {
                            this.logger.debug("Found resource ".concat(uri, " from cache lookup."), meta);
                            return [2 /*return*/, result];
                        }
                        this.logger.debug("Requesting ".concat(uri, "..."), meta);
                        return [4 /*yield*/, fetch(uri, {
                                method: "GET",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                },
                            })
                                .then(function (response) { return response.ok ? response.json() : null; })
                                .then(function (result) {
                                if (!result) {
                                    _this.logger.debug("Resource ".concat(uri, " does not exist."), meta);
                                    return null;
                                }
                                _this.logger.debug("Resolved ".concat(uri, "."), meta);
                                if (_this.cache) {
                                    _this.logger.error("Caching resolved resource ".concat(uri, "."), meta);
                                    _this.cache.put(result.url, result);
                                }
                                return result;
                            })
                                .catch(function () {
                                _this.logger.error("Request to Swapi API failed.", meta);
                                return null;
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SwapiClient.prototype.searchResources = function (resourceType, searchTerm) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, meta;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "".concat(this.baseUrl, "/").concat(resourceType, "/?search=").concat(searchTerm);
                        meta = { caching: !!this.cache, uri: uri, };
                        this.logger.debug("Requesting ".concat(uri, "..."), meta);
                        return [4 /*yield*/, fetch(uri, {
                                method: "GET",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                },
                            })
                                .then(function (response) { return response.json().then(function (page) { return page.results; }); })
                                .then(function (results) {
                                _this.logger.debug("Resolved with ".concat(results.length, " search results."), meta);
                                if (_this.cache) {
                                    _this.logger.error("Caching ".concat(results.length, " resolved resources."), meta);
                                    results.forEach(function (result) { return _this.cache.put(result.url, result); });
                                }
                                return results;
                            })
                                .catch(function () {
                                _this.logger.error("Request to Swapi API failed.", meta);
                                return [];
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets a person by a numerical ID or a Swapi resource URL.
     *
     * @param personId The ID of the person to get.
     * @param includes The related resources to include in the response.
     * @returns A person object or null if not found.
     */
    SwapiClient.prototype.getPerson = function (personId, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var resource, person, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.getResource(models_1.Swapi.ResourceType.People, personId)];
                    case 1:
                        resource = _d.sent();
                        if (!resource)
                            return [2 /*return*/, null];
                        person = models_1.Mapping.personFromResource(resource);
                        if (!(includes !== undefined && includes !== false && includes !== true)) return [3 /*break*/, 7];
                        if (!includes.films) return [3 /*break*/, 3];
                        _a = person;
                        return [4 /*yield*/, this.getFilms(resource.films, includes.films)];
                    case 2:
                        _a.films = _d.sent();
                        _d.label = 3;
                    case 3:
                        if (!includes.starships) return [3 /*break*/, 5];
                        _b = person;
                        return [4 /*yield*/, this.getStarships(resource.starships, includes.starships)];
                    case 4:
                        _b.starships = _d.sent();
                        _d.label = 5;
                    case 5:
                        if (!includes.species) return [3 /*break*/, 7];
                        _c = person;
                        return [4 /*yield*/, this.getSpecies(resource.species, includes.species)];
                    case 6:
                        _c.species = _d.sent();
                        _d.label = 7;
                    case 7: return [2 /*return*/, person];
                }
            });
        });
    };
    SwapiClient.prototype.getPeople = function (personIds, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, people;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        personIds.forEach(function (personId) { return promises.push(_this.getPerson(personId, includes)); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        people = (_a.sent()).filter(function (person) { return person !== null; });
                        return [2 /*return*/, people];
                }
            });
        });
    };
    SwapiClient.prototype.searchPeople = function (searchTerm, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var resources, people, _i, resources_1, resource, person, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.searchResources(models_1.Swapi.ResourceType.People, searchTerm)];
                    case 1:
                        resources = _c.sent();
                        people = [];
                        _i = 0, resources_1 = resources;
                        _c.label = 2;
                    case 2:
                        if (!(_i < resources_1.length)) return [3 /*break*/, 8];
                        resource = resources_1[_i];
                        person = models_1.Mapping.personFromResource(resource);
                        if (!(includes !== undefined && includes !== true && includes !== false)) return [3 /*break*/, 6];
                        if (!includes.films) return [3 /*break*/, 4];
                        _a = person;
                        return [4 /*yield*/, this.getFilms(resource.films, includes.films)];
                    case 3:
                        _a.films = _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!includes.starships) return [3 /*break*/, 6];
                        _b = person;
                        return [4 /*yield*/, this.getStarships(resource.starships, includes.starships)];
                    case 5:
                        _b.starships = _c.sent();
                        _c.label = 6;
                    case 6:
                        people.push(person);
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, people];
                }
            });
        });
    };
    SwapiClient.prototype.getStarship = function (starshipId, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var resource, starship, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getResource(models_1.Swapi.ResourceType.Starship, starshipId)];
                    case 1:
                        resource = _b.sent();
                        if (!resource)
                            return [2 /*return*/, null];
                        starship = models_1.Mapping.starshipFromResource(resource);
                        if (!(includes !== undefined && includes !== true && includes !== false)) return [3 /*break*/, 3];
                        if (!includes.pilots) return [3 /*break*/, 3];
                        _a = starship;
                        return [4 /*yield*/, this.getPeople(resource.pilots, includes.pilots)];
                    case 2:
                        _a.pilots = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, starship];
                }
            });
        });
    };
    SwapiClient.prototype.getStarships = function (starshipIds, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, starships;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        starshipIds.forEach(function (starshipId) { return promises.push(_this.getStarship(starshipId, includes)); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        starships = (_a.sent()).filter(function (starship) { return starship !== null; });
                        return [2 /*return*/, starships];
                }
            });
        });
    };
    SwapiClient.prototype.getFilm = function (filmId, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var resource, film, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getResource(models_1.Swapi.ResourceType.Film, filmId)];
                    case 1:
                        resource = _c.sent();
                        if (!resource)
                            return [2 /*return*/, null];
                        film = models_1.Mapping.filmFromResource(resource);
                        if (!(includes !== undefined && includes !== true && includes !== false)) return [3 /*break*/, 5];
                        if (!includes.characters) return [3 /*break*/, 3];
                        _a = film;
                        return [4 /*yield*/, this.getPeople(resource.characters, includes.characters)];
                    case 2:
                        _a.characters = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!includes.starships) return [3 /*break*/, 5];
                        _b = film;
                        return [4 /*yield*/, this.getStarships(resource.starships, includes.starships)];
                    case 4:
                        _b.starships = _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/, film];
                }
            });
        });
    };
    SwapiClient.prototype.getFilms = function (filmIds, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, films;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        filmIds.forEach(function (filmId) { return promises.push(_this.getFilm(filmId, includes)); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        films = (_a.sent()).filter(function (film) { return film !== null; });
                        return [2 /*return*/, films];
                }
            });
        });
    };
    SwapiClient.prototype.getSpecie = function (speciesId, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var resource, species, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getResource(models_1.Swapi.ResourceType.Species, speciesId)];
                    case 1:
                        resource = _c.sent();
                        if (!resource)
                            return [2 /*return*/, null];
                        species = models_1.Mapping.specieFromResource(resource);
                        if (!(includes !== undefined && includes !== false && includes !== true)) return [3 /*break*/, 5];
                        if (!includes.films) return [3 /*break*/, 3];
                        _a = species;
                        return [4 /*yield*/, this.getFilms(resource.films, includes.films)];
                    case 2:
                        _a.films = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!includes.people) return [3 /*break*/, 5];
                        _b = species;
                        return [4 /*yield*/, this.getPeople(resource.people, includes.people)];
                    case 4:
                        _b.people = _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/, species];
                }
            });
        });
    };
    SwapiClient.prototype.getSpecies = function (speciesIds, includes) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, species;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        speciesIds.forEach(function (speciesId) { return promises.push(_this.getSpecie(speciesId, includes)); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        species = (_a.sent()).filter(function (species) { return species !== null; });
                        return [2 /*return*/, species];
                }
            });
        });
    };
    return SwapiClient;
}());
exports.SwapiClient = SwapiClient;
