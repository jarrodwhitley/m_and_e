<script setup>
const props = defineProps({
    loading: Boolean
})
</script>

<template>
    <div id="loadingOverlay" class="absolute top-0 bottom-0 left-0 right-0 z-50 bg-cover flex justify-center items-center duration-500 pointer-events-none"
         :class="loading ? 'opacity-100 ' : 'opacity-0'">
        <img src="/assets/spurgeon_icon.png"
             class="w-3/4 h-auto z-10 mix-blend-screen animate-grow"
             alt="icon image"/>
    </div>
</template>

<style lang="scss" scoped>
#loadingOverlay {
    background-image: url('/assets/loading_bg.png');
}
@keyframes grow {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
.animate-grow {
    animation: grow 2s infinite;
}
</style>