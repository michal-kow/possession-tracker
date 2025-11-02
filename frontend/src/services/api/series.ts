import axios from "axios";

const getAllSeries = async () => {
  const response = await axios.get("/series");
  return response.data;
};

export { getAllSeries };
