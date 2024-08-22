import express, { Router } from "express";
import { categoryControllers } from "../app/controllers/category";

const categoryRoutes: Router = express.Router()

categoryRoutes.get("/", categoryControllers.find)
categoryRoutes.post("/", categoryControllers.create)

export default categoryRoutes;