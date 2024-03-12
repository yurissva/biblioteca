const {Router} = require("express")
const UserController = require("../controllers/UserController")
const checkUserExists = require("../middlewares/checkUserExists")
const userRoutes = Router()
const userController = new UserController()


 
userRoutes.post("/", userController.createUser)
 
userRoutes.get("/",  userController.listUser)

userRoutes.get("/:user_id", checkUserExists, userController.listUserById)
 
userRoutes.put("/:user_id", checkUserExists, userController.updateUser)
userRoutes.patch("/status/:user_id", checkUserExists, userController.updateUserStatus)
 
userRoutes.delete("/:user_id", checkUserExists, userController.deleteUser)

module.exports = userRoutes