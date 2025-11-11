import api from "./axios";

const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  console.log(response.status, response.data);
  return response;
};

const logout = async () => {
  const response = await api.post(
    "/auth/logout",
    {},
    { withCredentials: true }
  );

  console.log(response.status, response.data);
  return response;
};

export { login, logout };
