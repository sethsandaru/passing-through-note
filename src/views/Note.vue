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
            getNote(id) {
                // this.$ajax.get('')
            }
        },
        created() {
            if (!this.$route.params.noteId) {
                this.$router.push('/');
                return
            }

            this.noteId = this.$route.params.noteId
        }
    }
</script>

<style scoped>

</style>