import { BadRequestError } from "../../core/error.response";
import db from "../index";

const validateProduct = async (payload) => {
  const newProduct = await db.Products.build({
    ...payload,
  });

  return await newProduct.validateProduct();
};

const createNewProduct = async (payload) => {
  const product_isValid = await validateProduct(payload);

  if (product_isValid.status === false) {
    throw new BadRequestError(product_isValid.message);
  }

  return await db.Products.create({
    ...payload,
  });
};

const updateProduct= async (payload) => {
  if (!payload.id) {
    throw new BadRequestError('Product id is not empty!');
  }

  const product = await db.Products.findByPk(payload.id)
  for(let property in payload) {
    product[property] = payload[property]
  }

  const product_isValid = await product.validateProduct();
  if (product_isValid.status === false) {
    throw new BadRequestError(product_isValid.message);
  }

  return await product.save();
};

module.exports = {
  createNewProduct,
  updateProduct
};
