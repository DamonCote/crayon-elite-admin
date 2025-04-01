/*
 * LocalStorage:Local storage class
 */
import { utilHelper } from "./util";

class LocalStorage {
    constructor(valKey, storageType = "sessionStorage") {
        const storageKey = utilHelper.createStorageKey();
        const localKey = `${valKey}.${storageKey}`;
        this._helper = window[storageType];
        this._key = localKey;
    }

    save(data) {
        this._helper.setItem(
            this._key,
            JSON.stringify(utilHelper.structuredClone(data))
        );
    }

    get() {
        const localData = this._helper.getItem(this._key);
        if (localData && localData !== "") {
            return JSON.parse(localData);
        } else {
            return null;
        }
    }

    getKey() {
        return this._key;
    }

    clear() {
        this._helper.setItem(this._key, "");
    }

    remove() {
        this._helper.removeItem(this._key);
    }
}

export default LocalStorage;
