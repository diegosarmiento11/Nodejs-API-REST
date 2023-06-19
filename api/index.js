const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const { faker } = require('@faker-js/faker')
const routerApi = require('./routes')
const {
    logError,
    errorHandler,
    boomErrorHandler,
} = require('./middlewares/error.handler')

app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
    res.send('Hola, este es mi server en express')
})

app.get('/api/productos', (req, res) => {
    const products = []

    for (let index = 0; index < 100; index++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.url(),
        })
    }
    res.json(products)
})

app.listen(port, () => {
    console.log(`estoy corriendo en el puerto ${port}`)
})

routerApi(app)
app.use(logError)
app.use(boomErrorHandler)
app.use(errorHandler)
