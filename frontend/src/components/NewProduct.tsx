import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Product from "../interfaces/Product"
import { addNewProduct } from "../services/productsService";
import { successMsg } from "../services/feedbacksService";
import Category from "../interfaces/Category";
import transformCategories from "../interfaces/CategoryUtill";

interface NewProductProps { categories: Category[] }

const NewProduct: FunctionComponent<NewProductProps> = ({ categories }) => {
    const transformedCategories = transformCategories(categories);
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            title: "", price: 0, discountPercentage: 0, category: { _id: "", name: "" }, brand: "", description: "", thumbnail: "",
            images: [], stock: 0,
        },
        validationSchema: yup.object({
            title: yup.string().required("Product name is required").min(2),
            price: yup.number().required("Price is required").min(1),
            discountPercentage: yup.number().min(0),
            category: yup.object({ _id: yup.string().required(), name: yup.string().required() }).required("Choose category"),
            brand: yup.string().required("Brand is required"),
            description: yup.string().required("Description is required").min(2),
            thumbnail: yup.string().required().min(5),
            stock: yup.number().required().min(0),
            images: yup.array().of(yup.string()).required("Images are required"),
        }),
        onSubmit: (values) => {
            addNewProduct(values as Product)
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
                    <h4 className="mt-5 mb-5">Add new product</h4>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <select
                                    name="category"
                                    id="category"
                                    className="form-select"
                                    value={formik.values.category._id}
                                    onChange={(e) => {
                                        const selectedCategory = transformedCategories.find(
                                            (category) => category._id === e.target.value
                                        );
                                        formik.setFieldValue("category", selectedCategory || {});
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select category</option>
                                    {transformedCategories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="category">Category</label>
                                {formik.touched.category &&
                                    formik.errors.category && (
                                        <small className="text-danger">
                                            {formik.errors.category as string}
                                        </small>
                                    )}
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="title"
                                    id="title"
                                    type="text"
                                    className="form-control"
                                    placeholder="Product Name"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="name">Product name</label>
                                {formik.touched.title && formik.errors.title && (<small className="text-danger">{formik.errors.title}</small>)}
                            </div>
                        </div>
                        <div className="col">
                            <div className="col"><div className="form-floating mb-3">
                                <input
                                    name="price"
                                    id="price"
                                    type="number"
                                    className="form-control"
                                    placeholder="Price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="0" />
                                <label htmlFor="price">Price (&#8362;)</label>
                                {formik.touched.price && formik.errors.price && (<small className="text-danger">{formik.errors.price}</small>)}
                            </div></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating mb-3">
                            <textarea
                                name="description"
                                id="description"
                                className="form-control"
                                placeholder="info"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ minHeight: '3.5rem', resize: 'vertical', paddingLeft: "10px" }} />
                            <label style={{ marginLeft: "10px" }} htmlFor="description">  Description</label>
                            {formik.touched.description && formik.errors.description && (<small className="text-danger">{formik.errors.description}</small>)}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="stock"
                                    id="stock"
                                    type="number"
                                    className="form-control"
                                    placeholder="Stock"
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="0" />
                                <label htmlFor="stock">How mutch in stock?</label>

                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input
                                    name="brand"
                                    id="brand"
                                    type="text"
                                    className="form-control"
                                    placeholder="Product Name"
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="name">Product Brand</label>
                                {formik.touched.brand && formik.errors.brand && (<small className="text-danger">{formik.errors.brand}</small>)}
                            </div>
                        </div>


                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" name="thumbnail" id="thumbnail"
                                    className="form-control"
                                    placeholder="thumbnail.png" value={formik.values.thumbnail}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                                <label htmlFor="thumbnail">Main Image URL</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col">
                            <div className="form-floating">
                                <textarea
                                    name="images"
                                    id="images"
                                    className="form-control"
                                    placeholder="images.png"
                                    value={formik.values.images.join("\n")}
                                    onChange={(e) => formik.setFieldValue("images", e.target.value.split("\n"))}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="images">Additional Image URLs (one per line)</label>
                            </div>
                        </div>

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

export default NewProduct;