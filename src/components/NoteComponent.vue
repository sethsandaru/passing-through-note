<template>
    <div id="note-space-body" class="note-space" v-if="noteData">
        <div class="note-info-block">
            <h1 v-text="noteData.name"></h1>
            <p v-text="noteData.description"></p>

            <hr>
        </div>

        <NoteBody :items="noteItems" />
    </div>
</template>

<script>
    import NoteBody from "@/components/NoteComponents/NoteBody";
    import {REST_CONFIG} from "@/configs/rest";

    /**
     * @property {NoteSpacePermissionResultInterface} noteData
     */
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
        created() {
              
        },
        mounted() {
            this.retrieveNoteItems()
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },

            noteSpaceJoined: function () {
                console.log('JOINED ROOM')
            },
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
        background-color: #FAACA8;
        background-image: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);
    }

    h1 {
        padding-left: 0;
    }
</style>