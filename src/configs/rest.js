/********************************
 * Navigation RestFul API Configuration - Merging...
 * @author Phat Tran <phattranminh96@gmail.com>
 ********************************/
import DEV_REST from './rest.dev'
import PROD_REST from './rest.prod'

/**
 *
 * @type {{BASE_URL: string}}
 */
const REST_CONFIG = {
    BASE_URL: "",
    DEBUG: false,

    PATH: {
        NOTE_SPACE: {
            CREATE: "/note-space/create",
            AVAILABILITY: "/note-space/availability/{0}",
            VERIFY: "/note-space/verify-passwor",
        },
        NOTE_ITEMS: {
            GET: "/note-items/list/{0}",
            UPDATE: "/note-items/update/{0}",
            CREATE_BLANK: "/note-items/create?note-space-id={0}"
        }
    },

    /**
     * Get config value
     * @param path
     * @param {array|string} replaceKey
     */
    get(path, replaceKey) {
        // Replace [] notation with dot notation
        path = path.replace(/\[["'`](.*)["'`]\]/g,".$1")

        /**
         * @var {string} apiPath
         */
        let apiPath = path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : undefined
        }, REST_CONFIG.PATH || self);

        // replace key or not??
        if (apiPath && replaceKey) {
            if (!replaceKey.forEach) {
                replaceKey = [replaceKey];
            }

            replaceKey.forEach((itemData, index) => apiPath = apiPath.replace(`{${index}}`, itemData));
        }

        return apiPath;
    }
};

if (process.env.NODE_ENV === 'development') {
    Object.assign(REST_CONFIG, DEV_REST)
} else {
    Object.assign(REST_CONFIG, PROD_REST)
}

export{
    REST_CONFIG
}