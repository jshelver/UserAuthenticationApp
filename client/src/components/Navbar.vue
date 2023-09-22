<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const dropdown = ref(false);
const dropdownCSS = ref('none');

const toggleDropdown = () => {
    dropdown.value = !dropdown.value;
    dropdownCSS.value = dropdown.value ? 'flex' : 'none';
}

onMounted(() => {
    document.addEventListener('click', (e) => {
        if (e.target.className !== 'user-button') {
            dropdown.value = false;
            dropdownCSS.value = 'none';
        }
    })
})
</script>

<template>
    <nav class="navbar">
        <div class="empty"></div>
        <div class="link-wrapper">
            <RouterLink to="/" class="home-link link" @click="toggleDropdown">Home</RouterLink>
        </div>
        <div class="user-wrapper">
            <button class="user-button" @click="toggleDropdown">User <span class="arrow">⏷</span></button>
            <div class="dropdown">
                <RouterLink to="/login" class="login-link link dropdown-link" @click="toggleDropdown">Login</RouterLink>
                <RouterLink to="/register" class="register-link link dropdown-link" @click="toggleDropdown">Register</RouterLink>
                <RouterLink to="/user" class="user-link link dropdown-link" @click="toggleDropdown">Info</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    width: 100%;
    padding-inline: 20px;
    height: var(--navbar-height);
    background-color: var(--dark-navbar-bg-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.empty, .link-wrapper, .user-wrapper {
    width: 120px;
    height: 100%;
}

.link-wrapper {
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

.user-wrapper {
    position: relative;
}

.user-button {
    width: 100%;
    height: 100%;
    background-color: var(--dark-navbar-bg-color);
    color: var(--dark-navbar-text-color);
    font-size: 1.6rem;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.05s ease-in-out;
}

.user-button:hover {
    color: var(--accent-color);
}

.dropdown {
    margin-top: 10px;
    padding-bottom: 10px;
    background-color: var(--dark-navbar-bg-color);
    display: v-bind(dropdownCSS);
    position: absolute;
    right: 0;
    flex-direction: column;
    z-index: 1;
    width: 120px;
}

.dropdown-link {
    margin-top: 10px;
}

</style>