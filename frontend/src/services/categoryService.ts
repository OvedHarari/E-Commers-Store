import axios from "axios";
import Category from "../interfaces/Category";

let api: string = `${process.env.REACT_APP_API}/categories`;

export function getAllCategories() {
    return axios.get(api);
}