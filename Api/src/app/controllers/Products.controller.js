const chalk = require("chalk");
const ProductSchemas = require("../schemas/Product/Product.schemas");
const ProductsService = require("../services/Products.service");

class ProductController {
    async createProduct(req, res) {
        try {
            const { name, category, price, stock, description, photoStrings } = req.body;
            const isInvalid = ProductSchemas.createProductSchema(
                name,
                category,
                price,
                stock,
                description,
                photoStrings
            );
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });

                return res.status(400).json({ message: "Erro de validação", errors });
            }
            const response = await ProductsService.createProduct(
                name,
                category,
                price,
                stock,
                description,
                photoStrings
            );
            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    
    async getAllProducts(req, res) {
        try {
            const products = await ProductsService.getAllProducts();
            return res.status(200).json(products);
        } catch(error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.id;
            const product = await ProductsService.findProductById(productId);
            if (!product) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            await ProductsService.deleteProduct(productId);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const { name, category, price, stock, photoStrings } = req.body;
            
            const isInvalid = ProductSchemas.createProductSchema(
                name,
                category,
                price,
                stock,
                photoStrings
            );
    
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });
                
                return res.status(400).json({ message: "Erro de validação", errors });
            }
    
            const updatedProduct = await ProductsService.updateProduct(productId, {
                name,
                category,
                price,
                stock,
                photoStrings
            });
    
            console.log(chalk.blue(updatedProduct));
            return res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }
    async toggleProductForSale(req, res) {
        try {
            const productId = req.params.id;

            const updatedProduct = await ProductsService.toggleProductForSale(productId);

            console.log(chalk.blue(updatedProduct));
            return res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }
    async getProductsForSale(req, res) {
        try {
            const products = await ProductsService.getProductsForSale();
            return res.status(200).json(products);
        } catch(error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }
}

module.exports = new ProductController();
