<script setup>
import { ref } from 'vue';
import validator from 'validator';
import axios from 'axios';

const email = ref("");
const password = ref("");

const statusMessage = ref("");
const statusMessageColor = ref("");

// Reference for status message colors
const errorColor = "#da2626";
const successColor = "#3dc83d";
const normalColor = "#8f9090";

function setStatusMessage(message, color) {
    statusMessage.value = message;
    statusMessageColor.value = color;
}

async function login() {
    if (email.value === "" || password.value === "") {
        setStatusMessage("Please fill out all fields.", errorColor);
        return;
    }

    if (email.value.indexOf(" ") !== -1 || password.value.indexOf(" ") !== -1) {
        setStatusMessage("No spaces allowed in any field.", errorColor);
        return;
    }

    if (!validator.isEmail(email.value)) {
        setStatusMessage("Invalid email address.", errorColor);
        return;
    }

    setStatusMessage("Logging in...", normalColor);
}
</script>

<template>
    <div class="login-wrapper">
        <div class="form-wrapper">
            <h1 class="label">Email</h1>
            <input type="email" class="input" v-model="email"/>
            <h1 class="label">Password</h1>
            <input type="password" class="input" v-model="password"/>
            <div class="message">{{ statusMessage }}</div>
            <button class="login-button" @click="login">Login</button>
        </div>
    </div>
</template>

<style scoped>
.login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - var(--navbar-height));
}
.form-wrapper {
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
}

.input {
    border-radius: 5px;
    padding: 10px;
    margin-block: 2px 10px;
    margin-inline: 0px;
    border: none;
    background-color: var(--dark-bg-color);
    color: var(--dark-text-color);
    font-size: 1.2rem;
}

.login-button {
    border-radius: 5px;
    padding: 10px;
    margin-block: 10px;
    border: none;
    background-color: var(--accent-color);
    color: var(--button-text-color);
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.05s ease-in-out;
}

.login-button:hover {
    background-color: var(--hover-accent-color);
}

.login-button:active {
    transform: scale(0.97);
}

.message {
    color: v-bind("statusMessageColor");
    min-height: 1.4rem;
}
</style>