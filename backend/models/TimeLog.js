const mongoose = require("mongoose");

const TimeLogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  taskId: mongoose.Schema.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  duration: Number
});

module.exports = mongoose.model("TimeLog", TimeLogSchema);
