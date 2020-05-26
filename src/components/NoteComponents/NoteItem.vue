<template>
    <div class="note-item" :style="noteItemStyles">
        <div class="note-toolbox" contenteditable="false">
            <div class="float-left">
                <span class="toolbox-item drag-item"
                      v-html="getIcon('arrow-both')">
                </span>
            </div>

            <div class="text-right">
                <span class="toolbox-item"
                      v-html="getIcon('list-unordered')"
                      @click="showOptions"></span>

                <span class="toolbox-item"
                      v-html="getIcon('trashcan')"
                      @click="deleteNoteItem"></span>
            </div>
        </div>

        <NoteItemHeaderControl :headline="value.headline"
                               v-model="value.headline"
                               @updateHeadline="submitChanges" />
        <NoteContentControl class="content"
                            v-model="value.content"
                            :note-item-height="value.height"
                            @updateContent="submitChanges" />

        <NoteItemOptionList @dropdown="afterOptionCreated" />

    </div>
</template>

<script>
    import $ from 'jquery'
    import draggable from 'jquery-ui/ui/widgets/draggable'
    import resizable from 'jquery-ui/ui/widgets/resizable'
    import {OctIconFactory} from "@/libraries/OctIcon";
    import {NOTE_ITEM_COLORS} from "@/configs/note-item-color";
    import NoteItemHeaderControl from "@/components/NoteComponents/NoteItemHeaderControl";
    import {REST_CONFIG} from "@/configs/rest";
    import {SOCKET_EMIT_CONSTANT} from "@/configs/socket-contant";
    import NoteContentControl from "@/components/NoteComponents/NoteContentControl";
    import NoteItemOptionList from "@/components/NoteComponents/NoteItemOptionList";

    /**
     * Model properties
     * @property {Object} value
     * @property {Number} value.id
     * @property {Number} value.top
     * @property {Number} value.right
     * @property {String} value.headline
     * @property {String} value.content
     * @property {String} value.createdDate
     * @property {Boolean} value.isRichContent
     */
    export default {
        name: "NoteItem",
        components: {NoteItemOptionList, NoteContentControl, NoteItemHeaderControl},
        props: {
            value: {
                type: Object,
                required: true
            },
            index: Number
        },
        computed: {
            topPosition() {
                return this.value.top + "px";
            },

            leftPosition() {
                return this.value.left + "px";
            },

            /**
             * Note-Item Coord (TOP-LEFT). Styling
             */
            noteCoordinate() {
                return {
                    'top': this.topPosition,
                    'left': this.leftPosition
                }
            },

            noteSize() {
                return {
                    'width': this.value.width + "px",
                    'height': this.value.height + "px"
                }
            },

            /**
             * Note-Item Colour Setting
             */
            noteMappedColour() {
                return {
                    '--body-color': NOTE_ITEM_COLORS[this.value.color].body,
                    '--toolbar-color': NOTE_ITEM_COLORS[this.value.color].toolbar,
                }
            },

            noteItemStyles() {
                let finalStyle = {};
                Object.assign(finalStyle, this.noteMappedColour)
                Object.assign(finalStyle, this.noteCoordinate)
                Object.assign(finalStyle, this.noteSize)
                return finalStyle
            }
        },
        methods: {
            /**
             * After JQuery-Dragged Event
             */
            afterPositioned(e, jUi) {
                const position = jUi.position;
                this.submitChanges(position)
            },

            /**
             * After JQuery-Resized Event
             */
            afterResized(e, jUi) {
                const noteNewSize = jUi.size;
                this.submitChanges(noteNewSize)
            },

            /**
             * Send changes to API to update the note-items
             * @param noteObject
             */
            submitChanges(noteObject = null) {
                let data = noteObject || this.value;
                data.id = this.value.id;
                data.noteSpaceId = this.value.noteSpaceId;

                this.$socket.emit(SOCKET_EMIT_CONSTANT.NOTE_ITEM.UPDATE, data);

                // re-append and update data
                let newObj = Object.assign({}, this.value, data)
                this.$emit('change', this.index, newObj)
            },

            afterChanged(resultData) {
                if (!resultData.status) {
                    this.$toaster.error("Failed to update your note. Please try again.")
                    return
                }

                if (resultData.updatedData.id !== this.value.id) {
                    return
                }

                // apply the changes
                let newObj = Object.assign({}, this.value, resultData.updatedData)
                this.$emit('change', this.index, newObj)
            },

            failedChange(errMessage) {
                this.$toaster.error(errMessage)
            },

            /**
             * Get Icon as SVG HTML
             * @param name icon name
             * @returns {String}
             */
            getIcon(name) {
                return OctIconFactory.getSVG(name)
            },

            /**
             * Trigger to delete note item
             */
            deleteNoteItem() {
                if (!confirm(`Are you sure to delete ${this.value.headline} note-item?`)) {
                    return
                }

                let deleteNoteData = {
                    noteSpaceId: this.value.noteSpaceId,
                    id: this.value.id
                }

                this.$socket.emit(SOCKET_EMIT_CONSTANT.NOTE_ITEM.DELETE, deleteNoteData);

                // delete too in this current user
                this.$emit('deletedNote', deleteNoteData);
            },

            /**
             * Show note-options
             */
            showOptions() {
                if (!this.openOption) return
                this.openOption()
            },

            afterOptionCreated(openFunc) {
                this.openOption = openFunc
            }
        },
        mounted() {
            // Create Draggable and Resizable Instance
            $(this.$el).draggable({
                handle: '.note-toolbox .drag-item',
                containment: "parent",
                scroll: false,
                zIndex: 9999,
                stop: this.afterPositioned
            }).resizable({
                containment: "parent",
                minHeight: 150,
                minWidth: 250,
                stop: this.afterResized
            })
        },
        beforeDestroy() {
            $(this.$el)
                .draggable("destroy")
                .resizable("destroy"); // destroy save ram
        },
        sockets: {
            noteItemUpdated(data) {
                this.afterChanged(data)
            },

            noteItemDeleted(data) {
                this.$emit('deletedNote', data);
            },
        }
    }
</script>

<style scoped>
    .note-item {
        position: absolute;
        width: 250px;
        background-color: var(--body-color);
    }

    .note-item .content {
        padding-left: 10px;
        padding-bottom: 15px;
    }

    .note-item .note-toolbox {
        padding: 5px 0;
        background-color: var(--toolbar-color);
    }

    .note-toolbox .toolbox-item {
        padding: 5px;
    }

    .note-toolbox .toolbox-item:hover {
        background-color: rgba(0,0,0, 0.3);
    }
</style>