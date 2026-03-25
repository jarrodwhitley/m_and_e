<script setup>
import {computed} from "vue";

defineEmits(['toggleBookmark', 'toggleAbout'])
const props = defineProps({
    date: String,
    time: String,
    isBookmarked: Boolean
})
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];
const headerTitle = computed(() => {
    return getMonthName(props.date);
})

function getReadingTime() {
    return props.time === 'am' ? 'Morning' : 'Evening';
}
function getMonthName(date) {
    let monthNumber = date.split('-')[0];
    let day = date.split('-')[1];
    let monthName = monthNames[monthNumber - 1];
    let readingTime = getReadingTime();
    return `${monthName} ${day} - ${readingTime}`;
}
</script>

<template>
    <header class="reader-header">
        <button class="logo-button" @click="$emit('toggleAbout')" aria-label="About this app">
            <img class="logo-mark" src="/assets/spurgeon_icon.png" alt="Spurgeon logo"/>
        </button>
        <div class="date" v-text="headerTitle"></div>
        <button class="icon-button" :class="props.isBookmarked ? 'icon-button-active' : ''" @click="$emit('toggleBookmark')"
                :aria-label="props.isBookmarked ? 'Remove from favorites' : 'Save this devotional'">
            <span class="material-symbols-rounded save-icon" aria-hidden="true">{{ props.isBookmarked ? 'bookmark_remove' : 'bookmark_add' }}</span>
        </button>
    </header>
</template>

<style lang="scss" scoped>
.reader-header {
    position: relative;
    z-index: 20;
    height: 78px;
    padding: 0.9rem 1rem 0.8rem;
    display: grid;
    align-items: center;
    grid-template-columns: 3rem 1fr 3rem;
    gap: 0.6rem;
    background: linear-gradient(180deg, var(--header-gradient-start) 0%, var(--background) 60%);
}

.date {
    text-align: center;
    color: var(--text-secondary);
    font-size: clamp(1rem, 2.8vw, 1.22rem);
    letter-spacing: 0.03em;
    font-family: "Iowan Old Style", "Palatino Linotype", Palatino, serif;
}

.icon-button,
.logo-button {
    width: 2.7rem;
    height: 2.7rem;
    border: 0;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--button-secondary-background);
    color: var(--button-secondary-text);
    cursor: pointer;
}

.icon-button {
    background: transparent;
    border-radius: 0;
}

.logo-button {
    box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--accent-secondary) 60%, transparent);
}

.logo-mark {
    width: 1.7rem;
    height: 1.7rem;
    opacity: 0.9;
}

.save-icon {
    font-size: 1.52rem;
    line-height: 1;
    font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 40;
}

.icon-button-active {
    background: transparent;
    color: var(--accent-primary);
}

@media (min-width: 768px) {
    .reader-header {
        padding-inline: 1.25rem;
    }
}
</style>