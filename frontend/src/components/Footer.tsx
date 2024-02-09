import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";
import { Link } from "react-router-dom";
import { userInfo } from "os";
import Contact from "./Contact";
// import LoginModal from "./LoginModal";
// import Contact from "./Contact";
// import { Button } from "react-bootstrap";
// import User from "../interfaces/User";

interface FooterProps {
    userInfo: any;
    setUserInfo: Function;
    setOpenRegisterModal: Function;
    setOpenUserProfileModal: Function;
    setOpenLoginModal: Function;
    openContactModal: boolean;
    setOpenContactModal: Function;

}

const Footer: FunctionComponent<FooterProps> = ({ userInfo, setUserInfo, setOpenRegisterModal, setOpenUserProfileModal, setOpenLoginModal, openContactModal, setOpenContactModal
}) => {
    let theme = useContext(SiteTheme);
    return (
        <>
            <div className="container">
                <footer className="d flex flex-wrap justify-content-between py-3 my-4 border-top" data-bs-theme={`${theme}`}>
                    <div className="row">

                        <div className="col-sm-3">
                            <h5 className="footer-title">About</h5>
                            <ul className="footer-list">
                                <li ><Link to="/about" className="footer-li">About Us</Link></li>
                                <li ><button
                                    onClick={() => setOpenContactModal(true)}
                                    className=" btn footer-li">Contact Us</button></li>


                            </ul>
                        </div>
                        <div className="col-sm-3">
                            <h5 className="footer-title">My Account</h5>
                            {!userInfo.email && (<>
                                <ul className="footer-list">
                                    <li ><button
                                        onClick={() => setOpenLoginModal(true)}
                                        className=" btn footer-li">Sign In</button></li>
                                    <li ><Link to="#" className="footer-li" onClick={() => setOpenRegisterModal(true)}>Register</Link></li>
                                </ul>
                            </>)}
                            {userInfo.email && (<>
                                <ul className="footer-list">
                                    <li
                                    ><Link to="#" onClick={() => setOpenUserProfileModal(true)}
                                        className="footer-li">My Profile</Link></li>
                                    {/* <li
                                    ><Link to="#" className="footer-li">My Orders</Link></li> */}
                                    <li
                                    ><Link to="/wishlist" className="footer-li">My Wishlist</Link></li>
                                </ul>
                            </>)}

                        </div>
                        <div className="col-sm-3">
                            <h5 className="footer-title">Categories</h5>
                            <ul className="footer-list">
                                <li><Link to="/product/smartphones" className="footer-li">Smart Phones</Link></li>
                                <li><Link to="/product/laptops" className="footer-li">Laptops</Link></li>
                                <li><Link to="/product/fragrances" className="footer-li">Fragrances</Link></li>
                                <li><Link to="/" className="footer-li">All Categories</Link></li>

                            </ul>
                        </div>
                        <div className="col-sm-3 text-start">
                            <div className="row">
                                <h5 className="footer-title text-start">Follow us:</h5>
                                <div className="col-md-12 footer-list">
                                    <i className="fa-brands fa-square-facebook ms-4"></i>
                                    <i className="fa-brands fa-instagram mx-3"></i>
                                    <li></li>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-12 paymentOptions text-start">
                                    <h5 className="footer-title ">Payment Options:</h5>
                                    <img src="/images/diners.png" alt="Diners" />
                                    <img src="/images/mastercard.png" alt="Mastercard" />
                                    <img src="/images/visa.webp" alt="Visa" />
                                    <img src="/images/AmericanExpress.png" alt="American Express" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <p className="warning text-danger"><b>NOTE:</b> This site is a DEMO ONLY ! ! ! </p>
                    <hr />
                    <h6 className="copyRights">&copy; 2024 Oved Hatari</h6>


                </footer>
            </div>

            {/* <LoginModal
                show={openLoginModal}
                onHide={() => setOpenLoginModal(false)}
                setUserInfo={setUserInfo}
            // userId={openUserModal}
            /> */}
            <Contact
                show={openContactModal}
                onHide={() => setOpenContactModal(false)} />
        </>
    )
}

export default Footer;