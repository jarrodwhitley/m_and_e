<script setup>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import MobileMenu from './components/MobileMenu.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
// import Footer from './components/Footer.vue'
import {onBeforeMount, onMounted, ref} from "vue";
import content from "./assets/content.json";

let dateObj = {};
const isLoading = ref(true);
const selectedContent = ref({});
const showMenu = ref(false);
const isIos = ref(navigator.userAgent.match(/(iPod|iPhone|iPad)/));

onBeforeMount(() => {
    createDateObj();
    fetchContent();
});

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
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
            selectedContent.value = item;
        }
    });
}
function toggleMenu() {
    showMenu.value = !showMenu.value;
}
</script>

<template>
    <LoadingOverlay :loading="isLoading"/>
    <div class="grid grid-rows-[auto_1fr] min-h-screen max-h-screen bg-[#315668]">
        <Header id="header" v-if="dateObj.date" :date="dateObj.date" :time="dateObj.time" :show-menu="showMenu" @toggle-menu="toggleMenu"/>
        <Body id="body" v-if="selectedContent.body" :date="dateObj" :content="selectedContent"/>
        <MobileMenu id="mobileMenu" :show-menu="showMenu" :content="selectedContent" :date-obj="dateObj" :time="dateObj.time" :isIos="isIos"/>
    </div>
</template>

<style>
    body {
        overflow: hidden;
    }
</style>
