import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRemoveWishList, getWishList } from "../services/wishListService";
import { getAllProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbacksService";
import { addToCart } from "../services/cartService";
import Loading from "./Loading";
import Category from "../interfaces/Category";

interface WishlistProps { userInfo: any; loading: any; setLoading: Function; setTotalProducts: Function; setOpenLoginModal: Function; }

const Wishlist: FunctionComponent<WishlistProps> = ({ userInfo, loading, setLoading, setTotalProducts, setOpenLoginModal }) => {
    let navigate = useNavigate();
    let [products, setProducts] = useState<Product[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let [dataUpdated, setDataUpdated] = useState<boolean>(false);
    let [wishList, setWishlist] = useState<string[]>([]);
    let handleaddToWishList = (product: Product) => {
        if (wishList.includes(product._id as string)) {
            addRemoveWishList(product)
                .then((res) => {
                    setWishlist(wishList.filter((id) => id !== product._id));
                    successMsg(`${product.title} business card was removed from wishList!`);
                })
                .catch((err) => { console.log(err); });
        } else {
            addRemoveWishList(product)
                .then((res) => {
                    setWishlist([...wishList, product._id as string]);
                    successMsg(`${product.title} business card was added to wishList!`);
                })
                .catch((err) => { console.log(err); });
        }
    };
    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => { setTotalProducts(res.data.totalProducts); successMsg(` ${product.title} added to cart`) }).catch((err) => console.log(err))
    };

    useEffect(() => {
        setLoading(true)
        getWishList(userInfo.userId)
            .then((res) => {
                let defaultProductIds: string[] = res.data.products?.map((product: any) => product._id) || [];
                setWishlist(defaultProductIds)
            })
            .catch((err) => console.log(err));
    }, [dataUpdated, setLoading, userInfo.userId]);

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data.filter((product: Product) => wishList.includes(product._id as string)));
        }).catch((err) => console.log(err)).finally(() => { setLoading(false); })
    }, [setLoading, wishList]);

    return (
        <div className="container">
            <h3 className="mt-3">Cart</h3>
            <>
                <div className="container home-container ">
                    <div className=" row justify-content-center">
                        <hr className="mx-5" />
                        {loading ? (<Loading />) : (products.length ? (
                            products.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className="card border rounded-3 col-md-3 mt-3 align-items-center m-2 ms-5"
                                    style={{ width: "16rem", height: "28rem" }}>
                                    <img src={product.thumbnail}
                                        alt={product.title}
                                        style={{ width: "15rem", height: "13rem" }}
                                        className="mt-2 rounded product-img"
                                        onClick={() => navigate(`/products/${product._id}`)} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <hr className="mt-0" />
                                        <p className="card-text price">Price: {product.price} &#8362;</p>
                                        <div className="cardIcons">
                                            {userInfo.email !== false ? (
                                                <div className="row">
                                                    <div className="col left-icons text-start">
                                                        <button className="btn addToCart-btn-admin" onClick={() => handleAddToCart(product)} ><i className="fa-solid fa-cart-shopping"></i></button>
                                                    </div>
                                                    <div className="col right-icons text-end">
                                                        {userInfo.email !== false && (wishList.includes(product._id as string) ? (
                                                            <button className="btn col text-danger" onClick={() => {
                                                                handleaddToWishList(product);
                                                            }}    >
                                                                <i className="fa-solid fa-heart"></i>
                                                            </button>
                                                        ) : (
                                                            <button className="btn col" onClick={() => { handleaddToWishList(product); }}    >
                                                                <i className="fa-solid fa-heart"></i>
                                                            </button>)
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row">
                                                    <div className="col left-icons text-start">
                                                        <button className="btn addToCart-btn-admin" onClick={() => setOpenLoginModal(true)} ><i className="fa-solid fa-cart-shopping"></i></button>
                                                    </div>
                                                    <div className="col right-icons text-end">
                                                        {(wishList.includes(product._id as string) ? (
                                                            <button className="btn col text-danger" onClick={() => {
                                                                setOpenLoginModal(true);
                                                            }}    >
                                                                <i className="fa-solid fa-heart"></i>
                                                            </button>
                                                        ) : (
                                                            <button className="btn col" onClick={() => { setOpenLoginModal(true); }}    >
                                                                <i className="fa-solid fa-heart"></i>
                                                            </button>)
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (<h4>No products were added to your Wishlist yet.</h4>)
                        )}
                    </div>
                </div>
            </>
            <a className="showInMobile" href="#top">
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </a>
        </div >
    );
}

export default Wishlist;

