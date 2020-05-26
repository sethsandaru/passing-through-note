<template>
    <div class="note-headline-control" :data-note-id="uniqueId">
        <h2
            class="note-headline"
            v-text="value"
            v-show="!isEditing"
            @dblclick="setEditState">
        </h2>

        <div class="input-group-sm mb-2 pr-2 editable-field" v-show="isEditing">
            <input class="form-control py-2 border-right-0 border"
                   :value="value"
                   @input="updateValue($event.target.value)"
                   @keypress.enter="submitChange"
                   @keyup.esc="cancel">

            <div class="icon">
                <span class="icon-cancel" @click="cancel" v-html="cancelIcon"></span>
                <span class="icon-submit" @click="submitChange" v-html="submitIcon"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {OctIconFactory} from "@/libraries/OctIcon";
    import {HookItem} from "@/classes/HookItem";
    import {HOOKS} from "@/libraries/PathInternalHook";
    import {HELPER} from "@/libraries/Helper";
    import {DBL_CONTROL_MIXINS} from "@/extendables/dblControlMixins";

    export default {
        name: "NoteItemHeaderControl",
        mixins: [DBL_CONTROL_MIXINS],
        data: () => ({
            newHeadline: "",
        }),
        methods: {
            updateValue(newHeadline) {
                this.newHeadline = newHeadline;
            },

            cancel() {
                this.newHeadline = this.value
                this.cancelEditState()
            },

            submitChange() {
                // submit here
                if (this.newHeadline == this.headline) {
                    return
                }

                // change to parent-component
                this.$emit('change', this.newHeadline)

                // call to parent and let them do the websocket update
                this.$emit('updateHeadline', {headline: this.newHeadline})

                // remove cancel state
                this.cancelEditState()
            }
        },
        computed: {
            submitIcon() {
                return OctIconFactory.getSVG('check')
            },
            cancelIcon() {
                return OctIconFactory.getSVG('x')
            },
        },
        created() {
            this.newHeadline = this.value
        }
    }
</script>

<style scoped>
    .note-headline-control {
        padding-top: 10px;
        padding-left: 10px;
    }

    .note-headline {
        font-size: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .note-headline-on-edit {
        padding: 0;
    }

    .editable-field {
        position: relative;
    }

    .editable-field .icon {
        position: absolute;
        top: 2.5px;
        right: 10px;
    }

    .editable-field .icon span {
        padding-right: 7px;
        cursor: pointer;
    }

    .icon-submit:hover {
        fill:green;
    }

    .icon-cancel:hover {
        fill:red;
    }
</style>