<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-md-6">
                <h2>Our Main Features</h2>
                <ul>
                    <li>Fastest Note in the West</li>
                    <li>Visit. Note. Leave - Repeat</li>
                    <li>Drag and Drop super features</li>
                    <li>Note Stuff in Real-Time (Yes I implemented WebSocket)</li>
                    <li>...</li>
                </ul>
            </div>
            <div class="col-md-6">
                <AccessNoteSpaceBlock />

                <hr>

                <CreateNoteSpaceBlock />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateNoteSpaceBlock from "@/components/HomeComponents/CreateNoteSpaceBlock";
    import AccessNoteSpaceBlock from "@/components/HomeComponents/AccessNoteSpaceBlock";
    export default {
        name: "FeaturesBlock",
        components: {AccessNoteSpaceBlock, CreateNoteSpaceBlock}
    }
</script>

<style scoped>

</style>