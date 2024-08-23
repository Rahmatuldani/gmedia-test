import express, { Router } from "express";
import authRoutes from "./auth";
import categoryRoutes from "./category";
import productRoutes from "./product";

const routes: Router = express.Router()

routes.use("/", authRoutes)
routes.use("/categories", categoryRoutes)
routes.use("/products", productRoutes)

export default routes;