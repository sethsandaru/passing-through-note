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
 * @param {Object} data
 * @param {Object} options
 * @return {Promise}
 */
const prepareAjax = function (
    method,
    url,
    data = null,
    options = {}
) {
    /**
     * Fetch Basic Configuration
     * @type {RequestInfo}
     */
    const ajaxOptions = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json;charset=utf-8'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };


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
        body: data,
        ...options
    }).then(result => result.json())
        .catch(options.onError || (e => console.error("FetchAPI-Error", e)));
};

/**
 * SEND a POST Request
 * @param url
 * @param data
 * @param options
 * @return {Promise}
 */
AjaxService.post = function (url, data, options = {}) {
    return prepareAjax('POST', url, data, options);
};

/**
 * SEND a GET Request
 * @param url
 * @param data
 * @param options
 * @return {Promise}
 */
AjaxService.get = function (url, data, options = {}) {
    return prepareAjax('GET', url, data, options);
};

/**
 * SEND a PUT Request
 * @param url
 * @param data
 * @param options
 * @return {Promise}
 */
AjaxService.put = function (url, data, options = {}) {
    return prepareAjax('PUT', url, data, options);
};

/**
 * SEND a DELETE Request
 * @param url
 * @param options
 * @return {Promise}
 */
AjaxService.delete = function (url, options = {}) {
    return prepareAjax('DELETE', url, options);
};

export {
    AjaxService
}