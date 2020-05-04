import {SITE_CONFIGS} from "@/configs";

const NoteStorage = {
    /**
     * Pickup storage to use in the Vue's lifecycle
     * @return {Storage}
     */
    getStorage() {
        return SITE_CONFIGS.STORAGE_TYPE
    }
};

export {
    NoteStorage
}