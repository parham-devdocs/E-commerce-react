import axios from "axios";
import { Navigate } from "react-router-dom";
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// No request interceptor (assuming cookie-only auth)

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Axios] ✅ ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`);
    return response;
  },
  async (error) => {
   if (error.status===401) {
    Navigate({to:"/login"})

   }

    console.log('[Axios] 📤 Propagating non-401 or already-retried error');
    return Promise.reject(error);
  }
);

export default apiClient;