<script setup>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import MobileMenu from './components/MobileMenu.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
// import Footer from './components/Footer.vue'
import {computed, onBeforeMount, onMounted, ref} from "vue";
import content from "./assets/content.json";
import {useAppStore} from './store'

const dayColor = "#74b9ac";
const nightColor = "#332154";
// const color = hours < 12 ? dayColor : nightColor;
let dateObj = {};
const isLoading = ref(true);
const selectedContent = ref({});
const showMenu = ref(false);
const showAbout = ref(false);
const isIos = ref(navigator.userAgent.match(/(iPod|iPhone|iPad)/));
const store = useAppStore()
const theme = computed(() => {
    if (store.theme === 'auto') {
        if (dateObj.time === 'am') {
            return 'morning';
        } else {
            return 'evening';
        }
    } else if (store.theme === 'light') {
        return 'morning';
    } else {
        return 'evening';
    }
})

onBeforeMount(() => {
    createDateObj();
    fetchContent();
    setStatusBarTheme();
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
}
async function fetchContent() {
    content.forEach((item) => {
        if (item.date === dateObj.date && item.time === dateObj.time) {
            selectedContent.value = item;
        }
    });
}
function toggleMenu() {
    showMenu.value = !showMenu.value
    if (showMenu.value === false) {
        showAbout.value = false
    } else {
        showAbout.value = false
    }
}
function toggleAbout() {
    showAbout.value = !showAbout.value
}
function increaseFontSize() {
    if (store.fontSize < 25) {
        store.setFontSize(store.fontSize + 1);
    }
}
function decreaseFontSize() {
    if (store.fontSize > 12) {
        store.setFontSize(store.fontSize - 1);
    }
}
function setAppTheme(string) {
    store.setTheme(string);
    setStatusBarTheme();
}
function setStatusBarTheme() {
    let color;
    if (store.theme === 'auto') {
        if (dateObj.time === 'am') {
            color = dayColor;
        } else {
            color = nightColor;
        }
    } else if (store.theme === 'light') {
        color = dayColor;
    } else if (store.theme === 'dark') {
        color = nightColor;
    }
    document.querySelector('meta[name="theme-color"]').setAttribute('content', color);
}
</script>

<template>
    <LoadingOverlay :loading="isLoading" :time="dateObj.time"/>
    <div v-if="!isLoading" class="grid auto-rows-min min-h-screen max-h-screen bg-center bg-cover"
         :class="theme">
        <Header id="header"
                v-if="dateObj.date"
                :date="dateObj.date"
                :time="dateObj.time"
                :show-menu="showMenu"
                :show-about="showAbout"
                @toggle-menu="toggleMenu"
                @toggle-about="toggleAbout"/>
        <Body v-if="selectedContent.body"
              :date="dateObj"
              :time="dateObj.time"
              :content="selectedContent"/>
        <MobileMenu id="mobileMenu"
                    :show-menu="showMenu"
                    :show-settings="showSettings"
                    @toggle-settings="toggleSettings"
                    @increase-font-size="increaseFontSize"
                    @decrease-font-size="decreaseFontSize"
                    @reset-settings="store.resetSettings"
                    @theme-auto="setAppTheme('auto')"
                    @theme-light="setAppTheme('light')"
                    @theme-dark="setAppTheme('dark')"
                    :content="selectedContent"
                    :time="dateObj.time"
                    :isIos="isIos"/>
        <div class="modal absolute transition-all top-[60px] bottom-0 left-0 right-0 z-30 bg-white overflow-auto p-8 md:w-1/2 shadow-lg"
             :class="showAbout ? '-translate-x-0' : '-translate-x-full'">
<!--            <img class="close fixed w-6 top-4 right-4 opacity-40" @click="toggleAbout" src="/src/assets/xmark-solid.png" alt=""/>-->
            <img class="w-20 mx-auto" src="/assets/spurgeon_icon.png" alt="spurgeon icon black"/>
            <h1 class="text-3xl text-center">Morning & Evening</h1>
            <h3 class="text-center">By Charles Haddon Spurgeon</h3>
            <p class="mt-8">Charles Haddon Spurgeon (1834-1892) was a British Baptist minister and renowned author who is considered one of the most influential figures in Christian history. Known as the "Prince of Preachers," Spurgeon delivered powerful sermons that attracted thousands of people every week, filling London's Metropolitan Tabernacle to capacity. He was also a prolific writer, penning countless devotionals, commentaries, and sermons that continue to inspire and encourage readers today.</p>
            <p>"Morning and Evening" is a collection of daily devotionals that Spurgeon wrote to provide readers with a daily reminder of God's presence and grace. The devotionals are organized into morning and evening entries for each day of the year, offering timeless insights and encouragement that are still relevant to readers today.</p>
            <p>With its eloquent language and profound spiritual truths, "Morning and Evening" is a beloved classic in Christian literature that continues to inspire and uplift readers around the world.</p>
            <p class="public-domain-information mt-4">
                <em>This work is in the public domain in the United States because it was published before January 1, 1923.</em>
            </p>
        </div>
    </div>
</template>

<style lang="scss">
    body {
        overflow: hidden;
        touch-action: manipulation;
    }

    div {
        &.morning {
            background-image: url('/assets/header_morning_bg.png');
        }
        &.evening {
            background-image: url('/assets/header_evening_bg.png');
        }
    }
</style>
