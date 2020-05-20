<template>
    <div class="note-content-control" :data-note-id="uniqueId">
        <div class="content" 
             v-html="value"             
             v-show="!isEditing"
             @dblclick="setEditState">
        </div>

        <div class="form-group pr-2" v-show="isEditing">
            <textarea class="form-control"
                      v-model="newContent"
                      :style="{height: textareaHeight}"
                      @keyup.esc="cancel"></textarea>
        </div>
    </div>
</template>

<script>
    import {DBL_CONTROL_MIXINS} from "@/extendables/dblControlMixins";

    export default {
        name: "NoteContentControl",
        mixins: [DBL_CONTROL_MIXINS],
        props: {
            isRichContent: {
                type: Boolean,
                default: () => false,
            },
            noteItemHeight: {
                type: Number,
                default: () => 100,
            }
        },
        data: () => ({
            newContent: "",
        }),
        methods: {
            updateValue(newHeadline) {
                this.newContent = newHeadline;
            },

            submitChange() {
                // submit here
                if (this.newContent === this.value) {
                    return
                }

                // change to parent-component
                this.$emit('change', this.newContent)

                // call to parent and let them do the websocket update
                this.$emit('updateContent', {content: this.newContent})
            },

            afterCancelledEditState() {
                this.submitChange()
            },

            cancel() {
                this.newContent = this.value
                this.cancelEditState()
            }
        },

        computed: {
            textareaHeight() {
                return (this.noteItemHeight - 80) + "px";
            }
        },

        created() {
            this.newContent = this.value;
        }
    }
</script>

<style scoped>
    textarea {
        resize: none;
    }
</style>