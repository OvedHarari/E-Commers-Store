import axios from "axios";
import Product from "../interfaces/Product";
import _ from "lodash"

let api: string = `${process.env.REACT_APP_API}/wishlist`;


// get all user's wishlist cards
export function getWishList(userId: string) {
  return axios.get(api, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

// add or remove user's wishlist 
export function addRemoveWishList(productIdToAdd: Product) {
  const product = _.pick(productIdToAdd, "_id")

  return axios.post(api, product, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}
