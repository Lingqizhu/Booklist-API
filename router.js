const express = require('express')
const router = express.Router();
const books = require('./booksController')

router.get('/book',books.list)
router.get('/book/search',books.searchlist)
router.get('/book/:id',books.show)
router.post('/book/create',books.create)
router.delete('/book/:id',books.delete)
router.put('/book/:id',books.update)
router.search('/book/:title',books.search)

module.exports = router;