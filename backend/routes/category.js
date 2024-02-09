const express = require("express");
const router = express.Router();
const joi = require("joi");
const _ = require("lodash")
// const Category = require("../models/Category");
const categoryService = require("../services/categoryService")
const auth = require("../middlewares/auth");


const categorySchema = joi.object({
    name: joi.string().required().min(2).max(32)
});



//GET all Categories
router.get("/", async (req, res) => {

    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).send(categories)
        // res.status(200).send(_.pick(categories["_id", "name"]))
    } catch (error) {
        res.status(400).send(error);
    }
});

//GET Category by _id
router.get("/:_id", auth, async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params._id);
        console.log(category);
        res.status(200).send(category)
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all categories from the same category
// router.get("/categories/:category", async (req, res) => {
//     try {
//         const categories = await Category.find({ category: req.params.category });
//         if (!categories) return res.status(404).send("No categories found");
//         res.status(200).send(categories);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })

//Add category by admin only
router.post("/", auth, async (req, res) => {

    try {
        if (req.payload.role != "admin")
            return res.status(400).send("Only Admin is alloud to add categories")

        //joi validation
        const { error } = categorySchema.validate(req.body);
        if (error) return res.status(400).send(error);

        //check if category exist by name price and category
        let category = await categoryService.getCategoryByName({ name: req.body.name });
        if (category) return res.status(400).send("Category already exist");

        //Add the new category and save
        // category = req.body;
        categoryService.saveCategory(req.body);
        category = categoryService.getCategoryByName({ name: req.body.name });

        //return response
        res.status(201).send(`Category "${category.name}" was added successfully.`);

    } catch (error) {
        res.status(400).send(error)
    }
})

//Update category by _id if admin only
router.put("/:_id", auth, async (req, res) => {

    try {
        if (req.payload.role != "admin")
            return res.status(400).send("Only Admin is alloud to add categories")
        //joi validation
        const { error } = categorySchema.validate(req.body);
        if (error) return res.status(400).send(error);

        //check if category exist by name price and category
        let category = await categoryService.updateCategoryById({ _id: req.params._id }, req.body);
        if (!category) return res.status(400).send(`Category: "${category.name}" does not exist !!`);

        //return response
        res.status(200).send(`Category "${category.name}" was updated successfully.`);
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete category by _id only if admin only
router.delete("/:_id", auth, async (req, res) => {

    try {
        if (req.payload.role != "admin")
            return res.status(400).send("Only Admin is alloud to add categories")

        //check if category exist by name price and category
        let category = await categoryService.deleteCategoryById({ _id: req.params._id });
        if (!category) return res.status(400).send("Category does not exist");

        //return response
        res.status(200).send(`Category "${category.name}" was delete successfully.`);
    } catch (error) {
        res.status(400).send(error)
    }
})

//Add number of categories by admin only
router.post("/add-multiple", auth, async (req, res) => {
    console.log(req.payload.role);
    try {
        if (req.payload.role != "admin")
            return res.status(400).send("Only Admin is alloud to add categories")
        const categoriesToAdd = req.body.categories; // need to send an array of category objects to add

        if (!Array.isArray(categoriesToAdd)) {
            return res.status(400).send(`Invalid input format. send an array of category objects to add:
         {
  "categories": [
    {
      "name": ""
      }
  ]
    }`);
        }

        const validationResults = categoriesToAdd.map(category =>
            categorySchema.validate(category)
        );

        const validationErrors = validationResults
            .filter(result => result.error)
            .map(result => result.error.details[0].message);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const addedCategories = await categoryService.addMultipleCategories(categoriesToAdd);

        res.status(201).send(`${addedCategories.length} categories added successfully.`);

    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;