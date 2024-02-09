import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SiteTheme } from "../App";
import { deleteProduct, getAllProducts } from "../services/productsService";
// import { successMsg } from "../services/feedbackService";
import { userInfo } from "os";
import User from "../interfaces/User";
import { Link } from "react-router-dom";
import Product from "../interfaces/Product";
// import ReactPaginate from "react-paginate";
import Loading from "./Loading";
import { Pagination } from "react-bootstrap";
import { successMsg } from "../services/feedbacksService";
import ProductsManagmentSearch from "./ProductsManagmentSearch";
// import ProductsManagmentSearch from "./ProductsManagmentSearch";

interface ProductsManagmentProps {
    products: any;
    setProducts: Function;
    userInfo: any;
    loading: any;
    setLoading: Function;
    searchQuery: any;
    setSearchQuery: Function;

}

const ProductsManagment: FunctionComponent<ProductsManagmentProps> = ({ products, setProducts, userInfo, loading, setLoading, searchQuery, setSearchQuery }) => {
    let [productsChanged, setProductsChanged] = useState<boolean>(false)
    let [data, setData] = useState([]);
    let [currentPage, setCurrentPage] = useState(0);

    let [totalPages, setTotalPages] = useState(0);
    let itemsPerPage = 12;
    let theme = useContext(SiteTheme);
    let darkMode = theme === "dark";

    let filteredProducts = products.filter((product: Product) => {
        const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = product.category.name.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryIdMatch = (product.category._id as string).toLowerCase().includes(searchQuery.toLowerCase());
        const productIdMatch = (product._id as string).toLowerCase().includes(searchQuery.toLowerCase());

        // Filter products if either title or category name matches the search query
        return titleMatch || categoryMatch || categoryIdMatch || productIdMatch;
    });


    // let filteredProducts = products.filter((product: Product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

    let filteredTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchQuery]);

    useEffect(() => {
        setLoading(true);
        getAllProducts()
            .then((res) => {
                setProducts(res.data);
                setData(res.data);
                let calculatedPages = Math.max(Math.ceil(res.data.length / itemsPerPage), 0);
                setTotalPages(calculatedPages);
                setCurrentPage(prevPage => Math.min(prevPage, Math.max(calculatedPages - 1, 0)))
                setLoading(false);

            })
            .catch((err) => {
                console.log(err); setLoading(false);
            });
    }, [productsChanged, setProducts, itemsPerPage, setLoading])

    let startIndex = currentPage * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let subset = filteredProducts.slice(startIndex, endIndex);

    let render = () => {
        setProductsChanged(!productsChanged)
    }

    let handleToDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    render();
                    successMsg("Product deleted successfully");
                })
                .catch((err) => console.log(err));
        }
    }

    let handlePaginationClick = (pageNumber: number) => { setCurrentPage(pageNumber - 1) };


    let noImg = darkMode ? "/images/noImgWhite.png" : "/images/noImgBlack.png";

    return (
        <div className={`${theme}`}>
            <div className="managment-search home-container">
            </div>
            <h2 className="text-center mt-5 mb-4">Products Managment</h2>
            <div className="container text-center">
                <div className="row justify-content-md-center mb-3">
                    <div className="col-md-auto">
                        <ProductsManagmentSearch products={products} setSearchQuery={setSearchQuery} />
                    </div>
                </div>
            </div>
            {(userInfo.isAdmin === true) && (
                <Link to="/new-product" className="btn btn-info"><i className="fa-solid fa-plus" /> Add new product</Link>
            )}
            {loading ? (<Loading />) : (products.length ? (
                <div className="container">
                    <div className="row">
                        {subset.map((product: Product) => (
                            <div
                                key={product._id}
                                className="card border rounded-3 col-md-3 mt-3 align-items-center m-2 ms-5"
                                style={{ width: "16rem", height: "28rem" }}>
                                <img src={product.thumbnail ? (`${product.thumbnail}`) : noImg} alt={product.title}
                                    style={{ width: "15rem", height: "13rem" }} className="mt-2" />
                                <div className="card-title text-center mt-2">
                                    <h5>{product.title}</h5>
                                    <h6>Category: {product.category.name}</h6>
                                    <hr />
                                    <h4>Price: {product.price} &#8362;</h4>
                                </div>
                                <div className="cardIcons">
                                    <div className="row editIcons">
                                        <div className="col text-start">
                                            < Link to={`/editproduct/${product._id}`} className="" >
                                                <i className="fa-solid fa-pencil mt-2"></i>
                                            </Link>
                                        </div>
                                        <div className="col text-end">
                                            <Link to="" className=" btn" onClick={() => handleToDelete(product._id as string)}>
                                                <i className="fa-solid fa-trash" ></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="paging-container mt-5">
                        <Pagination>
                            <Pagination.First onClick={() => handlePaginationClick(1)} />
                            <Pagination.Prev onClick={() => currentPage > 0 && handlePaginationClick(currentPage)} disabled={currentPage === 0} />
                            {Array.from({
                                length: searchQuery ? filteredTotalPages : totalPages
                            }, (_, index) => (

                                <Pagination.Item
                                    key={index + 1}
                                    active={index === currentPage}
                                    onClick={() => handlePaginationClick(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => currentPage < (searchQuery ? filteredTotalPages - 1 : totalPages - 1) && handlePaginationClick(currentPage + 2)} disabled={currentPage === (searchQuery ? filteredTotalPages - 1 : totalPages - 1)} />

                            <Pagination.Last onClick={() => handlePaginationClick(searchQuery ? filteredTotalPages : totalPages)} />
                        </Pagination>
                    </div>

                </div>
            ) : (<p>No products found</p>))}



        </div>
    )
}

export default ProductsManagment;