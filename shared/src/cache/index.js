"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = /** @class */ (function () {
    function Cache() {
        this.data = {};
    }
    Cache.prototype.put = function (key, value) {
        this.data[key] = value;
    };
    Cache.prototype.get = function (key) {
        if (this.data[key]) {
            return this.data[key];
        }
        return null;
    };
    Cache.prototype.clear = function () {
        this.data = {};
    };
    return Cache;
}());
exports.default = Cache;
