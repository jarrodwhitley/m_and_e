<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="bg-slate-800 text-white">Header</div>
</template>

<style scoped>

</style>
