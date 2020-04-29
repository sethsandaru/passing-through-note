/**
 * Passing Through Note - Topbar Plugin
 * @author Phat Tran
 */

const TopBarPlugin = {
    install(Vue, options) {
        import('@/assets/3rdparty/js/topbar.min')
        Vue.prototype.$topbar = window.topbar
    }
}

export {
    TopBarPlugin
}