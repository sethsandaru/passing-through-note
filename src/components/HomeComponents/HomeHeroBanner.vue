<template>
    <!-- Full Page Image Header with Vertically Centered Content -->
    <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12 text-center">
                    <h1 class="font-weight-light">Passing Through Note</h1>
                    <p class="lead">
                        Visit, Note, Leave. Repeats. <br />
                        That's why Passing-Through-Note is the best for you.
                    </p>

                    <button class="btn btn-lg btn-success mt-4">
                        Find out our Features
                    </button>
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

    .masthead h1 {
        font-weight: bolder;
        font-size: 60px;
        color: #2ecc71;
        padding: 20px;
    }
</style>