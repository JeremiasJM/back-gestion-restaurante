import UserModel from "../models/users.model.js";

//Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
export default getAllUsers;