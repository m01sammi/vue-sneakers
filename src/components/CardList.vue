<script setup>
import { inject } from 'vue';
import Card from './Card.vue';

defineProps({
    items: Array,
    isFavorities: Boolean
})

const emit = defineEmits(['addToFavorities', 'handleAdd']);

</script>

<template>
    <div class="grid grid-cols-4 gap-10" v-auto-animate>
        <Card 
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :price="item.price"
            :imageUrl="item.imageUrl"
            :onClickFavorite="isFavorities ? null : () => emit('addToFavorities', item)"
            :onClickAdd="() => emit('handleAdd', item)"
            :isFavorite="item.isFavorite"
            :isAdded="item.isAdded"
        />
      </div>
</template>