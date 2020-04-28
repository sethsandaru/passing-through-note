/**
 * Passing Through Note - Ajax Service Library
 * Simple library to help you to send the HTTP Ajax Request
 * @author Phat Tran
 */
import {REST_CONFIG} from "@/configs/rest";

const AjaxService = {};

/**
 * Prepare ajax
 * @param {string} method
 * @param {string} url
 * @param {Object} options
 * @return {Promise}
 */
const prepareAjax = function (method, url, options = {}) {
    // URL Handling
    // If no https:// => Add base URL of my API
    // If have https => External API => no need to overwrite
    if (url.indexOf("https://") < 0) {
        let appendUrl = REST_CONFIG.BASE_URL;

        if (url.charAt(0) !== '/') {
            appendUrl += "/";
        }

        appendUrl += url;
        url = appendUrl;
    }

    return fetch({
        url,
        method,
        ...options
    }).then(result => result.json());
};

/**
 * SEND a POST Request
 * @param url
 * @param options
 * @return {Promise}
 */
AjaxService.post = function (url, options = {}) {
    return prepareAjax('POST', url, options);
};

/**
 * SEND a GET Request
 * @param url
 * @param options
 * @return {Promise}
 */
AjaxService.get = function (url, options = {}) {
    return prepareAjax('GET', url, options);
};

/**
 * SEND a PUT Request
 * @param url
 * @param options
 * @return {Promise}
 */
AjaxService.get = function (url, options = {}) {
    return prepareAjax('PUT', url, options);
};

/**
 * SEND a DELETE Request
 * @param url
 * @param options
 * @return {Promise}
 */
AjaxService.get = function (url, options = {}) {
    return prepareAjax('DELETE', url, options);
};

export {
    AjaxService
}