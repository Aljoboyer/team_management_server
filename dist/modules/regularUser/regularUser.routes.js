"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regularUser_controller_1 = require("./regularUser.controller");
const router = require("express").Router();
router.put("/status-change", regularUser_controller_1.statusChangeController);
router.get("/individual-team-data", regularUser_controller_1.getIndividualTeamDataController);
exports.default = router;
//# sourceMappingURL=regularUser.routes.js.map