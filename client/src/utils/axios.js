import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env'});


export const axiosInstance = axios.create({
    baseUrl: "",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})