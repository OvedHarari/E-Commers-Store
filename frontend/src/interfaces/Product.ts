import Category from "./Category";

export default interface Product {
  _id?: string;
  title: string;
  price: number;
  discountPercentage: number;
  category: Category;
  brand: string;
  description: string;
  thumbnail: string;
  images: [string];
  rating: number;
  quantity?: number;
}
