<script setup>
import { onMounted, ref } from 'vue'
import { useAppStore} from "../store.js";

const props = defineProps({
    dateObj: Object,
    content: Object
})

const store = useAppStore()

const verseReference = ref('')
const bodyContent = ref('')

function getVerseReference(string) {
    verseReference.value = string.split('—')[1].trim()
    formatBodyContent(props.content.body)
}
function formatBodyContent(string) {
    bodyContent.value = string.split(verseReference.value)[1].trim()
}

onMounted(() => {
    getVerseReference(props.content.keyverse)
})
</script>

<template>
    <div id="body" :style="'font-size:'+ store.fontSize.toString() +'px;'"
         class="bg-white text-slate-900 h-[85vh] md:h-fit overflow-scroll text-justify p-4 mx-4 rounded md:p-8 md:w-3/4 md:mx-auto md:overflow-auto lg:w-3/4 xl:w-1/2">
        <div class="pb-4" v-text="props.content.keyverse"></div>
        <div v-text="bodyContent"></div>
    </div>
    <div class="desktop-warning hidden w-full text-center mt-4 text-white lg:block">This app is not design for large screens, so it may look wonky ¯\_(ツ)_/¯ </div>
</template>