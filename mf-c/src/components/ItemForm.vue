<template>
  <div>
    <h2>Add New Item</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="name" type="text" maxlength="50" required />
      </div>
      <button type="submit">Add</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { itemService } from '../services/ItemService';

export default defineComponent({
  name: 'ItemForm',
  emits: ['item-added'],
  setup(props, { emit }) {
    const name = ref('');
    const error = ref('');

    const submitForm = () => {
      error.value = '';
      if (!name.value.trim()) {
        error.value = 'Name is required';
        return;
      }
      if (name.value.length > 50) {
        error.value = 'Name must be 50 characters or less';
        return;
      }

      try {
        itemService.createItem(name.value.trim());
        name.value = '';
        emit('item-added');
      } catch (e: any) {
        error.value = e.message || 'An error occurred';
      }
    };

    return {
      name,
      error,
      submitForm
    };
  }
});
</script>

<style scoped>
.error {
  color: red;
}
form {
  margin-bottom: 20px;
}
label {
  margin-right: 10px;
}
button {
  margin-left: 10px;
  background-color: #41b883;
  color: white;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
}
button:hover {
  background-color: #42b983;
}
</style>
