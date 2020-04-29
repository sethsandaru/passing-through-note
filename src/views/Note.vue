<template>
    <NoteComponent></NoteComponent>
</template>

<script>
    import NoteComponent from "@/components/NoteComponent";
    export default {
        name: "Note",
        data: () => ({
            noteId: null,
            noteData: null,
        }),
        components: {NoteComponent},
        methods: {
            getNote(id = null) {
                // this.$ajax.get(id || this.noteId)
                this.$topbar.show();
            }
        },
        created() {
            if (!this.$route.params.noteId) {
                this.$router.push('/');
                return
            }

            this.noteId = this.$route.params.noteId
            this.getNote()
        }
    }
</script>

<style scoped>

</style>