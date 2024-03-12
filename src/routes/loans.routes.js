const {Router} = require('express')
const LoanController = require("../controllers/LoanController")

const loanRoutes = Router()
const loanController = new LoanController()

loanRoutes.post("/:user_id/:book_id", loanController.borrowBooks)
loanRoutes.get("/:user_id/", loanController.listBorrowedBooks)
loanRoutes.get("/total/:user_id", loanController.totalBorrowedBooks)
loanRoutes.patch("/devolucao/:user_id/:book_id", loanController.returnBorrowedBooks)

module.exports = loanRoutes