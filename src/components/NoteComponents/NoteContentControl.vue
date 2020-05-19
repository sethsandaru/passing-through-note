<template>
    <div class="note-content-control" :data-note-id="uniqueId">
        <div class="content" v-html="value" @dblclick="setEditState"></div>


    </div>
</template>

<script>
    export default {
        name: "NoteContentControl",
        props: {
            value: String,
            isRichContent: {
                type: Boolean,
                default: () => false,
            }
        },
        model: {
            event: 'change',
            prop: 'value'
        },
        data: () => ({
            isEditing: false,
            oldContent: "",
            uniqueId: HELPER.getUUIDv4()
        }),

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
        },

        created() {

        }
    }
</script>

<style scoped>

</style>