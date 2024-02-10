import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserById } from './services/usersService';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GoogleAuth from './components/GoogleAuth';
import Cart from './components/Cart';
import Category from './interfaces/Category';
import { getAllCategories } from './services/categoryService';
import Product from './interfaces/Product';
import { addToCart, getCart } from './services/cartService';
import ShippingInfo from './components/ShippingInfo';
import ProductsCategory from './components/ProductsCategory';
import Search from './components/Search';
import { getAllProducts } from './services/productsService';
import SearchResults from './components/SearchResults';
import ProductPage from './components/ProductPage';
import { addRemoveWishList } from './services/wishListService';
import { successMsg } from './services/feedbacksService';
import Wishlist from './components/Wishlist';
import Footer from './components/Footer';
import About from './components/About';
import UsersManagement from './components/UsersManagement';
import ProductsManagment from './components/ProductsManagment';
import ProductsManagmentSearch from './components/ProductsManagmentSearch';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';
import NewCategory from './components/NewCategory';
import EditCategory from './components/EditCategory';
const theme = { light: "light", dark: "dark", };
export let SiteTheme = createContext(theme.light);
type Quantity = { [key: string]: number };

function App() {
  let [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem("darkMode")!));
  let [loading, setLoading] = useState<boolean>(false);
  let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo") as string) == null ? { email: false } : JSON.parse(sessionStorage.getItem("userInfo") as string));
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let render = () => setDataUpdated(!dataUpdated)
  let [userProfile, setUserProfile] = useState<any>({
    _id: 0, name: { firstName: "", middleName: "", lastName: "" }, phone: "", email: "", password: "", image: { url: "", alt: "" }, gender: "",
    role: "", address: { country: "", state: "", city: "", street: "", houseNumber: "", zipcode: "" },
    picture: "", isActive: ""
  })
  let [passwordShown, setPasswordShown] = useState(false);
  let togglePassword = () => { setPasswordShown(!passwordShown) };
  let [productsInCart, setProductsInCart] = useState<Product[]>([]);
  let [totalProducts, setTotalProducts] = useState<number>(0);
  let [totalPrice, setTotalPrice] = useState<number>(0);
  let [cartData, setCartData] = useState<any>();
  let updateCartData = (newProduct: any) => { setCartData((prevCartData: any) => [...prevCartData, newProduct]) };
  let [openCreditModal, setOpenCreditModal] = useState<boolean>(false);
  let [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  let [categories, setCategories] = useState<Category[]>([]);
  let [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  let [searchQuery, setSearchQuery] = useState<string>("");
  let [show, setShow] = useState<boolean>(false)
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [productQuantity, setProductQuantity] = useState<Quantity>({});
  let [userProfileModal, setOpenUserProfileModal] = useState<boolean>(false)
  let [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false)
  let [openContactModal, setOpenContactModal] = useState<boolean>(false);
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
  let handleAddToCart = (product: Product) => {
    addToCart(product)
      .then((res) => { setTotalProducts(res.data.totalProducts); successMsg(` ${product.title} added to cart`) }).catch((err) => console.log(err))
  };

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data)).catch((err) => console.log(err))
    getAllProducts().then((res) => setAllProducts(res.data));
    if (userInfo.userId) {
      getUserById(userInfo.userId).then((res) => { setUserProfile(res.data); }).catch((err) => console.log(err));
    }
  }, [dataUpdated, userInfo]);

  useEffect(() => {
    if (userInfo.email) {
      getCart().then((res) => { setTotalProducts(res.data.totalProducts); }).catch((err) => console.log(err))
    }
  }, [userInfo.email]);

  return (
    <SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
      <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
      <div className={`App  ${darkMode && "dark"}`}>
        <Router>
          <Navbar userInfo={userInfo} setUserInfo={setUserInfo} setDarkMode={setDarkMode} darkMode={darkMode} userProfile={userProfile} setUserProfile={setUserProfile} render={render} passwordShown={passwordShown} togglePassword={togglePassword} categories={categories} totalProducts={totalProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} updateCartData={updateCartData} allProducts={allProducts} openRegisterModal={openRegisterModal} setOpenRegisterModal={setOpenRegisterModal} setOpenUserProfileModal={setOpenUserProfileModal} userProfileModal={userProfileModal} setOpenLoginModal={setOpenLoginModal} openLoginModal={openLoginModal} />
          <Routes>
            <Route path="/" element={<Home userInfo={userInfo} loading={loading} setLoading={setLoading} categories={categories} setTotalProducts={setTotalProducts} setOpenLoginModal={setOpenLoginModal} />} />
            <Route path="/about" element={<About setOpenContactModal={setOpenContactModal} />} />
            <Route path="/wishlist" element={<Wishlist userInfo={userInfo} loading={loading} setLoading={setLoading} setTotalProducts={setTotalProducts} setOpenLoginModal={setOpenLoginModal} />} />
            <Route path="/google/success" element={<GoogleAuth setUserInfo={setUserInfo} />} />
            <Route element={<Search allProducts={allProducts} setSearchQuery={setSearchQuery} updateCartData={updateCartData} userInfo={userInfo} />} />
            <Route path='/Search/:key' element={<SearchResults products={allProducts} />} />
            <Route path='/cart' element={<Cart loading={loading} setLoading={setLoading} userInfo={userInfo} cartData={cartData} setCartData={setCartData} productsInCart={productsInCart} setProductsInCart={setProductsInCart} totalProducts={totalProducts} setTotalProducts={setTotalProducts} totalPrice={totalPrice} setTotalPrice={setTotalPrice} productQuantity={productQuantity} setProductQuantity={setProductQuantity} />} />
            <Route path='/product/:category' element={<ProductsCategory loading={loading} setLoading={setLoading} userInfo={userInfo} productsInCart={productsInCart} setProductsInCart={setProductsInCart} totalProducts={totalProducts} setTotalProducts={setTotalProducts} totalPrice={totalPrice} setTotalPrice={setTotalPrice} productQuantity={productQuantity} setProductQuantity={setProductQuantity} categoryProducts={categoryProducts} setCategoryProducts={setCategoryProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} show={show} setShow={setShow} categories={categories} setOpenLoginModal={setOpenLoginModal} />} />
            <Route path='/products/:productId' element={<ProductPage setAllProducts={setCategoryProducts} userInfo={userInfo} setOpenLoginModal={setOpenLoginModal} handleaddToWishList={handleaddToWishList} handleAddToCart={handleAddToCart} wishList={wishList} setWishlist={setWishlist} setLoading={setLoading} />} />
            <Route path='/shipping' element={<ShippingInfo loading={loading} setLoading={setLoading} userInfo={userInfo} userProfile={userProfile} setUserProfile={setUserProfile} render={render} totalProducts={totalProducts} totalPrice={totalPrice} productsInCart={productsInCart} productQuantity={productQuantity} openCreditModal={openCreditModal} setOpenCreditModal={setOpenCreditModal} />} />
            <Route path="/usersmanagement" element={<UsersManagement darkMode={darkMode} render={render} userProfile={userProfile} setUserProfile={setUserProfile} passwordShown={passwordShown} togglePassword={togglePassword} userInfo={userInfo} dataUpdated={dataUpdated} />} />
            <Route path='/products-managment' element={<ProductsManagment products={allProducts} setProducts={setAllProducts} userInfo={userInfo} loading={loading} setLoading={setLoading} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
            <Route element={<ProductsManagmentSearch setSearchQuery={setSearchQuery} products={allProducts} />} />
            <Route path="/newproduct" element={<NewProduct categories={categories} />} />
            <Route path="/newcategory" element={<NewCategory />} />
            <Route path='/editproduct/:productId' element={<EditProduct categories={categories} />} />
            <Route path='/editcategory' element={<EditCategory categories={categories} />} />

          </Routes>
          <Footer userInfo={userInfo} setOpenRegisterModal={setOpenRegisterModal} setOpenUserProfileModal={setOpenUserProfileModal} setOpenLoginModal={setOpenLoginModal} openContactModal={openContactModal} setOpenContactModal={setOpenContactModal}
          />
        </Router>
      </div>
    </SiteTheme.Provider>
  );
}

export default App;
