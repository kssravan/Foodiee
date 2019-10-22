import axios from 'axios';

export const API_KEY = 'f04d03837faa98675d74bef2fc0bb83e';
export const BASE_URL = 'https://developers.zomato.com/api/v2.1';
export const getHeaders = () => ({ 'user-key': API_KEY });
export const api = axios.create({
  headers: getHeaders(),
});