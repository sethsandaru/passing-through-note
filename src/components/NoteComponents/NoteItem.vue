<template>
    <div class="note-item" :style="{noteCoordinate, ...noteMappedColour}">
        <div class="note-toolbox text-right" contenteditable="false">
            <span class="toolbox-item" v-html="getIcon('list-unordered')"></span>
            <span class="toolbox-item" v-html="getIcon('trashcan')"></span>
        </div>

        <NoteItemHeaderControl :headline="itemData.headline"
                               v-model="itemData.headline" />
        <div class="content" v-html="itemData.content"></div>
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

    /**
     * Model properties
     * @property {Object} itemData
     * @property {Number} itemData.id
     * @property {Number} itemData.top
     * @property {Number} itemData.right
     * @property {String} itemData.headline
     * @property {String} itemData.content
     * @property {String} itemData.createdDate
     * @property {Boolean} itemData.isRichContent
     */
    export default {
        name: "NoteItem",
        components: {NoteItemHeaderControl},
        props: {
            itemData: Object
        },
        computed: {
            topPosition() {
                return this.itemData.top;
            },

            leftPosition() {
                return this.itemData.left;
            },

            noteCoordinate() {
                return {
                    'top': this.topPosition,
                    'left': this.leftPosition
                }
            },

            noteMappedColour() {
                return {
                    '--body-color': NOTE_ITEM_COLORS[this.itemData.color].body,
                    '--toolbar-color': NOTE_ITEM_COLORS[this.itemData.color].toolbar,
                }
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
                let data = noteObject || this.itemData;

                // send ajax here
                this.$ajax.put(
                    REST_CONFIG.get('NOTE_ITEMS.UPDATE', [this.itemData.id]),
                    data
                )
                .then(this.afterChanged)
                .catch(this.failedChange)
            },

            afterChanged(resultData) {
                if (!resultData.status) {
                    this.$toaster.error("Failed to update your note. Please try again.")
                    return
                }

                // apply the changes
                Object.assign(this.itemData, resultData.updatedupdatedData)
                this.$toaster.error("Note-Item updated!")
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


        },
        mounted() {
            // Create Draggable and Resizable Instance
            $(this.$el).draggable({
                handle: '.note-toolbox',
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