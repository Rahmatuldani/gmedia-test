import express, { Router } from "express";
import authControllers from "../app/controllers/auth";

const authRoutes: Router = express.Router()

authRoutes.get("/login", authControllers.login)

export default authRoutes;