import { FunctionComponent, useContext, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllProducts } from "../services/productsService";
import { SiteTheme } from "../App";
import { currencyFormat } from "../services/currencyFormater";
import { addToCart } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";

interface SearchResultsProps {
    products: Product[];
    setProducts: Function;
    // searchQuery: string;
}

const SearchResults: FunctionComponent<SearchResultsProps> = ({ products, setProducts /*searchQuery*/ }) => {
    let location = useLocation();
    let navigate = useNavigate();
    let theme = useContext(SiteTheme);
    let darkMode = theme === "dark";
    let searchQuery = decodeURIComponent(location.pathname.split("/")[2]);
    let [searchResults, setSearchResults] = useState<Product[]>([]);
    let { category, subcategory } = useParams();
    // let quantity = 0;


    useEffect(() => {
        let filteredResults = products.filter((product: Product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [products, searchQuery]);


    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";


    return (
        <>
            <h2>Search Results for: {searchQuery}</h2>
            <div className="search-results ">
                <div className="row card-container category  mx-5">
                    {searchResults.map((product: Product) => (
                        <div
                            key={product._id}
                            className="card col-md-3 mt-3 align-items-center m-2"
                            style={{ width: " 16rem", height: "28rem" }}>
                            <img src={product.thumbnail ? (`${product.thumbnail}`) : noImg} alt={product.title}
                                style={{ height: "13rem" }} className="mt-2"

                                onClick={() => navigate(`/products/${product._id}`)} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>

                                <p className="card-text">Price: {currencyFormat(product.price)}</p>
                                {/* <div className="add-to-cart">
                                    {product.stock as number > 0 ? (<button className="btn w-100 btn-info align-items-center" onClick={() => handleAddToCart(product)}>Add to cart</button>) : (<div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                                        <div className="d-flex align-items-center justify-content-center quantityBtn" style={{ gap: ".5rem" }}>
                                            <button className="btn ">-</button>
                                            <div><span className="fs-5 ">{product.stock}</span> in cart</div>
                                            <button className="btn ">+</button>
                                        </div>
                                        <button className="btn bg-danger removeBtn" >Remove</button>
                                    </div>)}
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default SearchResults;