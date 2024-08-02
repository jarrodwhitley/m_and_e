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
const showSettings = ref(false);
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
        showSettings.value = false
    }
}
function toggleSettings() {
    showSettings.value = !showSettings.value
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
                @toggle-menu="toggleMenu"
                :show-settings="showSettings"
                @toggle-settings="toggleSettings"/>
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
