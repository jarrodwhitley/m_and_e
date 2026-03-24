<script setup>
defineProps({
    currentPeriod: {
        type: String,
        default: 'am'
    },
    bookmarkCount: {
        type: Number,
        default: 0
    }
})

defineEmits(['open-search', 'open-date', 'open-bookmarks', 'toggle-period'])
</script>

<template>
    <nav class="control-bar" aria-label="Devotional controls">
        <button class="control-btn" @click="$emit('open-search')" aria-label="Search devotionals">
            <span class="icon">⌕</span>
            <span>Search</span>
        </button>
        <button class="control-btn" @click="$emit('open-date')" aria-label="Select date">
            <span class="icon">◷</span>
            <span>Date</span>
        </button>
        <button class="control-btn" @click="$emit('toggle-period')" aria-label="Toggle morning evening">
            <span class="icon">{{ currentPeriod === 'am' ? '☀' : '☾' }}</span>
            <span>{{ currentPeriod === 'am' ? 'Morning' : 'Evening' }}</span>
        </button>
        <button class="control-btn" @click="$emit('open-bookmarks')" aria-label="Open bookmarks">
            <span class="icon">★</span>
            <span>Saved{{ bookmarkCount ? ` (${bookmarkCount})` : '' }}</span>
        </button>
    </nav>
</template>

<style scoped>
.control-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 18;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-top: 1px solid rgba(115, 141, 158, 0.3);
    background: rgba(245, 249, 251, 0.94);
    backdrop-filter: blur(6px);
    padding-bottom: max(env(safe-area-inset-bottom, 0px), 0.35rem);
}

.control-btn {
    border: 0;
    background: transparent;
    color: #324a5d;
    min-height: 58px;
    padding: 0.35rem 0.2rem 0.45rem;
    display: grid;
    justify-items: center;
    gap: 0.15rem;
    font-size: 0.68rem;
    letter-spacing: 0.02em;
}

.icon {
    font-size: 1rem;
    line-height: 1;
}

.evening .control-bar {
    background: rgba(239, 241, 249, 0.94);
}
</style>
