<script setup>
const props = defineProps({
    showMenu: Boolean,
    content: Object,
    time: String,
    isIos: Boolean
})

function shareDevotion() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(`${props.content.body}`)
        alert('Devotion copied to clipboard!')
    }
}
function tipMe() {
    alert('yay!')
}
function showSettings() {
    alert('settings!')
}
</script>

<template>
    <div class="absolute top-0 left-0 right-0 p-6 pb-4 text-white transition-all z-10 bg-center bg-cover shadow-gray-700"
         :class="showMenu ? 'max-h-full duration-[1000ms] shadow-lg' : 'max-h-16 duration-0 pointer-events-none'">
        <ul class="grid gap-2 justify-end text-right font-bold text-[1rem] mt-14 transition"
            :class="[showMenu ? 'opacity-100 duration-300 delay-200' : 'opacity-0 duration-0']">
            <li v-if="!props.isIos" class="text-xl">
                <a href="#" @click="shareDevotion">↑ Share Devotion</a>
            </li>
            <li class="text-xl">
                <a href="#" @click="showSettings">⛭ Settings</a>
            </li>
            <li class="text-xl">
                <a href="#" @click="tipMe">☕️ Buy me a coffee</a>
            </li>
            <li class="text-xl border-white border- rounded">
                <a href="mailto:hello+bugs@jarrodwhitley.com">🐞 Found a bug?</a>
            </li>
            <li class="mt-5 col-span-full">
                Made with ❤️ by <a href="https://jarrodwhitley.com">Jarrod Whitley</a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
$green: #315668;
#mobileMenu {
    &.max-h-full {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to top, rgba($green, 0.9), transparent);
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
</style>