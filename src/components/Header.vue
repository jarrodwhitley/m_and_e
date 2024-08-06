<script setup>
import {computed} from "vue";

defineEmits(['toggleMenu'])
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
    return props.showMenu ? 'Settings' : getMonthName(props.date);
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
    <div class="bg-transparent text-white h-[60px] px-2 md:px-8 text-2xl grid grid-cols-[1fr_3fr_1fr] grid-rows-1 justify-items-center items-center z-20"
    :class="[props.showMenu ? 'show-menu' : '']">
        <img v-if="showMenu" class="back-btn justify-self-start cursor-pointer w-5 h-5" @click="$emit('toggleMenu')" src="../assets/arrow-left-solid.svg" alt="decrease font size"/>
        <img v-else class="h-10 w-10 col-start-1 col-end-1 justify-self-start cursor-pointer"
             :class="props.showAbout ? 'contrast-0' : ''"
             src="/assets/spurgeon_icon.png"
             @click="$emit('toggleAbout')"
             alt="logo"/>
        <div class="date" v-text="headerTitle"></div>
        <button v-if="!showMenu" class="menu-btn justify-self-end mr-2" @click="$emit('toggleMenu')">
            <img class="h-4 w-4" src="../assets/gear-solid.svg"/>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    #header {
        position: relative;

        &.show-menu {
            &::after {
                background: none;
            }
        }
    }
</style>