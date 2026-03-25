<script setup>
defineProps({
    show: Boolean,
    bookmarks: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['close', 'open-bookmark', 'clear-bookmarks'])

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

function formatBookmarkDate(mdDate) {
    const [rawMonth, rawDay] = String(mdDate || '').split('-')
    const month = Number(rawMonth)
    const day = Number(rawDay)

    if (!month || !day || month < 1 || month > 12) {
        return mdDate
    }

    return `${monthNames[month - 1]} ${day}`
}

function formatBookmarkPeriod(time) {
    return String(time).toLowerCase() === 'pm' ? 'Evening' : 'Morning'
}
</script>

<template>
    <section class="bookmarks-shell" :class="show ? 'is-open' : 'is-closed'">
        <button class="sheet-backdrop" aria-label="Close bookmarks" @click="emit('close')"></button>
        <div class="bookmarks-panel" :class="show ? 'panel-visible' : ''">
            <div class="sheet-handle"></div>
            <div class="panel-head">
                <h2>Saved Devotionals</h2>
                <button class="close-btn" @click="emit('close')" aria-label="Close bookmarks">×</button>
            </div>

            <p v-if="!bookmarks.length" class="hint">No bookmarks yet. Tap the star in any devotional to save it.</p>

            <div v-else class="bookmark-list">
                <button
                    v-for="item in bookmarks"
                    :key="item.key"
                    class="bookmark-item"
                    @click="emit('open-bookmark', item)"
                >
                    <span class="bookmark-date">{{ formatBookmarkDate(item.date) }} — {{ formatBookmarkPeriod(item.time) }}</span>
                    <span class="bookmark-verse">{{ item.keyverse }}</span>
                </button>
            </div>

            <button v-if="bookmarks.length" class="clear-btn" @click="emit('clear-bookmarks')">Clear All</button>
        </div>
    </section>
</template>

<style scoped>
.bookmarks-shell {
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

.bookmarks-shell.is-open {
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

.bookmarks-panel {
    width: 100%;
    max-height: 75vh;
    border-radius: 1.6rem 1.6rem 0 0;
    background: linear-gradient(to bottom, color-mix(in srgb, var(--surface) 85%, var(--surface-secondary)), var(--surface-secondary));
    box-shadow: 0 -14px 36px rgba(23, 33, 48, 0.25);
    padding: 0.7rem 0.9rem 1.1rem;
    overflow: auto;
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
    margin-bottom: 0.55rem;
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
    background: var(--support-row-background);
    color: var(--support-row-text);
    font-size: 1.25rem;
    box-shadow: inset 0 0 0 1px var(--support-row-border);
}

.hint {
    margin: 0.4rem 0;
    color: var(--text-secondary);
    font-size: 0.85rem;
}

.bookmark-list {
    display: grid;
    gap: 0.45rem;
}

.bookmark-item {
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 0.8rem;
    text-align: left;
    padding: 0.6rem 0.68rem;
    display: grid;
    gap: 0.2rem;
}

.bookmark-date {
    font-size: 0.72rem;
    color: var(--text-secondary);
}

.bookmark-verse {
    font-size: 0.84rem;
    color: var(--text-primary);
}

.clear-btn {
    margin-top: 0.75rem;
    width: 100%;
    border: 0;
    border-radius: 0.75rem;
    min-height: 2.45rem;
    background: var(--support-row-background);
    color: var(--support-row-text);
    font-weight: 600;
    box-shadow: inset 0 0 0 1px var(--support-row-border);
}
</style>
