<template>
    <div id="app">
        <Navigation></Navigation>

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
    </div>
</template>

<script>
    import Navigation from "./views/Navigation";

    export default {
        components: {Navigation},
        data() {
            return {
                transitionName: "fade"
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>

<style scoped>
    .indigo {
        background-color: #3f51b5 !important;
    }

    .footer-copyright {
        overflow: hidden;
        color: rgba(255,255,255,0.6);
        background-color: rgba(0,0,0,0.2);
    }
</style>