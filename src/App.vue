<script setup>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import MobileMenu from './components/MobileMenu.vue'
// import Footer from './components/Footer.vue'
import { onBeforeMount, ref } from "vue";
import content from "./assets/content.json";

let dateObj = {};
let selectedContent = {};
const showMenu = ref(false);

onBeforeMount(() => {
    createDateObj();
    fetchContent();
});

async function createDateObj() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let time;
    if (date.getHours() > 12) {
        time = 'pm';
    } else {
        time = 'am';
    }
    dateObj.date = `${month}-${day}`;
    dateObj.time = time;
    // console.log(dateObj);

}
async function fetchContent() {
    content.forEach((item) => {
        if (item.date === dateObj.date && item.time === dateObj.time) {
            selectedContent = item;
        }
    });
}
function toggleMenu() {
    showMenu.value = !showMenu.value;
    console.log('App.vue -> showMenu', showMenu)
}
</script>

<template>
    <div class="grid grid-rows-[60px_1fr] max-h-screen">
        <Header v-if="dateObj.date" :date="dateObj.date" :time="dateObj.time" @toggle-menu="toggleMenu"/>
        <Body v-if="selectedContent.body" :date="dateObj" :content="selectedContent"/>
        <MobileMenu :show-menu="showMenu"/>
    </div>
</template>

<style>
    body {
        overflow: hidden;
    }
</style>
