<script setup>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import Footer from './components/Footer.vue'
import {onMounted, onBeforeMount} from "vue";
import content from "./assets/content.json";

let dateObj = {};
let selectedContent = {};

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

</script>

<template>
    <Header v-if="dateObj.date" :date="dateObj.date"/>
    <Body v-if="selectedContent.body" :date="dateObj" :content="selectedContent"/>
<!--    <Footer/>-->
</template>
