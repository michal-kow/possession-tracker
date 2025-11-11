import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", //TODO: move to env variable, handle different environments
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const attachAuthInterceptor = (getToken: () => string | null) => {
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await api.get("/auth/refresh");
        const newAccessToken = refreshResponse.data.accessToken;

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
