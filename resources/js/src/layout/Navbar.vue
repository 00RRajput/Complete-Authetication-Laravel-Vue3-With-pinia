<template>
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
  
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default>
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>
  
      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Link 1</b-nav-item>
          <b-nav-item href="#">Link 2</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
          <SubmitButton @click="logout" value="Logout" />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from "../store/auth";
  import { useRouter } from 'vue-router';
  import SubmitButton from '../components/SubmitButton.vue';

  const expanded = ref(true);
  const authStore = useAuthStore(); 
  const router = useRouter();
  
  const logout = async () => {
    await authStore.logout();
    if (!authStore.isAuthenticated) router.push({ name: 'Login' });
  }
</script>
  
  