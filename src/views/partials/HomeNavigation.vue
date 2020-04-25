<template>
    <nav class="navbar navbar-expand-lg navbar-dark nav-home-bg">
        <router-link :to="getRoute('home')"
                     class="navbar-brand"
                     v-text="siteConfig.SITE_NAME">
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHomeNav" aria-controls="navbarHomeNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarHomeNav">
            <ul class="navbar-nav">
                <li class="nav-item"
                    v-for="(navItem, index) in navItems"
                    :class="{'active': isCurrent(index)}">
                    <router-link class="nav-link" :to="navItem.getRouteLink()">
                        {{navItem.label}}
                        <span class="sr-only" v-if="isCurrent(index)">(current)</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {MIXINS as NAVIGATION_MIXINS} from "@/extendables/navbarMixins";
    import {HOME_NAV_ITEMS} from "@/configs/navigation";

    export default {
        name: "HomeNavigation",
        mixins: [NAVIGATION_MIXINS],
        data: () => ({
            currentItem: 0
        }),
        methods: {
            isCurrent(index) {
                return index === this.currentItem;
            }
        },
        computed: {
            navItems() {
                return HOME_NAV_ITEMS;
            }
        }
    }
</script>

<style scoped>
    .nav-home-bg {
        background-color: #16a085;
    }
</style>