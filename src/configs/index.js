/********************************
 * Main configuration file
 * @author Phat Tran <phattranminh96@gmail.com>
 * @description This file is contains the most basic configuration for the project
 ********************************/

const SITE_CONFIGS = {
    SITE_NAME: "PaTh Note",

    STORAGE_TYPE: sessionStorage,
    FAILED_TIMES_SHOW_CAPTCHA: 3,
}

const NAV_TYPES = {
    NORMAL_VIEW: 1,
    NOTE_VIEW: 2,
}

const SUPPORTED_LANGUAGES = [
    'en',
    'vi'
]

const DEFAULT_LANGUAGE = 'en'

export {
    SITE_CONFIGS, NAV_TYPES,

    // languages
    SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE
}