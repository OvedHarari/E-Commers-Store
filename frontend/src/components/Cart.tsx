import { FunctionComponent, useContext, useEffect, useState } from "react"; import Loading from "./Loading";
import Product from "../interfaces/Product";
import { addToCart, getCart, reduceFromCart, removeProductFromCart } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/productsService";
import { currencyFormat } from "../services/currencyFormater";
// import DeliveryDetails from "./DeliveryDetails";
import { userInfo } from "os";
import { SiteTheme } from "../App";
// import Delivery from "./Delivery";
// import { createOrder } from "../services/ordersService";

interface CartProps {
    loading: any;
    setLoading: Function
    quantity: Quantity;
    setQuantity: Function;
    openPaymentModal: boolean;
    setOpenPaymentModal: Function;
    userInfo: any;
    cartData: any;
    setCartData: Function;
    productsInCart: any;
    setProductsInCart: Function;
    totalProducts: number;

}
type Quantity = { [key: string]: number };

const Cart: FunctionComponent<CartProps> = ({ loading, setLoading, quantity, setQuantity, openPaymentModal, setOpenPaymentModal, userInfo, cartData, setCartData, productsInCart, setProductsInCart, totalProducts }) => {
    let navigate = useNavigate();
    let theme = useContext(SiteTheme);
    // let [productsInCart, setProductsInCart] = useState<Product[]>([])
    // let [cartData, setCartData] = useState<any>();
    // let [quantity, setQuantity] = useState<Quantity>({});
    let [productsChanged, setProductsChanged] = useState<boolean>(false);
    let totalQuantity = Object.values(quantity).reduce((total, currentQuantity) => total + currentQuantity, 0);
    let totalPrice = currencyFormat(productsInCart.reduce((total: any, product: any) => total + (product.price * (quantity[product._id as string] || 0)), 0))
    // let render = () => setProductsChanged(!productsChanged);





    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => {
                handleIncrement(product._id)
                // addedToCartMsg(` ${product.name} added to cart`);
            })
            .catch((err) => console.log(err))
    }
    let handleIncrement = (productId?: string) => {
        if (productId) {
            setQuantity({ ...quantity, [productId]: (quantity[productId] || 0) + 1, })

        }
    };
    let handleDecrement = (productId?: string) => {
        if (productId && quantity[productId] && quantity[productId] > 0) {
            let updatedQuantity = quantity[productId] - 1;
            if (updatedQuantity === 0) handleRemoveFromCart(productId)
            setQuantity({ ...quantity, [productId]: updatedQuantity });

        }
    };

    let handleReduceFromCart = (product: Product) => {
        reduceFromCart(product)
            .then((res) => {
                handleDecrement(product._id)
                // addedToCartMsg(` ${product.name} removed from cart`);
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
                            // setProductsInCart(res.data);
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        } else {
            console.log("Product ID is undefined");
        }
    }

    useEffect(() => {
        setLoading(true);

        // const userId: string = JSON.parse(sessionStorage.getItem("userInfo") as string).userId;
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
        let quantites: Quantity = {};
        productsInCart.forEach((product: Product) => {
            if (product._id) {
                quantites[product._id] = product.quantity || 0;
            }
        });
        setQuantity(quantites);
    }, [productsInCart, setQuantity])

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
                                            {/* <button className="btn" onClick={() => handleDecrement(product._id)}>-</button> */}
                                            {/* <span>{product.quantity}</span> */}
                                            <span>{quantity[product._id as string]}</span>
                                            {/* <button className="btn" onClick={() => handleIncrement(product._id)}>+</button> */}
                                            <button className="btn" onClick={() => handleAddToCart(product)}>+</button>
                                        </td>
                                        <td>{product.price * (quantity[product._id as string] || 0)} &#8362;</td>
                                        {/* <td>{product.quantity}</td> */}
                                        <td><button className="btn" onClick={() => handleRemoveFromCart(product._id as string)}><i className="fa-solid fa-trash-can"></i></button></td>
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
                    <button className="btn checkout-btn btn-info mt-2" onClick={() => navigate("/delivery")}>Proceed to checkout</button>

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
