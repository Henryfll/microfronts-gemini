<template>
  <div>
    <h2>Item List</h2>
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item.id">
        {{ item.id }} - {{ item.name }}
        <button @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
    <p v-else>No items available.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { itemService, Item } from '../services/ItemService';

export default defineComponent({
  name: 'ItemList',
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true
    }
  },
  emits: ['item-deleted'],
  setup(props, { emit }) {
    const deleteItem = (id: number) => {
      itemService.deleteItem(id);
      emit('item-deleted');
    };

    return {
      deleteItem
    };
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
button {
  margin-left: 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
button:hover {
  background-color: #ff7875;
}
</style>
