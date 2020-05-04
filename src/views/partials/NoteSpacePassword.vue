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
    import {REST_CONFIG} from "@/configs/rest";
    import {SITE_CONFIGS} from "@/configs";
    import {CONSTANTS} from "@/configs/constants";
    import {NoteStorage} from "@/libraries/NoteStorage";

    export default {
        name: "NoteSpacePassword",
        props: {
            noteBaseData: Object
        },
        data: () => ({
            password: "",
            isChecking: false,

            // security
            failedTime: 0,
            storageKey: "",
        }),
        methods: {
            /**
             * When user submit password...
             */
            submitPassword() {
                if (this.isChecking) {
                    return;
                }

                const postData = {
                    password: this.password
                };

                this.$ajax.post(
                    REST_CONFIG.get('NOTE_SPACE.VERIFY'),
                    postData,
                    {onError: this.apiPasswordCheckErrorHandler}
                ).then(this.afterPasswordCheckSuccess)
            },

            /**
             * After API-Request Success Handler...
             * @param {Object} result
             */
            afterPasswordCheckSuccess(result) {
                // success
                if (result.status) {

                }

                // failed
                this.$toaster.error('Incorrect password. Please try again.');
                this.failedTime++;
            },

            /**
             * On-Error Handler...
             * @param err
             */
            apiPasswordCheckErrorHandler(err) {

            },
        },
        computed: {
            /**
             * Accessor to check if we need captcha
             * @return {boolean}
             */
            isNeedCaptcha() {
                return this.failedTime > SITE_CONFIGS.FAILED_TIMES_SHOW_CAPTCHA;
            }
        },
        created() {
            this.storageKey = CONSTANTS.STORAGE.NOTE_PASS_FAILED_PREFIX + this.noteBaseData.noteKey;
            this.failedTime = NoteStorage.getStorage().getItem(this.storageKey);

            // parse int time...
            if (!this.failedTime) {
                this.failedTime = 0;
            } else {
                this.failedTime = parseInt(this.failedTime);
            }
        }
    }
</script>

<style scoped>

</style>