import UserModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Get all users

export const getAllUsers = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const users = await UserModel.find();
    res.status(200).json({ users, mensaje: "Usuarios Encontrados" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
//get user by id
export const getUserById = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.params;

    // Verificar si el ID proporcionado es válido (opcional)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Usuario Inexistente" });
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ user, mensaje: "Usuario Encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// update user

export const updateUser = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.params;

    // Verificar si el ID proporcionado es válido (opcional)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Usuario Inexistente" });
    }

    const { nombre, apellido, estado } = req.body;

    // Verificar si todos los campos requeridos están presentes
    if (!nombre || !apellido ) {
      return res
        .status(400)
        .json({ message: "Por favor rellene todos los campos" });
    }

    // Verificar si el usuario existe
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el usuario
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { nombre, apellido, estado },
      { new: true }
    );

    res
      .status(200)
      .json({
        user: updatedUser,
        mensaje: "Usuario Actualizado Correctamente",
      });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  
  try {
    const { id } = req.params;

    // Verificar si el ID proporcionado es válido (opcional)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Usuario Inexistente" });
    }

    // Verificar si el usuario existe antes de eliminarlo
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    const deletedUser = await UserModel.findByIdAndDelete(id);

    res.status(200).json({ user: deletedUser, mensaje: "Usuario Eliminado Correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// registro

export const createUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (
    !req.body.nombre ||
    !req.body.apellido ||
    !req.body.email ||
    !req.body.password
  ) {
    return res
      .status(400)
      .json({ message: "Por favor rellene todos los campos" });
  }
  try {
    const { nombre, apellido, email, password, admin } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      nombre,
      apellido,
      email,
      password: passwordHash,
      admin,
    });
    const user = await newUser.save();
    res.status(201).json({ user, mensaje: "Usuario Registrado" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// login

export const loginUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { email, password } = req.body; // capturamos el email y el password del body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor rellene todos los campos" });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario o Contraseña incorrecta" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Usuario o Contraseña incorrecta" });
    }
    // res.json({ message: "Bienvenido" });

    const token = jwt.sign(
      {
        // creando el payload del token
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        admin: user.admin,
      },
      process.env.SECRET, // pasamos la clave secreta

      { expiresIn: 15000 } // tiempo de expiración del token
    );

    res
      .header("Authorization", `Bearer ${token}`)
      .json({ error: null, data: { token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
//suspender cuenta
export const disableUser = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  
  try {
    const { id } = req.params;

    // Verificar si el ID proporcionado es válido (opcional)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    // Verificar si el usuario existe antes de desactivarlo
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Desactivar el usuario
    await UserModel.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({ mensaje: "Usuario Suspendido" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const enableUser = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  
  try {
    const { id } = req.params;

    // Verificar si el ID proporcionado es válido (opcional)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    // Verificar si el usuario existe antes de habilitarlo
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Habilitar el usuario
    await UserModel.findByIdAndUpdate(id, { estado: true });

    res.status(200).json({ mensaje: "Usuario habilitado" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  loginUser,
  disableUser,
  enableUser,
};
