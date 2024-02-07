import { FunctionComponent, useContext, useEffect, useMemo, useState } from "react";
import Product from "../interfaces/Product";
import { useNavigate, useParams } from "react-router-dom";
import { SiteTheme } from "../App"
import Loading from "./Loading";
import { addToCart } from "../services/cartService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { getProductByCategory, getProductsByCategoryId } from "../services/productsService";
import { currencyFormat } from "../services/currencyFormater";
import { Pagination } from "react-bootstrap";
import Filter from "./Filter";
import { addRemoveWishList, getWishList } from "../services/wishListService";

interface ProductsCategoryProps {
    userInfo: any;
    categoryProducts: Product[];
    setCategoryProducts: Function;
    loading: any;
    setLoading: Function;
    searchQuery: any
    setSearchQuery: Function;
    setShow: Function;
    show: any;
    productsInCart: any;
    setProductsInCart: Function;
    totalProducts: number;
    setTotalProducts: Function;
    totalPrice: number;
    setTotalPrice: Function;
    productQuantity: any;
    setProductQuantity: Function;
    categories: any;
}

const ProductsCategory: FunctionComponent<ProductsCategoryProps> = ({ categoryProducts, setCategoryProducts, userInfo, loading, setLoading, searchQuery, setShow, productsInCart, setProductsInCart, show, totalPrice, setTotalPrice, productQuantity, setProductQuantity, totalProducts, setTotalProducts, setSearchQuery }) => {
    let { category } = useParams();
    let theme = useContext(SiteTheme);
    let darkMode = theme === "dark";
    let navigate = useNavigate();

    let [productsChanged, setProductsChanged] = useState<boolean>(false);
    let [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    let [data, setData] = useState<Product[]>([]);

    // *********************Oved******************
    const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number[]>([]);

    let handleRangeChange = (index: number, newValue: number) => {
        setSelectedPrice((prevValues: any) => {
            let newValues = [...prevValues];
            newValues[index] = newValue;
            return newValues;
        })
    }
    // *********************Oved******************

    let filteredProducts = useMemo(() => {
        let filtered = categoryProducts.filter((product: Product) => {
            if (selectedTitles.length > 0 && !selectedTitles.includes(product.title)) return false;
            if (selectedPrice.length > 0 && (product.price < selectedPrice[0])) return false;
            return product.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
        return filtered
    }, [categoryProducts, searchQuery, selectedTitles, selectedPrice])



    let [currentPage, setCurrentPage] = useState(0);
    let [totalPages, setTotalPages] = useState(0);
    let itemsPerPage = 12;
    // let [productQuantity, setProductQuantity] = useState<Quantity>({});
    let quantity = 1;

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);



    useEffect(() => {
        setCurrentPage(0)
    }, [searchQuery])

    useEffect(() => {
        // if (category ) {
        //     setLoading(true)
        //     // getProductBySubCategory(category, subcategory)
        //     //     .then((res) => {
        //     //         setCategoryProducts(res.data);
        //     //         setData(res.data);
        //     //         let calculatedPages = Math.ceil(res.data.length / itemsPerPage)
        //     //         setTotalPages(calculatedPages);
        //     //         setCurrentPage(prevPage => Math.min(prevPage, calculatedPages - 1))
        //     //         setLoading(false);

        //     //     })

        //     //     .catch((err) => { console.log(err); 
        //     // })
        //     setLoading(false)


        // } else if 
        // if (category) {
        getProductByCategory(category as string)
            // getProductsByCategoryId(category as string)
            .then((res) => {

                setCategoryProducts(res.data);
                setData(res.data);
                let calculatedPages = Math.ceil(res.data.length / itemsPerPage)
                setTotalPages(calculatedPages);
                setCurrentPage(prevPage => Math.min(prevPage, calculatedPages - 1))

            })
            .catch((err) => console.log(err));
        // }


    }, [productsChanged, setCategoryProducts, category, itemsPerPage, setLoading]);

    let startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let subset = filteredProducts.slice(startIndex, endIndex);

    let handlePaginationClick = (pageNumber: number) => { setCurrentPage(pageNumber - 1) };


    // let handleAddToCart = (product: Product) => {
    //     if (userInfo.isAdmin) errorMsg("Admin user cannot add items to cart")
    //     else {

    //         addToCart(product)
    //             .then((res) => successMsg(` ${product.title} added to cart`))
    //             .catch((err) => console.log(err))
    //     }
    // }
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
    let handleRegister = () => {

    }
    let handleAddToCart = (product: Product) => {
        addToCart(product)
            .then((res) => { setTotalProducts(res.data.totalProducts); successMsg(` ${product.title} added to cart`) }).catch((err) => console.log(err))
    };


    let noImg = darkMode ? "images/noImgWhite.png" : "images/noImgBlack.png";
    let pageTitle = category


    // let addToFavorites = darkMode ? <i className="fa-solid fa-heart"></i> : <i className="fa-solid fa-heart-circle-plus"></i>

    let [titleOptions, setTitleOptions] = useState<string[]>([])
    // let [originOptions, setOriginOptions] = useState<string[]>([])
    // let [alcoholOptions, setAlcoholOptions] = useState<string[]>([])
    let [priceOptions, setPriceOptions] = useState<number[]>([])
    let products = categoryProducts


    // let handleaddToWishList = (product: Product) => {
    //     if (wishList.includes(product._id as string)) {
    //         addRemoveWishList(product)
    //             .then((res) => {
    //                 setWishlist(wishList.filter((id) => id !== product._id));
    //                 successMsg(`${product.title} business card was removed from wishList!`);
    //             })
    //             .catch((err) => { console.log(err); });
    //     } else {
    //         addRemoveWishList(product)
    //             .then((res) => {
    //                 setWishlist([...wishList, product._id as string]);
    //                 successMsg(`${product.title} business card was added to wishList!`);
    //             })
    //             .catch((err) => { console.log(err); });
    //     }
    // };
    // let handleRegister = () => {

    // }
    // let handleAddToCart = (product: Product) => {
    //     addToCart(product)
    //         .then((res) => { setTotalProducts(res.data.totalProducts); successMsg(` ${product.title} added to cart`) }).catch((err) => console.log(err))
    // };


    //**************************************************filters

    useEffect(() => {
        if (userInfo.userId) {
            getWishList(userInfo.userId)
                .then((res) => {
                    let defaultProductIds: string[] = res.data.products?.map((product: any) => product._id) || [];
                    setWishlist(defaultProductIds)
                })
                .catch((err) => console.log(err));
        }
        const uniqueTitle = Array.from(new Set(products.map((product: Product) => product.title))).filter((title) => title !== undefined) as string[];
        const uniquePrice = Array.from(new Set(products.map((product: Product) => product.price))).filter((price) => price !== undefined) as number[];
        setTitleOptions(uniqueTitle);
        setPriceOptions(uniquePrice);
        setSelectedPrice(uniquePrice);
    }, [products]);


    return (

        <div className={`container-full  ${theme}`}>
            <h2 className="pageTitle text-uppercase mt-3">{pageTitle}</h2>
            <hr className="mx-5" />
            <div className="row">
                <div className="col text-start">
                    <button type="button" className="btn filter" onClick={handleShow}>
                        <i className="fa-solid fa-filter"></i> Filter </button>
                    <button className="btn sort"><i className="fa-solid fa-sort"></i> Sort</button>

                    <button className="btn view" onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}><i className="fa-solid fa-table-cells-large"></i> | <i className="fa-solid fa-list"></i></button>
                    <Filter
                        show={show}
                        setShow={setShow}
                        setSearchQuery={setSearchQuery}
                        setSelectedTitles={setSelectedTitles}
                        selectedTitles={selectedTitles}
                        selectedPrice={selectedPrice}
                        setSelectedPrice={setSelectedPrice}
                        titleOptions={titleOptions}
                        priceOptions={priceOptions}
                        handleClose={handleClose}
                        setPriceOptions={setPriceOptions}
                        handleRangeChange={handleRangeChange}
                    />


                </div>

                <div>

                </div>
            </div>



            {loading ? (<Loading />) : (categoryProducts.length > 0 ? (<>
                {viewMode === 'cards' && (
                    <div className="container ">
                        <div className="row card-container category">
                            {subset.map((product: Product) => (


                                <div
                                    key={product._id}
                                    className="card border rounded-3 col-md-3 mt-5 align-items-center m-2 ms-5"
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
                                            {userInfo.email === false && (
                                                <div className="row">
                                                    <div className="col left-icons text-start">
                                                        <button className="btn addToCart-btn-admin " onClick={() => handleAddToCart(product)} ><i className="fa-solid fa-cart-shopping icon"></i></button>
                                                    </div>
                                                    <div className="col right-icons text-end">
                                                        {(wishList.includes(product._id as string) ? (
                                                            <button className="btn col text-danger icon" onClick={() => {
                                                                handleaddToWishList(product);
                                                            }}    >
                                                                <i className="fa-solid fa-heart icon"></i>
                                                            </button>
                                                        ) : (
                                                            <button className="btn col" onClick={() => { handleaddToWishList(product); }}    >
                                                                <i className="fa-solid fa-heart icon"></i>
                                                            </button>)
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {userInfo.email && (

                                                <div className="row">
                                                    <div className="col left-icons text-start">
                                                        <button className="btn addToCart-btn-admin" onClick={() => handleAddToCart(product)} ><i className="fa-solid fa-cart-shopping"></i></button>
                                                    </div>
                                                    <div className="col right-icons text-end">
                                                        {userInfo.email && (wishList.includes(product._id as string) ? (
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
                                            )}
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>

                        <div className="paging-container mt-5">
                            <Pagination>
                                <Pagination.First onClick={() => handlePaginationClick(1)} />
                                <Pagination.Prev onClick={() => currentPage > 0 && handlePaginationClick(currentPage)} disabled={currentPage === 0} />
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index === currentPage}
                                        onClick={() => handlePaginationClick(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => currentPage < totalPages - 1 && handlePaginationClick(currentPage + 2)} disabled={currentPage === totalPages - 1} />
                                <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
                            </Pagination>
                        </div>
                    </div>
                )}
                {viewMode === 'table' && (
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>

                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {subset.map((product: Product) => (
                                    <tr key={product._id}>
                                        <td><img src={product.thumbnail ? (`${product.thumbnail}`) : noImg} alt={product.title} style={{ height: "7rem" }} /></td>
                                        <td>{product.title}</td>
                                        <td>{currencyFormat(product.price)}</td>

                                        <td><button className="btn" onClick={() => navigate(`/products/${category}/${product._id}`)}>More Info</button></td>
                                        <td><button className="btn addToCart-btn-admin " onClick={() => handleAddToCart(product)} ><i className="fa-solid fa-cart-shopping icon"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="paging-container justify-content-center">
                            <Pagination className="text-center">
                                <Pagination.First onClick={() => handlePaginationClick(1)} />
                                <Pagination.Prev onClick={() => currentPage > 0 && handlePaginationClick(currentPage)} disabled={currentPage === 0} />
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index === currentPage}
                                        onClick={() => handlePaginationClick(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => currentPage < totalPages - 1 && handlePaginationClick(currentPage + 2)} disabled={currentPage === totalPages - 1} />
                                <Pagination.Last onClick={() => handlePaginationClick(totalPages)} />
                            </Pagination>
                        </div>

                    </div>
                )}

            </>) : (<p>No Products To Show</p>))
            }
        </div >

    );
}

export default ProductsCategory;