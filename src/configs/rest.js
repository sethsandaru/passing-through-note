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
    BASE_URL: ""
};

if (process.env.NODE_ENV === 'development') {
    Object.assign(REST_CONFIG, DEV_REST)
} else {
    Object.assign(REST_CONFIG, PROD_REST)
}

export{
    REST_CONFIG
}