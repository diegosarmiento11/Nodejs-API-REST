const express = require('express')

const ProductsService = require('../services/products.service')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => {
    const products = await service.find()
    res.json(products)
})

router.get('/filter', (req, res) => {
    res.send('Yo soy un filter')
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const productById = await service.findOne(id)
        res.json(productById)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)
    res.json(newProduct)
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const updateProduct = await service.update(id, body)
        res.json(updateProduct)
    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deleteProduct = await service.delete(id)
    res.json(deleteProduct)
})

module.exports = router
