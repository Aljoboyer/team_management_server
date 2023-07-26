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
exports.getIndividualTeamDataController = exports.statusChangeController = void 0;
const mongodb_1 = require("mongodb");
const teamInvite_schema_1 = require("../admin/teamInvite.schema");
const statusChangeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    try {
        const TeamMemberData = yield teamInvite_schema_1.TeamMember.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: status } }, { new: true });
        res.send({ status: 200, message: 'Updated Successfully' });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.statusChangeController = statusChangeController;
const getIndividualTeamDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const TeamMemberData = yield teamInvite_schema_1.TeamMember.find({ teamDetails: new mongodb_1.ObjectId(id) }).populate({
            path: 'teamDetails',
            populate: {
                path: 'createdBy',
            }
        });
        res.send(TeamMemberData);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
});
exports.getIndividualTeamDataController = getIndividualTeamDataController;
//# sourceMappingURL=regularUser.controller.js.map