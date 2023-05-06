const db = require('../config/connection');

const ordeNumber = require('../helpers/utils');

exports.getTransactions = async (req, res, next) => {
    try {
        let results = await db.query('SELECT * FROM transactions');

        res.status(200).json({
            message: 'All transactions',
            transactions: results
        })

    } catch (error) {
        console.log(error);
    }
}

exports.getTransaction = async (req, res, next) => {
    try {
        let results = await db.query('SELECT * FROM transactions WHERE id = ?', [req.params.id]);

        res.status(200).json({
            message: 'Transaction',
            transactions: results
        })

    } catch (error) {
        console.log(error);
    }
}

exports.createTransaction = async (req, res, next) => {
    try {
        let transaction = [
            ordeNumber.randomOrderNumber(),
            req.body.total_price,
            req.body.paid_amount,
        ]


        let products = req.body.products.map(product => {
            return [
                product.id,
                product.quantity
            ]
        })


        let results = await db.query('INSERT INTO transactions (order_number, total_price, paid_amount) VALUES (?)', [transaction]);

        let transactionId = results.insertId;

        products.forEach(async product => {
            await db.query('INSERT INTO transaction_details (transaction_id, product_id, quantity) VALUES (?)', [[transactionId, ...product]]);
        })

        // update stock
        products.forEach(async product => {
            let results = await db.query('SELECT stock FROM products WHERE id = ?', [product[0]]);

            let stock = results[0].stock - product[1];

            await db.query('UPDATE products SET stock = ? WHERE id = ?', [stock, product[0]]);
        })

        res.status(201).json({
            message: 'Transaction created',
        })

    } catch (error) {
        console.log(error);
    }
}
