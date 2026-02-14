const TimeLog = require("../models/TimeLog");

exports.startTime = async (req, res) => {
  const log = await TimeLog.create({
    userId: req.user.id,
    taskId: req.body.taskId,
    startTime: new Date()
  });
  res.json(log);
};

exports.stopTime = async (req, res) => {
  const log = await TimeLog.findById(req.params.id);
  log.endTime = new Date();
  log.duration = (log.endTime - log.startTime) / 1000;
  await log.save();
  res.json(log);
};
