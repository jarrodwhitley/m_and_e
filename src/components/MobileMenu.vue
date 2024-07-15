<script setup>
const props = defineProps({
    showMenu: Boolean,
    time: String
})

</script>

<template>
   <div class="absolute top-0 left-0 right-0 p-6 pb-4 text-white transition-all z-10 bg-center bg-cover"
        :class="showMenu ? 'max-h-full duration-[1000ms]' : 'max-h-16 duration-200'"
        :style="'background-image:url(' + [props.time === 'am' ? './src/assets/images/header_morning_bg.png' : '']">
         <ul class="grid grid-rows-2 gap-4 mt-14"
            :class="[showMenu ? 'opacity-100 transition-opacity-400' : 'opacity-0 transition-opacity-0']">
              <li class="text-2xl">
                    <a href="mailto:support@jarrodwhitley.com">🐞 Found a bug?</a>
              </li>
             <li class="text-2xl">
                 <a href="mailto:support@jarrodwhitley.com">☕️ Buy me a coffee </a>
             </li>
             <!-- manually set font size to 10px-->
             <li class="mt-5 text-gray-400">
                 Made with ❤️ by <a href="https://jarrodwhitley.com">Jarrod Whitley</a>
             </li>
         </ul>
   </div>
</template>