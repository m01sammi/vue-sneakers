<script setup>
defineProps({
    title: String,
    description: String,
    imageUrl: String   
})
</script>

<template>
    <div class="flex flex-col items-center" v-auto-animate> 
        <img class="w-100 h-100" :src="imageUrl" alt="Info" />
        <h2 class="text-2xl font-bold mt-4">{{ title }}</h2>
        <p class="text-grey-400 mt-2 text-center">{{ description }}</p>
    </div>
</template>