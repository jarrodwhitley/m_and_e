<script setup>
defineEmits(['toggleMenu'])
const props = defineProps({
    date: String,
    time: String,
    showMenu: Boolean
})
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

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
    <div class="bg-transparent text-white p-4 h-fit text-2xl grid grid-cols-[1fr_3fr_1fr] grid-rows-1 justify-items-center items-center z-20"
    :class="[showMenu ? 'show-menu' : '']">
        <img class="h-10 w-10 col-start-1 col-end-1 justify-self-start" src="../assets/images/spurgeon_icon.png" alt="logo"/>
        <div class="date font-bold" v-text="getMonthName(props.date)"></div>
        <button class="menu-btn justify-self-end" @click="$emit('toggleMenu')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    #header {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: -4px;
            background: linear-gradient(to top, rgba(49, 86, 104, 1) 15%, transparent);
            z-index: -1;
        }

        &.show-menu {
            &::after {
                background: none;
            }
        }

        .date {
            position: relative;
            &::before {
                content: 'Alpha';
                font-size: 0.5em;
                font-weight: 400;
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                opacity: .5;
            }
        }
    }
</style>