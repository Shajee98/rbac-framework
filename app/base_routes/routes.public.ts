import express from "express"
import userRouter from "../api/public/user/routes/Auth"


const publicRouter = express.Router()

publicRouter.use('/users/', userRouter)

export default publicRouter