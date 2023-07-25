import { createTeamController, getAllTeams, getAllUser, inviteTeamMember } from "./admin.controller";

const router = require("express").Router();


router.post("/create-team", createTeamController);
router.get("/get-team", getAllTeams);
router.get("/get-all-user", getAllUser);
router.post("/send-invitation", inviteTeamMember);

export default router
