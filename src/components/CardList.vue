<script setup>
import Card from './Card.vue';

defineProps({
    items: Array
})

const onClickAdd = () => {};
</script>

<template>
    <div class="grid grid-cols-4 gap-10">
        <Card
            v-for="item in items"
            :key="item.id"
            :title="item.title"
            :price="item.price"
            :imageUrl="item.imageUrl"
        />
      </div>
</template>