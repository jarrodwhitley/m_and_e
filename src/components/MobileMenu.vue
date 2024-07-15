<script setup>
const props = defineProps({
    showMenu: Boolean
})

</script>

<template>
   <div class="absolute top-14 left-0 right-0 max-h-fit p-6 pb-4 bg-[#305665] text-white transition-transform z-10"
   :class="showMenu ? 'translate-y-0' : '-translate-y-full'">
         <ul class="grid grid-rows-2 gap-4">
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