import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserById } from './services/usersService';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import GoogleAuth from './components/GoogleAuth';
import Cart from './components/Cart';
import Category from './interfaces/Category';
import { getAllCategories } from './services/categoryService';
import Product from './interfaces/Product';
import { getCart } from './services/cartService';
import ShippingInfo from './components/ShippingInfo';
// import { currencyFormat } from './services/currencyFormater';
import ProductsCategory from './components/ProductsCategory';
import Search from './components/Search';
import { getAllProducts } from './services/productsService';
import SearchResults from './components/SearchResults';
import ProductPage from './components/ProductPage';
const theme = { light: "light", dark: "dark", };
export let SiteTheme = createContext(theme.dark);
// export let QuantityContext = createContext<{ quantity: any; setQuantity: React.Dispatch<any> }>({ quantity: {}, setQuantity: () => { } });
type Quantity = { [key: string]: number };

function App() {
  let [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem("darkMode")!));
  let [loading, setLoading] = useState<boolean>(false);
  let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo") as string) == null ? { email: false } : JSON.parse(sessionStorage.getItem("userInfo") as string));
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let render = () => setDataUpdated(!dataUpdated)
  let [userProfile, setUserProfile] = useState<any>({
    _id: 0,
    name: { firstName: "", middleName: "", lastName: "" },
    phone: "",
    email: "",
    password: "",
    image: { url: "", alt: "" },
    gender: "",
    role: "",
    address: { country: "", state: "", city: "", street: "", houseNumber: "", zipcode: "" },
    picture: "",
    isActive: ""
  })
  let [passwordShown, setPasswordShown] = useState(false);
  let togglePassword = () => { setPasswordShown(!passwordShown) };
  let [productsInCart, setProductsInCart] = useState<Product[]>([]);
  let [totalProducts, setTotalProducts] = useState<number>(0);
  let [totalPrice, setTotalPrice] = useState<number>(0);
  let [cartData, setCartData] = useState<any>();
  let updateCartData = (newProduct: any) => { setCartData((prevCartData: any) => [...prevCartData, newProduct]) };
  let [openCreditModal, setOpenCreditModal] = useState<boolean>(false);
  let [categories, setCategories] = useState<Category[]>([]);
  let [editForm, setEditForm] = useState<boolean>(true);
  let [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  let [searchQuery, setSearchQuery] = useState<string>("");
  let [show, setShow] = useState<boolean>(false)
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let [productQuantity, setProductQuantity] = useState<Quantity>({});

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data)).catch((err) => console.log(err)
    )
    getAllProducts().then((res) => setAllProducts(res.data));
    if (userInfo.userId) {
      getUserById(userInfo.userId)
        .then((res) => { setUserProfile(res.data); }).catch((err) => console.log(err));
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

          <Navbar userInfo={userInfo} setUserInfo={setUserInfo} setDarkMode={setDarkMode} darkMode={darkMode} userProfile={userProfile} setUserProfile={setUserProfile} render={render} passwordShown={passwordShown} togglePassword={togglePassword} categories={categories} setCategories={setCategories} loading={loading} setLoading={setLoading} productsInCart={productsInCart} setProductsInCart={setProductsInCart} totalProducts={totalProducts} dataUpdated={dataUpdated} setSearchQuery={setSearchQuery} searchQuery={searchQuery} updateCartData={updateCartData} allProducts={allProducts} />
          <Routes>
            <Route path="/" element={<Home userInfo={userInfo} loading={loading} setLoading={setLoading} categories={categories} setCategories={setCategories} productsInCart={productsInCart} setProductsInCart={setProductsInCart} setCartData={setCartData} render={render} setTotalProducts={setTotalProducts} setAllProducts={setAllProducts} />} />
            <Route path="/google/success" element={<GoogleAuth setUserInfo={setUserInfo} />} />
            <Route path='/login' element={<Login setUserInfo={setUserInfo} passwordShown={passwordShown} togglePassword={togglePassword} />} />
            <Route path='/register' element={<Register setUserInfo={setUserInfo} passwordShown={passwordShown} togglePassword={togglePassword} />} />
            <Route element={<Search allProducts={allProducts} setSearchQuery={setSearchQuery} updateCartData={updateCartData} userInfo={userInfo} /*updateCart={updateCart}*/ />} />
            <Route path='/Search/:key' element={<SearchResults products={allProducts} setProducts={setAllProducts} />} />
            <Route path='/cart' element={<Cart loading={loading} setLoading={setLoading} userInfo={userInfo} cartData={cartData} setCartData={setCartData} productsInCart={productsInCart} setProductsInCart={setProductsInCart} totalProducts={totalProducts} setTotalProducts={setTotalProducts} totalPrice={totalPrice} setTotalPrice={setTotalPrice} productQuantity={productQuantity} setProductQuantity={setProductQuantity} />} />
            <Route path='/product/:category' element={<ProductsCategory loading={loading} setLoading={setLoading} userInfo={userInfo} productsInCart={productsInCart} setProductsInCart={setProductsInCart} totalProducts={totalProducts} setTotalProducts={setTotalProducts} totalPrice={totalPrice} setTotalPrice={setTotalPrice} productQuantity={productQuantity} setProductQuantity={setProductQuantity} categoryProducts={categoryProducts} setCategoryProducts={setCategoryProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} show={show} setShow={setShow} categories={categories} />} />
            <Route path='/products/:productId' element={<ProductPage setAllProducts={setCategoryProducts} userInfo={userInfo} allProducts={allProducts} />} />
            <Route path='/shipping' element={<ShippingInfo loading={loading} setLoading={setLoading} userInfo={userInfo} userProfile={userProfile} setUserProfile={setUserProfile} render={render} totalProducts={totalProducts} totalPrice={totalPrice} productsInCart={productsInCart} productQuantity={productQuantity} setProductQuantity={setProductQuantity} setTotalPrice={setTotalPrice} openCreditModal={openCreditModal} setOpenCreditModal={setOpenCreditModal} />} />



          </Routes>
        </Router>
      </div>
    </SiteTheme.Provider>
  );
}

export default App;
