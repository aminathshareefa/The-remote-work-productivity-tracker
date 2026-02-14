const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// =======================
// GET ALL TASKS
// =======================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    console.log("GET Tasks Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// CREATE TASK
// =======================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log("Create Task Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// UPDATE TASK STATUS
// =======================
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.status = req.body.status || task.status;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.log("Update Task Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// DELETE TASK
// =======================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("Delete Task Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;