/*
 * FetchRequest:Fetch request class
 */
import LocalStorage from "./LocalStorage";
class FetchRequest {
    constructor(baseURL = "/api/v1") {
        this._jwtStorage = new LocalStorage("jwt");
        this._authStorage = new LocalStorage("auth");
        this._baseURL = baseURL;
    }

    _path(endpoint, paramsAndFilter) {
        const getUrlParams = (urlParams) => {
            const paramsObj = {};
            if (urlParams) {
                Object.keys(urlParams).forEach((key) => {
                    if (urlParams[key] === 0 || urlParams[key]) {
                        paramsObj[key] = urlParams[key];
                    }
                });
                return `?${new URLSearchParams({
                    ...paramsObj,
                })}`;
            } else {
                return "";
            }
        };
        const { params } = paramsAndFilter || {};
        const strParams = getUrlParams(params);
        return `${this._baseURL}${endpoint}${strParams}`;
    }

    _saveJwt(headers) {
        const jwtToken = this._jwtStorage.get() || {};
        if (headers.get("refresh-jwt")) {
            jwtToken["refresh-jwt"] = headers.get("refresh-jwt");
        }
        if (headers.get("refresh-token")) {
            jwtToken["refresh-token"] = headers.get("refresh-token");
        }
        this._jwtStorage.save(jwtToken);
    }

    _setHeader(header) {
        const jwtToken = this._jwtStorage.get() || {};
        const authLocalInfo = this._authStorage.get() || null;
        if (authLocalInfo && authLocalInfo.address) {
            header["sso-address"] = authLocalInfo.address;
        }
        if (jwtToken["refresh-jwt"]) {
            header["refresh-jwt"] = jwtToken["refresh-jwt"];
            header.authorization = "Bearer " + jwtToken["refresh-jwt"];
        }
        if (jwtToken["refresh-token"]) {
            header["refresh-token"] = jwtToken["refresh-token"];
        }
        return header;
    }

    request(endpoint, method, params, data = null) {
        return new Promise((resolve) => {
            const goRequest = async () => {
                const headersOptions = {
                    platform: "crayon-elite",
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json, text/plain, */*",
                };

                const requestOptions = {
                    method,
                    headers: this._setHeader(headersOptions),
                };

                if (data) {
                    requestOptions.body = JSON.stringify(data);
                }

                const endpointPath = this._path(endpoint, params);
                const response = await fetch(endpointPath, requestOptions);
                if (response.headers?.get("refresh-jwt")) {
                    this._saveJwt(response.headers);
                }
                const responseData = await response.json();
                if (!response.ok) {
                    if ([401, 403].includes(response.status)) {
                        this._jwtStorage.clear();
                        this._authStorage.clear();
                        window.location = "/login";
                    }
                    const error = responseData || response.statusText;
                    resolve([
                        {
                            code: response.status,
                            ...error,
                        },
                    ]);
                }
                if (responseData.status) {
                    resolve([null, responseData]);
                } else {
                    resolve([
                        {
                            code: responseData.error_reason?.code,
                            message: responseData.message,
                            error_key: responseData.error_reason?.error_key,
                        },
                    ]);
                }
            };
            goRequest();
        });
    }

    async post(endpoint, data, sign = null) {
        return this.request(endpoint, "POST", null, data);
    }

    async put(endpoint, data) {
        return this.request(endpoint, "PUT", null, data);
    }

    async get(endpoint, params) {
        return this.request(endpoint, "GET", params, null);
    }

    async del(endpoint, data = null) {
        return this.request(endpoint, "DELETE", null, data);
    }
}

export default FetchRequest;
