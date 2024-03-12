const {Router} = require("express")
const BookController = require("../controllers/BookController")
const checkBookExists = require("../middlewares/checkBookExists")
const bookRoutes = Router()
const bookController = new BookController()
 
bookRoutes.post("/", bookController.createBook)
 
bookRoutes.get("/", bookController.listBook)

bookRoutes.get("/:id", checkBookExists, bookController.listBookById)
 
bookRoutes.put("/:id", checkBookExists, bookController.updateBook)
bookRoutes.patch("/status/:id", checkBookExists, bookController.updateBookStatus)
 
bookRoutes.delete("/:id", checkBookExists, bookController.deleteBook)
 
 
module.exports = bookRoutes
 
