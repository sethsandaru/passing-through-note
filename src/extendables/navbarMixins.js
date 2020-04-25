/**
 * Passing Through Note - Navigation Mixins
 * Use for Navigation Component
 * @author Phat Tran
 */


const MIXINS = {
    props: {
        siteConfig: Object
    },
    methods: {
        /**
         * Get route for router-link
         * @param {string} routeName
         * @param {Object|null} optionalConfig
         */
        getRoute(routeName, optionalConfig = {}) {
            return Object.assign({name: routeName}, optionalConfig)
        }
    }
}

export {
    MIXINS
}