"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    data = {};
    put(key, value) {
        this.data[key] = value;
    }
    get(key) {
        if (this.data[key]) {
            return this.data[key];
        }
        return null;
    }
    clear() {
        this.data = {};
    }
}
exports.default = Cache;
