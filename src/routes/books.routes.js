const {Router} = require("express")
const BookController = require("../controllers/BookController")
const checkBookExists = require("../middlewares/checkBookExists")
const bookRoutes = Router()
const bookController = new BookController()
 
bookRoutes.post("/books/:user_id", bookController.createBook)
 
bookRoutes.get("/books", bookController.listBook)

bookRoutes.get("/books/:id", checkBookExists, bookController.listBookById)
 
bookRoutes.put("/books/:id", checkBookExists, bookController.updateBook)
bookRoutes.patch("/books/status/:id", checkBookExists, bookController.updateBookStatus)
 
bookRoutes.delete("/books/:id", checkBookExists, bookController.deleteBook)
 
 
module.exports = bookRoutes
 
