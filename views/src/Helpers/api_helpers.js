import axios from "axios";

// const API_URL = "https://backendapi.messej.com";
const API_URL = "http://127.0.0.1:5000";

const axiosApi = axios.create({
  baseURL: API_URL,
});

export async function get(url, data, config = {}) {
  return await axiosApi
    .get(url, { params: { ...data } }, { ...config })
    .then((response) => response.data);
}

export async function add(url, data) {
  return await axiosApi
    .post(url,  data)
    .then((response) => response.data);
}

export async function update(url, data, config = {}) {
  return axiosApi
    .put(url, data, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
