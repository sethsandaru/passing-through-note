<template>
    <div>
        <h2>Create your OWN Note-Space and use it now</h2>

        <div class="form-group">
            <label>Your Email</label>
            <input type="text" class="form-control" v-model="form.email">
        </div>

        <div class="form-group">
            <label>Note-Space Name</label>
            <input type="text" class="form-control" v-model="form.name">
        </div>

        <div class="form-group">
            <label>Note-Space Short Description (Optional)</label>
            <input type="text" class="form-control" v-model="form.description">
        </div>

        <div class="form-group">
            <label>Note-Space URL Slug (Option)</label>
            <input type="text" class="form-control" v-model="form.description">
            <small class="form-text text-muted">For example: https://abc.xyz/note/<strong>my-note-space</strong></small>
        </div>

        <button class="btn btn-primary">Create my Note-Space NOW</button>
    </div>
</template>

<script>
    export default {
        name: "CreateNoteSpaceBlock",
        data: () => ({
            form: {
                email: "",
                name: "",
                description: "",
            }
        }),
    }
</script>

<style scoped>

</style>