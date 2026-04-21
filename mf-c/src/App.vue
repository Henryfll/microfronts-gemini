<template>
  <div class="mf-c-app">
    <h1>MF-C (Vue)</h1>
    <ItemForm @item-added="fetchItems" />
    <ItemList :items="items" @item-deleted="fetchItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ItemList from './components/ItemList.vue';
import ItemForm from './components/ItemForm.vue';
import { itemService, Item } from './services/ItemService';

export default defineComponent({
  name: 'App',
  components: {
    ItemList,
    ItemForm
  },
  setup() {
    const items = ref<Item[]>([]);

    const fetchItems = () => {
      items.value = itemService.getItems();
    };

    onMounted(() => {
      fetchItems();
    });

    return {
      items,
      fetchItems
    };
  }
});
</script>

<style scoped>
.mf-c-app {
  font-family: Arial, sans-serif;
  border: 1px solid #41b883;
  padding: 20px;
  border-radius: 8px;
}
</style>
