import { createTeamController, getAllTeams } from "./admin.controller";

const router = require("express").Router();


router.post("/create-team", createTeamController);
router.get("/get-team", getAllTeams);

export default router
