const isAdmin = (req, res, next) => {
  const { role } = req.user;
  let isAdminUser = false;

  if (role === "admin") {
    isAdminUser = true;
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
export default isAdmin;