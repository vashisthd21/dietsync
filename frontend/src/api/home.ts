import api from "./axios";

export const fetchHomeSummary = async () => {
  const res = await api.get("/api/home/summary");
  return res.data;
};
