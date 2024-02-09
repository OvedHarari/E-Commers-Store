import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";

interface ProductsManagmentSearchProps {
    products: Product[]; setSearchQuery: Function;
}

const ProductsManagmentSearch: FunctionComponent<ProductsManagmentSearchProps> = ({ products, setSearchQuery }) => {
    let [key, setKey] = useState<string>("");

    useEffect(() => {
        setSearchQuery(key);
    }, [key, setSearchQuery]);

    let handleClose = () => {
        setKey("");
    };

    return (
        <>
            <form style={{ display: "flex", alignItems: "center" }}>
                <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
                    <input
                        className="managment-form-control form-control"
                        type="text"
                        placeholder="Search Products"
                        value={key}
                        onChange={(e) =>
                            setKey(e.target.value)
                        }
                    />
                    {key && (
                        <button type="button" className="btn managment-close-btn" onClick={handleClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </div>


            </form>        </>
    )
}

export default ProductsManagmentSearch;