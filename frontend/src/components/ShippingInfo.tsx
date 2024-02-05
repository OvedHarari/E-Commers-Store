import { FunctionComponent, useEffect } from "react";
import { successMsg } from "../services/feedbacksService";
import User from "../interfaces/User";
import { useFormik } from "formik";
import * as yup from "yup"
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { createShippingAddress } from "../services/ordersService";
import { getUserById } from "../services/usersService";
import { currencyFormat } from "../services/currencyFormater";


interface ShippingInfoProps {
    userInfo: any;
    loading: any;
    setLoading: Function;
    // onHide: Function;
    setUserProfile: Function;
    userProfile: any;
    editForm: boolean;
    setEditForm: Function;
    render: Function;
    totalProducts: number;
    totalPrice: number;
    productsInCart: any;
    productQuantity: any;
    setProductQuantity: Function;
    setTotalPrice: Function

}

const ShippingInfo: FunctionComponent<ShippingInfoProps> = ({ userProfile, render, editForm, setEditForm, totalProducts, totalPrice, productsInCart, productQuantity, setProductQuantity, setTotalPrice }) => {
    const navigate = useNavigate();
    // let handleTotalPrice = () => {
    //     let totalPrice = currencyFormat(productsInCart.reduce((total: any, product: any) => total + (product.price * (productQuantity[product._id as string] || 0)), 0));
    //     setTotalPrice(totalPrice)
    // }
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
                    setEditForm(true)
                    render();
                    successMsg(`Shipping Address Confirmed`);
                })
                .catch((err) => console.log(err));
        },
    });
    // useEffect(() => {

    //     handleTotalPrice();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [productsInCart])
    return (
        <div className="row">
            <div className="container col ms-3 me-3">
                <h3 className="mt-3">Sipping Information</h3>
                <div className="col-3 w-100 text-start">
                    <Button variant={editForm ? "success" : "secondary"} onClick={() => setEditForm(!editForm)}>
                        Edit Sipping Address <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                </div>
                <div className="row g-0">
                    <div className="col-md-4">
                    </div>
                    <div className="container">
                        <form className="form-floating  mt-3" onSubmit={formik.handleSubmit}>
                            {/* <h6 className=" mt-4 text-start">General</h6> */}
                            <div className="row g-2 border rounded-4 border-secondary mt-1">
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary " id="floatingFirstName" placeholder="First Nane"
                                        name="name.firstName"
                                        onChange={formik.handleChange}
                                        value={formik.values.name.firstName}
                                        onBlur={formik.handleBlur}
                                        disabled={editForm} ></input>
                                    <label htmlFor="floatingFirstName">First Name *</label>
                                    {formik.touched.name?.firstName && formik.errors.name?.firstName && (<p className="text-danger">{formik.errors.name.firstName}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingMiddleName" placeholder="Middle Name"
                                        name="name.middleName"
                                        onChange={formik.handleChange}
                                        value={formik.values.name.middleName}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingmiddleName">Middle Name</label>
                                    {formik.touched.name?.middleName && formik.errors.name?.middleName && (<p className="text-danger">{formik.errors.name.middleName}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingLastName" placeholder="Last Name"
                                        name="name.lastName"
                                        onChange={formik.handleChange}
                                        value={formik.values.name.lastName}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingLastName">Last Name *</label>
                                    {formik.touched.name?.lastName && formik.errors.name?.lastName && (<p className="text-danger">{formik.errors.name.lastName}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3">
                                    <input type="text" className="form-control border-secondary" id="floatingPhone" placeholder="Phone Number"
                                        name="phone"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingPhone">Phone Number *</label>
                                    {formik.touched.phone && formik.errors.phone && (<p className="text-danger">{formik.errors.phone}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3">
                                    <input type="text" className="form-control border-secondary" id="floatingEmail" placeholder="name@example.com"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingEmail">Address *</label>
                                    {formik.touched.email && formik.errors.email && (<p className="text-danger">{formik.errors.email}</p>)}
                                </div>
                            </div>
                            {/* <h6 className="mt-4 text-start">Gander / Image</h6>
                        <div className="row g-2 border rounded-4 border-secondary mt-1">
                            <div className="form-floating col-4 mb-3 mt-3 ">

                            </div>
                            <div className="form-floating col-4 mb-3 mt-3">

                            </div>
                        </div> */}
                            <h6 className="mt-4 text-start">Address</h6>
                            <div className="row g-2 border rounded-4 border-secondary mt-1">
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingState" placeholder="State"
                                        name="address.state"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.state}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingState">State</label>
                                    {formik.touched.address?.state && formik.errors.address?.state && (<p className="text-danger">{formik.errors.address.state}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingCountry" placeholder="Country"
                                        name="address.country"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.country}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingCountry">Country *</label>
                                    {formik.touched.address?.country && formik.errors.address?.country && (<p className="text-danger">{formik.errors.address.country}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3 mt-3">
                                    <input type="text" className="form-control border-secondary" id="floatingCity" placeholder="City"
                                        name="address.city"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.city}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingCity">City *</label>
                                    {formik.touched.address?.city && formik.errors.address?.city && (<p className="text-danger">{formik.errors.address.city}</p>)}
                                </div>
                                <div className="form-floating col-4 mb-3">
                                    <input type="text" className="form-control border-secondary" id="floatingStreet" placeholder="Street"
                                        name="address.street"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.street}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingStreet">Street *</label>
                                    {formik.touched.address?.street && formik.errors.address?.street && (<p className="text-danger">{formik.errors.address.street}</p>)}
                                </div>
                                <div className="form-floating col mb-3 me-3">
                                    <input
                                        type="text" className="form-control border-secondary" id="floatingHouseNumber" placeholder="House Number"
                                        name="address.houseNumber"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.houseNumber}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingHouseNumber">House No. *</label>
                                    {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (<p className="text-danger">{formik.errors.address.houseNumber}</p>)}
                                </div>
                                <div className="form-floating col mb-3 me-3">
                                    <input
                                        type="number" className="form-control border-secondary" id="floatingFlor" placeholder="Floor"
                                        name="address.floor"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.floor}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingFloor">Floor *</label>
                                    {formik.touched.address?.floor && formik.errors.address?.floor && (<p className="text-danger">{formik.errors.address.floor}</p>)}
                                </div>
                                <div className="form-floating col mb-3">
                                    <input
                                        type="number" className="form-control border-secondary" id="floatingApartment" placeholder="Apartment"
                                        name="address.apartment"
                                        onChange={formik.handleChange}
                                        value={formik.values.address.apartment}
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
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
                                        onBlur={formik.handleBlur} disabled={editForm}></input>
                                    <label htmlFor="floatingZipCode">Zip Code *</label>

                                </div>

                                <div className="form-floating  mb-3">
                                    <textarea name="deliveryComments" className="form-control" id="deliveryComments" placeholder="text"

                                        value={formik.values.deliveryComments}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    <label className="ms-2 fs-shrink" htmlFor="deliveryComments">Leave Delivery comment (optional)</label>
                                    {formik.touched.deliveryComments && formik.errors.deliveryComments && (
                                        <p className="text-danger">{formik.errors.deliveryComments}</p>)}
                                </div>

                            </div>

                            <button className="btn btn-secondary w-75 mt-3 me-1" type="submit" disabled={!formik.isValid || !formik.dirty}>Save Changes</button>
                        </form>
                        <button className="btn btn-primary mt-3 w-25" onClick={() => {
                            navigate(-1);
                            setEditForm(true);
                        }}>Cancel & Back to Sopping Cart</button>
                        {/* <div className="col-6">
                        <button className="btn btn-danger mt-3" onClick={() => {
                            navigate(-1);
                            setEditForm(true);
                        }}>Back to Sopping Cart</button>
                    </div> */}
                    </div>
                </div>
            </div>
            <div className="col-md-3 mx-4 orderSummary mt-5">
                <h4 className="text-center">Order Summary</h4>
                <hr />
                {/* <h6>{`You have ${totalQuantity} products in cart`}</h6> */}
                <h4 className="text-start"><b>Total Items:
                    {/* {totalQuantity} */}{totalProducts}
                </b></h4>
                <hr />
                <h4 className="text-start"><b>Total Price: {totalPrice}</b></h4>
                {/* <button className="btn checkout-btn btn-info mt-2" onClick={() => navigate("/shipping")}>Proceed to checkout</button> */}

            </div>
        </div>);
}

export default ShippingInfo;