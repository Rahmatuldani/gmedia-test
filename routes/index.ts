import express, { Router } from "express";
import authRoutes from "./auth";
import categoryRoutes from "./category";

const routes: Router = express.Router()

routes.use("/", authRoutes)
routes.use("/categories", categoryRoutes)

export default routes;