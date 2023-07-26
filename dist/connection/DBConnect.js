"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connectDB = () => {
    const mongouri = `${config_1.default.database_url}`;
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    };
    try {
        mongoose_1.default.connect(mongouri, options);
        console.log("connected to database");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=DBConnect.js.map