<template>
    <div v-if="noteBaseData">
        <NoteComponent v-if="!needPasswordToAccess" :note-data="noteBaseData"></NoteComponent>
        <NoteSpacePassword v-else :noteBaseData="noteBaseData" />
    </div>
</template>

<script>
    import NoteComponent from "@/components/NoteComponent";
    import {REST_CONFIG} from "@/configs/rest";
    import NoteSpacePassword from "@/views/partials/NoteSpacePassword";
    export default {
        name: "Note",
        data: () => ({
            noteKey: null,
            noteBaseData: null,

            needPasswordToAccess: false,
        }),
        components: {NoteSpacePassword, NoteComponent},
        methods: {
            getNote(id = null) {
                // this.$topbar.show();
                this.$ajax.get(
                    REST_CONFIG.get('NOTE_SPACE.AVAILABILITY', [id || this.noteKey]),
                    null,
                    {
                        onError: this.apiError
                    }
                ).then(this.afterGotNote)
            },

            /**
             * Success-Handle - API-Result
             * @param {Object} result
             */
            afterGotNote(result) {
                this.noteBaseData = result.object;

                this.permissionCheck();
            },
            /**
             * Error-Handle - API-Result
             */
            apiError(err) {
                console.log("API_ERROR", err);
            },

            /**
             * Check permission here
             * Business:
             *  - visitorCanView is true => no need password to access, even hasPassword = true
             *  - visitorCanView is false => need password
             */
            permissionCheck() {
                // First-rule
                if (this.noteBaseData.visitorCanView) {
                    this.needPasswordToAccess = false;
                }

                // Second-Rule => need password to access
                this.needPasswordToAccess = true;

            }
        },
        computed: {

        },
        created() {
            if (!this.$route.params.noteId) {
                this.$router.push('/');
                return
            }

            this.noteKey = this.$route.params.noteId
            this.getNote()
        }
    }
</script>

<style scoped>

</style>