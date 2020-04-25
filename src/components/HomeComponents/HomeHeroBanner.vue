<template>
    <!-- Full Page Image Header with Vertically Centered Content -->
    <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12 text-center">
                    <h1 class="font-weight-light">Vertically Centered Masthead Content</h1>
                    <p class="lead">A great starter layout for a landing page</p>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: "HomeHeroBanner"
    }
</script>

<style scoped>
    .masthead {
        height: 100vh;
        min-height: 500px;
        background-image: url('../../assets/images/main-banner-home.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>