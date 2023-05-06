

const db = require('../config/connection');


exports.getProducts = async (req, res, next) => {
    try {
        let results = await db.query('SELECT * FROM products');

        res.status(201).json({
            message: 'All products',
            products: results
        })

    } catch (error) {
        console.log(error);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        let results = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);

        res.status(201).json({
            message: 'Product',
            products: results
        })

    } catch (error) {
        console.log(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        let results = await db.query('INSERT INTO products SET ?', req.body);

        res.status(201).json({
            message: 'Product created',
            products: {
                ...req.body
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        let results = await db.query('UPDATE products SET ? WHERE id = ?', [req.body, req.params.id]);

        res.status(201).json({
            message: 'Product updated',
            products: results
        })

    } catch (error) {
        console.log(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        let results = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);

        res.status(201).json({
            message: 'Product deleted',
            products: results
        })

    } catch (error) {
        console.log(error);
    }
}
