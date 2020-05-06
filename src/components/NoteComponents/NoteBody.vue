<template>
    <div class="note-body">

    </div>
</template>

<script>
    export default {
        name: "NoteBody",
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .note-body {
        display: flex;
        flex: 1;
        position: relative;
    }
</style>