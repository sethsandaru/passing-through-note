<template>
    <div>
        <HomeNavigation v-if="type === navTypes.NORMAL_VIEW"
                        :site-config="siteConfigs"></HomeNavigation>
        <NoteNavigation v-if="type === navTypes.NOTE_VIEW"
                        :site-config="siteConfigs"></NoteNavigation>
    </div>
</template>

<script>
    import {NAV_TYPES, SITE_CONFIGS} from "@/configs";
    import HomeNavigation from "./partials/HomeNavigation";
    import NoteNavigation from "./partials/NoteNavigation";

    export default {
        name: "Navigation",
        components: {NoteNavigation, HomeNavigation},
        props: {
            type: {
                type: Number,
                default: NAV_TYPES.NORMAL_VIEW
            }
        },
        computed: {
            navTypes() {
                return NAV_TYPES;
            },
            siteConfigs() {
                return SITE_CONFIGS;
            }
        },
    }
</script>

<style scoped>

</style>