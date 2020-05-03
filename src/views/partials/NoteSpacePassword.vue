<template>
    <div class="full-body-container">
        <h1 v-text="noteBaseData.name"></h1>

        <p>Please enter the password to continue</p>

        <div class="form-group">
            <input type="password" class="form-control" v-model="password" @keyup.enter="submitPassword">
        </div>

        <button class="btn btn-primary"
                @click="submitPassword"
                :disabled="isChecking">
            Access
        </button>
    </div>
</template>

<script>
    export default {
        name: "NoteSpacePassword",
        props: {
            noteBaseData: Object
        },
        data: () => ({
            password: "",
            isChecking: false
        }),
        methods: {
            /**
             * When user submit password...
             */
            submitPassword() {
                if (this.isChecking) {
                    return;
                }

                // TODO: Continue this function
                this.$ajax.post()
                    .then(this.afterPasswordCheckSuccess)
            },

            /**
             * After API-Request Success Handler...
             * @param {Object} result
             */
            afterPasswordCheckSuccess(result) {

            }

        }
    }
</script>

<style scoped>

</style>