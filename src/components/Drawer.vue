<script setup>
import DrawerItemList from './DrawerItemList.vue';
import DrawerHeader from './DrawerHeader.vue';
import InfoBlock from './InfoBlock.vue';
import axios from 'axios';
import { inject, ref } from 'vue';

defineProps({
  vatPrice: Number,
  isCreatingOrder: Boolean
})

const isCreatingOrder = ref(false);
const orderId = ref(null);

const { drawer, drawerVisible, totalPrice } = inject('drawer');

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post(`https://f99823dee7774502.mokky.dev/orders`, {
      items: drawer.value,
      totalPrice: totalPrice.value,
    })

    drawer.value = [];
    drawerVisible.value = false;

    orderId.value = data.id
  } catch (error) {
    console.log(error);
  } finally {
    isCreatingOrder.value = false;
  }
}
</script>

<template>
  <div class="fixed z-10 top-0 h-full w-full bg-black opacity-70" />
  <div class="flex flex-col justify-between fixed h-full z-10 top-0 h-full right-0 w-96 bg-white px-10 py-7" v-auto-animate>
    <DrawerHeader/>
    <div class="flex flex-col flex-1 justify-between">
      <div v-if="!totalPrice || orderId" class="flex h-full items-center justify-center">
        <InfoBlock v-if="!totalPrice && !orderId" title="Корзина пуста" description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." imageUrl="/package-icon.png" />
      
        <InfoBlock v-if="orderId" title="Заказ оформлен!" :description="`Заказ #${orderId} успешно создан. Мы свяжемся с вами в ближайшее время.`" imageUrl="/order-success-icon.png"/>
      </div>
      <DrawerItemList />

      <div v-if="totalPrice > 0">
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ totalPrice }} руб.</span>
          </div>

          <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ vatPrice }} руб.</span>
          </div>
        </div>

        <button @click="createOrder"
          class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-black text-white rounded-xl transition active:bg-green hover:bg-green"
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
