<script setup>
import { ref, watch, onMounted } from 'vue';
import validator from 'validator';
import axios from 'axios';

const username = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const confirmPassword = ref("");

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

async function register() {
    if (username.value === "" || email.value === "" || firstName.value === "" || lastName.value === "" || password.value === "" || confirmPassword.value === "") {
        setStatusMessage("Please fill out all fields.", errorColor);
        return;
    }
    
    if (username.value.indexOf(" ") !== -1 || email.value.indexOf(" ") !== -1 || firstName.value.indexOf(" ") !== -1 || lastName.value.indexOf(" ") !== -1 || password.value.indexOf(" ") !== -1 || confirmPassword.value.indexOf(" ") !== -1) {
        setStatusMessage("No spaces allowed in any field.", errorColor);
        return;
    }

    if (!validator.isEmail(email.value)) {
        setStatusMessage("Invalid email address.", errorColor);
        return;
    }

    if (password.value.length < 8) {
        setStatusMessage("Password must be at least 8 characters long.", errorColor);
        return;
    }

    if (!validator.isStrongPassword(password.value, { minSymbols: 0 })) {
        setStatusMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number.", errorColor);
        return;
    }
    
    if (password.value !== confirmPassword.value) {
        setStatusMessage("Passwords do not match.", errorColor);
        return;
    }

    setStatusMessage("Registering...", normalColor);

    const response = await axios.post("/api/auth/register", {
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    });

    console.log(response.status);
}
</script>

<template>
    <div class="register-wrapper">
        <div class="form-wrapper">
            <h1 class="label">Username</h1>
            <input class="input" type="text" v-model="username">
            <h1 class="label">Email</h1>
            <input class="input" type="email" v-model="email">
            <h1 class="label">First Name</h1>
            <input class="input" type="text" v-model="firstName">
            <h1 class="label">Last Name</h1>
            <input class="input" type="text" v-model="lastName">
            <h1 class="label">Password</h1>
            <input class="input" type="password" v-model="password">
            <h1 class="label">Confirm Password</h1>
            <input class="input" type="password" v-model="confirmPassword">
            <div class="message">{{ statusMessage }}</div>
            <button class="submit-button" @click="register">Register</button>
        </div>
    </div>
</template>

<style scoped>
.register-wrapper {
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

.submit-button {
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

.submit-button:hover {
    background-color: var(--hover-accent-color);
}

.submit-button:active {
    transform: scale(0.97);
}

.message {
    color: v-bind("statusMessageColor");
    min-height: 1.4rem;
}
</style>