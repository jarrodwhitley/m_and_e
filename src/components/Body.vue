<script setup>
import {onMounted} from 'vue'


defineProps({
    content: Object
})

onMounted(() => {
    console.log(content);
})

</script>

<template>
    <div class="bg-white text-slate-900 h-max p-8">
        <div class="pb-4" v-text="content.keyverse"></div>
        <div v-text="content.body"></div>
    </div>
</template>

<style scoped>
</style>
