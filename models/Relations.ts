import User from "./User";
import UserType from "./UserType";

User.belongsTo(UserType, {foreignKey: "user_type_id", as: "user_type"})

UserType.hasMany(User, { foreignKey: 'user_type_id', as: "user_type" });