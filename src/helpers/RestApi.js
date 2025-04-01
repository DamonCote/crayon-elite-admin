/**
 * REST Api Class
 */
import FetchRequest from "./FetchRequest";
class RestApi {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this._fetch = new FetchRequest();
    }

    list(payload) {
        const { filter, orderby, sort, offset, limit } = payload;
        return this._fetch.get(`${this.endpoint}/`, {
            params: { orderby, sort, offset, limit },
            filter,
        });
    }

    create(data) {
        return this._fetch.post(`${this.endpoint}/`, data);
    }

    get(id) {
        return this._fetch.get(`${this.endpoint}/${id}`);
    }

    put(id, data) {
        return this._fetch.put(`${this.endpoint}/${id}`, data);
    }

    del(id, data) {
        return this._fetch.del(`${this.endpoint}/${id}`, data);
    }

    extendPost(id = "", data = null, path = "") {
        const arrayPaths = [this.endpoint];
        if (id !== "") {
            arrayPaths.push(id);
        }
        if (path && path !== "") {
            arrayPaths.push(path);
        }
        if (data && data.id) {
            arrayPaths.push(data.id);
        }

        return this._fetch.post(arrayPaths.join("/"), data);
    }

    /**
     * extend PUT method
     * @param {*} id ID
     * @param {*} data update data
     * @param {*} path api path
     * @returns
     */
    extendPut(id = "", data = null, path = "") {
        const arrayPaths = [this.endpoint];
        if (id !== "") {
            arrayPaths.push(id);
        }
        if (path && path !== "") {
            arrayPaths.push(path);
        }
        if (data && data.id) {
            arrayPaths.push(data.id);
        }

        return this._fetch.put(arrayPaths.join("/"), data);
    }

    extendGet(id = "", path = "", params = null) {
        const arrayPaths = [this.endpoint];
        if (id !== "") {
            arrayPaths.push(id);
        }
        if (path && path !== "") {
            arrayPaths.push(path);
        }
        return this._fetch.get(arrayPaths.join("/"), {
            params,
        });
    }

    extendGetBuffer(id = "", path = "", params = null) {
        const arrayPaths = [this.endpoint];
        if (id !== "") {
            arrayPaths.push(id);
        }
        if (path && path !== "") {
            arrayPaths.push(path);
        }

        return this._fetch.get(arrayPaths.join("/"), {
            params,
            responseType: "arraybuffer",
        });
    }
}

export default RestApi;
