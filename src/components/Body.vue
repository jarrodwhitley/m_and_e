<script setup>

const props = defineProps({
    dateObj: Object,
    content: Object
})
</script>

<template>
    <div class="bg-white text-slate-900 h-full overflow-scroll text-justify px-8 pt-6 pb-24">
        <div class="pb-4" v-text="props.content.keyverse"></div>
        <div v-text="props.content.body"></div>
    </div>
</template>
