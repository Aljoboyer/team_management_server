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
exports.inviteTeamMember = exports.getAllUser = exports.getAllTeams = exports.createTeamController = void 0;
const createTeam_schema_1 = require("./createTeam.schema");
const mongodb_1 = require("mongodb");
const auth_schema_1 = require("../auth/auth.schema");
const teamInvite_schema_1 = require("./teamInvite.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SecretKey = "te@mM@n@gement";
const createTeamController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Hitted', req.body)
    const teamsData = req.body;
    try {
        const teamExists = yield createTeam_schema_1.Team.findOne({ teamName: teamsData === null || teamsData === void 0 ? void 0 : teamsData.teamName });
        if (teamExists) {
            return res.status(400).json({ message: "Team name already exists. Please try unique name" });
        }
        else {
            const result = yield createTeam_schema_1.Team.create(teamsData);
            res.status(201).json({ status: 200, message: 'Team Created successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.createTeamController = createTeamController;
const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Hitted all ', req)
    const token = req.headers['x-access-token'];
    // console.log('Hitted all ', token)
    try {
        if (!token) {
            console.log('not found e dukse');
            return res.status(401).json({ error: 'Missing token' });
        }
        jwt.verify(token, SecretKey, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            const findUser = yield auth_schema_1.TeamUser.findOne({ email: user.email });
            if ((findUser === null || findUser === void 0 ? void 0 : findUser.role) == 'admin') {
                const teams = yield createTeam_schema_1.Team.find({ createdBy: new mongodb_1.ObjectId(user.id) }).populate('createdBy');
                res.send(teams);
            }
            else if ((findUser === null || findUser === void 0 ? void 0 : findUser.role) == 'user') {
                const teams = yield teamInvite_schema_1.TeamMember.find({ email: user.email, status: { $in: ['Active', 'Pending'] } }).populate({
                    path: 'teamDetails',
                    populate: {
                        path: 'createdBy',
                    }
                });
                res.send(teams);
            }
        }));
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getAllTeams = getAllTeams;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield auth_schema_1.TeamUser.find({ role: 'user' });
        res.send(userData);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getAllUser = getAllUser;
const inviteTeamMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inviteData = req.body;
    try {
        const userData = yield teamInvite_schema_1.TeamMember.insertMany(inviteData);
        res.send({ status: 200, message: 'Member Invited Successfully' });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.inviteTeamMember = inviteTeamMember;
//# sourceMappingURL=admin.controller.js.map