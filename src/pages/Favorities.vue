<script setup>
import CardList from '@/components/CardList.vue';
import axios from 'axios';
import { computed, inject, onMounted, provide, reactive, ref, watch } from 'vue';

const favorities = ref([]);

onMounted(async () => {
    try {
        const { data } = await axios.get(`https://f99823dee7774502.mokky.dev/favorities?_relations=items`);  
        favorities.value = data.map(favorite => favorite.item);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
})
</script>

<template>
    <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
    <CardList :items="favorities" isFavorities/>
</template>