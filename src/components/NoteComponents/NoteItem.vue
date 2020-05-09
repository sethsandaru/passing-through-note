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
    import dragable from 'jquery-ui/ui/widgets/draggable'
    import {OctIconFactory} from "@/libraries/OctIcon";
    import {NOTE_ITEM_COLORS} from "@/configs/note-item-color";
    import NoteItemHeaderControl from "@/components/NoteComponents/NoteItemHeaderControl";

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
            afterPositioned(e, jUi) {
                const position = jUi.position;

                // re-update - position
                this.itemData.top = position.top;
                this.itemData.left = position.left;
            },

            submitChanges(noteObject = null) {
                let data = noteObject || this.itemData;

                // send ajax here
            },

            getIcon(name) {
                return OctIconFactory.getSVG(name)
            },


        },
        mounted() {
            $(this.$el).draggable({
                handle: '.note-toolbox',
                containment: "parent",
                scroll: false,
                zIndex: 9999,
                stop: this.afterPositioned
            })
        },
        beforeDestroy() {
            $(this.$el).draggable("destroy"); // destroy save ram
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