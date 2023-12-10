<template>
<div class="inputBox">

  <input type="submit" :value="value">

</div>
</template>
<script setup>
import { defineProps } from 'vue';
  // Access props directly from the `props` object
  const { value } = defineProps(['value']);

</script>
<style scoped>
.inputBox
{
  position: relative;
  width: 100%;
}
.inputBox input 
{
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
.inputBox i 
{
  position: absolute;
  left: 0;
  padding: 15px 10px;
  font-style: normal;
  color: #aaa;
  transition: 0.5s;
  pointer-events: none;
}
.inputBox input:focus ~ i,
.inputBox input:valid ~ i
{
  transform: translateY(-7.5px);
  font-size: 0.8em;
  color: #fff;
}

input[type="submit"]
{
  padding: 10px;
  background: #0f0;
  color: #000;
  font-weight: 600;
  font-size: 1.35em;
  letter-spacing: 0.05em;
  cursor: pointer;
}
input[type="submit"]:active
{
  opacity: 0.6;
}

input[type="submit"]:hover
{
  color: #0f0;
  border: 1px solid #0f0;
  background-color: #000;
}
</style>