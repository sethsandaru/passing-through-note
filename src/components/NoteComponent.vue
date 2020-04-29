<template>
    <div id="note-space-body" class="note-space" v-if="noteData">
        <NoteBody />
    </div>
</template>

<script>
    import NoteBody from "@/components/NoteComponents/NoteBody";
    export default {
        name: "NoteComponent",
        components: {NoteBody},
        props: {
            noteData: Object
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .note-space {
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }
</style>