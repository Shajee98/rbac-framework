import passport from "passport"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {Request, Response, NextFunction, CookieOptions} from 'express'
import { unauthorizedResponse } from "../services/Response/Response"

export const verifyUserOnLogin = passport.authenticate("user-local", {
  session: false
})

export const getJwt = (user: any) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: process.env.SESSION_EXPIRY
  })
}

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: false,
  signed: true,
  maxAge: eval(process.env.COOKIE_EXPIRY as string),
  sameSite: "lax"
}

export const comparePassword = async (password: string, passwordToCompareWith: string) => {
  try {
    return await bcrypt.compare(password, passwordToCompareWith)
  } catch (error) {
    console.error(error)
  }
}


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    {
      session: false
    },
    (err: any, user?: Express.User | false | null, info?: object | string | Array<string | undefined> | any) => {
      if (err) {
        // if (err == "token expired")
        // {
        //   res.redirect('/login')
        // }
        console.log("Hiiiiiiii")
        unauthorizedResponse(res, err)
        return
      } else if (!user) {
        console.log("Hellloooooooo")
        return unauthorizedResponse(res, info.message)
      } else {
        req.user = user
        console.log("User found!")
        console.log("req.user => " + JSON.stringify(req.user))
        next()
        return
      }
    }
  )(req, res, next)
}
