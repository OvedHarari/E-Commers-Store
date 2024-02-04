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

const theme = { light: "light", dark: "dark", };
export let SiteTheme = createContext(theme.dark);
export let QuantityContext = createContext<{ quantity: any; setQuantity: React.Dispatch<any> }>({ quantity: {}, setQuantity: () => { } });

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
  type Quantity = { [key: string]: number };
  let [totalProducts, setTotalProducts] = useState<number>(0);
  // let initialQuantity = totalProducts: {};
  let initialQuantity = localStorage.getItem('quantity') ? JSON.parse(localStorage.getItem('quantity')!) : {};
  let [quantity, setQuantity] = useState<Quantity>(initialQuantity);
  let [cartData, setCartData] = useState<any>();
  let updateCartData = (newProduct: any) => { setCartData((prevCartData: any) => [...prevCartData, newProduct]) };
  let [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  let [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data)).catch((err) => console.log(err)
    )
    if (userInfo.userId) {
      getUserById(userInfo.userId)
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => console.log(err));
      // localStorage.setItem('quantity', JSON.stringify(quantity));
    }
  }, [dataUpdated, userInfo]);

  useEffect(() => {
    // localStorage.setItem('quantity', JSON.stringify(quantity));
    if (userInfo.email) {
      getCart().then((res) => {
        setTotalProducts(res.data.totalProducts);
      }).catch((err) => console.log(err)
      )
    }
  }, [quantity, userInfo.email]);

  return (
    <SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
      <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
      <div className={`App  ${darkMode && "dark"}`}>
        <Router>
          <QuantityContext.Provider value={{ quantity, setQuantity }}>
            <Navbar userInfo={userInfo} setUserInfo={setUserInfo} setDarkMode={setDarkMode} darkMode={darkMode} userProfile={userProfile} setUserProfile={setUserProfile} render={render} passwordShown={passwordShown} togglePassword={togglePassword} categories={categories} setCategories={setCategories} loading={loading} setLoading={setLoading} productsInCart={productsInCart} setProductsInCart={setProductsInCart} totalProducts={totalProducts} dataUpdated={dataUpdated} />
            <Routes>
              <Route path="/" element={<Home userInfo={userInfo} loading={loading} setLoading={setLoading} categories={categories} setCategories={setCategories} productsInCart={productsInCart} setProductsInCart={setProductsInCart} setCartData={setCartData} render={render} setQuantity={setQuantity} />} />
              <Route path="/google/success" element={<GoogleAuth setUserInfo={setUserInfo} />} />
              <Route path='login' element={<Login setUserInfo={setUserInfo} passwordShown={passwordShown} togglePassword={togglePassword} quantity={quantity} productsInCart={productsInCart} setQuantity={setQuantity} />} />
              <Route path='register' element={<Register setUserInfo={setUserInfo} passwordShown={passwordShown} togglePassword={togglePassword} />} />
              <Route path='/cart' element={<Cart loading={loading} setLoading={setLoading} quantity={quantity} setQuantity={setQuantity} openPaymentModal={openPaymentModal} setOpenPaymentModal={setOpenPaymentModal} userInfo={userInfo} cartData={cartData} setCartData={setCartData} productsInCart={productsInCart} setProductsInCart={setProductsInCart} totalProducts={totalProducts} />} />

            </Routes>
          </QuantityContext.Provider>
        </Router>
      </div>
    </SiteTheme.Provider>
  );
}

export default App;
