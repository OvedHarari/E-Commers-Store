import axios from "axios";
import Order from "../interfaces/Order";
import { ShippingInfo } from "../interfaces/User";

let api: string = `${process.env.REACT_APP_API}/orders`;

export function createShippingAddress(userId: string, detailsToAdd: ShippingInfo) {
    return axios.post(api, { userId, ...detailsToAdd },
        { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } }
    )
}

export function getOrders() {
    return axios.get<Order[]>(`${api}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function deactivateOrder() {
    return axios.get(`${api}/deactivate`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}

export function addOrder(orderToAdd: Order) {
    return axios.post(api, orderToAdd, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } })
}