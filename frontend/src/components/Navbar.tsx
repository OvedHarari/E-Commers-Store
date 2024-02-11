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
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

interface NavbarProps {
    darkMode: boolean; setDarkMode: Function; userInfo: any; setUserInfo: Function; userProfile: any; setUserProfile: Function; render: Function; passwordShown: boolean; togglePassword: Function; categories: Category[]; totalProducts: number; setSearchQuery: Function; searchQuery: any; updateCartData: Function; allProducts: Product[]; setOpenRegisterModal: Function;
    openRegisterModal: boolean; setOpenUserProfileModal: Function; userProfileModal: boolean; setOpenLoginModal: Function; openLoginModal: boolean;
}
const Navbar: FunctionComponent<NavbarProps> = ({ setDarkMode, darkMode, userInfo, setUserInfo, userProfile, setUserProfile, render, passwordShown, togglePassword, categories, setOpenUserProfileModal, userProfileModal, totalProducts, setSearchQuery, searchQuery, updateCartData, allProducts,
    openRegisterModal, setOpenRegisterModal, setOpenLoginModal, openLoginModal, }) => {
    let theme = useContext(SiteTheme);
    let navigate = useNavigate();
    let updateUserProfile = () => getUserProfile()
        .then((res) => { setUserProfile(res.data); })
        .catch((err) => console.log(err));
    let [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);
    let Logout = async () => {
        setUserInfo({ email: false, role: false });
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
        navigate("/");
        getGooglSignOut().then((res) => { })
            .catch((err) => console.log(err));
        successMsg("See you soon 😉");
    };
    const defaultProfileImage = () => {
        if (userInfo.picture) {
            return userInfo.picture;
        } else if (userInfo.gender) {
            switch (userInfo.gender) {
                case "male":
                    return "/images/users_img/user_male.webp";
                case "female":
                    return "/images/users_img/user_female.webp";
                case "other":
                    return "/images/users_img/user_other.jpg";
                default:
                    break;
            }
        }
        return "/images/users_img/user_male.webp";
    };

    useEffect(() => { }, [totalProducts]);

    return (
        <>
            <div className="sticky-top">
                <nav
                    className="navbar navbar-expand-md bg-body-tertiary "
                    data-bs-theme={`${theme}`}
                    style={{ position: "sticky", top: 0 }}                >
                    <div className="container-fluid ">
                        <Nav.Link className="navbar-brand fw-bold ms-3 " href="/">
                            All-In <i className="fa-solid fa-anchor-circle-exclamation"></i>
                        </Nav.Link>
                        <div className="search-bar-locator">
                            {searchBarOpen ? (
                                <Search
                                    allProducts={allProducts}
                                    setSearchQuery={setSearchQuery}
                                    updateCartData={updateCartData}
                                    userInfo={userInfo}
                                />
                            ) : (
                                <button
                                    type="button"
                                    className="btn search-btn"
                                    onClick={() => {
                                        if (setSearchBarOpen && searchQuery.trim() !== "") {
                                            navigate(`/search/${searchQuery}`);
                                            setSearchBarOpen(false);
                                        } else {
                                            setSearchBarOpen(!searchBarOpen);
                                        }
                                    }}
                                >
                                    <i className="fa-solid fa-magnifying-glass" ></i>
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
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Nav.Link className="nav-link mt-2" href="/about">
                                        About
                                    </Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <NavDropdown
                                        id="basic-nav-dropdown"
                                        title="Shop"
                                        className="nav-link"
                                        aria-current="page">
                                        {categories.map((category) => (
                                            <NavDropdown.Item
                                                key={category._id}
                                                href={`/product/${category.name}`}
                                                className="btn btn-outline mt-1">
                                                {category.name}
                                            </NavDropdown.Item>
                                        ))}
                                    </NavDropdown>
                                </li>
                                {userInfo.email && (
                                    <>
                                        <li className="nav-item">
                                            <Nav.Link className="nav-link mt-2" href="/wishlist">
                                                Wish List
                                            </Nav.Link>
                                        </li>
                                        {(userInfo.role === "business" || userInfo.role === "admin") && (
                                            <>
                                                {userInfo.role === "admin" && (
                                                    <li className="nav-item ">
                                                        <NavDropdown className="nav-link" id="admin-dropdown" title="Admin"  >
                                                            <NavDropdown.Item className="btn btn-outline mt-1" href="/usersmanagement">
                                                                Users Management
                                                            </NavDropdown.Item>
                                                            <NavDropdown className="btn btn-outline mt-1" id="product-management" title="Products Management">
                                                                <NavDropdown.Item className="btn btn-outline mt-1" href="/editcategory">
                                                                    Change Category Name
                                                                </NavDropdown.Item>
                                                                <NavDropdown.Item className="btn btn-outline mt-1" href="/newcategory">
                                                                    Add New Category
                                                                </NavDropdown.Item>
                                                                <NavDropdown.Item className="btn btn-outline mt-1" href="/products-managment">
                                                                    Edit \ Delete PRODUCTS
                                                                </NavDropdown.Item>
                                                                <NavDropdown.Item className="btn btn-outline mt-1" href="/newproduct">
                                                                    Add New Product
                                                                </NavDropdown.Item>
                                                            </NavDropdown>
                                                        </NavDropdown>
                                                    </li>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </ul>
                            <form className="d-flex modalForm">
                                <div
                                    className="mt-2 me-3 ms-3 fs-4"
                                    onClick={() => {
                                        setDarkMode(!darkMode);
                                        localStorage.setItem("darkMode", JSON.stringify(!darkMode));
                                    }}>
                                    {darkMode ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
                                </div>
                                <Nav.Link href="#" className="mt-2" id="basic-nav-dropdown">
                                    {userInfo.email ? (
                                        <button
                                            className="btn shopping-cart-btn"
                                            onClick={() => {
                                                userInfo.userId ? navigate("/cart") : setOpenLoginModal(true);
                                            }}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <div className="position-relative">
                                                <div className="items-counter rounded-circle w-100 d-flex justify-content-center align-items-center position-absolute">
                                                    {totalProducts ? totalProducts : 0}
                                                </div>
                                            </div>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn shopping-cart-btn"
                                            onClick={() => {
                                                userInfo.userId ? navigate("/cart") : setOpenLoginModal(true);
                                            }}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <div className="position-relative">
                                                <div className="items-counter rounded-circle w-100 d-flex justify-content-center align-items-center position-absolute">
                                                    {0}
                                                </div>
                                            </div>
                                        </button>
                                    )}
                                </Nav.Link>
                                <NavDropdown className="mt-1 me-2 ms-3" id="basic-nav-dropdown" title={userInfo.email ? (
                                    <img
                                        src={userProfile.userImgURL ? `${userProfile.userImgURL}` : defaultProfileImage()}
                                        className="rounded-circle profileImg mt-2"
                                        width="25"
                                        alt="user profile"
                                        onClick={() => {
                                            setOpenUserProfileModal(true);
                                            updateUserProfile();
                                        }} />
                                ) : (
                                    <i className="fa-solid fa-user me-2 mt-3"></i>
                                )}>
                                    {userInfo.email && (
                                        <NavDropdown.Item className="btn btn-outline mt-1">
                                            <button className="btn btn-outline" onClick={() => { Logout(); }}>
                                                Logout
                                            </button>
                                        </NavDropdown.Item>
                                    )}
                                    {!userInfo.email && (
                                        <>
                                            <NavDropdown.Item className="btn btn-outline mt-1" onClick={() => setOpenRegisterModal(true)}>
                                                Register
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="" className="btn btn-outline mt-1" onClick={() => setOpenLoginModal(true)}>
                                                Login
                                            </NavDropdown.Item>
                                        </>
                                    )}
                                </NavDropdown>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <UserProfileModal
                show={userProfileModal}
                onHide={() => setOpenUserProfileModal(false)}
                render={render}
                userInfo={userInfo}
                userProfile={userProfile}
                setUserProfile={setUserProfile} />
            <RegisterModal
                show={openRegisterModal}
                onHide={() => setOpenRegisterModal(false)}
                setUserInfo={setUserInfo}
                passwordShown={passwordShown}
                togglePassword={togglePassword}
                setOpenLoginModal={setOpenLoginModal} />
            <LoginModal
                show={openLoginModal}
                onHide={() => setOpenLoginModal(false)}
                setUserInfo={setUserInfo}
                passwordShown={passwordShown}
                togglePassword={togglePassword}
                setOpenRegisterModal={setOpenRegisterModal} />
        </>
    );
};

export default Navbar;