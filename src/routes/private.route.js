import express from "express";
const router = express.Router();

router.get("/admin", (req, res) => {
    console.log(req, "usuario")
  res.json({
    error: null,
    message: "Admin page",
    data: {
      title: "Admin page",
      usuario: req.usuario,
    },
  });
});

export default router;
