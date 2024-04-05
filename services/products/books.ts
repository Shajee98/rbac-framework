import { Model, Op } from "sequelize";
import Product from "../../models/Product";

export const createProduct = async (complaintDetails: any) => {
  try {
    let product: any;
    const { name, price, category } = complaintDetails;
    product = await Product.create({
      name: name,
      price: price,
      category: category,
    });

    return product;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async (
  sortBy: any,
  filterBy: any,
  keyword: any,
  offset: any,
  limit: any
) => {
  let books: {
    rows: Model<any, any>[];
    count: number;
  } = { rows: [], count: 0 };
  try {
    console.log("keyword ", keyword)
    console.log("filterBy ", filterBy)
    console.log("sortBy ", sortBy)
    // if (keyword != "")
    // {
      switch (filterBy) {
        case "title":
          books = await Product.findAndCountAll({
            where: {
              title: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break
        case "genre":
          books = await Product.findAndCountAll({
            where: {
              genre: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break
        case "author":
    console.log("author keyword ", keyword)
          
          books = await Product.findAndCountAll({
            where: {
              author: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break
        case "published_date":
          books = await Product.findAndCountAll({
            where: {
              published_date: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break;
        default:
          books = await Product.findAndCountAll({
            where: {
              title: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break;
      }
    return books;
  } catch (error) {
    console.error(error);
  }
};

const booksService = {
  createProduct,
  getAllProducts,
};

export default booksService;
