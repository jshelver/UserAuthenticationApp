import { defineStore } from 'pinia';
import useApi from '../composables/useApi';


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: {
                id: Number,
                username: String,
                email: String,
                firstName: String,
                lastName: String,
                accessToken: String,
            }
        }
    },

    getters: {
        user: (state) => state.user,
        isAuthenticated: (state) => state.user?.id ? true : false
    },

    actions: {
        async login(payload = { email: String, password: String }) {
            try {
                const { data } = await useApi().post("/api/auth/login", payload);
                this.accessToken = data?.accessToken;
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },

        async register(payload = { username: String, email: String, firstName: String, lastName: String, password: String, confirmPassword: String }) {
            try {
                const { data } = await useApi().post("/api/auth/register", payload);
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },

        async getUser() {
            try {
                const { data } = await useApi().get("/api/auth/user");
                this.user = data;
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },

        async logout() {
            try {
                const { data } = await useApi().post("/api/auth/logout");
                this.accessToken = "";
                this.user = {};
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },

        async refresh() {
            try {
                const { data } = await useApi().post("/api/auth/refresh");
                this.accessToken = data?.accessToken;
                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
})