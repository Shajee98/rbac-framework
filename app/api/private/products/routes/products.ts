import { Router } from 'express';
import booksController from "../controllers/products"

const complaintRouter = Router();


complaintRouter.post(
  "/create",
  booksController.createProduct
)

complaintRouter.get(
  "/get/all",
  booksController.getAllBooks
)

export default complaintRouter
