const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class ProductsService {
    constructor() {
        this.products = []
        this.generate()
    }

    async generate() {
        const limit = 100
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.url(),
            })
        }
    }

    async create(data) {
        const newProduct = {
            id: faker.string.uuid(),
            ...data,
        }

        this.products.push(newProduct)

        return newProduct
    }

    async update(id, payloadChanges) {
        const index = this.products.findIndex((e) => e.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }
        const product = this.products[index]
        this.products[index] = {
            ...product,
            ...payloadChanges,
        }
        return this.products[index]
    }

    async delete(id) {
        const index = this.products.findIndex((e) => e.id === id)
        if (index === -1) {
            throw boom.notFound('Product not found')
        }
        this.products.splice(index, 1)
        return { id }
    }

    async find() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products)
            }, 5000)
        })
    }

    findOne(id) {
        const product = this.products.find((e) => e.id === id)
        if (!product) {
            throw boom.notFound('Product not found')
        }
    }
}

module.exports = ProductsService
