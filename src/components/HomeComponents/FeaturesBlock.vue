<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <ul>
                    <li>Fastest Note in the West</li>
                    <li>Visit. Note. Leave - Repeat</li>
                    <li>Drag and Drop super features</li>
                    <li>Note Stuff in Real-Time (Yes I implemented WebSocket)</li>
                    <li>...</li>
                </ul>
            </div>
            <div class="col-md-4">
                <CreateNoteSpaceBlock />
            </div>
        </div>
    </div>
</template>

<script>
    import CreateNoteSpaceBlock from "@/components/HomeComponents/CreateNoteSpaceBlock";
    export default {
        name: "FeaturesBlock",
        components: {CreateNoteSpaceBlock}
    }
</script>

<style scoped>

</style>