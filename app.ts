import "./passport/JwtStrategy"
import "./passport/LocalStrategy"
import "./utils/auth.utils"
import "./models/Product"                                       
import "./models/User"   
import "./models/UserType"                                  
import './models/Relations'

import cors, { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import express from "express"
import sequelize from "./config/db.config"
import { verifyUser } from "./utils/auth.utils"
import privateRouter from "./app/base_routes/routes.private"

import { handleErrors } from "./utils/errorHandling.utils"
import bodyParser from 'body-parser'
import passport from "passport"
import publicRouter from "./app/base_routes/routes.public"

dotenv.config()

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(passport.initialize())

const whitelistedDomains: string[] = ['http://localhost:5173']

const corsOptions: CorsOptions = {
  credentials: true,
  origin(requestOrigin, callback) {
    if (!requestOrigin) return callback(null, true)

    if (whitelistedDomains.indexOf(requestOrigin) === -1) {
      var msg = `${requestOrigin} does not have access to this server.`
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
}

//implementing cors
app.use(cors(corsOptions))
app.use('/private', verifyUser, privateRouter)
app.use('/public', publicRouter)
app.use(handleErrors)

// error handler

const initDB = async () => {
  // Check DB connection
  try {
    await sequelize.authenticate()
    //Uncomment for resetting the DB in dev environment
    // await sequelize.sync({ force: true });
    console.log("Database connection has been established successfully.")
  } catch (error) {
    console.error(`Unable to connect to database: ${error}`)
  }
}

initDB()

export default app
