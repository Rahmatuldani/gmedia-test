import Category from "./category";
import Product from "./product";

Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "product"
})

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category"
})
