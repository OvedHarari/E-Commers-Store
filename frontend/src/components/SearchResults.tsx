import { FunctionComponent, useContext, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SiteTheme } from "../App";
import { currencyFormat } from "../services/currencyFormater";


interface SearchResultsProps { products: Product[]; }

const SearchResults: FunctionComponent<SearchResultsProps> = ({ products }) => {
    let location = useLocation();
    let navigate = useNavigate();
    let theme = useContext(SiteTheme);
    let darkMode = theme === "dark";
    let searchQuery = decodeURIComponent(location.pathname.split("/")[2]);
    let [searchResults, setSearchResults] = useState<Product[]>([]);

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
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default SearchResults;