export default class NavigationItem {
    routeName = "";
    configData = {};
    label = "";

    /**
     * Initialize nav item method
     * @param {string} routeName
     * @param {string} label
     * @param {object} optionalData
     */
    constructor(routeName, label, optionalData = {}) {
        this.routeName = routeName;
        this.configData = optionalData;
        this.label = label;
    }

    /**
     * Get Route Link For router-link
     * @returns {object}
     */
    getRouteLink() {
        return {
            name: this.routeName,
            ...this.configData
        }
    }

}