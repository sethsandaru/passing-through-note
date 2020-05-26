<template>
    <div id="note-space-body" class="note-space" v-if="noteData">
        <div class="note-info-block">
            <div class="row mr-0">
                <div class="col-md-6">
                    <h1 v-text="noteData.name"></h1>
                    <p v-text="noteData.description"></p>
                </div>
                <div class="col-md-6 text-right">
                    <button class="btn btn-primary" @click="createNewBlankNote">
                        + Note Item
                    </button>
                </div>
            </div>

            <hr>
        </div>

        <NoteBody :items="noteItems"
                  @change="updatedNoteItem"
                  @delete="deletedNoteItem" />
    </div>
</template>

<script>
    import NoteBody from "@/components/NoteComponents/NoteBody";
    import {REST_CONFIG} from "@/configs/rest";
    import {SOCKET_EMIT_CONSTANT} from "@/configs/socket-contant";
    import {NOTE_COMPONENT_SOCKET_MIXIN} from "@/extendables/traits/note-component/note-component-sockets";

    /**
     * @property {NoteSpacePermissionResultInterface} noteData
     */
    export default {
        name: "NoteComponent",
        components: {NoteBody},
        props: {
            noteData: Object
        },
        mixins: [NOTE_COMPONENT_SOCKET_MIXIN],
        data: () => ({
            noteItems: [],
        }),
        methods: {
            /**
             * Create new blank note through socket
             */
            createNewBlankNote() {
                // I've been thinking and I think this is the best way
                // I need to create a new note via RestAPI
                // then if its success => I only need to notify the listener(s) (Websocket)
                // with this way, data is 100% integrity
                this.$ajax.post(
                    REST_CONFIG.get('NOTE_ITEMS.CREATE_BLANK', [this.noteData.id]),
                    undefined,
                    {
                        onError: this.errorWhileCreatingBlankNote
                    }
                ).then(this.afterCreatedBlankNote)
            },

            /**
             * After added a new note-item (blank) by using restAPI
             * @param {NoteItemEntity} resultData
             */
            afterCreatedBlankNote(resultData) {
                this.$socket.emit(SOCKET_EMIT_CONSTANT.NOTE_ITEM.CREATED, resultData)
                this.noteItems.push(resultData)
            },

            errorWhileCreatingBlankNote() {
                // Show error for fun obviously =))
                this.$toaster.error("Failed to update your note. Please try again.")
            },

            /**
             * Emitting from Children - To update Note-Item
             * @param index
             * @param noteData
             */
            updatedNoteItem(index, noteData) {
                this.$set(this.noteItems, index, noteData);
            },

            /**
             * Emitting from Children - To delete Note-Item
             * @param {Number} id Note-Item-ID
             */
            deletedNoteItem(id) {
                // lol remove by id @@
                for (let i = 0; i < this.noteItems.length; i++) {
                    if (this.noteItems[i].id === id) {
                        this.noteItems.splice(i, 1);
                        return;
                    }
                }
            }
        },

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