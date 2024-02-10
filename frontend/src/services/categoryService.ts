import axios from "axios";
import Category from "../interfaces/Category";

let api: string = `${process.env.REACT_APP_API}/categories`;

export function getAllCategories() {
    return axios.get(api);
}

export function addNewCategory(newCategory: Category) {
    return axios.post(api, newCategory, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function updateCategoryById(categoryId: string, categoryName: string) {
    console.log(categoryName);

    return axios.put(`${api}/${categoryId}`, { name: categoryName }, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}