<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import Header from './components/Header.vue'
import Body from './components/Body.vue'
import MobileMenu from './components/MobileMenu.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import FooterControlBar from './components/FooterControlBar.vue'
import SearchPanel from './components/SearchPanel.vue'
import DatePickerPanel from './components/DatePickerPanel.vue'
import BookmarksPanel from './components/BookmarksPanel.vue'
import { useAppStore } from './store'

const dayColor = '#74b9ac'
const nightColor = '#332154'

const isLoading = ref(true)
const showMenu = ref(false)
const showAbout = ref(false)
const showSearch = ref(false)
const showDatePicker = ref(false)
const showBookmarks = ref(false)
const isIos = ref(navigator.userAgent.match(/(iPod|iPhone|iPad)/))

const store = useAppStore()
let dateTimer = null

const selectedContent = computed(() => store.activeDevotional || {})
const effectiveDate = computed(() => store.effectiveDate)
const effectiveTime = computed(() => store.effectivePeriod)
const bookmarkCount = computed(() => store.bookmarks.length)

const isCurrentBookmarked = computed(() => {
    if (!effectiveDate.value || !effectiveTime.value) {
        return false
    }

    return store.isBookmarked(effectiveDate.value, effectiveTime.value)
})

const theme = computed(() => {
    if (store.theme === 'auto') {
        return effectiveTime.value === 'am' ? 'morning' : 'evening'
    }

    return store.theme === 'light' ? 'morning' : 'evening'
})

onBeforeMount(() => {
    store.initializeDateContext()
    store.loadBookmarksFromStorage()
    setStatusBarTheme()
})

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 2000)

    dateTimer = setInterval(() => {
        store.initializeDateContext()
    }, 60000)
})

onUnmounted(() => {
    if (dateTimer) {
        clearInterval(dateTimer)
    }
})

watch(theme, () => {
    setStatusBarTheme()
})

function closeNavigationPanels() {
    showSearch.value = false
    showDatePicker.value = false
    showBookmarks.value = false
}

function toggleMenu() {
    showMenu.value = !showMenu.value
    showAbout.value = false

    if (showMenu.value) {
        closeNavigationPanels()
    }
}

function toggleAbout() {
    showAbout.value = !showAbout.value
}

function openSearchPanel() {
    showMenu.value = false
    showDatePicker.value = false
    showBookmarks.value = false
    showSearch.value = true
}

function openDatePanel() {
    showMenu.value = false
    showSearch.value = false
    showBookmarks.value = false
    showDatePicker.value = true
}

function openBookmarksPanel() {
    showMenu.value = false
    showSearch.value = false
    showDatePicker.value = false
    showBookmarks.value = true
}

function openSearchResult(item) {
    store.openDevotional(item.date, item.time)
    showSearch.value = false
}

function applyDateSelection(payload) {
    store.openDevotional(payload.date, payload.period)
    showDatePicker.value = false
}

function goToToday() {
    store.goToToday()
    showDatePicker.value = false
}

function togglePeriodQuick() {
    store.togglePeriod()
}

function toggleBookmark() {
    if (!effectiveDate.value || !effectiveTime.value) {
        return
    }

    store.toggleBookmark(effectiveDate.value, effectiveTime.value)
}

function openBookmarkItem(item) {
    store.openDevotional(item.date, item.time)
    showBookmarks.value = false
}

function clearBookmarks() {
    if (!store.bookmarks.length) {
        return
    }

    if (window.confirm('Clear all saved devotionals?')) {
        store.clearBookmarks()
    }
}

function setAppTheme(nextTheme) {
    store.setTheme(nextTheme)
    setStatusBarTheme()
}

function setStatusBarTheme() {
    let color

    if (store.theme === 'auto') {
        color = effectiveTime.value === 'am' ? dayColor : nightColor
    } else if (store.theme === 'light') {
        color = dayColor
    } else {
        color = nightColor
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (metaTheme) {
        metaTheme.setAttribute('content', color)
    }
}
</script>

<template>
    <LoadingOverlay :loading="isLoading" :time="effectiveTime"/>
    <div v-if="!isLoading" class="app-scene" :class="theme">
        <div class="scene-shape shape-a"></div>
        <div class="scene-shape shape-b"></div>
        <div class="scene-shape shape-c"></div>
        <div class="reader-shell">
            <Header
                id="header"
                v-if="effectiveDate"
                :date="effectiveDate"
                :time="effectiveTime"
                :show-menu="showMenu"
                :show-about="showAbout"
                @toggle-menu="toggleMenu"
                @toggle-about="toggleAbout"
            />
            <Body
                v-if="selectedContent.body"
                :content="selectedContent"
                :is-bookmarked="isCurrentBookmarked"
                @toggle-bookmark="toggleBookmark"
            />
            <FooterControlBar
                :current-period="effectiveTime"
                :bookmark-count="bookmarkCount"
                @open-search="openSearchPanel"
                @open-date="openDatePanel"
                @open-bookmarks="openBookmarksPanel"
                @toggle-period="togglePeriodQuick"
            />
            <MobileMenu
                id="mobileMenu"
                :show-menu="showMenu"
                :content="selectedContent"
                :time="effectiveTime"
                :isIos="isIos"
                @close-menu="toggleMenu"
                @reset-settings="store.resetSettings"
                @theme-auto="setAppTheme('auto')"
                @theme-light="setAppTheme('light')"
                @theme-dark="setAppTheme('dark')"
            />
            <SearchPanel
                :show="showSearch"
                :query="store.searchQuery"
                :results="store.searchResults"
                @close="showSearch = false"
                @update-query="store.searchDevotionals"
                @open-result="openSearchResult"
            />
            <DatePickerPanel
                :show="showDatePicker"
                :current-date="effectiveDate"
                :current-period="effectiveTime"
                @close="showDatePicker = false"
                @select-date="applyDateSelection"
                @go-today="goToToday"
            />
            <BookmarksPanel
                :show="showBookmarks"
                :bookmarks="store.bookmarkedDevotionals"
                @close="showBookmarks = false"
                @open-bookmark="openBookmarkItem"
                @clear-bookmarks="clearBookmarks"
            />
        </div>
        <div class="modal transition-all" :class="showAbout ? '-translate-x-0' : '-translate-x-full'">
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
    --safe-bottom: env(safe-area-inset-bottom, 0px);
    --control-bar-height: 58px;
    min-height: 100dvh;
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
    min-height: 100dvh;
    max-height: 100dvh;
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
        min-height: calc(100dvh - 2rem);
        max-height: calc(100dvh - 2rem);
    }
}
</style>
