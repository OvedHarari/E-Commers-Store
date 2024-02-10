import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMsg } from "../services/feedbacksService";
import Category from "../interfaces/Category";
import { addNewCategory } from "../services/categoryService";

interface NewCategoryProps { }

const NewCategory: FunctionComponent<NewCategoryProps> = () => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            name: "",
            // displayName: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("Product name is required").trim().lowercase().min(2),
            // displayName: yup.string().required("Product name is required").min(2),

        }),
        onSubmit: (values) => {
            addNewCategory(values as Category)
                .then((res) => {
                    navigate('/products-managment')
                    successMsg("Product added successfully")
                })
                .catch((err) => console.log(err));
        },
    });

    return (
        <>
            <div className="container">
                <form className="mb-3" onSubmit={formik.handleSubmit}>
                    <h4 className="mt-5 mb-5">Add new category</h4>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="name"
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Category Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="name">Category Name</label>
                                {formik.touched.name && formik.errors.name && (<small className="text-danger">{formik.errors.name}</small>)}
                            </div>

                        </div>
                        {/* <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="displayName"
                                    id="displayName"
                                    type="text"
                                    className="form-control"
                                    placeholder="Category Display Name"
                                    value={formik.values.displayName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="displayName">Category Display Name</label>
                                {formik.touched.displayName && formik.errors.displayName && (<small className="text-danger">{formik.errors.displayName}</small>)}
                            </div>
                        </div> */}

                    </div>
                    <button
                        type="submit"
                        className="btn btn-info w-50 my-3 me-5 mt-5"
                        disabled={!formik.isValid || !formik.dirty}>Add</button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn btn-info my-3 me-5 mt-5"
                    >Go Back</button>

                </form >

            </div >
        </>
    )
}

export default NewCategory;