<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardcontroller");
import { verifyToken } from "../middlewares/authMiddleware.js";

// Endpoint ini akan diakses di: /api/v1/dashboard/stats
router.get("/stats", verifyToken, getDashboardStats);

=======
const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardcontroller");
import { verifyToken,authorize } from "../middlewares/authMiddleware.js";

// Endpoint ini akan diakses di: /api/v1/dashboard/stats
router.get("/stats", verifyToken, authorize("ADMIN"), getDashboardStats);

>>>>>>> master
module.exports = router;