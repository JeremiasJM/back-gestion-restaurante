import ReserveModel from "../models/reserve.model";

export const getReserves = async (req, res) => {
  try {
    const reserves = await ReserveModel.find();
    res.status(200).json(reserves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getByIdReserve = async (req, res) => {
  const { id } = req.params;
  try {
    const reserve = await ReserveModel.findById(id);
    res.status(200).json(reserve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReserve = async (req, res) => {
  const { nombre, fecha, hora, comensales } = req.body;
  try {
    const newReserve = new ReserveModel({ nombre, fecha, hora, comensales });
    await newReserve.save();
    res.status(201).json(newReserve, { message: "Editado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReserve = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha, hora, comensales } = req.body;
  try {
    const updatedReserve = await ReserveModel.findByIdAndUpdate(
      id,
      {
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        comensales: comensales,
      },
      { new: true }
    );
    res.status(200).json(updatedReserve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReserve = async (req, res) => {
  const { id } = req.params;
  try {
    await ReserveModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Reserva eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
