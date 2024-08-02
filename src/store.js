import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: 'app',
    state: () => {
        return {
            fontSize: 16,
            theme: 'auto'
        }
    },
    actions: {
        setFontSize(fontSize) {
            this.fontSize = fontSize
        },
        resetSettings() {
            this.fontSize = 16
        },
        setTheme(theme) {
            this.theme = theme
        }
    },
})
