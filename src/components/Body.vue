<script setup>
import {onMounted} from 'vue'

const props = defineProps({
    dateObj: Object,
    content: Object
})

</script>

<template>
    <div class="bg-white text-slate-900 h-max p-8">
        <div class="pb-4" v-text="props.content.keyverse"></div>
        <div v-text="props.content.body"></div>
    </div>
</template>

<style scoped>
</style>
