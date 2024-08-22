import express, { Router } from "express";
import authRoutes from "./auth";

const routes: Router = express.Router()

routes.use("/", authRoutes)

export default routes;