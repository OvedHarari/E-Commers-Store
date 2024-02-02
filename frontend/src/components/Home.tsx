


import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { addRemoveFavorites, getFavorites } from "../services/favoritesService";
import { getAllProducts, getProductByCategory, getTopProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbacksService";
import { addToCart, getCart } from "../services/cartService";
import { getAllCategories } from "../services/categoryService";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import Category from "../interfaces/Category";

interface HomeProps {
    userInfo: any;
    loading: any;
    setLoading: Function;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, loading, setLoading }) => {
    let theme = useContext(SiteTheme);
    let navigate = useNavigate();
    let [products, setProducts] = useState<Product[]>([]);
    let [dataUpdated, setDataUpdated] = useState<boolean>(false);
    let [favorites, setFavorites] = useState<string[]>([]);
    let [productName, setProductName] = useState<string>("");

    let [categories, setCategories] = useState<Category[]>([]);

    let [productId, setProductId] = useState<string>("");
    let [openNewProductModal, setOpenNewProductModal] = useState<boolean>(false);
    let [openUpdateProductModal, setOpenUpdateProductModal] =
        useState<boolean>(false);
    let [openDeleteProductModal, setOpenDeleteProductModal] =
        useState<boolean>(false);
    const render = () => setDataUpdated(!dataUpdated);

    let handleAddToFavorites = (product: Product) => {
        if (favorites.includes(product._id as string)) {
            addRemoveFavorites(product._id as string)
                .then((res) => {
                    setFavorites(favorites.filter((id) => id !== product._id));
                    successMsg(`${product.title} business card was removed from favorites!`);
                })
                .catch((err) => { console.log(err); });
        } else {
            addRemoveFavorites(product._id as string)
                .then((res) => {
                    setFavorites([...favorites, product._id as string]);
                    successMsg(`${product.title} business card was added to favorites!`);
                })
                .catch((err) => { console.log(err); });
        }
    };

    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => successMsg(` ${product.title} added to cart`))
            .catch((err) => console.log(err))
    }
    // let handleAddToCart = (product: Product
    //     // , quantity: number
    // ) => {

    //     getCart().then((res) => {
    //         // console.log(res.data)
    //         // let inCart = res.data.find((id: any) => id._id = product._id);
    //         // if (!inCart) {
    //         addToCart({
    //             ...product
    //             // , quantity: quantity
    //         }).then((res) =>
    //             successMsg(`The product: ${productName} was added to cart`)
    //         )
    //             .catch((err) => console.log(err));
    //         // } else {
    //         //   console.log(inCart);
    //         //   inCart.quantity++

    //         //   addToCart({
    //         //     ...product
    //         //     // , quantity: quantity
    //         //   }).then((res) =>
    //         //     successMsg(`The product: ${productName} was added to cart`)
    //         //   )
    //         //     .catch((err) => console.log(err)


    //     }).catch((err) => console.log((err)))
    // };


    useEffect(() => {
        setLoading(true)
        if (userInfo.userId) {
            getFavorites(userInfo.userId)
                .then((res) => {
                    let defaultProductIds: string[] = res.data.products?.map((product: any) => product._id) || [];
                    setFavorites(defaultProductIds);
                })
                .catch((err) => console.log(err));
        }
        // getAllProducts().then((res) => setProducts(res.data)).catch((err) => console.log(err));
        getAllCategories().then((res) => setCategories(res.data)).catch((err) => console.log(err)
        )
        getAllProducts().then((res) => {
            setProducts(res.data);
            //  console.log(res.data);
        }).catch((err) => console.log(err)).finally(() => { setLoading(false); })



    }, [dataUpdated, userInfo.userId]);

    const getFirstThreeProducts = (categoryId: string): Product[] => {
        const filteredProducts = products.filter((product) => product.category._id === categoryId);
        return filteredProducts.slice(0, 3);
    };
    return (

        <>
            {/* <ProductCard userInfo={userInfo} loading={loading} setLoading={setLoading} /> */}
            <div className="container">
                {/* <img className="homeBanner img-fluid mt-3 mb-5" src="/images/homeBanner.png" alt="banner" /> */}
                {loading ? (<Loading />) : (categories.map(category => (
                    <div
                        key={category._id}
                        className="category">
                        <h1 className="categoryTitle mt-2 mb-2">{category.name}</h1> <br />
                        <hr className="mx-5" />

                        <div className="container home-container ">
                            <div className=" row justify-content-center">


                                {getFirstThreeProducts(category._id as string).map((product: Product) => (
                                    <div
                                        key={product._id}
                                        className="card border rounded-3 col-md-3 mt-3 align-items-center m-2 ms-5"
                                        style={{ width: "16rem", height: "28rem" }}>
                                        <img src={product.thumbnail}
                                            alt={product.title}
                                            style={{ width: "15rem", height: "13rem" }}
                                            className="mt-2 rounded product-img"
                                            onClick={() => navigate(`/products/${product.category}/${product._id}`)} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                            <hr className="mt-0" />
                                            <p className="card-text price">Price: {product.price} &#8362;</p>

                                            {userInfo.isAdmin === false && (
                                                <div className="addToCart-container">
                                                    <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                                    <div className="heart-icon"> <i className="fa-solid fa-heart-circle-plus"></i></div>
                                                    <div className="heart-icon">
                                                        {/* {addToFavorites} */}
                                                    </div>
                                                </div>)}
                                            {userInfo.isAdmin && (
                                                <div className="products-addToCart-container">
                                                    <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                                    <button className="btn addToFavorites heart-icon" disabled >
                                                        <i className="fa-solid fa-heart-circle-plus"></i>
                                                        {/* {addToFavorites} */}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <button className="btn categoryTransfer mt-5 my-4" onClick={() => navigate('/products/smartphonesProducts')}>Find more products</button>


                    </div>
                )))}



            </div >
        </>

    );
}

export default Home;