import api from "./axios";

const getUsers = async () => {
  const response = await api.get("/users");
  console.log(response.status, response.data);
  return response;
};

const signUp = async (username: string, password: string) => {
  const response = await api.post("/users", { username, password });
  console.log(response.status, response.data);
  return response;
};

const changePassword = async (userId: string, newPassword: string) => {
  const response = await api.put(`/users/${userId}/password`, {
    newPassword,
  });
  console.log(response.status, response.data);
  return response;
};

export { getUsers, signUp, changePassword };
