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
                   @keypress.esc="cancel">

            <div class="icon">
                <span class="icon-cancel" @click="cancelEditState" v-html="cancelIcon"></span>
                <span class="icon-submit" @click="submitChange" v-html="submitIcon"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {OctIconFactory} from "@/libraries/OctIcon";
    import {HookItem} from "@/classes/HookItem";
    import {HOOKS} from "@/libraries/PathInternalHook";
    import {HELPER} from "@/libraries/Helper";

    export default {
        name: "NoteItemHeaderControl",
        props: {
            value: String
        },
        data: () => ({
            isEditing: false,
            newHeadline: "",
            uniqueId: HELPER.getUUIDv4()
        }),
        model: {
            event: 'change',
            prop: 'value'
        },
        methods: {
            setEditState() {
                this.isEditing = true
                $("#app").addClass(this.bodyEditClass)
            },

            updateValue(newHeadline) {
                this.newHeadline = newHeadline;
            },

            cancelEditState() {
                this.isEditing = false;
                this.newHeadline = this.value
                $("#app").removeClass(this.bodyEditClass)
            },

            /**
             * With this method, we will handle:
             *  - Click outside of the note control item => End
             */
            clickOutOfTheBoxHandle(e, $appEl) {
                if (!this.isEditing || !$($appEl).hasClass(this.bodyEditClass)) {
                    return
                }

                // still in the input => no need close
                if ($(e.target).parents('.note-headline-control').length) {
                    return
                }

                // eligible to close.
                this.cancelEditState()
            },

            submitChange() {
                // submit here
                if (this.newHeadline == this.headline) {
                    return
                }

                // change to parent-component
                this.$emit('change', this.newHeadline)
                this.cancelEditState()

                //TODO: send ajax request here...
                // this.$ajax....
            }
        },
        computed: {
            submitIcon() {
                return OctIconFactory.getSVG('check')
            },
            cancelIcon() {
                return OctIconFactory.getSVG('x')
            },

            bodyEditClass() {
                return `is-edit-${this.uniqueId}`
            }
        },
        created() {
            // inject the hook hohohoho
            let itemHeaderControlHookItem = new HookItem(this.clickOutOfTheBoxHandle)
            HOOKS.GLOBAL_BODY_CLICK.add(itemHeaderControlHookItem)

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