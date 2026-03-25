<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAppStore} from "../store.js";

const props = defineProps({
    content: Object
})

const store = useAppStore()

const verseReference = ref('')
const bodyContent = ref('')

const bodySegments = computed(() => {
    const rawText = bodyContent.value || ''
    const text = rawText
        .replace(/[\u0080-\u009F]/g, '')
        .replace(/^\s+/, '')

    const match = text.match(/[A-Za-z]/)

    if (!match || typeof match.index !== 'number') {
        return {
            leading: '',
            dropCap: '',
            rest: text
        }
    }

    const index = match.index
    return {
        leading: text.slice(0, index),
        dropCap: text.charAt(index),
        rest: text.slice(index + 1)
    }
})

function getVerseReference(string) {
    const parts = (string || '').split('—')
    verseReference.value = parts[1] ? parts[1].trim() : ''
    formatBodyContent(props.content.body)
}
function formatBodyContent(string) {
    if (!string) {
        bodyContent.value = ''
        return
    }

    if (!verseReference.value || !string.includes(verseReference.value)) {
        bodyContent.value = string.trim()
        return
    }

    bodyContent.value = string.split(verseReference.value)[1].trim()
}

onMounted(() => {
    getVerseReference(props.content.keyverse)
})

watch(() => props.content, (nextContent) => {
    if (nextContent?.keyverse) {
        getVerseReference(nextContent.keyverse)
    }
}, { deep: true })
</script>

<template>
    <section id="body" class="body-panel" :style="'font-size:'+ store.fontSize.toString() +'px;'">
        <p class="key-verse" v-text="props.content.keyverse"></p>
        <p class="body-copy">
            <span v-if="bodySegments.leading" v-text="bodySegments.leading"></span><span
                v-if="bodySegments.dropCap"
                class="drop-cap"
                v-text="bodySegments.dropCap"
            ></span><span v-text="bodySegments.rest"></span>
        </p>
    </section>
    <div class="desktop-warning">
        Mobile-first layout with a classic reading mode.
    </div>
</template>

<style scoped>
.body-panel {
    margin: 0;
    background: transparent;
    color: var(--text-primary);
    overflow: auto;
    overflow-x: hidden;
    text-align: left;
    min-height: 0;
}

.key-verse {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.94em;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: 0.012em;
    padding: 0.85rem;
    text-indent: 0;
    border-bottom: 1px solid var(--border);
}

.body-copy {
    margin: 0;
    color: var(--text-primary);
    text-align: justify;
    text-indent: 0;
    line-height: 1.62;
    letter-spacing: 0.002em;
    text-wrap: pretty;
    overflow-wrap: anywhere;
    font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif;
    padding: 0.9rem 1rem calc(var(--control-bar-height, 64px) + 1.15rem + env(safe-area-inset-bottom, 0px));
}

.drop-cap {
    float: left;
    font-size: 3.1em;
    line-height: 0.68;
    margin-right: 0.165em;
    margin-left: -0.015em;
    padding-top: 0.08em;
    font-weight: 600;
    color: var(--accent-primary);
}

.desktop-warning {
    display: none;
}

@media (min-width: 1024px) {
    .body-copy {
        padding-inline: 1.25rem;
    }

    .desktop-warning {
        display: block;
        text-align: center;
        color: var(--text-secondary);
        font-size: 0.84rem;
        letter-spacing: 0.03em;
        margin: 0 0 0.9rem;
    }
}
</style>