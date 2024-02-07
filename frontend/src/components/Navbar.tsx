import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";
import { successMsg } from "../services/feedbacksService";
import UserProfileModal from "./UserProfileModal";
import { getGooglSignOut, getUserProfile } from "../services/usersService";
import { Nav, NavDropdown } from "react-bootstrap";
import Category from "../interfaces/Category";
import Product from "../interfaces/Product";
import Search from "./Search";

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: Function;
    userInfo: any;
    setUserInfo: Function;
    userProfile: any;
    setUserProfile: Function;
    render: Function;
    passwordShown: boolean;
    togglePassword: Function;
    categories: Category[];
    setCategories: Function;
    productsInCart: any;
    setProductsInCart: Function;
    loading: any;
    setLoading: Function;
    totalProducts: number;
    dataUpdated: boolean;
    setSearchQuery: Function;
    searchQuery: any;
    updateCartData: Function;
    allProducts: Product[];
}

const Navbar: FunctionComponent<NavbarProps> = ({
    setDarkMode,
    darkMode,
    userInfo,
    setUserInfo,
    userProfile,
    setUserProfile,
    render,
    passwordShown,
    togglePassword,
    categories,
    setCategories, productsInCart, setProductsInCart, loading, setLoading, totalProducts, dataUpdated, setSearchQuery,
    searchQuery, updateCartData, allProducts
}) => {
    let theme = useContext(SiteTheme);
    let [userProfileModal, setOpenUserProfileModal] = useState<boolean>(false)
    let navigate = useNavigate();
    let updateUserProfile = () => getUserProfile().then((res) => { setUserProfile(res.data); }).catch((err) => console.log(err))
    let [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);
    let Logout = async () => {
        setUserInfo({ email: false, role: false, });
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");

        navigate("/");
        getGooglSignOut().then((res) => { }).catch((err) => console.log(err));
        successMsg("See you soon 😉");
    };
    const defaultProfileImage = () => {
        if (userInfo.picture) { return userInfo.picture } else
            if (userInfo.gender) {
                switch (userInfo.gender) {
                    case "male":
                        return "images/users_img/user_male.webp";
                    case "female":
                        return "images/users_img/user_female.webp";
                    case "other":
                        return "images/users_img/user_other.jpg";
                    default:
                        break;
                }
            } return "images/users_img/user_male.webp";
    };

    useEffect(() => {


    }, [totalProducts]);

    return (
        <>
            <div>
                <nav
                    className="navbar navbar-expand-md bg-body-tertiary "
                    data-bs-theme={`${theme}`} >
                    <div className="container-fluid">
                        <Nav.Link className="navbar-brand fw-bold" href="/">
                            E-Store
                        </Nav.Link>
                        <div className="search-bar-locator">
                            {searchBarOpen ? (<Search allProducts={allProducts} setSearchQuery={setSearchQuery} updateCartData={updateCartData} userInfo={userInfo}/*updateCart={updateCart}*/ />) : (
                                <button type="button" className="btn search-btn" onClick={() => {
                                    if (setSearchBarOpen && searchQuery.trim() !== "") {
                                        navigate(`/search/${searchQuery}`);
                                        setSearchBarOpen(false);
                                    } else { setSearchBarOpen(!searchBarOpen); }
                                }
                                }>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>

                            )}

                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavDropdown id="basic-nav-dropdown" title="Shop" className="nav-link" aria-current="page" >
                                        {categories.map(category => (
                                            <NavDropdown.Item key={category._id} href={`/product/${category.name}`} className="btn btn-outline mt-1">
                                                {category.name}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                </li>
                                {userInfo.email && (
                                    <>
                                        <li className="nav-item">
                                            <Nav.Link className="nav-link mt-2" href="/wishList">
                                                Wish List
                                            </Nav.Link>
                                        </li>
                                        {(userInfo.role === "business" || userInfo.role === "admin") && (
                                            <>
                                                <li className="nav-item">
                                                    <Nav.Link className="nav-link mt-2" href="/mycards">
                                                        My Cards
                                                    </Nav.Link>
                                                </li>
                                                {userInfo.role === "admin" && (

                                                    <li className="nav-item mt-2">
                                                        <Nav.Link className="nav-link" href="/usersmanagement">
                                                            Admin
                                                        </Nav.Link>
                                                    </li>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </ul>
                            <form className="d-flex modalForm">
                                <div className="mt-2 me-3 ms-3 fs-4" onClick={() => {
                                    setDarkMode(!darkMode);
                                    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
                                }}>
                                    {darkMode ? (<i className="fa-solid fa-moon"></i>) : (<i className="fa-solid fa-sun"></i>)}
                                </div>
                                {/* {userInfo.email && (
                                    <>
                                        <button className="btn btn-outline" onClick={() => { Logout(); }}>
                                            Logout
                                        </button>
                                        <img src={userProfile && userProfile.userImgURL ? (`${userProfile.userImgURL}`) : (defaultProfileImage())}
                                            className="rounded-circle profileImg" width="50"
                                            alt="user profile"
                                            onClick={() => {
                                                setOpenUserProfileModal(true)
                                                updateUserProfile()
                                            }}></img>
                                    </>
                                )} */}

                                <Nav.Link
                                    href="#"
                                    className="mt-2" id="basic-nav-dropdown">
                                    {userInfo.email ? (
                                        <button className="btn shopping-cart-btn" onClick={() => { userInfo.userId ? (navigate("/cart")) : (navigate("/register")) }}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <div className="position-relative">
                                                <div className="items-counter rounded-circle w-100 d-flex justify-content-center align-items-center position-absolute">
                                                    {(totalProducts) ? totalProducts : 0}
                                                </div>
                                            </div>
                                        </button>)
                                        : (
                                            <button className="btn shopping-cart-btn" onClick={() => { userInfo.userId ? (navigate("/cart")) : (navigate("/register")) }}>
                                                <i className="fa-solid fa-cart-shopping"></i>
                                                <div className="position-relative">
                                                    <div className="items-counter rounded-circle w-100 d-flex justify-content-center align-items-center position-absolute">
                                                        {0}
                                                    </div>
                                                </div>
                                            </button>)
                                    }

                                </Nav.Link>
                                <NavDropdown className="mt-1 me-2 ms-3" id="basic-nav-dropdown"
                                    title={userInfo.email ? (<img src={userProfile.userImgURL ? (`${userProfile.userImgURL}`) : (defaultProfileImage())}
                                        className="rounded-circle profileImg mt-2" width="25"
                                        alt="user profile"
                                        onClick={() => {
                                            setOpenUserProfileModal(true)
                                            updateUserProfile()
                                        }}></img>) : (<i className="fa-solid fa-user me-2 mt-3"></i>)


                                    } >
                                    {userInfo.email && (
                                        <NavDropdown.Item className="btn btn-outline mt-1">
                                            <button className="btn btn-outline" onClick={() => { Logout(); }}>
                                                Logout
                                            </button>
                                        </NavDropdown.Item>
                                    )}
                                    {!userInfo.email && (
                                        <>
                                            <NavDropdown.Item href="/register" className="btn btn-outline mt-1">
                                                Register
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="/login" className="btn btn-outline mt-1">
                                                Login
                                            </NavDropdown.Item>
                                        </>)}

                                </NavDropdown>

                                {/* {!userInfo.email && (
                                    <>
                                        <Link to="/register" className="btn btn-outline mt-1">
                                            Register
                                        </Link>
                                        <Link to="/login" className="btn btn-outline mt-1">
                                            Login
                                        </Link>
                                    </>)} */}
                            </form>
                        </div>
                    </div>
                </nav >
            </div >

            <UserProfileModal
                show={userProfileModal}
                onHide={() => setOpenUserProfileModal(false)}
                render={render}
                userInfo={userInfo}
                userProfile={userProfile}
                setUserProfile={setUserProfile} />
        </>
    );
};

export default Navbar;
