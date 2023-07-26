"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnect_1 = __importDefault(require("./connection/DBConnect"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const app = (0, express_1.default)();
(0, DBConnect_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const admin_route_1 = __importDefault(require("./modules/admin/admin.route"));
const regularUser_routes_1 = __importDefault(require("./modules/regularUser/regularUser.routes"));
app.use("/auth/v1", auth_route_1.default);
app.use("/admin/v1", admin_route_1.default);
app.use("/user/v1", regularUser_routes_1.default);
app.get('/', (_req, res) => {
    return res.send('Team Management System Connected');
});
app.listen(config_1.default.port, () => {
    console.log(`Team Management System listening on port ${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map