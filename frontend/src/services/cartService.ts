import axios from "axios";
import _ from "lodash";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/carts`;

export function createCart(userId: string) {
  return axios.post(api, { userId, products: [], active: true })
}

export function getCart() {
  return axios.get(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function addToCart(productToAdd: Product) {
  const product = _.pick(productToAdd, [
    "_id", "title", "category", "price", "thumbnail"
  ]);
  return axios.post(api, product, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function reduceFromCart(productToReduce: Product) {
  let product = _.pick(productToReduce, [
    "_id", "title", "category", "price", "thumbnail"
  ]);
  return axios.put(`${api}/${product._id}`, product, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function updateCart(cartId: string, updatedProducts: Product[]) {
  return axios.patch(`${api}/${cartId}`, { products: updatedProducts }, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function removeProductFromCart(productId: any) {
  return axios.delete(`${api}/${productId}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })

}

export function deactivateCart() {
  return axios.get(`${api}/deactivate`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
