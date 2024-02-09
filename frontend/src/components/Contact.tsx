import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";
import { Modal, ModalHeader } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMsg } from "../services/feedbacksService";

interface ContactProps { show: boolean; onHide: Function; }

const Contact: FunctionComponent<ContactProps> = ({ show, onHide }) => {
    let theme = useContext(SiteTheme);
    let formik = useFormik({
        initialValues: { name: "", email: "", phone: "", message: "" },
        validationSchema: yup.object({
            name: yup.string().required("Please fill your full name").min(2),
            email: yup.string().required("Enter valid email address").email(),
            phone: yup.string().required("Phone number must have at least 9 characters").min(9).matches(/^[0-9]+$/, "phone must have numbers only"),
            message: yup.string()
        }),
        onSubmit: (values) => {
            successMsg("Thank you! your mail has been sent.");
            formik.resetForm();
            onHide();
        }
    });

    return (
        <>
            <Modal show={show} onHide={() => onHide()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                data-bs-theme={`${theme}`}
                className={` ${theme}`}>
                <div className="modal-contact-content  ">

                    <ModalHeader className="contact-title contact" closeButton data-bs-theme={`${theme}`}>
                        <Modal.Title>Contact Us</Modal.Title>
                    </ModalHeader>
                    <Modal.Body className="contact">
                        <div className="modal-contact-body mb-3" >
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <label htmlFor="fullName" className="form-label">
                                        Full Name *
                                    </label>
                                    {formik.touched.name && formik.errors.name && (<small className="text-danger">{formik.errors.name}</small>)}
                                </div>
                                <div className="form-floating mb-3">
                                    <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    <label htmlFor="floatingInput">Email Adress *</label>
                                    {formik.touched.email && formik.errors.email && (<small className="text-danger">{formik.errors.email}</small>)}
                                </div>
                                <div className="form-floating mb-3">
                                    <input name="phone" type="text" className="form-control" id="phone" placeholder="050-0000000"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} />
                                    <label htmlFor="phone">Phone *</label>
                                    {formik.touched.phone && formik.errors.phone && (<small className="text-danger">{formik.errors.phone}</small>)}
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        name="message"
                                        id="message"
                                        className="form-control"
                                        placeholder="message"
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        style={{ minHeight: '3.5rem', resize: 'vertical', paddingLeft: "10px" }}
                                    />
                                    <label style={{ marginLeft: "10px" }} htmlFor="description">  Message</label>
                                </div>
                                <button type="submit" className="btn btn-info">
                                    Send
                                </button>
                            </form>
                        </div>
                    </Modal.Body>

                </div >
            </Modal >
        </>
    )
}

export default Contact;