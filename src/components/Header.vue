<script setup>

import {computed} from "vue";

defineProps({
  date: String,
})

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

function getMonthName(date) {
    let monthNumber = date.split('-')[0];
    let day = date.split('-')[1];
    let monthName = monthNames[monthNumber - 1];
    return `${monthName} ${day}`;
}
</script>

<template>
  <div class="bg-slate-800 text-white p-4" v-text="getMonthName(date)"></div>
</template>
