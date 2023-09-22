<script setup>
import { ref } from 'vue';

const email = ref("test@test.com");
const username = ref("hello_john");
const created = ref("1/10/23 12:00:00");

</script>

<template>
    <div class="user-wrapper">
        <div class="info-box">
            <h1 class="label">Email: <span class="info">{{ email }}</span></h1>
            <h1 class="label">Username: <span class="info">{{ username }}</span></h1>
            <h1 class="label">Created: <span class="info">{{ created }}</span></h1>
        </div>
    </div>
</template>

<style scoped>
.user-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - var(--navbar-height));
}

.info-box {
    border-radius: 15px;
    padding-block: 10px 20px;
    padding-inline: 30px;
    margin-block: 50px;
    background-color: var(--dark-navbar-bg-color);
    width: 400px;
    display: flex;
    flex-direction: column;
}

.label {
    margin-top: 10px;
    font-size: 1.6rem;
    font-weight: 600;
}

.info {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--dark-navbar-text-color);
}
</style>