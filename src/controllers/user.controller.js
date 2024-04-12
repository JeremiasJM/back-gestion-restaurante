import UserModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, apellido, email, password, admin, isAprobado } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

    const newUser = UserModel({
      nombre,
      apellido,
      email,
      password: passHash,
      admin,
      isAprobado
    });

    const user = await newUser.save();
    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json( {message: error} );
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json( {message: "Debe rellenar todos los campos"} );
    };

    const user = await UserModel.findOne( {email} );

    if(!user) {
      return res.status(404).json( {message: "Usuario o contraseña incorrecta."});
    };

    const validatePass = await bcrypt.compare(password, user.password);

    if(!validatePass){
      return res.status(404).json( {message: "Usuario o contraseña incorrecta."});
    };

    const token =  jwt.sign(
      {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        admin: user.admin,
        isAprobado: user.isAprobado
      },
      process.env.SECRET,
      { expiresIn: "1h"}
    );

    res.header(token).json( {token} );
    
  } catch (error) {
    console.error(error);
    res.status(500).json( {message: error} );
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, admin } = req.body; // (?) que pasa si se quiere reestablecer la pass?
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { nombre, apellido, admin },
      { new: true }
    );

    res.json(updateUser);

  } catch (error) {
    console.error(error);
    res.status(500).json( {message: error} );
  }
};

const deleteUser = async (req, res) => {
  console.log(req, "<--req DELETE");
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    res.json( {message: "Usuario Eliminado."});

  } catch (error) {
    console.error(error);
    res.status(500).json( {message: error} );
  }

};

const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    

    if(!user){
      return res.status(404).json( {message: "No se encontro coincidencias."} );
    }

    res.json(user);
    
  } catch (error) {
    console.error(error);
    res.status(500).json( {message: error} );
  }
  
};

const disableUser = async (req, res) => {  
  try {
    const { id } = req.params;
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { isAprobado: false },
      { new: true }
    );
    
    res.json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json( {message: error} );
  }
};

export default {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  disableUser
};