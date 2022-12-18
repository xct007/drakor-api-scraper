/**
 * Get latest update/ongoing drakor
 * @param {Number} limit
 **/
export declare const latest: (limit?: number) => Promise<object | boolean>;
/**
 * Search drakor
 * @param {String} query
 *
 **/
export declare const search: (query: string) => Promise<object>;
/**
 * Get drakor detail, eg. title, description, rating, etc.
 * @param {Number} id
 **/
export declare const detail: (id: number) => Promise<object | boolean>;
declare const drakor: {
    latest: (limit?: number) => Promise<object | boolean>;
    search: (query: string) => Promise<object>;
    detail: (id: number) => Promise<object | boolean>;
};
export default drakor;
//# sourceMappingURL=index.d.ts.map