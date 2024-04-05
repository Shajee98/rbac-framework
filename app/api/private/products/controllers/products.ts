import complaintService from "../../../../../services/products/books"
import responses from "../../../../../constants/Responses"
import { RequestHandler } from "express";
import { serverErrorResponse, successResponse } from "../../../../../services/Response/Response";


export const createProduct: RequestHandler = async (req, res, next) => {
  try {

    if (req.user?.user_type_id == 1)
    {
      return serverErrorResponse(res, responses.UNAUTHORIZED);
    }
    console.log("req...", req.user);
    const { name, price, category } = req.body
    // console.log("customer_number ", customer_number, "complaint_number ", complaint_number, "description ", description, staff_id, "department_id ", department_id, "complaint_status_id", complaint_status_id)
    const book = await complaintService.createProduct({name, price, category})
    if (!book) {
      return serverErrorResponse(res, responses.PRODUCT_NOT_CREATED);
    }

    return successResponse(res, {book});
  } catch (error) {
    next(error)
  }
};

export const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const { keyword, sortBy, filterBy, offset, limit } = req.query;
    const books = await complaintService.getAllProducts(sortBy, filterBy, keyword, Number(offset), Number(limit))
    console.log("books ==> ", books)
    if (!books) {
      return serverErrorResponse(res, responses.NO_PRODUCTS_FOUND);
    }
    else if (books.count == 0)
    {
      return successResponse(res, {books});
    }
    return successResponse(res, {books});

  } catch (error) {
    next(error)
  }
};

const booksController = {
    createProduct,
    getAllBooks
}

export default booksController
