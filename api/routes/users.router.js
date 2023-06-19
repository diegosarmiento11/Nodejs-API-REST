const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const { limit, offset } = req.query

    if (!limit && !offset) {
        res.send('no hay parametros')
        return
    }
    res.json({
        limit,
        offset,
    })

    res.send('Yo soy un user')
})

module.exports = router
