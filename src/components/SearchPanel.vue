<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
    show: Boolean,
    query: {
        type: String,
        default: ''
    },
    results: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['close', 'update-query', 'open-result'])

const previewKey = ref('')
const localQuery = ref(props.query)

watch(() => props.query, (nextQuery) => {
    localQuery.value = nextQuery
})

watch(() => props.show, (isOpen) => {
    if (!isOpen) {
        previewKey.value = ''
    }
})

watch(() => props.results, (nextResults) => {
    if (!nextResults.find((item) => item.key === previewKey.value)) {
        previewKey.value = ''
    }
})

const previewItem = computed(() => props.results.find((item) => item.key === previewKey.value) || null)

function onQueryInput() {
    emit('update-query', localQuery.value)
}

function selectPreview(item) {
    previewKey.value = item.key
}

function openPreview() {
    if (!previewItem.value) {
        return
    }

    emit('open-result', previewItem.value)
}
</script>

<template>
    <section class="search-shell" :class="show ? 'is-open' : 'is-closed'">
        <button class="sheet-backdrop" aria-label="Close search" @click="emit('close')"></button>
        <div class="search-panel" :class="show ? 'panel-visible' : 'panel-hidden'">
            <div class="sheet-handle"></div>
            <div class="panel-head">
                <h2>Search Devotionals</h2>
                <button class="close-btn" @click="emit('close')" aria-label="Close search">×</button>
            </div>
            <input
                v-model="localQuery"
                class="search-input"
                type="search"
                placeholder="Search by keyword"
                @input="onQueryInput"
            />
            <p v-if="!query.trim()" class="hint">Type a keyword to search by verse or devotional body text.</p>
            <p v-else-if="!results.length" class="hint">No devotionals found for this keyword.</p>
            <div v-else class="results-list">
                <button
                    v-for="item in results"
                    :key="item.key"
                    class="result-item"
                    :class="item.key === previewKey ? 'selected' : ''"
                    @click="selectPreview(item)"
                >
                    <span class="result-date">{{ item.date }} {{ item.time.toUpperCase() }}</span>
                    <span class="result-verse">{{ item.keyverse }}</span>
                </button>
            </div>

            <div v-if="previewItem" class="preview-box">
                <h3>Preview</h3>
                <p class="preview-verse">{{ previewItem.keyverse }}</p>
                <p class="preview-text">{{ previewItem.preview }}</p>
                <button class="open-btn" @click="openPreview">Open Devotional</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.search-shell {
    position: absolute;
    inset: 0;
    z-index: 26;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    opacity: 0;
    visibility: hidden;
    transition: opacity 180ms ease;
}

.search-shell.is-open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.sheet-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background: var(--overlay-background);
}

.search-panel {
    position: relative;
    width: 100%;
    max-height: 80vh;
    border-radius: 1.6rem 1.6rem 0 0;
    background: linear-gradient(to bottom, color-mix(in srgb, var(--surface) 85%, var(--surface-secondary)), var(--surface-secondary));
    box-shadow: 0 -14px 36px rgba(23, 33, 48, 0.25);
    overflow: auto;
    padding: 0.7rem 0.9rem 1rem;
    transform: translateY(calc(100% + 1rem));
    transition: transform 260ms ease;
}

.panel-visible {
    transform: translateY(0);
}

.sheet-handle {
    width: 3rem;
    height: 0.34rem;
    border-radius: 999px;
    margin: 0.15rem auto 0.75rem;
    background: color-mix(in srgb, var(--text-secondary) 40%, transparent);
}

.panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.panel-head h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1rem;
}

.close-btn {
    border: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: var(--button-secondary-background);
    color: var(--button-secondary-text);
    font-size: 1.25rem;
}

.search-input {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 0.8rem;
    padding: 0.7rem 0.8rem;
    font-size: 0.95rem;
    color: var(--text-primary);
    background: var(--surface);
}

.hint {
    color: var(--text-secondary);
    font-size: 0.85rem;
    margin: 0.7rem 0 0.5rem;
}

.results-list {
    display: grid;
    gap: 0.45rem;
    margin-top: 0.55rem;
}

.result-item {
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 0.8rem;
    text-align: left;
    padding: 0.55rem 0.65rem;
    display: grid;
    gap: 0.2rem;
}

.result-item.selected {
    background: var(--highlight);
    border-color: var(--accent-secondary);
}

.result-date {
    font-size: 0.72rem;
    color: var(--text-secondary);
}

.result-verse {
    font-size: 0.83rem;
    color: var(--text-primary);
}

.preview-box {
    margin-top: 0.65rem;
    border-radius: 0.9rem;
    background: var(--surface);
    padding: 0.7rem;
    border: 1px solid var(--border);
}

.preview-box h3 {
    margin: 0 0 0.35rem;
    color: var(--text-secondary);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.preview-verse {
    margin: 0;
    font-size: 0.84rem;
    color: var(--text-primary);
    font-weight: 600;
}

.preview-text {
    margin: 0.45rem 0 0;
    font-size: 0.82rem;
    color: var(--text-secondary);
}

.open-btn {
    margin-top: 0.65rem;
    border: 0;
    width: 100%;
    min-height: 2.4rem;
    border-radius: 0.75rem;
    background: var(--button-primary);
    color: var(--button-primary-text);
    font-weight: 600;
}
</style>
