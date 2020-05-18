/**
 * Passing Through Note - Ajax Service Library
 * Simple library to help you to send the HTTP Ajax Request
 * @author Phat Tran
 */
import {REST_CONFIG} from "@/configs/rest";
import {hideLoading, showLoading} from "@/extendables/loading-plugin";

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
        showLoading: true
    };
    Object.assign(ajaxOptions, options);


    // URL Handling
    // If no https:// => Add base URL of my API
    // If have https => External API => no need to overwrite
    let modifiedURL = url;
    if (url.indexOf("http://") < 0) {
        let appendUrl = REST_CONFIG.BASE_URL;

        if (url.charAt(0) !== '/') {
            appendUrl += "/";
        }

        appendUrl += url;
        modifiedURL = appendUrl;
    }

    // automatically show loading before send AjaxRequest
    if (options.showLoading) {
        showLoading()
    }

    if (method !== "GET") {
        ajaxOptions.body = data;
    }

    return fetch(modifiedURL, {
        method,
        ...ajaxOptions
    }).then(response => {
        hideLoading();

        if (response.status === 200) { // Or what ever you want to check
            return Promise.resolve(response.json()); // This will end up in SUCCESS part
        }

        return Promise.resolve(response.json()).then((responseInJson) => {
            return Promise.reject(responseInJson.message);
        });
    }).catch(
        ajaxOptions.onError || (e => {
            console.error("FetchAPI-Error", e)
        })
    );
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