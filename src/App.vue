<script setup>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import Footer from './components/Footer.vue'
import content from './assets/content.json';
import {onMounted} from "vue";

let dateObj = {};
let currentContent = {};

onMounted(() => {
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

    content.forEach((item) => {
        if (item.date === dateObj.date && item.time === dateObj.time) {
            currentContent = item;
            console.log(currentContent);
        }
    });
});

</script>

<template>
<!--    <Header :date="dateObj.date"/>-->
    <Body :date="dateObj" :content="currentContent"/>
    <Footer/>
</template>
