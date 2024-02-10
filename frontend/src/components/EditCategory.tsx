import { useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMsg } from "../services/feedbacksService";
import Category from "../interfaces/Category";
import transformCategories from "../interfaces/CategoryUtill";
import { updateCategoryById } from "../services/categoryService";

interface EditCategoryProps {
    categories: Category[];
}

const EditCategory: FunctionComponent<EditCategoryProps> = ({ categories }) => {
    const transformedCategories = transformCategories(categories);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            category: "", // You need to initialize category, not name
            name: "",
        },
        validationSchema: yup.object({
            category: yup.string().required("Category is required"),
            name: yup.string().required("Category name is required").trim().min(2),
        }),
        onSubmit: (values) => {
            // Use selectedCategory for updating the category
            updateCategoryById(selectedCategory?._id as string, values.name).then((res) => {
                navigate('/products-managment');
                successMsg("Category updated successfully");
            })
                .catch((err) => console.log(err));
        },
    });

    return (
        <div className="container ">
            <form className="edit-form  mb-3" onSubmit={formik.handleSubmit}>
                <h4 className="mt-5 mb-5">Edit Category</h4>
                <div className="container-fluid text-center">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <select
                                    name="category"
                                    id="category"
                                    className="form-select"
                                    value={formik.values.category}
                                    onChange={(e) => {
                                        const selectedCategory = transformedCategories.find(
                                            (category) => category._id === e.target.value
                                        );
                                        setSelectedCategory(selectedCategory || null);
                                        formik.setFieldValue("category", e.target.value);
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
                                {formik.touched.category && formik.errors.category && (
                                    <small className="text-danger">{formik.errors.category as string}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="form-floating mb-3">
                                <input
                                    name="name"
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="NEW Category Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor="name">NEW Category Name</label>
                                {formik.touched.name && formik.errors.name && (
                                    <small className="text-danger">{formik.errors.name}</small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-info w-25 my-3 me-5 mt-5"
                    disabled={!formik.isValid || !formik.dirty}
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-info my-3 me-5 mt-5"
                >
                    Go Back
                </button>
            </form>
        </div>
    );
};

export default EditCategory;




// import { useFormik } from "formik";
// import { FunctionComponent, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import { successMsg } from "../services/feedbacksService";
// import Category from "../interfaces/Category";
// import transformCategories from "../interfaces/CategoryUtill";

// interface EditCategoryProps { categories: Category[]; }

// const EditCategory: FunctionComponent<EditCategoryProps> = ({ categories }) => {
//     const transformedCategories = transformCategories(categories);
//     let [selectedCategory, setSelectedCategory] = useState<Category[]>([])
//     let navigate = useNavigate();
//     let formik = useFormik({
//         initialValues: {
//             name: "",
//         },
//         validationSchema: yup.object({
//             name: yup.string().required("Product name is required").min(2),
//         }),
//         enableReinitialize: true,
//         onSubmit: (values) => {
//             updateCategoryById(selectedCategory, values as Category)
//                 .then((res) => {
//                     navigate('/products-managment')
//                     successMsg("Product added successfully")
//                 })
//                 .catch((err) => console.log(err));
//         },
//     });

//     return (
//         <>
//             <div className="container">

//                 <form className="mb-3" onSubmit={formik.handleSubmit}>
//                     <h4 className="mt-5 mb-5">Edit Category</h4>
//                     <div className="row">
//                         <div className="col">
//                             <div className="form-floating mb-3">
//                                 <select
//                                     name="category"
//                                     id="category"
//                                     className="form-select"
//                                     value={formik.values.category._id}
//                                     onChange={(e) => {
//                                         const selectedCategory = transformedCategories.find(
//                                             (category) => category._id === e.target.value
//                                         );
//                                         formik.setFieldValue("category", selectedCategory || {});
//                                     }}
//                                     onBlur={formik.handleBlur}
//                                 >
//                                     <option value="">Select category</option>
//                                     {transformedCategories.map((category) => (
//                                         <option key={category._id} value={category._id}>
//                                             {category.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <label htmlFor="category">Category</label>
//                                 {formik.touched.category &&
//                                     formik.errors.category && (
//                                         <small className="text-danger">
//                                             {formik.errors.category as string}
//                                         </small>
//                                     )}
//                             </div>
//                         </div>
//                         <div className="col">
//                             <div className="form-floating mb-3">
//                                 <input
//                                     name="name"
//                                     id="name"
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Category Name"
//                                     value={formik.values.name}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur} />
//                                 <label htmlFor="name">Category Name</label>
//                                 {formik.touched.name && formik.errors.name && (<small className="text-danger">{formik.errors.name}</small>)}
//                             </div>

//                         </div>


//                     </div>
//                     <button
//                         type="submit"
//                         className="btn btn-info w-50 my-3 me-5 mt-5"
//                         disabled={!formik.isValid || !formik.dirty}>Add</button>
//                     <button
//                         type="button"
//                         onClick={() => navigate(-1)}
//                         className="btn btn-info my-3 me-5 mt-5"
//                     >Go Back</button>

//                 </form >

//             </div >
//         </>
//     )
// }

// export default EditCategory;

// function updateCategoryById(arg0: Category) {
//     throw new Error("Function not implemented.");
// }
