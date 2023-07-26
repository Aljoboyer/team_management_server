"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const auth_controller_1 = require("../auth/auth.controller");
router.post("/user-signup", auth_controller_1.userSignUpController);
router.post("/user-login", auth_controller_1.signInHandler);
router.get("/getUser", auth_controller_1.getUserController);
exports.default = router;
//# sourceMappingURL=auth.route.js.map