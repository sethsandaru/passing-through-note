/**
 * Mixins - Vue
 * Of Double-Click Control
 */


import {HELPER} from "@/libraries/Helper";
import {HOOKS} from "@/libraries/PathInternalHook";

const DBL_CONTROL_MIXINS = {
    props: {
        value: String
    },
    data: () => ({
        isEditing: false,
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

        cancelEditState() {
            this.isEditing = false;
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

    },
    computed: {
        bodyEditClass() {
            return `is-edit-${this.uniqueId}`
        }
    },

    created() {
        // inject the hook hohohoho
        let itemHeaderControlHookItem = new HookItem(this.clickOutOfTheBoxHandle)
        HOOKS.GLOBAL_BODY_CLICK.add(itemHeaderControlHookItem)
    }

};

export {
    DBL_CONTROL_MIXINS
}