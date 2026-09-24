import apiClient from "./client.js";

export async function login(credentials) {
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
}
export async function getProducts(params) {
  const { data } = await apiClient.get("/products", { params });
  return data;
}
export async function searchProducts(params) {
  const { data } = await apiClient.get("/products/search", { params });
  return data;
}
export async function getCategories() {
  const { data } = await apiClient.get("/products/categories");
  return data;
}
export async function getProduct(id) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}
export async function createProduct(payload) {
  const { data } = await apiClient.post("/products/add", payload);
  return data;
}
export async function updateProduct(id, payload) {
  const { data } = await apiClient.put(`/products/${id}`, payload);
  return data;
}
export async function deleteProduct(id) {
  const { data } = await apiClient.delete(`/products/${id}`);
  return data;
}
