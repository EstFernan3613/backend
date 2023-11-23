const express = require("express");

const crearTask = async (req, res = express.request) => {
  const task = new Task(req.body);

  try {
    task.user = req.uid;
    const saved = await task.save();
    res.json({
      ok: true,
      task: saved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Interno",
    });
  }
};

const listarTask = async (req, res = express.request) => {
  const tasks = await Task.find().populate("user", "name");

  try {
    res.status(200).json({
      ok: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Interno",
    });
  }
};

const actualizarTask = async (req, res = express.request) => {
  const taskId = req.params.id;
  const uid = req.uid;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        msg: "Task no Encontrado",
      });
    }

    if (task.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puedes editar esto",
      });
    }

    const newTask = {
      ...req.body,
      user: uid,
    };

    const updatedTask = await Task.findByIdAndUpdate(taskId, newTask, {
      new: true,
    });

    res.json({
      ok: true,
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Wrror Interno",
    });
  }
};

const eliminarTask = async (req, res = express.request) => {
  const taskId = req.params.id;
  const uid = req.uid;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        msg: "Task no encontrado",
      });
    }

    if (task.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puedes borrar esta tarea",
      });
    }

    await Task.findByIdAndDelete(taskId);

    res.json({
      ok: true,
      msg: "Tarea borrada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Interno",
    });
  }
};

module.exports = {
  crearTask,
  listarTask,
  actualizarTask,
  eliminarTask,
};