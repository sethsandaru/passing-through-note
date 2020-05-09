<template>
    <div id="app" @click="globalBodyClick">
        <Navigation :type="navbarType"></Navigation>

        <transition :name="transitionName">
            <router-view></router-view>
        </transition>

        <footer class="page-footer font-small indigo">
            <!-- Copyright -->
            <div class="footer-copyright text-center py-3">
                <p>© 2020 By Seth Phat aka Phat Tran Minh</p>
            </div>
            <!-- Copyright -->
        </footer>

        <div class="loading" style='display: none;'></div>
    </div>
</template>

<script>
    import Navigation from "./views/Navigation";
    import {NAV_TYPES} from "@/configs";
    import {HOOKS} from "@/libraries/PathInternalHook";

    export default {
        components: {Navigation},
        data() {
            return {
                transitionName: "fade",
                navbarType: NAV_TYPES.NORMAL_VIEW
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

                if (to.path.indexOf('/note/') >= 0) {
                    this.navbarType = NAV_TYPES.NOTE_VIEW
                }
            }
        },
        methods: {
            /**
             * HOOKING ROCKING HOPPER
             * @param {Event} e
             */
            globalBodyClick(e) {
                HOOKS.GLOBAL_BODY_CLICK.run(this, e, this.$el)
            }
        }
    }
</script>

<style scoped>
    .indigo {
        background-color: #27ae60 !important;
    }

    .footer-copyright {
        overflow: hidden;
        color: rgba(255,255,255,0.6);
        background-color: rgba(0,0,0,0.2);
    }
</style>