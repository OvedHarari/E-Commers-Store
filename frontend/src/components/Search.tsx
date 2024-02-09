import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { currencyFormat } from "../services/currencyFormater";
import { errorMsg, successMsg } from "../services/feedbacksService";

interface SearchProps {
    userInfo: any; allProducts: Product[]; setSearchQuery: Function; updateCartData: Function;
}

const Search: FunctionComponent<SearchProps> = ({ userInfo, allProducts, setSearchQuery, updateCartData /*updateCart*/ }) => {
    let navigate = useNavigate()
    let [searchRes, setSearchRes] = useState<Product[]>([]);
    let [key, setKey] = useState<string>("");

    useEffect(() => {
        let search = async () => {
            try {
                if (!key.trim()) {
                    setSearchRes([]);
                    return;
                }
                let searchProducts = allProducts.filter((product: Product) => product.title.toLowerCase().includes(key.toLowerCase()))
                setSearchRes(searchProducts.slice(0, 6));

                if (searchProducts.length === 0) errorMsg('No matching products found')

            } catch (error) {
                console.log(error);
            }
        }
        search()
    }, [key, allProducts])

    let handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, product: Product) => {
        event.stopPropagation();
        addToCart(product)
            .then((res) => {
                successMsg(` ${product.title} added to cart`);
                updateCartData(product)
                handleClose()
            })
            .catch((err) => console.log(err))
    }

    let handleClose = () => {
        setKey("");
        setSearchRes([]);
    }

    let handleClick = () => {
        if (searchRes.length > 0) {
            navigate(`/search/${key}`);
        }
    }

    let handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
            handleClose();
        }
    }

    return (
        <>
            <form style={{ display: "flex", alignItems: "center" }}>

                <div className="form-group" style={{ display: "flex", alignItems: "center" }}>

                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search Product... "
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                            setSearchQuery(e.target.value)
                        }}
                        onKeyDown={handleEnterPress}
                    />
                    {key && (<button type="button" className="btn close-btn" onClick={handleClose}><i className="fa-solid fa-xmark"></i></button>)}

                    <i className="fa-solid fa-magnifying-glass ms-1" onClick={() => { handleClick(); handleClose(); }}></i>
                </div>


                {searchRes && searchRes.length > 0 && (
                    <div className="search-result">
                        {searchRes.map((product: Product) => (
                            <div className="result-item" key={product._id} onClick={() => { navigate(`/products/${product._id}`); handleClose() }}>
                                <div className="img"><img src={product.thumbnail} alt={product.title} /></div>
                                <div className="product-info mt-2 nb-0">
                                    <h5 className="product-name">{product.title}</h5>
                                    <p>Price: {currencyFormat(product.price)}</p>
                                </div>
                                {userInfo.isAdmin === false && (
                                    <div className="btn-container">
                                        <button type="button" className="btn search-addToCart-btn" onClick={(e) => handleAddToCart(e, product)}>Add To Cart</button>
                                    </div>
                                )}
                                {userInfo.isAdmin && (
                                    <div className="btn-container">
                                        <button type="button" disabled className="btn search-addToCart-btn">Add To Cart</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </form >
        </>
    )
}

export default Search;