import express, { Router } from "express";
import authRoutes from "./auth";
import categoryRoutes from "./category";
import productRoutes from "./product";
import cartRoutes from "./cart";

const routes: Router = express.Router()

routes.use("/", authRoutes)
routes.use("/categories", categoryRoutes)
routes.use("/products", productRoutes)
routes.use("/cart", cartRoutes)

export default routes;