import User from "../../models/User"
import UserType from "../../models/UserType"

export const register = async (userInfo: { first_name: string, last_name: string, user_name: string, password: string, user_type_id: number}) => {
    try {
      const user = await User.create({
        username: userInfo.user_name.toLowerCase(),
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
        user_type_id: userInfo.user_type_id
      })
      if (!user) {
        return
      }
  
      return {
        user: user.dataValues
      }
    } catch (error) {
      return error
    }
  }

export const getUserById = async (userId: number | undefined) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: UserType,
          as: "user_type"
        }
      ],
      attributes: {
        exclude: ['password']
      }
    })

    if (!user) {
      return
    }

    return user.dataValues
  } catch (error) {
    console.error(error)
  }
}

export const getUserByUserName = async (username: string) => {
  try {
    console.log("username ,,,, ", username)
    const user = await User.findOne({
      where: {
        user_name: username
      },
      include: [
        {
          model: UserType,
          as: "user_type"
        }
      ],
    })

    if (!user) {
      return
    }

    return user.dataValues
  } catch (error) {
    console.error(error)
  }
}

export default {
  register,
  getUserById,
  getUserByUserName
}
