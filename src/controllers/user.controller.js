import UserModel from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

    const { nombre, apellido, mail, estado } = req.body;

    // Verificar si todos los campos requeridos están presentes
    if (!nombre || !apellido) {
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
      { nombre, apellido, mail, estado },
      { new: true }
    );

    res.status(200).json({
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

    res
      .status(200)
      .json({ user: deletedUser, mensaje: "Usuario Eliminado Correctamente" });
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

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "Ya existe un usuario registrado con este correo electrónico",
        });
    }
    const newUser = new UserModel({
      nombre,
      apellido,
      email,
      password: passwordHash,
      admin,
    });

    const user = await newUser.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      auth: {
        user: "jeremyjuarezmarrades@hotmail.com", //cuenta de microsoff
        pass: "je10re9mias", //pass de la cuenta
      },
    });

    const mailOptions = {
      from: "jeremyjuarezmarrades@hotmail.com", //misma cuenta de arriba xd
      to: email,
      subject: "Bienvenido a Rolling Food!",
      text: `Hola ${nombre},\n\n¡Gracias por registrarte en Rolling Food! Esperamos que disfrutes de nuestro servicio.\n\nSaludos,\nEl equipo de Rolling Food`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Correo electrónico enviado: " + info.response);
      }
    });

    res.status(201).json({ user, mensaje: "Usuario Registrado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
// login

export const loginUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { email, password } = req.body;
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
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        admin: user.admin,
        estado: user.estado,
        email: user.email,
      },
      process.env.SECRET,

      { expiresIn: 15000 }
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
//crea una funcion que sea generar codigo para recuperar contraseña, donde ingresa el mail, valide que hay un mail en la base de dato , si hay va a generar un codigo aleatorio que se va a guardar en la base de datos
export const generateCode = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const code = Math.floor(100000 + Math.random() * 900000);
  user.cod_recuperacion = code;
  await user.save();
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: "jeremyjuarezmarrades@hotmail.com", //cuenta de microsoff
      pass: "je10re9mias", //pass de la cuenta
    },
  });
  const mailOptions = {
    from: "jeremyjuarezmarrades@hotmail.com", //misma cuenta de arriba xd
    to: email,
    subject: "Codigo de recuperacion",
    text: `Su codigo de recuperacion es ${code}`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(400).json({ message: "Error al enviar el codigo" });
    } else {
      res.status(200).json({ message: "Codigo enviado" });
    }
  });
  res.status(200).json({ message: "Codigo generado" });
};
export const recuperapassword = async (req,res)=>{
  if(req.method !== "POST"){
    return res.status(405).json({message: "Method not allowed"})
  }
  if(!req.body.email ||!req.body.cod_recuperacion|| !req.body.password){
    return res.status(400).json({message: "Faltan datos"})
  }
  try {
    const {email,cod_recuperacion,password} = req.body
    const user = await UserModel.findOne({email})
    if(!user){
      return res.status(404).json({message: "Usuario no encontrado"})
    }
    if(user.cod_recuperacion !== cod_recuperacion){
      return res.status(400).json({message: "Codigo de recuperacion incorrecto"})
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password,salt)
    user.password = passwordHash
    await user.save()
    res.status(200).json({mensaje:'Recuperacion de Clave exitosa'})
  }catch (error){
    res.status(500).json({message: "Error interno del servidor"})
  } 

}
export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  loginUser,
  disableUser,
  enableUser,
  generateCode,
  recuperapassword
};
