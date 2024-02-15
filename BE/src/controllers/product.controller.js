'use strict'

const ProductService = require("../services/product.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class CategoryController {
    updateProduct = async (req, res, next) => {
        new UPDATED({
            message: 'update product success!',
            metadata: await ProductService.UpdateProduct(req.body),
        }).send(res)
    }

    deleteProduct = async (req, res, next) => {
        new DELETED({
            message: 'delete product success!',
            metadata: await ProductService.deleteProduct(req.params.id),
        }).send(res)
    }

    searchProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'get product list success!',
            metadata: await ProductService.searchProduct(req.query),
            options: {
                ...req.query
            }
        }).send(res)
    }

    createNewProduct = async (req, res, next) => {
        new CREATED({
            message: 'create a new product success!',
            metadata: await ProductService.createProduct(req.body),
        }).send(res)
    }
}

module.exports = new CategoryController