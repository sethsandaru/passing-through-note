import {SOCKET_EMIT_CONSTANT} from "@/configs/socket-contant";

const NOTE_COMPONENT_SOCKET_MIXIN = {

    sockets: {
        noteSpaceJoined: function (data) {
            this.noteItems = data.noteItems || []
        },

        noteItemAddedAPI(data) {
            this.afterAddedNote(data)
        },
    },

    // methods that contact/handle websocket
    methods: {
        /**
         * Socket-After handler of Added New Note Item
         * @param {Object} resultData
         * @param {Object|null} resultData.data
         * @param {Boolean} resultData.status
         */
        afterAddedNote(resultData) {
            this.noteItems.push(resultData)
        },
    },

    created() {
        // tell socket we joined the room
        this.$socket.emit(
            SOCKET_EMIT_CONSTANT.NOTE_SPACE.ACCESS,
            {noteSpaceId: this.noteData.id}
        )
    },

    beforeDestroy() {
        // leave room before leave...
        this.$socket.emit(SOCKET_EMIT_CONSTANT.NOTE_SPACE.LEAVE, {
            noteSpaceId: this.noteData.id
        })
    }
}

export {
    NOTE_COMPONENT_SOCKET_MIXIN
}