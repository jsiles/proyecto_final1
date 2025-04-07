const express = require("express");
const { Tarea } = require("../models"); // Asegúrate de que models/tarea.js existe
const router = express.Router();

// Crear un tarea

router.post("/", async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los tareas
router.get("/", async (req, res) => {
  const tareas = await Tarea.findAll();
  res.json(tareas);
});

// Obtener un tarea por ID
router.get("/:id", async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  tarea ? res.json(tarea) : res.status(404).json({ error: "Tarea no encontrado" });
});

// Actualizar un tarea
router.put("/:id", async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrado" });

  await tarea.update(req.body);
  res.json(tarea);
});

// Eliminar un tarea
router.delete("/:id", async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrado" });

  await tarea.destroy();
  res.json({ mensaje: "Tarea eliminado" });
});

module.exports = router;
