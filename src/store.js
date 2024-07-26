import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => {
        return {
            states: {
                fontSize: 16,
            },
        }
    },
    actions: {
        setFontSize(fontSize) {
            this.states.fontSize = fontSize
        }
    },
})
