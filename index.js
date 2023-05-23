const express = require('express');
const app = express();
const port = 3000;
const { faker } = require('@faker-js/faker');


app.get('/', (req, res) => {
    res.send('Hola, este es mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy un nuevo endpoint');
});

app.get('/productos', (req, res) => {
    const products = [];
    console.log(products)

    for (let index = 0; index < 100; index++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.url(),
        });
    }
    res.json(products);
});

app.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: 'product2',
        price: 1000,
    });
});

app.get('/users', (req, res) => {
    const { limit, offset } = req.query;

    if (!limit && !offset) {
        res.send('no hay parametros');
        return;
    }
    res.json({
        limit,
        offset,
    });
});

app.get('/categories/:categoriesId/productos/:productosId', (req, res) => {
    const { categoriesId, productosId } = req.params;

    res.json({
        categoriesId,
        productosId,
    });
});

app.listen(port, () => {
    console.log(`estoy corriendo en el puertp ${port}`);
});
