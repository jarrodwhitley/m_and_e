<script setup>
import {computed} from "vue";

defineEmits(['toggleMenu', 'toggleAbout'])
const props = defineProps({
    date: String,
    time: String,
    showMenu: Boolean,
    showAbout: Boolean
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
    <header class="reader-header" :class="[props.showMenu ? 'show-menu' : '']">
        <button class="logo-button" @click="$emit('toggleAbout')" aria-label="About this app">
            <img class="logo-mark" src="/assets/spurgeon_icon.png" alt="Spurgeon logo"/>
        </button>
        <div class="date" v-text="headerTitle"></div>
        <button class="icon-button" :class="props.showMenu ? 'icon-button-active' : ''" @click="$emit('toggleMenu')"
                :aria-label="props.showMenu ? 'Close settings' : 'Open settings'">
            <img class="icon" src="../assets/gear-solid.svg" alt="Settings"/>
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
}

.date {
    text-align: center;
    color: #5f707e;
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
    background: #dceaf0;
    color: #28414a;
    cursor: pointer;
}

.logo-button {
    box-shadow: inset 0 0 0 2px rgba(120, 166, 180, 0.25);
}

.logo-mark {
    width: 1.7rem;
    height: 1.7rem;
    opacity: 0.9;
}

.icon {
    width: 0.9rem;
    height: 0.9rem;
}

.icon-button-active {
    background: #afc6d4;
}

@media (min-width: 768px) {
    .reader-header {
        padding-inline: 1.25rem;
    }
}
</style>