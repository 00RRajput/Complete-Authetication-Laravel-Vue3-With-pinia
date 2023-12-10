<template>
    <div class="inputBox">
      <input :type="type" v-model="value" @input="handleInput" required>
      <i>{{ label }}</i>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
  
const emit = defineEmits();
  const { type, label } = defineProps(['type', 'label']);
  const value = ref('');
  
  const handleInput = (event) => emit('update:modelValue', event.target.value);
  
  onMounted(() => {
    // console.log('label', type);
  });
  </script>
  
  <style scoped>
  .inputBox {
    position: relative;
    width: 100%;
  }
  
  .inputBox input {
    position: relative;
    width: 100%;
    background: #333;
    border: none;
    outline: none;
    padding: 25px 10px 7.5px;
    border-radius: 4px;
    color: #fff;
    font-weight: 500;
    font-size: 1em;
  }
  
  .inputBox i {
    position: absolute;
    left: 0;
    padding: 15px 10px;
    font-style: normal;
    color: #aaa;
    transition: 0.5s;
    pointer-events: none;
  }
  
  .inputBox input:focus ~ i,
  .inputBox input:valid ~ i {
    transform: translateY(-7.5px);
    font-size: 0.8em;
    color: #fff;
  }
  </style>
  