<template>
    <div id="note-space-body" class="note-space" v-if="noteData">
        <NoteBody :items="noteItems" />
    </div>
</template>

<script>
    import NoteBody from "@/components/NoteComponents/NoteBody";
    import {REST_CONFIG} from "@/configs/rest";
    export default {
        name: "NoteComponent",
        components: {NoteBody},
        props: {
            noteData: Object
        },
        data: () => ({
            noteItems: [],
        }),
        methods: {
            /**
             * Send Ajax Request to get Note-Items
             * Fire at mounted
             */
            retrieveNoteItems() {
                this.$ajax.get(
                    REST_CONFIG.get('NOTE_ITEMS.GET', this.noteData.id)
                ).then(this.afterRetrievedNotes)
            },

            /**
             * After-Ajax-Note-Items - Result-success
             * @param {Array} apiResult
             */
            afterRetrievedNotes(apiResult) {
                this.noteItems = apiResult;
            }
        },
        mounted() {
            this.retrieveNoteItems()
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