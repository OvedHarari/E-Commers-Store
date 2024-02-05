import { FunctionComponent, useContext, useEffect, useState } from "react"; import Loading from "./Loading";
import Product from "../interfaces/Product";
import { addToCart, getCart, reduceFromCart, removeProductFromCart } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";
import { useNavigate } from "react-router-dom";
// import { getAllProducts } from "../services/productsService";
import { currencyFormat } from "../services/currencyFormater";
// import DeliveryDetails from "./DeliveryDetails";
// import { userInfo } from "os";
import { SiteTheme } from "../App";
// import Delivery from "./Delivery";
// import { createOrder } from "../services/ordersService";

interface CartProps {
    loading: any;
    setLoading: Function
    openPaymentModal: boolean;
    setOpenPaymentModal: Function;
    userInfo: any;
    cartData: any;
    setCartData: Function;
    productsInCart: any;
    setProductsInCart: Function;
    totalProducts: number;
    setTotalProducts: Function;
    totalPrice: number;
    setTotalPrice: Function;
    productQuantity: any;
    setProductQuantity: Function


}
type Quantity = { [key: string]: number };

const Cart: FunctionComponent<CartProps> = ({ loading, setLoading, openPaymentModal, setOpenPaymentModal, userInfo, cartData, setCartData, productsInCart, setProductsInCart, totalProducts, setTotalProducts, totalPrice, setTotalPrice, productQuantity, setProductQuantity }) => {
    let navigate = useNavigate();
    let theme = useContext(SiteTheme);
    // let [productQuantity, setProductQuantity] = useState<Quantity>({});

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
                    getCart()
                        .then((res) => {
                            setProductsInCart(res.data.products);
                            setTotalProducts(res.data.totalProducts);
                            handleTotalPrice();
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        } else {
            console.log("Product ID is undefined");
        }
    }

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
        <div className="container ">
            <h3>Cart</h3>
            <div className="row">
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
                            <tbody>
                                {productsInCart.map((product: Product) => (
                                    <tr
                                        key={product._id}>
                                        <td><img src={`${product.thumbnail}`} alt={`${product.title}`} style={{ width: "13rem", height: "8rem" }} /></td>
                                        <td>{product.title}</td>
                                        <td>{product.price} &#8362;</td>
                                        <td>
                                            <button className="btn" onClick={() => handleReduceFromCart(product)}>-</button>

                                            <span>{productQuantity[product._id as string]}</span>

                                            <button className="btn" onClick={() => handleAddToCart(product)}>+</button>
                                        </td>
                                        <td>{product.price * (productQuantity[product._id as string] || 0)} &#8362;</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (<p>There are no products in the cart</p>))}


                </div>
                <div className="col-md-3 mx-4 orderSummary">
                    <h4 className="text-center">Order Summary</h4>
                    <hr />
                    {/* <h6>{`You have ${totalQuantity} products in cart`}</h6> */}
                    <h4 className="text-start"><b>Total Items:
                        {/* {totalQuantity} */}{totalProducts}
                    </b></h4>
                    <hr />
                    <h4 className="text-start"><b>Total Price: {totalPrice}</b></h4>
                    <button className="btn checkout-btn btn-info mt-2" onClick={() => navigate("/shipping")}>Proceed to checkout</button>

                </div>
            </div>

            {/* <DeliveryDetails
                openPaymentModal={openPaymentModal}
                setOpenPaymentModal={setOpenPaymentModal}
                userInfo={userInfo}
                cartData={cartData} /> */}
            {/* <Delivery totalPrice={totalPrice} /> */}
        </div>
    )
}

export default Cart;
