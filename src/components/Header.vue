<script setup>
defineEmits(['toggleMenu'])
const props = defineProps({
    date: String,
    time: String
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
    <div class="bg-transparent text-white p-4 h-auto text-2xl grid grid-col-3 grid-rows-1 justify-center z-20">
        <div class="" v-text="getMonthName(props.date)"></div>
        <button class="menu-btn absolute top-4 right-4" @click="$emit('toggleMenu')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
</template>
