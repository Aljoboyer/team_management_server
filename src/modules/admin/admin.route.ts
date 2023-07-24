import { createTeamController } from "./admin.controller";

const router = require("express").Router();


router.post("/create-team", createTeamController);

export default router
