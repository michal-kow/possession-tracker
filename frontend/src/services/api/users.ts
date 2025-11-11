import api from "./axios";

const signUp = async (username: string, password: string) => {
  const response = await api.post("/users", { username, password });
  console.log(response.status, response.data);
  return response;
};

export { signUp };
