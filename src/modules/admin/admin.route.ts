import { createTeamController, getAllTeams, getAllUser } from "./admin.controller";

const router = require("express").Router();


router.post("/create-team", createTeamController);
router.get("/get-team", getAllTeams);
router.get("/get-all-user", getAllUser);

export default router
