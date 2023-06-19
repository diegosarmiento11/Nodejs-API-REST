const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const { categoriesId, productosId } = req.params
    res.json({
        categoriesId,
        productosId,
    })
})

module.exports = router
