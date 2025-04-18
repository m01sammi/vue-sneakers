<script setup>
import { inject } from 'vue';
import DrawerItem from './DrawerItem.vue';

  const { drawer, deleteFromDrawer } = inject('drawer');
</script>

<template>
    <div class="flex flex-col gap-5" v-auto-animate>
        <DrawerItem
          v-for="item in drawer"
          :key="item.id"
          :imageUrl="item.imageUrl"
          :title="item.title"
          :price="item.price"
          :onClickDelete="() => deleteFromDrawer(item)"
        />
      </div>
</template>