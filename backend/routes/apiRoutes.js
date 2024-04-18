const routes = require("express").Router()
const ToDoController = require("../server/TOdo/todoController")
const userController = require("../server/user/userController")


routes.post("/user/register",userController.register)
routes.post("/user/login",userController.login)
routes.use(require("../config/middleware"))

routes.post("/ToDo/add",ToDoController.add)
routes.post("/ToDo/getall",ToDoController.getall)
routes.post("/ToDo/getpagination",ToDoController.getpagination)
routes.post("/ToDo/getsingle",ToDoController.getsingle)
routes.post("/ToDo/deletedata",ToDoController.deletedata)
routes.post("/ToDo/updatedata",ToDoController.updatedata)
routes.post("/ToDo/softdelete",ToDoController.softdelete)

routes.post("/user/getallemployee",userController.getallemployee)
routes.post("/user/getsingle",userController.getsingle)
routes.post("/user/deletedata",userController.deletedata)
routes.post("/user/updatedata",userController.updatedata)
routes.post("/user/softdelete",userController.softdelete)



module.exports = routes