<script setup>
import HomePage from './pages/Home.vue';
import Drawer from './components/Drawer.vue';
import Header from './components/Header.vue';
import CardList from './components/CardList.vue';
import { computed, reactive, ref, onMounted, watch, provide } from 'vue';
import axios from 'axios';

const drawer = ref([]);

const drawerVisible = ref(false);


const filters = reactive({
  searchQuery: '',
  sortBy: ''
})

const totalPrice = computed(() => 
  drawer.value.reduce((acc, item) => acc + item.price, 0
));

const vatPrice = computed(() => 
  Math.round(totalPrice.value * 0.05)
);

const addToDrawer = (item) => {
  drawer.value.push(item);
  item.isAdded = true;
}

const deleteFromDrawer = (item) => {
  drawer.value.splice(drawer.value.indexOf(item), 1);
  item.isAdded = false;
}

const handleAdd = (item) => {
  if (!item.isAdded) {
    addToDrawer(item);
  } else {
    deleteFromDrawer(item);
  }
}

const closeDrawer = () => {
  drawerVisible.value = false;
}

const openDrawer = () => {
  drawerVisible.value = true;
}



onMounted(() => {
  drawer.value = JSON.parse(localStorage.getItem('drawer')) || [];
})

watch(drawer, () => {
  localStorage.setItem('drawer', JSON.stringify(drawer.value));
}, { deep: true })

provide('drawer', {
  drawer,
  closeDrawer,
  totalPrice,
  openDrawer, 
  addToDrawer,
  deleteFromDrawer,
});


</script>

<template>
  <Drawer v-if="drawerVisible" isCreatingOrder="isCreatingOrder" @createOrder="createOrder" :totalPrice="totalPrice" :vatPrice="vatPrice" @close="drawerVisible = false" />

  <div class="bg-white w-3/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header :totalPrice="totalPrice" @openDrawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>