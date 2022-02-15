const createError = require('http-errors')
let bookList = []
let idno = 0;
let searchList = []

exports.list=function(req,res){
    res.send(bookList)
}
exports.searchlist=function(req,res){
    res.send(searchList)
}

exports.show = function(req,res,next){
    const bookItem = bookList.find( (book) => book.id == req.params.id)
    if(!bookItem) {
        return(next(createError(404,"no book with that id")))
    }
    res.send(bookItem);
}

exports.create = function (req,res,next) {

    if(!req.body.title){
        return (next(createError(400,"title is required")))
    }
    bookList.push(
        {
            id: idno,
            title: req.body.title,
            author: req.body.author,
            read: req.body.read,
            amazonlink: req.body.amazonlink
        }

    );
    idno++;
    res.send({result:true});
}

exports.delete = function(req,res,next) {
    const bookItem = bookList.find( (book) => book.id == req.params.id)
    if(!bookItem) {
        return(next(createError(404,"no book with that id")))
    }

    bookList = bookList.filter( (book) => book.id != req.params.id)

    res.send({result:true})
}

exports.search=function(req,res){
    const bookItem = bookList.find((book)=>book.title == req.params.title)
    if(!bookItem) {
        return(next(createError(404,"no book with that title")))
    }
    searchList = bookList.filter((book)=>book.title == req.params.title)
    res.send({result:true})
}

exports.update = function(req,res,next){
    const bookItem = bookList.find( (book) => book.id == req.params.id)
    if(!bookItem) {
        return(next(createError(404,"no book with that id")))
    }

    if(!req.body.title){
        return (next(createError(400,"name is required")))
    }

    bookList = bookList.map( (book)=> {
        if(book.id == req.params.id){
            book.title = req.body.title;
            book.author = req.body.author;
            book.read = req.body.read;
            book.amazonlink = req.body.amazonlink;
        }
        return book;

    })
    res.send({result:true})

}