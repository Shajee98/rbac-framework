import authService from "../../../../../services/User/User";
import responses from "../../../../../constants/Responses";
import {
  genericResponseByData,
  serverErrorResponse,
  successResponse,
} from "../../../../../services/Response/Response";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { getUserById } from "../../../../../services/User/User";
import { COOKIE_OPTIONS, getJwt } from "../../../../../utils/auth.utils";


// Gets required info from request and calls service to create new user record
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, password, user_name, user_type_id } = req.body;
    const createdUser = await authService.register({
      first_name: firstName,
      last_name: lastName,
      user_name: user_name,
      password: password,
      user_type_id: user_type_id
    });

    console.log("createdUser " , createdUser)

    if (!createdUser) {
      serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE);
    }

    return res.send(
      genericResponseByData(createdUser, {
        success: responses.USER_REGISTRATION_SUCCESS,
      })
    );
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    
    const user = await getUserById(req.user?.id)

    console.log("req.user after logging in => ", req.user)
    const jwtToken = getJwt({
      id: req.user!.id,
      user_name: req.user!.user_name,
      user_type_id: req.user!.user_type_id
    })

    if (!user) {
      serverErrorResponse(res, responses.USER_NOT_FOUND);
    }
    const responseData = {
      jwtToken: jwtToken,
      user: { ...user }
    }

    res.cookie("token", `${jwtToken}`, COOKIE_OPTIONS)


    return successResponse(res, responseData)
  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login
};
