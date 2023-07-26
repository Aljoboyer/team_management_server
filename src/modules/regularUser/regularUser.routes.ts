import { getIndividualTeamDataController, statusChangeController } from "./regularUser.controller";


const router = require("express").Router();


router.put("/status-change", statusChangeController);
router.get("/individual-team-data", getIndividualTeamDataController);


export default router
