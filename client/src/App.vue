<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
    <div class="container">
        <Navbar />
        <RouterView />
    </div>
</template>

<style scoped>
* {
    /* CSS Variables */
    --dark-text-color: rgb(143, 144, 144);
    --dark-bg-color: rgb(42, 43, 43);
    --accent-color: rgb(42, 192, 223);
    --dark-navbar-bg-color: rgb(59, 60, 60);
    --dark-navbar-text-color: rgb(225, 229, 230);
    --navbar-height: 70px;

    color: var(--dark-text-color);
    background-color: var(--dark-bg-color);

    text-decoration: none;
}

.container {
    min-height: 100vh;
    width: 100%;
}
</style>
