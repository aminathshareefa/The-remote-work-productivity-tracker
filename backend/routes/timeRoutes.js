const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { startTime, stopTime } = require("../controllers/timeController");

router.post("/start", auth, startTime);
router.post("/stop/:id", auth, stopTime);

module.exports = router;
