"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.search = exports.latest = void 0;
const axios_1 = __importDefault(require("axios"));
const API_ENDPOINT_LATEST = 'https://wincamp.web.id/drakor/phalcon/api/get_category_ongoing_drakor/v1';
const API_ENDPOINT_SEARCH = 'https://wincamp.web.id/drakor/phalcon/api/search_category_collection/v1';
const API_ENDPOINT_CATEGORY = 'https://wincamp.web.id/drakor/phalcon/api/get_category_posts_drakor/v1';
const API_ENDPOINT_CHANNEL = 'https://wincamp.web.id/drakor/phalcon/api/get_post_description_drakor/v1';
/**
 * Get latest update/ongoing drakor
 * @param {Number} limit
 **/
const latest = async (limit) => {
    let Params = new URLSearchParams();
    Params.append('page', 1);
    Params.append('count', limit ? limit : 10);
    Params.append('isAPKvalid', true);
    const { data } = await axios_1.default.request({
        url: API_ENDPOINT_LATEST,
        method: 'POST',
        headers: {
            'Data-Agent': 'Drakor ID v1.4',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'okhttp/3.10.0',
        },
        data: Params,
    });
    if (data.status == 'ok' && data.categories.length) {
        return data;
    }
    else {
        return false;
    }
};
exports.latest = latest;
/**
 * Search drakor
 * @param {String} query
 *
 **/
const search = async (query) => {
    let result;
    let Params = new URLSearchParams();
    Params.append('pilihan', 'Serial Drama');
    Params.append('search', query);
    Params.append('page', 1);
    Params.append('count', 20);
    Params.append('isAPKvalid', true);
    const { data } = await axios_1.default.request({
        url: API_ENDPOINT_SEARCH,
        method: 'POST',
        headers: {
            'Data-Agent': 'Drakor ID v1.4',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'okhttp/3.10.0',
        },
        data: Params,
    });
    if (data.status == 'ok' && data.categories.length) {
        result = {
            found: true,
            ...data,
        };
    }
    else {
        result = {
            found: false,
            status: false,
        };
    }
    return result;
};
exports.search = search;
/**
 * Get drakor detail, eg. title, description, rating, etc.
 * @param {Number} id
 **/
const detail = async (id) => {
    let result;
    let Params = new URLSearchParams();
    Params.append('id', id);
    Params.append('page', 1);
    Params.append('count', 20);
    Params.append('isAPKvalid', true);
    const { data } = await axios_1.default.request({
        url: API_ENDPOINT_CATEGORY,
        method: 'POST',
        headers: {
            'Data-Agent': 'Drakor ID v1.4',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'okhttp/3.10.0',
        },
        data: Params,
    });
    if (data.status == 'ok' && data.posts.length) {
        result = data;
    }
    else {
        try {
            Params.delete('id');
            Params.delete('page');
            Params.delete('count');
            Params.delete('isAPKvalid');
            Params.append('channel_id', id);
            Params.append('isAPKvalid', true);
            const _data = await axios_1.default.request({
                url: API_ENDPOINT_CHANNEL,
                method: 'POST',
                headers: {
                    'Data-Agent': 'Drakor ID v1.4',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'okhttp/3.10.0',
                },
                data: Params,
            });
            if (_data.data.status == 'ok' && _data.data.channel_id == id) {
                result = _data.data;
            }
            else {
                result = false;
            }
        }
        catch (e) {
            result = false;
        }
    }
    return result;
};
exports.detail = detail;
const drakor = {
    latest: exports.latest,
    search: exports.search,
    detail: exports.detail,
};
exports.default = drakor;
//# sourceMappingURL=index.js.map