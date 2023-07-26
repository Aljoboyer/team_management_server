"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("./admin.controller");
const router = require("express").Router();
router.post("/create-team", admin_controller_1.createTeamController);
router.get("/get-team", admin_controller_1.getAllTeams);
router.get("/get-all-user", admin_controller_1.getAllUser);
router.post("/send-invitation", admin_controller_1.inviteTeamMember);
exports.default = router;
//# sourceMappingURL=admin.route.js.map