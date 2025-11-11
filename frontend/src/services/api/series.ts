import type { UpdateSeries } from "./types";
import api from "./axios";

const getAllSeries = async () => {
  const response = await api.get("/series");
  return response;
};

const createSeries = async (data: UpdateSeries) => {
  const response = await api.post("/series", data);
  console.log(response.status, response.data);
  return response;
};

const updateSeries = async (id: string, data: UpdateSeries) => {
  const response = await api.put(`/series/${id}`, data);
  console.log(response.status, response.data);
  return response;
};

const deleteSeries = async (id: string) => {
  const response = await api.delete(`/series/${id}`);
  console.log(response.status, response.data);
  return response;
};

const createMeasurement = async (
  seriesId: string,
  data: { timestamp: string; value: number }
) => {
  const response = await api.post(`/series/${seriesId}/measurements`, data);
  console.log(response.status, response.data);
  return response;
};

const updateMeasurement = async (
  seriesId: string,
  measurementId: string,
  data: { timestamp: string; value: number }
) => {
  const response = await api.put(
    `/series/${seriesId}/measurements/${measurementId}`,
    data
  );
  console.log(response.status, response.data);
  return response;
};

export {
  getAllSeries,
  updateSeries,
  createSeries,
  deleteSeries,
  createMeasurement,
  updateMeasurement,
};
