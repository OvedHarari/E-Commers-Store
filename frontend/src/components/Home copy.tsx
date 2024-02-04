import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { addRemoveWishList, getWishList } from "../services/wishListService";
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
    let [wishList, setWishlist] = useState<string[]>([]);
    let [productName, setProductName] = useState<string>("");

    let [categories, setCategories] = useState<Category[]>([]);

    let [productId, setProductId] = useState<string>("");
    let [openNewProductModal, setOpenNewProductModal] = useState<boolean>(false);
    let [openUpdateProductModal, setOpenUpdateProductModal] =
        useState<boolean>(false);
    let [openDeleteProductModal, setOpenDeleteProductModal] =
        useState<boolean>(false);
    const render = () => setDataUpdated(!dataUpdated);

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
            getWishList(userInfo.userId)
                .then((res) => {
                    let defaultProductIds: string[] = res.data?.cards.map((card: any) => card._id) || [];
                    setWishlist(defaultProductIds);
                })
                .catch((err) => console.log(err));
        }
        // getAllProducts().then((res) => setProducts(res.data)).catch((err) => console.log(err));
        getAllCategories().then((res) => {
            setCategories(res.data.name); console.log(res.data);
        }).catch((err) => console.log(err)
        )
        getAllProducts().then((res) => {
            setProducts(res.data); console.log(res.data);
        }).catch((err) => console.log(err)
        )


        let showProducts = async () => {
            try {


            } catch (error) {
                console.log(error);
                setLoading(false);


            }
        }
        showProducts()
        setLoading(false);
    }, [dataUpdated, userInfo.userId]);

    const getFirstThreeProducts = (categoryName: string): Product[] => {
        const filteredProducts = products.filter((product) => product.category.name === categoryName);
        return filteredProducts.slice(0, 3);
    };
    return (
        <>
            <div className="container">
                {loading ? (
                    <Loading />
                ) : (
                    categories.map((category) => (
                        <div key={category.name} className="category">
                            <h1 className="categoryTitle mt-2 mb-2">{category.name}</h1>
                            <hr className="mx-5" />

                            <div className="container home-container">
                                <div className="row justify-content-center">
                                    {getFirstThreeProducts(category.name).map((product: Product) => (
                                        <div
                                            key={product._id}
                                            className="card border rounded-3 col-md-3 mt-3 align-items-center m-2 ms-5"
                                            style={{ width: "16rem", height: "28rem" }}
                                        >
                                            {/* ... rest of your card component code */}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="btn categoryTransfer mt-5 my-4"
                                onClick={() => navigate(`/products/${category.name}`)}
                            >
                                Find more products
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>

        // <>
        //     {/* <ProductCard userInfo={userInfo} loading={loading} setLoading={setLoading} /> */}
        //     <div className="container">
        //         {/* <img className="homeBanner img-fluid mt-3 mb-5" src="/images/homeBanner.png" alt="banner" /> */}
        //         {loading ? (<Loading />) : (categories.map(category => (
        //             <div
        //                 key={category.name}
        //                 className="category">
        //                 <h1 className="categoryTitle mt-2 mb-2">{category.name}</h1> <br />
        //                 <hr className="mx-5" />
        //                 {/* <img src={alcoholLine} style={{ width: "50rem" }} className="img-fluid" alt="alcohols" onClick={() => navigate('/products/smartphonesProducts')} /> */}

        //                 <div className="container home-container ">
        //                     <div className=" row justify-content-center">
        //                         {loading ? (<Loading />) : (category.arr.map((product: Product) => (
        //                             <div
        //                                 key={product._id}
        //                                 className="card border rounded-3 col-md-3 mt-3 align-items-center m-2 ms-5"
        //                                 style={{ width: "16rem", height: "28rem" }}>
        //                                 <img src={product.thumbnail}
        //                                     alt={product.title}
        //                                     style={{ width: "15rem", height: "13rem" }}
        //                                     className="mt-2 rounded product-img"
        //                                     onClick={() => navigate(`/products/${product.category}/${product._id}`)} />
        //                                 <div className="card-body">
        //                                     <h5 className="card-title">{product.title}</h5>
        //                                     {/* <p className="card-text">Volume: {product.volume} ml</p> */}
        //                                     <hr className="mt-0" />
        //                                     <p className="card-text price">Price: {product.price} &#8362;</p>

        //                                     {userInfo.isAdmin === false && (
        //                                         <div className="addToCart-container">
        //                                             <button className="btn addToCart-btn align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>
        //                                             <div className="heart-icon"> <i className="fa-solid fa-heart-circle-plus"></i></div>
        //                                             {/* <div className="heart-icon">{addToWishList}</div> */}
        //                                         </div>)}
        //                                     {userInfo.isAdmin && (
        //                                         <div className="products-addToCart-container">
        //                                             <button className="btn addToCart-btn-admin" disabled>Add to cart</button>
        //                                             <button className="btn addToWishList heart-icon" disabled >
        //                                                 <i className="fa-solid fa-heart-circle-plus"></i>
        //                                                 {/* {addToWishList} */}
        //                                             </button>
        //                                         </div>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                         )))}
        //                     </div>
        //                 </div>
        //                 <button className="btn categoryTransfer mt-5 my-4" onClick={() => navigate('/products/smartphonesProducts')}>Find more products</button>


        //             </div>
        //         )))}



        //     </div >
        // </>

    );
}

export default Home;