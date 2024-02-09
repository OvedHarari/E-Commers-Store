import { FunctionComponent, useContext, useEffect } from "react"; import Loading from "./Loading";
import Product from "../interfaces/Product";
import { addToCart, getCart, reduceFromCart, removeProductFromCart } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../services/currencyFormater";
import { SiteTheme } from "../App";

interface CartProps {
    loading: any; setLoading: Function; userInfo: any; cartData: any; setCartData: Function; productsInCart: any; setProductsInCart: Function; totalProducts: number; setTotalProducts: Function; totalPrice: number; setTotalPrice: Function; productQuantity: any; setProductQuantity: Function;
}

const Cart: FunctionComponent<CartProps> = ({ loading, setLoading, userInfo, cartData, setCartData, productsInCart, setProductsInCart, totalProducts, setTotalProducts, totalPrice, setTotalPrice, productQuantity, setProductQuantity }) => {
    let navigate = useNavigate();
    let theme = useContext(SiteTheme);
    let handleTotalPrice = () => {
        let totalPrice = currencyFormat(productsInCart.reduce((total: any, product: any) => total + (product.price * (productQuantity[product._id as string] || 0)), 0));
        setTotalPrice(totalPrice)
    }
    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => {
                setProductsInCart(res.data.products);
                handleTotalPrice();
                setTotalProducts(res.data.totalProducts);
                successMsg(` ${product.title} added to cart`);
            })
            .catch((err) => console.log(err))
    }
    let handleReduceFromCart = (product: Product) => {
        reduceFromCart(product)
            .then((res) => {
                setProductsInCart(res.data.products)
                setTotalProducts(res.data.totalProducts);
                handleTotalPrice();
                successMsg(` ${product.title} removed from cart`);
            })
            .catch((err) => console.log(err))
    }
    let handleRemoveFromCart = (productId: string) => {
        if (productId) {
            removeProductFromCart(productId)
                .then(() => {
                    successMsg("Item removed successfully from the cart");
                    getCart().then((res) => { setProductsInCart(res.data.products); setTotalProducts(res.data.totalProducts); handleTotalPrice(); })
                        .catch((err) => console.log(err))
                }).catch((err) => console.log(err))
        } else { console.log("Product ID is undefined"); }
    };
    let handleQuatities = () => {
        let quantites: { [key: string]: number } = {};
        productsInCart.forEach((product: Product) => {
            if (product._id) { quantites[product._id] = product.quantity || 0; }
            setProductQuantity(quantites);
        });
    }

    useEffect(() => {
        setLoading(true);
        getCart()
            .then((res) => {
                setCartData(res.data);
                setProductsInCart(res.data.products);

                setLoading(false);
            })
            .catch((err) => {
                console.log(err); setLoading(false);
            })
    }, [setCartData, setLoading, setProductsInCart]);

    useEffect(() => {
        handleQuatities();
        handleTotalPrice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInCart])

    return (
        <div className={`container-fluid  ${theme}`}>
            <h3 className="mt-3">Cart</h3>
            <hr className="ms-0 mx-5" />
            <div className="container-fluid row mt-5">
                <div className="col-md-8 ">
                    {loading ? (<Loading />) : (productsInCart.length ? (
                        <table className={`table table-${theme} table-hover cart`}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody >
                                {productsInCart.map((product: Product) => (
                                    <tr key={product._id}>
                                        <td><img src={`${product.thumbnail}`} alt={`${product.title}`} style={{ width: "13rem", height: "8rem" }} /></td>
                                        <td className="text-start mt-0">{product.title}</td>
                                        <td>{product.price} &#8362;</td>
                                        <td>
                                            <button className="btn" onClick={() => handleReduceFromCart(product)}><i className="fa-solid fa-circle-minus"></i></button>
                                            <span>{productQuantity[product._id as string]}</span>
                                            <button className="btn" onClick={() => handleAddToCart(product)}><i className="fa-solid fa-circle-plus"></i></button>
                                        </td>
                                        <td>{product.price * (productQuantity[product._id as string] || 0)} &#8362;</td>
                                        <td><button className="btn" onClick={() => handleRemoveFromCart(product._id as string)}><i className="fa-solid fa-trash-can "></i> </button></td>
                                    </tr>))};
                            </tbody>
                        </table>
                    ) : (<h4>No products were added to your shopping cart.</h4>))}
                </div>
                <div className="col-md-3 mx-4 orderSummary">
                    <h4 className="text-center">Order Summary</h4>
                    <hr />
                    <h4 className="text-start"><b>Total Items:{totalProducts}</b></h4>
                    <hr />
                    <h4 className="text-start"><b>Total Price: {totalPrice}</b></h4>
                    <hr />
                    <button className="btn checkout-btn btn-info mt-5" onClick={() => navigate("/shipping")}>Proceed to checkout</button>
                </div>
            </div>
            <a className="showInMobile" href="#top">
                <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </a>
        </div>
    )
}

export default Cart;
