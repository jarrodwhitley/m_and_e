<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
<div class="bg-slate-800 p-8 text-white">Footer</div>
</template>

<style scoped>

</style>
