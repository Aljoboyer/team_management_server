"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = exports.userSignUpController = exports.signInHandler = void 0;
const auth_schema_1 = require("./auth.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SecretKey = "te@mM@n@gement";
const signInHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Hitted signing', req.body)
    const { email, password } = req.body;
    try {
        const oldUser = yield auth_schema_1.TeamUser.findOne({ email: email });
        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = yield bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Your Password is wrong" });
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SecretKey, {
            expiresIn: "1h",
        });
        res.status(200).json({ result: oldUser, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.signInHandler = signInHandler;
// User Signup
const userSignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, role, profileImg } = req.body;
    try {
        const oldUser = yield auth_schema_1.TeamUser.findOne({ email: email });
        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt.hash(password, 12);
        const result = yield auth_schema_1.TeamUser.create({
            email: email,
            password: hashedPassword,
            name: name,
            role: role,
            profileImg: profileImg
        });
        const token = jwt.sign({ email: result.email, id: result._id }, SecretKey, {
            expiresIn: "1h",
        });
        res.status(201).json({ result, token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.userSignUpController = userSignUpController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Hitted broo', req.query)
    const { token } = req.query;
    if (!token) {
        console.log('not found e dukse');
        return res.status(401).json({ error: 'Missing token' });
    }
    jwt.verify(token, SecretKey, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        const findUser = yield auth_schema_1.TeamUser.findOne({ email: user.email });
        res.send(findUser);
    }));
});
exports.getUserController = getUserController;
function authenticateToken(req, res, next) {
    // console.log('Hitted broo', req)
    const authHeader = req.headers.authorization;
    const token = req.headers.authorization;
    if (!token) {
        console.log('not found e dukse');
        return res.status(401).json({ error: 'Missing token' });
    }
    jwt.verify(token, SecretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        // req.user = user;
        next();
    });
}
//# sourceMappingURL=auth.controller.js.map