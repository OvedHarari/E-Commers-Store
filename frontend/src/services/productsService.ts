import axios from "axios";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/products`;

export function getAllProducts() {
  return axios.get(api);
}
export function getTopProducts(limit: number) {
  return axios.get(`${api}/top/${limit}`);
}

export function getProductById(id: string) {
  return axios.get(`${api}/${id}`);
}
export function getProductByCategory(category: string) {
  return axios.get(`${api}/categories/${category}`)
  // return axios.get(`${api}/${category}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
export function addNewProduct(newProduct: Product) {
  return axios.post(api, newProduct, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
export function updateProduct(updatedPruduct: Product, _id: string) {
  return axios.put(`${api}/${_id}`, updatedPruduct, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
export function deleteProduct(id: string) {
  return axios.delete(`${api}/${id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}
