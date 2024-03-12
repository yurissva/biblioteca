const {Router} = require("express")
const bookRoutes = require("./books.routes")
const userRoutes = require("./users.routes")
const loanRoutes = require("./loans.routes")

const routes = Router()

routes.use('/books', bookRoutes)
routes.use('/users', userRoutes)
routes.use('/loans', loanRoutes)


module.exports = routes