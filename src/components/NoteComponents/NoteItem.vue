<template>
    <div class="note-item" :style="noteCoordinate">
        {{itemData.content}}
    </div>
</template>

<script>
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
        props: {
            itemData: Object
        },
        computed: {
            noteCoordinate() {
                return {
                    'top': this.itemData.top,
                    'right': this.itemData.right
                }
            }
        }
    }
</script>

<style scoped>
    .note-item {
        position: absolute;
    }
</style>