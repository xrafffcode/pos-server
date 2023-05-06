//  make validation

exports.validateCreate = (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const stock = req.body.stock;

    if (name == null || name == "") {
        res.status(400).json({
            message: 'Name is required'
        })
    }

    if (price == null || price == "") {
        res.status(400).json({
            message: 'Price is required'
        })
    }

    if (stock == null || stock == "") {
        res.status(400).json({
            message: 'Stock is required'
        })
    }

    if (isNaN(price)) {
        res.status(400).json({
            message: 'Price must be a number'
        })
    }

    if (isNaN(stock)) {
        res.status(400).json({
            message: 'Stock must be a number'
        })
    }
}