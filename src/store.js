import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => {
        return {
            fontSize: 17,
            theme: 'auto'
        }
    },
    actions: {
        setFontSize(fontSize) {
            this.fontSize = fontSize
        },
        resetSettings() {
            this.fontSize = 17
        },
        setTheme(theme) {
            this.theme = theme
        }
    },
})
