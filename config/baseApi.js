import axios from "axios";

export const baseURL = axios.create({
    baseURL:'https://fidel.bernos.info/',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
})

