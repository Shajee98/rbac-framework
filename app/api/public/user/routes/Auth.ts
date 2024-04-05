import { Router } from "express"
import { verifyUserOnLogin } from "../../../../../utils/auth.utils"
import userController from "../controllers/Auth"
const userRouter = Router()
userRouter.post(
  "/register",
  userController.register
)
userRouter.post(
  "/login",
  // () => {console.log("Lets login")},
  verifyUserOnLogin,
  userController.login
)

export default userRouter
