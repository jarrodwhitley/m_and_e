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
    if (date.getHours() >= 12) {
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
    <div v-if="!isLoading" class="app-scene" :class="theme">
        <div class="scene-shape shape-a"></div>
        <div class="scene-shape shape-b"></div>
        <div class="scene-shape shape-c"></div>
        <div class="reader-shell">
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
                        @close-menu="toggleMenu"
                        @increase-font-size="increaseFontSize"
                        @decrease-font-size="decreaseFontSize"
                        @reset-settings="store.resetSettings"
                        @theme-auto="setAppTheme('auto')"
                        @theme-light="setAppTheme('light')"
                        @theme-dark="setAppTheme('dark')"
                        :content="selectedContent"
                        :time="dateObj.time"
                        :isIos="isIos"/>
        </div>
        <div class="modal transition-all"
             :class="showAbout ? '-translate-x-0' : '-translate-x-full'">
            <button class="modal-close" @click="toggleAbout" aria-label="Close about dialog">×</button>
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
        overflow: auto;
        overflow-x: hidden;
        touch-action: manipulation;
        margin: 0;
        font-family: "Avenir Next", "Segoe UI", sans-serif;
    }

    .app-scene {
        --scene-bg: #eee8df;
        --card-bg: #f3f5f6;
        --ink: #1d2330;
        --muted: #6c7786;
        --accent: #a8c9d2;
        --accent-deep: #7aa8b7;
        min-height: 100vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        overflow-x: clip;
        background: radial-gradient(circle at 20% 20%, #f7f1e8 0%, var(--scene-bg) 60%);
        padding: 0;
    }

    .scene-shape {
        position: absolute;
        border-radius: 999px;
        opacity: 0.35;
        filter: blur(0px);
        pointer-events: none;
    }

    .shape-a {
        width: 18rem;
        height: 18rem;
        background: #d9ebef;
        left: -4rem;
        top: -4rem;
    }

    .shape-b {
        width: 22rem;
        height: 22rem;
        background: #f2ddc7;
        right: -7rem;
        bottom: -8rem;
    }

    .shape-c {
        width: 14rem;
        height: 14rem;
        background: #dce2d4;
        right: 8%;
        top: 10%;
    }

    .reader-shell {
        width: 100%;
        max-width: 28rem;
        min-height: 100vh;
        max-height: 100vh;
        position: relative;
        z-index: 2;
        border-radius: 0;
        border: 0;
        background: var(--card-bg);
        box-shadow: 0 18px 42px rgba(48, 55, 70, 0.16), inset 0 0 0 1px rgba(121, 152, 166, 0.18);
        overflow: hidden;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
    }

    .modal {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 30;
        overflow: auto;
        padding: 2rem;
        background: #ffffff;
        color: var(--ink);
        box-shadow: 0 20px 45px rgba(22, 25, 32, 0.22);
    }

    .modal-close {
        position: absolute;
        top: 0.9rem;
        right: 0.9rem;
        width: 2.2rem;
        height: 2.2rem;
        border: 0;
        border-radius: 999px;
        background: #e2e8ee;
        color: #2a3a4b;
        font-size: 1.45rem;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .morning {
        --scene-bg: #ebe6dd;
        --card-bg: #f5f7f8;
        --accent: #a7c8d1;
        --accent-deep: #78a6b4;
    }

    .evening {
        --scene-bg: #ded7d0;
        --card-bg: #ececf1;
        --accent: #9ea9d4;
        --accent-deep: #6674a9;
    }

    @media (max-width: 767px) {
        .shape-c {
            display: none;
        }
    }

    @media (min-width: 960px) {
        .reader-shell {
            min-height: calc(100vh - 2rem);
            max-height: calc(100vh - 2rem);
        }
    }
</style>
