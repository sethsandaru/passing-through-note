<template>
    <div>
        <HomeHeroBanner />
        <FeaturesBlock />
    </div>
</template>

<script>
    import HomeHeroBanner from "@/components/HomeComponents/HomeHeroBanner";
    import FeaturesBlock from "@/components/HomeComponents/FeaturesBlock";
    export default {
        name: "HomeComponent",
        components: {FeaturesBlock, HomeHeroBanner},
        mounted() {
            this.$setTitle(
                'Home'//this.__('homeTitle')
            );
        }
    }
</script>

<style scoped>

</style>