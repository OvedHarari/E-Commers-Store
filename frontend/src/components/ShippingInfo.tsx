import { FunctionComponent, useContext, useState } from "react";
import { successMsg } from "../services/feedbacksService";
import User from "../interfaces/User";
import { useFormik } from "formik";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { createShippingAddress } from "../services/ordersService";
import Product from "../interfaces/Product";
import { SiteTheme } from "../App";
import Credit from "./Credit";
import Order from "../interfaces/Order";


interface ShippingInfoProps { userInfo: any; loading: any; setLoading: Function; setUserProfile: Function; userProfile: any; render: Function; totalProducts: number; totalPrice: number; productsInCart: any; productQuantity: any; openCreditModal: boolean; setOpenCreditModal: Function; }

const ShippingInfo: FunctionComponent<ShippingInfoProps> = ({
    userProfile, render, totalProducts, totalPrice, productsInCart, productQuantity, openCreditModal,
    setOpenCreditModal
}) => {
    const navigate = useNavigate();
    let theme = useContext(SiteTheme);
    let [orderDetails, setOrderDetails] = useState<Order[]>([])
    let formik = useFormik({
        initialValues: {
            name: { firstName: userProfile.name.firstName, middleName: userProfile.name.middleName, lastName: userProfile.name.lastName }, phone: userProfile.phone, email: userProfile.email, address: { country: userProfile.address.country, state: userProfile.address.state, city: userProfile.address.city, street: userProfile.address.street, houseNumber: userProfile.address.houseNumber, floor: userProfile.address.floor, apartment: userProfile.address.apartment, zipcode: userProfile.address.zipcode }, deliveryComments: userProfile.deliveryComments, image: { url: userProfile.image.url, alt: userProfile.image.alt }
        },
        validationSchema: yup.object({
            name: yup.object({ firstName: yup.string().required().min(2), middleName: yup.string().min(2), lastName: yup.string().required().min(2) }),
            phone: yup.string().min(2), email: yup.string().required().email(), address: yup.object({ country: yup.string().required().min(2), state: yup.string().min(2), city: yup.string().required().min(2), street: yup.string().required().min(2), houseNumber: yup.string().required().min(1), floor: yup.number().required().min(1), apartment: yup.number().required().min(1), zipcode: yup.string().min(2) }), deliveryComments: yup.string()
        }),
        enableReinitialize: true,
        onSubmit(values: User) {
            createShippingAddress(userProfile._id, values)
                .then((res) => {
                    render();
                    setOrderDetails(res.data);
                    setOpenCreditModal(true);
                    successMsg(`Order Details Confirmed`);
                })
                .catch((err) => console.log(err));
        },
    });

    return (
        <div className="ship row">
            <h3 className="mt-3">Sipping Information</h3>
            <div className="w-75 col ms-1 me-3">
                <div className="row g-0">
                    <div className="col-md-4">
                    </div>
                    <div className="container">
                        <form className="form-floating  mt-3" onSubmit={formik.handleSubmit}>
                            <div className="row g-2 border rounded-4 border-secondary mt-1">
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary " id="floatingFirstName" placeholder="First Nane"
                                        name="name.firstName"
                                        onChange={formik.handleChange}
                                        value={formik.values.name.firstName}
                                        onBlur={formik.handleBlur}
                                    ></input>
                                    <label htmlFor="floatingFirstName">First Name *</label>
                                    {formik.touched.name?.firstName && formik.errors.name?.firstName && (<p className="text-danger">{formik.errors.name.firstName}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingMiddleName" placeholder="Middle Name"
                                        name="name.middleName"
                                        onChange={formik.handleChange}
                                        value={formik.values.name.middleName}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingmiddleName">Middle Name</label>
                                    {formik.touched.name?.middleName && formik.errors.name?.middleName && (<p className="text-danger">{formik.errors.name.middleName}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingLastName" placeholder="Last Name"
                                        name="name.lastName"
                                        onChange={formik.handleChange}
                                        value={formik.values.name.lastName}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingLastName">Last Name *</label>
                                    {formik.touched.name?.lastName && formik.errors.name?.lastName && (<p className="text-danger">{formik.errors.name.lastName}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3">
                                    <input type="text" className="form-control border-secondary" id="floatingPhone" placeholder="Phone Number"
                                        name="phone"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingPhone">Phone Number *</label>
                                    {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3">
                                    <input type="text" className="form-control border-secondary" id="floatingEmail" placeholder="name@example.com"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingEmail">Address *</label>
                                    {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                                </div>
                            </div>
                            <h6 className="mt-4 text-start">Address</h6>
                            <div className="row g-2 border rounded-4 border-secondary mt-1">
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingState" placeholder="State"
                                        name="address.state"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.state}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingState">State</label>
                                    {formik.touched.address?.state && formik.errors.address?.state && (<p className="text-danger">{formik.errors.address.state}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingCountry" placeholder="Country"
                                        name="address.country"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.country}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingCountry">Country *</label>
                                    {formik.touched.address?.country && formik.errors.address?.country && (<p className="text-danger">{formik.errors.address.country}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingCity" placeholder="City"
                                        name="address.city"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.city}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingCity">City *</label>
                                    {formik.touched.address?.city && formik.errors.address?.city && (<p className="text-danger">{formik.errors.address.city}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3">
                                    <input type="text" className="form-control border-secondary" id="floatingStreet" placeholder="Street"
                                        name="address.street"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.street}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingStreet">Street *</label>
                                    {formik.touched.address?.street && formik.errors.address?.street && (<p className="text-danger">{formik.errors.address.street}</p>)}
                                </div>
                                <div className="form-floating col mb-3 me-3">
                                    <input
                                        type="text" className="form-control border-secondary" id="floatingHouseNumber" placeholder="House Number"
                                        name="address.houseNumber"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.houseNumber}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingHouseNumber">House No. *</label>
                                    {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (<p className="text-danger">{formik.errors.address.houseNumber}</p>)}
                                </div>
                                <div className="form-floating col mb-3 me-3">
                                    <input
                                        type="number" className="form-control border-secondary" id="floatingFlor" placeholder="Floor"
                                        name="address.floor"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.floor}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingFloor">Floor *</label>
                                    {formik.touched.address?.floor && formik.errors.address?.floor && (<p className="text-danger">{formik.errors.address.floor}</p>)}
                                </div>
                                <div className="form-floating col mb-3">
                                    <input
                                        type="number" className="form-control border-secondary" id="floatingApartment" placeholder="Apartment"
                                        name="address.apartment"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.apartment}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingApartment">Apartment *</label>
                                    {formik.touched.address?.apartment && formik.errors.address?.apartment && (<p className="text-danger">{formik.errors.address.apartment}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3">
                                    <input
                                        type="text"
                                        className="form-control border-secondary" id="floatingZipCode" placeholder="Zip Code"
                                        name="address.zipcode"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.zipcode}
                                        onBlur={formik.handleBlur} ></input>
                                    <label htmlFor="floatingZipCode">Zip Code *</label>

                                </div>

                                <div className="form-floating  mb-3">
                                    <textarea name="deliveryComments" className="form-control border-secondary" id="deliveryComments" placeholder="text"

                                        value={formik.values.deliveryComments}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    <label className="ms-2 fs-shrink" htmlFor="deliveryComments">Leave Delivery comment (optional)</label>
                                    {formik.touched.deliveryComments && formik.errors.deliveryComments && (
                                        <p className="text-danger">{formik.errors.deliveryComments}</p>)}
                                </div>

                            </div>

                            <button className="btn btn-info checkout-btn w-75 mt-3 me-1" type="submit" disabled={!formik.isValid}>Proceed To Payment</button>
                        </form>
                        <button className="btn btn-secondary mt-3 w-25" onClick={() => {
                            navigate(-1);
                        }}>Cancel & Back to Sopping Cart</button>
                    </div>
                </div>
            </div>
            <div className="col-md-3 mt-5">
                <h4 className="text-center">Order Summary</h4>
                <hr />
                <table className={`table table-${theme} table-hover text-start `}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsInCart.map((product: Product) => (
                            <tr
                                key={product._id}>
                                <td>{product.title}</td>
                                <td>{product.price} &#8362;</td>
                                <td className="text-center">
                                    <span>{productQuantity[product._id as string]}</span>
                                </td>
                                <td className="text-center">{product.price * (productQuantity[product._id as string] || 0)} &#8362;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4 className="text-start ms-5"><b>Total Items : {totalProducts}
                </b></h4>
                <hr />
                <h4 className="text-start ms-5"><b>Total Price : {totalPrice}</b></h4>
            </div>
            <Credit
                show={openCreditModal}
                onHide={() => setOpenCreditModal(false)}
                holderName='' cardNumber='' expiration='' cvc='' focus='' />
        </div>);
}

export default ShippingInfo;