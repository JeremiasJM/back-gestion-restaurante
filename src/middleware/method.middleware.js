export const methodNotAllowedHandler = (req, res, next) => {
    return res.status(405).json({ message: 'Metodo no Disponible' });
  };