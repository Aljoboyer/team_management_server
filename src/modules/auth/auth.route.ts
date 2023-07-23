const router = require("express").Router();

import {
    userSignUpController,
    signInHandler,
    getUserController
} from '../auth/auth.controller';

router.post("/user-signup", userSignUpController);
router.post("/user-login", signInHandler);
router.get("/getUser", getUserController);

export default router
