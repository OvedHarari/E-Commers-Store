import Category from "../interfaces/Category";

const transformCategories = (categories: Category[]): Category[] => {
    return categories.map((category) => {
        const { __v, ...categoryWithoutVersion } = category;
        return { ...categoryWithoutVersion };
    });
};

export default transformCategories;