const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())


const db = require('./config/connection')

const productRouter = require('./routers/products');
const transactionRouter = require('./routers/transactions')

app.use('/products', productRouter);
app.use('/transactions', transactionRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})