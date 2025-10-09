import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const http = axios.create({
  baseURL: 'https://sparkz.mestresdaweb.org/api/',
});

http.interceptors.request.use(
  async config => {
    if (config.data?._parts) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

export { http };
