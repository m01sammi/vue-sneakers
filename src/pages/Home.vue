<script setup>
import { computed, inject, onMounted, provide, reactive, ref, watch } from 'vue';
import axios from 'axios';
import CardList from '../components/CardList.vue';
import debounce from 'lodash.debounce';

const items = ref([]);

const { drawer, addToDrawer, deleteFromDrawer } = inject('drawer');

const filters = reactive({
  searchQuery: '',
  sortBy: ''
})

const handleAdd = (item) => {
  if (!item.isAdded) {
    addToDrawer(item);
  } else {
    deleteFromDrawer(item);
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce ((event) => {
  filters.searchQuery = event.target.value
}, 100)

const fetchItems =  async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://f99823dee7774502.mokky.dev/items`, { params });
    items.value = data.map(item => ({ ...item, isFavorite: false, isAdded: false, favoriteId: null }));
  } catch (error) {
    console.log(error);
  }
}

const fetchFavorities = async () => {
  try {
    const { data } = await axios.get(`https://f99823dee7774502.mokky.dev/favorities`);
    items.value = items.value.map(item => {
      const favorities = data.find(favorite => favorite.itemId === item.id)
      if (!favorities) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorities.id
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const addToFavorities = async (item) => {
  try {
    const idx = items.value.findIndex((i) => i.id === item.id);

    if (idx === -1) return;

    if (!item.isFavorite) {
      const payload = {
        itemId: item.id,
        item
      };
      items.value[idx].isFavorite = true;
      const { data } = await axios.post(`https://f99823dee7774502.mokky.dev/favorities`, payload);
      items.value[idx].favoriteId = data.id;
    } else {
      items.value[idx].isFavorite = false;
      await axios.delete(`https://f99823dee7774502.mokky.dev/favorities/${item.favoriteId}`);
      items.value[idx].favoriteId = null;
    }
  } catch (error) {
    console.log(error);
  }
};


onMounted(async () => {
  await fetchItems();
  await fetchFavorities();

  items.value = items.value.map(item => ({ ...item, isAdded: drawer.value.some((i)=> i.id === item.id) }));
});
watch(filters, fetchItems)

watch(drawer, () => {
  items.value = items.value.map(item => ({ ...item, isAdded: false }));
})

</script>

<template>
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
  <CardList :items="items" @addToFavorities="addToFavorities" @handleAdd="handleAdd" />
</template>
