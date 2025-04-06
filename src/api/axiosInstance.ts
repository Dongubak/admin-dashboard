import axios from 'axios';
import { getAuthData, setAuthData, clearAuthData } from '../utils/storage';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const baseURL = process.env.REACT_APP_BACKEND_API;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  const { token } = getAuthData();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const { RT: refreshToken } = getAuthData();

    if (err.response?.status === 401 && err.response?.code === 'T001') {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(`${baseURL}/api/tokens/refresh`, {
          refreshToken,
        });

        const { token, RT, user } = response.data;
        setAuthData(token, RT, user);
        processQueue(null, token);

        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAuthData();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
