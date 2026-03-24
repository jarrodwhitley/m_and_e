<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAppStore} from "../store.js";

const props = defineProps({
    content: Object,
    isBookmarked: Boolean
})

defineEmits(['toggle-bookmark'])

const store = useAppStore()

const verseReference = ref('')
const bodyContent = ref('')

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
        <div class="key-verse-row">
            <p class="key-verse" v-text="props.content.keyverse"></p>
            <button class="bookmark-btn" :class="props.isBookmarked ? 'active' : ''" @click="$emit('toggle-bookmark')"
                    :aria-label="props.isBookmarked ? 'Remove bookmark' : 'Add bookmark'">
                {{ props.isBookmarked ? '★' : '☆' }}
            </button>
        </div>
        <p class="body-copy" v-text="bodyContent"></p>
    </section>
    <div class="desktop-warning">
        Mobile-first layout with a classic reading mode.
    </div>
</template>

<style scoped>
.body-panel {
    margin: 0;
    background: transparent;
    color: #252d3a;
    overflow: auto;
    overflow-x: hidden;
    text-align: left;
    min-height: 0;
}

.key-verse {
    margin: 0;
    color: #5f6f81;
    font-size: 0.94em;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: 0.012em;
    padding: 0.15rem 1rem 0.85rem;
    border-bottom: 1px solid #dbe5ea;
}

.key-verse-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 0.45rem;
}

.bookmark-btn {
    border: 0;
    background: transparent;
    color: #6f8093;
    font-size: 1.1em;
    line-height: 1;
    padding: 0.25rem 0.15rem;
    cursor: pointer;
}

.bookmark-btn.active {
    color: #c4852a;
}

.body-copy {
    margin: 0;
    color: #1d2330;
    line-height: 1.62;
    letter-spacing: 0.002em;
    text-wrap: pretty;
    overflow-wrap: anywhere;
    font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif;
    padding: 0.9rem 1rem calc(5.1rem + env(safe-area-inset-bottom, 0px));
}

.body-copy::first-letter {
    float: left;
    font-size: 2.35em;
    line-height: 0.86;
    margin-right: 0.08em;
    padding-top: 0.06em;
    font-weight: 600;
    color: #283546;
}

.desktop-warning {
    display: none;
}

@media (min-width: 1024px) {
    .key-verse {
        padding-inline: 1.25rem;
    }

    .body-copy {
        padding-inline: 1.25rem;
    }

    .desktop-warning {
        display: block;
        text-align: center;
        color: #728290;
        font-size: 0.84rem;
        letter-spacing: 0.03em;
        margin: 0 0 0.9rem;
    }
}
</style>