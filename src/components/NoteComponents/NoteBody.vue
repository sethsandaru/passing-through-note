<template>
    <div class="note-body">
        <NoteItem v-for="(noteItemData, index) in items"
                  :key="noteItemData.id"
                  :value="noteItemData"
                  :index="index"
                  @change="updatedNoteItem"
                  @deletedNote="afterDeletedItem" />
    </div>
</template>

<script>
    import NoteItem from "@/components/NoteComponents/NoteItem";

    export default {
        name: "NoteBody",
        components: {NoteItem},
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        data: () => ({
            dragging: false,
        }),
        methods: {
            updatedNoteItem(index, noteItemData) {
                this.$emit('change', index, noteItemData)
            },
            afterDeletedItem(data) {
                this.$emit('delete', data.id)
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
        min-height: 80vh;
    }
</style>