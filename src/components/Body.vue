<script setup>
import { onMounted, ref } from 'vue'
import { useAppStore } from "../store";

const props = defineProps({
    dateObj: Object,
    content: Object,
})

const store = useAppStore()

const verseReference = ref('')
const bodyContent = ref('')
const fontSize = ref('')

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
    <div id="body" :style="'font-size:'+ store.fontSize || 14 +'px'" class="bg-white text-slate-900 h-[80vh] overflow-scroll text-justify p-4 mx-4 mt-2 rounded md:p-8 md:w-[800px] md:mx-auto md:overflow-auto">
        <div class="pb-4" v-text="props.content.keyverse"></div>
        <div v-text="bodyContent"></div>
    </div>
</template>