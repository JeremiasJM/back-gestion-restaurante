import ReserveModel from "../models/reserve.model.js";

export const getReserves = async (req, res, next) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const reserves = await ReserveModel.find();
    res.status(200).json(reserves);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Pasar el error al siguiente middleware de manejo de errores
  }
};

export const getByIdReserve = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { id } = req.params;
  try {
    const reserve = await ReserveModel.findById(id);
    if (!reserve) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(200).json(reserve);
  } catch (error) {
    res.status(500).json({ message: "Reserva no encontrada" });
  }
};

export const createReserve = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (
    !req.body.nombre ||
    !req.body.apellido ||
    !req.body.fecha ||
    !req.body.hora ||
    !req.body.comensales
  ) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const { nombre, apellido, fecha, hora, comensales } = req.body;
  try {
    const newReserve = new ReserveModel({
      nombre,
      apellido,
      fecha,
      hora,
      comensales,
    });
    await newReserve.save();
    res.status(201).json(newReserve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReserve = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (
    !req.params.id ||
    !req.body.nombre ||
    !req.body.apellido ||
    !req.body.fecha ||
    !req.body.hora ||
    !req.body.comensales
  ) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const { id } = req.params;
  const { nombre, apellido, fecha, hora, comensales } = req.body;
  try {
    const updatedReserve = await ReserveModel.findByIdAndUpdate(
      id,
      { nombre, apellido, fecha, hora, comensales },
      { new: true }
    );
    if (!updatedReserve) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(200).json(updatedReserve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReserve = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!req.params.id) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const { id } = req.params;
  try {
    const deletedReserve = await ReserveModel.findByIdAndDelete(id);
    if (!deletedReserve) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }
    res.status(200).json(deletedReserve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
