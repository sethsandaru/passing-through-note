<template>
    <nav class="navbar navbar-expand-lg navbar-dark nav-note-bg">
        <router-link :to="getRoute('home')"
                     class="navbar-brand"
                     v-text="siteConfig.SITE_NAME">
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavHomePage" aria-controls="navbarNavHomePage" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavHomePage">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Your Note <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">This item is coming soon</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {MIXINS as NAVIGATION_MIXINS} from "@/extendables/navbarMixins";

    export default {
        name: "NoteNavigation",
        mixins: [NAVIGATION_MIXINS]

    }
</script>

<style scoped>
    .nav-note-bg {
        background-color: #2ecc71;
    }
</style>