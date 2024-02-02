import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { addRemoveFavorites, getFavorites } from "../services/favoritesService";
import { getAllProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbacksService";
import { addToCart } from "../services/cartService";
import Loading from "./Loading";

interface ProductCardProps {
    userInfo: any;
    loading: any;
    setLoading: Function;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ userInfo, loading, setLoading }) => {
    let theme = useContext(SiteTheme);
    let navigate = useNavigate()
    let [products, setProducts] = useState<Product[]>([]);
    let [dataUpdated, setDataUpdated] = useState<boolean>(false);
    let [favorites, setFavorites] = useState<string[]>([]);
    // let [productName, setProductName] = useState<string>("");
    // let [smartphonesProducts, setSmartphonesProducts] = useState([]);
    // let [laptopsProducts, setLaptopדProducts] = useState([]);
    // let [fragrancesProducts, setFragrancesProducts] = useState([]);
    // let [skincareProducts, setSkincareProducts] = useState([]);
    // let [groceriesProducts, setGroceriesProducts] = useState([]);
    // let [homeDecorationProducts, setHomeDecorationProducts] = useState([]);
    // let [furnitureProducts, setFurnitureProducts] = useState([]);
    // let [topsProducts, setTopsProducts] = useState([]);
    // let [allForWomensProducts, setallForWomensProducts] = useState([]);
    // let [allForManProducts, setAllForManProducts] = useState([]);
    // let [sunglassesProducts, setSunglassesProducts] = useState([]);
    // let [automotiveProducts, setAutomotiveProducts] = useState([]);
    // let [motorcycleProducts, setMotorcycleProducts] = useState([]);
    // let [lightingProducts, setLightingProducts] = useState([]);



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

    //     getCartById().then((res) => {
    //         // console.log(res.data)
    //         // let inCart = res.data.find((id: any) => id._id = product._id);
    //         // if (!inCart) {
    //         addToCart({
    //             ...product
    //             // , quantity: quantity 
    //         }).then((res) =>
    //             successMsg(`The product: ${product.title} was added to cart`)
    //         )
    //             .catch((err) => console.log(err));
    //         // } else {
    //         //   console.log(inCart);
    //         //   inCart.quantity++

    //         //   addToCart({
    //         //     ...product
    //         //     // , quantity: quantity 
    //         //   }).then((res) =>
    //         //     successMsg(`The product: ${product.title} was added to cart`)
    //         //   )
    //         //     .catch((err) => console.log(err)


    //     }).catch((err) => console.log((err)))




    // };
    useEffect(() => {
        if (userInfo.userId) {
            getFavorites(userInfo.userId)
                .then((res) => {
                    let defaultProductIds: string[] = res.data?.cards.map((card: any) => card._id) || [];
                    setFavorites(defaultProductIds);
                })
                .catch((err) => console.log(err));
        }
        getAllProducts().then((res) => setProducts(res.data)).catch((err) => console.log(err));

    }, [dataUpdated, userInfo.userId]);
    return (
        <>


            <div className="home-container">
                <img className="homeBanner img-fluid mt-3 mb-5" src="/images/homeBanner.png" alt="banner" />

                <div className="categoryLine">
                    {/* <img src={alcoholLine} style={{ width: "50rem" }} className="img-fluid" alt="alcohols" onClick={() => navigate('/products/alcohol')} /> */}

                    <div className="home-container">
                        <div className="row">
                            {loading ? (<Loading />) : (products.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}>
                                    <img src={product.thumbnail}
                                        alt={product.title}
                                        style={{ height: "13rem" }}
                                        className="mt-2 product-img"
                                        onClick={() => navigate(`/products/${product.category}/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        {/* <p className="card-text">Volume: {product.volume} ml</p> */}
                                        <hr className="mt-0" />
                                        <p className="card-text price">Price: {product.price} &#8362;</p>

                                        {userInfo.isAdmin === false && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                                <div className="heart-icon"> <i className="fa-solid fa-heart-circle-plus"></i></div>
                                                {/* <div className="heart-icon">{addToFavorites}</div> */}
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
                            )))}
                        </div>
                    </div>
                    <button className="btn categoryTransfer  my-4" onClick={() => navigate('/products/alcohol')}>Find more products</button>
                </div>
                {/* <div className="categoryLine">
                    <img src={beerLine} style={{ width: "50rem" }} className="img-fluid" alt="beers" onClick={() => navigate('/products/beer')} />

                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (beerProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}>
                                    <img src={product.thumbnail ? product.thumbnail : noImg}
                                        alt={product.title}
                                        style={{ height: "13rem" }}
                                        className="mt-2 product-img"
                                        onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">Volume: {product.volume} ml</p>
                                        <hr className="mt-0" />
                                        <p className="card-text price">Price: {product.price} &#8362;</p>

                                        {userInfo.isAdmin === false && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                                <div className="heart-icon">{addToFavorites}</div>
                                            </div>
                                        )}
                                        {userInfo.isAdmin && (
                                            <div className="products-addToCart-container">
                                                <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                                <button className="btn addToFavorites heart-icon" disabled >{addToFavorites}</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>

                    <button className="btn categoryTransfer my-4" onClick={() => navigate('/products/beer')}>Find more products</button>
                </div> */}
                {/* <div className="categoryLine">
                    <img src={wineLine} style={{ width: "50rem" }} className="img-fluid" alt="wines" onClick={() => navigate('/products/wine')} />

                    <div className="container">
                        <div className="row">
                            {loading ? (<Loading />) : (wineProducts.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card col-md-3 mt-3 align-items-center m-2 ms-2"
                                    style={{ width: "16rem", height: "28rem" }}
                                >
                                    <img src={product.thumbnail ? product.thumbnail : noImg}
                                        alt={product.title}
                                        style={{ height: "13rem" }}
                                        className="mt-2 product-img"
                                        onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">Volume: {product.volume} ml</p>
                                        <hr className="mt-0" />
                                        <p className="card-text price">Price: {product.price} &#8362;</p>

                                        {userInfo.isAdmin === false && (
                                            <div className="addToCart-container">
                                                <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
                                                <div className="heart-icon">{addToFavorites}</div>
                                            </div>
                                        )}
                                        {userInfo.isAdmin && (
                                            <div className="products-addToCart-container">
                                                <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
                                                <button className="btn addToFavorites heart-icon" disabled >{addToFavorites}</button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                                // </div>
                            )))}
                        </div>
                    </div>

                    <button className="btn categoryTransfer my-4" onClick={() => navigate('/products/wine')}>Find more products</button>
                </div> */}
            </div >
        </>
    );
}

export default ProductCard;