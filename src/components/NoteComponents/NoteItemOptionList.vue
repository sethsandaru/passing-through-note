<template>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-toggle="dropdown">

        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>

    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "NoteItemOptionList",

        methods: {
            ready() {
                this.$emit('dropdown', this.show)
            },

            show() {
                $(this.$el).dropdown('show')
            }
        },

        mounted() {
            $(this.$el).dropdown()
            this.ready()
        },

        beforeDestroy() {
            $(this.$el).dropdown('dispose')
        }
    }
</script>

<style scoped>
    .dropdown-menu {
        top:30px;
        right:0;
        left:unset;
    }
</style>