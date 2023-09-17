<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar">
        <div class="link-wrapper">
            <RouterLink to="/" class="home-link link">Home</RouterLink>
            <RouterLink to="/login" class="login-link link">Login</RouterLink>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    width: 100%;
    height: var(--navbar-height);
    background-color: var(--dark-navbar-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
}

.link-wrapper {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.link {
    font-size: 1.6rem;
    color: var(--dark-navbar-text-color);
    text-decoration: none;
    margin: 0 10px;
    transition: all 0.05s ease-in-out;
}

.link:hover {
    color: var(--accent-color);
}

.link:active {
    transform: scale(0.97);
}
</style>