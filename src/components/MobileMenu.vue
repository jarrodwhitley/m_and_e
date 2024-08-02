<script setup>
import {useAppStore} from '../store'

defineEmits(['toggleSettings', 'increaseFontSize', 'decreaseFontSize'])

const props = defineProps({
    showMenu: Boolean,
    showSettings: Boolean,
    content: Object,
    time: String,
    isIos: Boolean
})

const store = useAppStore()

function shareDevotion() {
    // Only works with https
    if (navigator.share) {
        navigator.share({
                title: 'Morning and Evening Devotion',
                text: 'Check out this devotion I found!',
                url: 'https://jarrodwhitley.github.io/m_and_e'
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    } else {
        console.log('Web Share API not supported');
    }
}
function tipMe() {
    alert('yay!')
}
</script>

<template>
    <div class="absolute top-[60px] left-0 right-0 bottom-0 p-4 transition-all z-10 bg-white text-gray-800 overflow-hidden"
         :class="props.showMenu ? 'translate-x-0' : 'translate-x-full'"
         :style="'font-size:' + store.fontSize.toString() +'px;'">
        <div class="grid w-full md:w-1/2 font-bold mt-2 transition"
             :class="[showMenu ? 'opacity-100 duration-300 delay-200' : 'opacity-0 duration-0']">
            <h2 id="appearanceHeading" class="font-light text-gray-400">Appearance</h2>
            <div class="mode__container container grid grid-rows-2 items-center bg-gray-100 p-4 pt-0 mt-2 rounded">
                <label for="modeInput" class="font-bold">Theme</label>
                <div class="grid grid-cols-3 justify-between justify-self-end gap-2 w-full">
                    <div class="theme-btn" :class="{'selected': store.theme === 'auto'}"
                         @click="$emit('theme-auto')">
                        <input type="radio" id="auto" name="mode" value="auto" class="hidden">
                        <label for="auto" class="button bg-gray-200 px-5 py-2 rounded flex items-center justify-center">
                            Auto
                        </label>
                    </div>
                    <div class="theme-btn" :class="{'selected': store.theme === 'light'}"
                         @click="$emit('theme-light')">
                        <input type="radio" id="light" name="mode" value="light" class="hidden">
                        <label for="light" class="button bg-gray-200 px-5 py-2 w-full rounded flex items-center justify-center">
                            Light
                        </label>
                    </div>
                    <div class="theme-btn" :class="{'selected': store.theme === 'dark'}"
                         @click="$emit('theme-dark')">
                        <input type="radio" id="dark" name="mode" value="dark" class="hidden">
                        <label for="dark" class="button bg-gray-200 px-5 py-2 rounded flex items-center justify-center">
                            Dark
                        </label>
                    </div>
                </div>
            </div>
            <div class="font-size__container container grid w-full grid-cols-2 items-center justify-start bg-gray-100 p-4 mt-2 rounded">
                <label for="fontSize" class=" font-bold">Font Size - {{ store.fontSize }}</label>
                <div class="flex justify-between justify-self-end gap-2 w-fit">
                    <!-- use slider to change font size -->
<!--                    <input type="range" id="fontSize" name="fontSize" min="12" max="25" step="1" class="w-full"-->
<!--                           v-model="store.fontSize"/>-->
                    <button class="text-2xl button bg-gray-200 px-5 py-2 rounded flex items-center justify-center"
                            :class="{'disabled': store.fontSize === 12}"
                            @click="$emit('decreaseFontSize')">
                        <img class="h-4 w-4" src="../assets/minus-solid.svg" alt="decrease font size"/>
                    </button>
                    <button class="text-2xl button bg-gray-200 px-5 py-1 rounded flex items-center justify-center"
                            :class="{'disabled': store.fontSize === 25}"
                            @click="$emit('increaseFontSize')">
                        <img class="h-4 w-4" src="../assets/plus-solid.svg" alt="increase font size"/>
                    </button>
                </div>
            </div>
            <h2 id="appearanceHeading" class="font-light text-gray-400 mt-4">Support</h2>
            <div class="mt-2 flex flex-col items-center justify-center">
                <a class="menu-button m-0" href="#" @click="shareDevotion">
                    <img class="w-4 mr-2 inline" src="../assets/share-solid-gray.svg"/>Share App</a>
                <a class="menu-button" href="https://buymeacoffee.com/jarrodwhitley">
                    <img class="w-4 mr-2 inline -translate-y-[2px]" src="../assets/coffee-gray.png"/>Buy me a coffee</a>
                <a class="menu-button" href="mailto:support+m_and_e@jarrodwhitley.com">
                    <img class="w-4 mr-2 inline" src="../assets/bug-solid-gray.svg"/>Found a bug?</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#mobileMenu {
    &.max-h-full {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;

            .evening & {
                background: linear-gradient(to bottom, #342154, #26183d);
            }

            .morning & {
                background: linear-gradient(to bottom, #72baac, #5b9489);
            }
        }
    }
}
#sharingLink {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.theme-btn.selected label {
    background-color: gray;
    color: white;
}
</style>