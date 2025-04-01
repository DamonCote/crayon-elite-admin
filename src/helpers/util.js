import { cloneDeep, round, upperFirst, defaultsDeep } from "lodash";
import { customAlphabet } from "nanoid";
import { DateTime } from "luxon";

const utilHelper = (() => {
    const ucFirst = (str) => {
        return upperFirst(str);
    };
    const deepUpdateObj = (oldObj, newObj) => {
        return defaultsDeep(newObj, oldObj);
    };
    const structuredClone = (obj) => {
        return cloneDeep(obj);
    };

    const getStyle = (attrs) => {
        const { width, align, maxWidth, minWidth } = attrs;
        const arrayStyles = [];
        if (width) {
            arrayStyles.push(`width:${width}px`);
        }
        if (maxWidth) {
            arrayStyles.push(`max-width:${maxWidth}px`);
        }
        if (minWidth) {
            arrayStyles.push(`min-width:${minWidth}px`);
        }
        if (align) {
            arrayStyles.push(`text-align:${align}`);
        }
        return arrayStyles.join(";");
    };

    const convertToUtc = (timestamp, format = "yyyy-MM-dd HH:mm") => {
        return DateTime.fromISO(
            DateTime.fromSeconds(toFloor(timestamp, 0)).toLocal()
        ).toFormat(format);
    };

    const convertToUnixFromISO = (strISOTime) => {
        return DateTime.fromISO(strISOTime).toLocal().toUnixInteger();
    };

    const getNow = (format = "yyyy-MM-dd HH:mm:ss") => {
        return convertToUtc(DateTime.now().toUnixInteger(format));
    };

    const getNowTimestamp = () => {
        return DateTime.now().toUnixInteger();
    };

    const convertStrDate = (strTime, format = "yyyy-MM-dd HH:mm") => {
        return DateTime.fromISO(strTime).toFormat(format);
    };

    const isNumber = (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };

    /**
     * @param {*} index
     * @returns
     */
    const createPrimaryId = (index = 1) => {
        const createID = customAlphabet(
            "abcdefghijklmnopq123456789ABCDEFGHIJKLMOPQ",
            8 + index
        );
        return createID();
    };

    const objEach = (obj, callback) => {
        Object.keys(obj).forEach((key) => callback(obj[key], key, obj));
    };
    const toFloor = (val, precision) => {
        return round(val, precision);
    };

    const createStorageKey = () => {
        const appHost = window.location.hostname;
        const hostNames = appHost.split(".");
        hostNames.length = 2;
        return hostNames.join(".");
    };

    const getCurrentPath = (router) => {
        const currentRoute = router.currentRoute.value;
        const query = currentRoute.query;
        return {
            name: currentRoute.name || "",
            title: currentRoute.meta.title,
            params: currentRoute.params,
            query,
        };
    };

    return {
        structuredClone,
        createStorageKey,
        createPrimaryId,
        objEach,
        toFloor,
        convertToUtc,
        convertStrDate,
        getNow,
        getNowTimestamp,
        ucFirst,
        getCurrentPath,
        getStyle,
        deepUpdateObj,
        convertToUnixFromISO,
        isNumber,
    };
})();

const dataFilters = {
    utcTime: (value, format = "yyyy-MM-dd HH:mm") => {
        return utilHelper.convertToUtc(value, format);
    },
    convertStrDate: (value) => {
        return utilHelper.convertStrDate(value);
    },
    datetime: (value, defaultVal = "--") =>
        value > 0 ? utilHelper.convertToUtc(value) : defaultVal,
    emptyVal: (value, defaultVal = "--") => value || defaultVal,
    arrayToStr: (value) => value.join(","),
};

export { utilHelper, dataFilters };
