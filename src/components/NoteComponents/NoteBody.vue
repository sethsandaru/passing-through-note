<template>
    <div class="note-body">
        <NoteItem v-for="noteItemData in items"
                  :key="noteItemData.id"
                  :item-data="noteItemData" />
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