import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { getTokenDetailes, userValidation } from "../services/usersService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import Product from "../interfaces/Product";

interface LoginProps {
    setUserInfo: Function;
    passwordShown: boolean;
    togglePassword: Function;
    quantity: any;
    setQuantity: Function;
    productsInCart: any;
}
type Quantity = { [key: string]: number };

const Login: FunctionComponent<LoginProps> = ({ setUserInfo, passwordShown, togglePassword, quantity, productsInCart, setQuantity }) => {
    let navigate = useNavigate();
    const handleGoogleLogin = () => { window.location.href = `${process.env.REACT_APP_API}/google-auth/auth/google` };

    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values) => {
            userValidation(values)
                .then((res) => {
                    sessionStorage.setItem("token", JSON.stringify({ token: res.data }))
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        email: (getTokenDetailes() as any).email,
                        userId: (getTokenDetailes() as any)._id,
                        role: (getTokenDetailes() as any).role,
                        gender: (getTokenDetailes() as any).gender
                    }))
                    setUserInfo(JSON.parse(sessionStorage.getItem("userInfo") as string));
                    // let quantites: Quantity = {};
                    // productsInCart.forEach((product: Product) => {
                    //     if (product._id) {
                    //         quantites[product._id] = product.quantity || 0;
                    //     }
                    // });
                    // setQuantity(quantites);
                    successMsg(`You're logged in as ${values.email}`);
                    navigate("/");
                })
                .catch((err) => {
                    errorMsg(err.response.data);
                    console.log(err)
                });
        },
    });

    return (
        <div className="container mt-5">
            <h3 className="display-3 mt-3">Login</h3>
            <div className="container box-shadow col-md-3 mt-5 ">
                <form className="login" onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        ></input>
                        <label htmlFor="floatingInput">Email address</label>
                        {formik.touched.email && formik.errors.email && (
                            <small className="text-danger">{formik.errors.email}</small>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type={passwordShown ? "text" : "password"} className="form-control " id="floatingPassword" placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur} ></input>
                        <div className="passIcon">
                            {passwordShown ? <i className="fa-solid fa-eye-slash passIcon" onClick={() => togglePassword(!passwordShown)}></i> : <i className="fa-solid fa-eye passIcon" onClick={() => togglePassword(!passwordShown)}></i>}
                        </div>
                        <label htmlFor="floatingPassword">Password *</label>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-danger">{formik.errors.password}</p>)}
                    </div>
                    <button
                        className="btn btn-secondary w-100 mt-3"
                        type="submit"
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        Login
                    </button>
                </form>
                <div>
                    <div className="d-flex justify-content-center mt-5">
                        <button type="button" className="google_btn" onClick={handleGoogleLogin}>
                            <img src="images/google.png" alt="google icon" />
                            <span>Login with Google</span>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <p>
                        New User ? <br /> <Link to={"/register"}>Register here!</Link>
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Login;
