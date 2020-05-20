<template>
    <div id="note-space-body" class="note-space" v-if="noteData">
        <div class="note-info-block">
            <div class="row">
                <div class="col-md 6">
                    <h1 v-text="noteData.name"></h1>
                    <p v-text="noteData.description"></p>
                </div>
                <div class="col-md 6 text-right">
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
             * Create new blank note through socket
             */
            createNewBlankNote() {
                this.$socket.emit(SOCKET_EMIT_CONSTANT.NOTE_ITEM.CREATE, {
                    noteSpaceId: this.noteData.id
                })
            },

            /**
             * Socket-After handler of Added New Note Item
             * @param {Object} resultData
             * @param {Object|null} resultData.data
             * @param {Boolean} resultData.status
             */
            afterAddedNote(resultData) {
                if (!resultData.status) {
                    this.$toaster.error("Error while adding a new note item. Please try again.");
                    return
                }

                this.noteItems.push(resultData.data)
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
                for (let i = 0; i < this.items.length; i++) {
                    if (this.noteItems[i].id === id) {
                        this.noteItems.splice(i, 1);
                        return;
                    }
                }
            }
        },
        created() {
            this.$socket.emit(
                SOCKET_EMIT_CONSTANT.NOTE_SPACE.ACCESS,
                {noteSpaceId: this.noteData.id}
            )
        },
        mounted() {
            // this.retrieveNoteItems()
        },
        sockets: {
            noteSpaceJoined: function (data) {
                this.noteItems = data.noteItems || []
            },

            noteItemAdded(data) {
                this.afterAddedNote(data);
            },
        },

        beforeDestroy() {
            // leave room before leave...
            this.$socket.emit(SOCKET_EMIT_CONSTANT.NOTE_SPACE.LEAVE, {
                noteSpaceId: this.noteData.id
            })
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