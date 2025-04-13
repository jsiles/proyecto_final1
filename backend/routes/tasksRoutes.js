const express = require("express");
const { Tarea } = require("../models"); // Asegúrate de que models/tarea.js existe
const router = express.Router();
const { Op } = require('sequelize');
const authMiddleware = require('../middleware/authMiddleware');

// Crear un tarea

router.post("/", authMiddleware.autenticar, async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los tareas y o por filtros estado/ titulo
router.get("/", authMiddleware.autenticar, async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status) where.estado = status;
    if (search) where.titulo = { [Op.like]: `%${search}%` };
    const tareas = await Tarea.findAll({
      where,
      order: [['id', 'ASC']]  // Ordenar por ID ascendente
    });
    if (tareas.length > 0) {
      res.json(tareas);
    } else {
      res.status(200).json({ error: "No se encontraron tareas con los criterios especificados" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al buscar tareas" });
  }
});

// Obtener un tarea por ID
router.get("/:id", authMiddleware.autenticar, async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  tarea ? res.json(tarea) : res.status(404).json({ error: "Tarea no encontrado" });
});

// Actualizar un tarea
router.put("/:id", authMiddleware.autenticar, async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrado" });
  const estadoActual = tarea.estado;
  const estadoNuevo = req.body.estado;

  const transicionesNoPermitidas = {
    "En progreso": ["Pendiente"],
    "Completada": ["Pendiente", "En progreso"],
  };

  if (
    transicionesNoPermitidas[estadoActual] &&
    transicionesNoPermitidas[estadoActual].includes(estadoNuevo)
  ) {
    return res.status(201).json({
      error: `No se puede cambiar el estado de "${estadoActual}" a "${estadoNuevo}"`,
    });
  }
  await tarea.update(req.body);
  res.json(tarea);
});

// Eliminar un tarea
router.delete("/:id", authMiddleware.autenticar, async (req, res) => {
  const tarea = await Tarea.findByPk(req.params.id);
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrado" });

  await tarea.destroy();
  res.json({ mensaje: "Tarea eliminado" });
});

module.exports = router;
