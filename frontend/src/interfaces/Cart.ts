import Product from "./Product";


export default interface Cart {
    _id?: string;
    userId: string;
    products: Product[];
    totalProducts: number;
    active: boolean;
}