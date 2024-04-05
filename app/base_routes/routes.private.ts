
import express from "express"
import productsRoutes from "../api/private/products/routes/products"


const privateRouter = express.Router()

privateRouter.use("/products/", productsRoutes)

export default privateRouter
