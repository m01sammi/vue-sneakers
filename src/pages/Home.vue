<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';

import Card from '../components/Card.vue';
import Header from '../components/Header.vue';
import CardList from '../components/CardList.vue';

const items = ref([]);

const sortBy = ref('');
const searchQuery = ref('');

const onChangeSelect = (event) => {
  sortBy.value = event.target.value
}

const onChangeSearchInput = (event) => {
  searchQuery.value = event.target.value
}

onMounted(async () => {
    try {
      const { data } = await axios.get('https://f99823dee7774502.mokky.dev/items');
      items.value = data;
    } catch (error) {
      console.log(error);
    }
});

watch(sortBy, async () => {
  try {
      const { data } = await axios.get('https://f99823dee7774502.mokky.dev/items?sortBy=' + sortBy.value);
      items.value = data;
    } catch (error) {
      console.log(error);
    }
})

watch(searchQuery, async () => {
  try {
      const { data } = await axios.get('https://f99823dee7774502.mokky.dev/items?searchQuery=' + searchQuery.value);
      items.value = data;
    } catch (error) {
      console.log(error);
    }
})
</script>

<template>
  <div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input @input="onChangeSearchInput"
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Поиск..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div>
      </div>

      <CardList :items="items"/>
    </div>
  </div>
</template>
