<template>
    <div>
        <h3>Access your Note-Space</h3>

        <div class="form-group">
            <label>Your Note-KEY</label>
            <input type="text" class="form-control" v-model="noteKey">
        </div>

        <button class="btn btn-primary" @click="actionAccess">
            Access Note-Space
        </button>
    </div>
</template>

<script>
    import {REST_CONFIG} from "@/configs/rest";

    export default {
        name: "AccessNoteSpaceBlock",
        data: () => ({
            noteKey: "",
        }),

        methods: {
            actionAccess() {
                if (!this.noteKey) {
                    this.$toaster.error("Please input your Note-Key before access")
                    return
                }

                // push to the real page...
                this.$router.push({
                    name: 'note',
                    params: {
                        noteId: this.noteKey
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>