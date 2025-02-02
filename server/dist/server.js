"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const Controller_1 = __importDefault(require("./twit/Controller"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const log_1 = require("./utils/log");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
app.set("views", path_1.default.join(__dirname, "/src/views"));
app.set("view engine", "ejs");
async function main() {
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use("/api/twits", Controller_1.default);
    app.get("/profile", (req, res) => {
        res.render("profile", { user: { name: "Arsen", age: 17 } });
    });
    app.get("/error", (req, res) => {
        throw new Error("This is test error");
    });
    app.all("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
    app.use((err, req, res, next) => {
        log_1.logger.error(err.stack);
        res.status(500).send("Something went wrong");
    });
    app.listen(process.env.PORT || 4200, () => {
        log_1.logger.info(`Server listening on port ${process.env.PORT || 4200}`);
    });
}
main()
    .then(async () => {
    await exports.prisma.$connect();
})
    .catch(async (e) => {
    log_1.logger.error(e);
    await exports.prisma.$disconnect();
    process.exit(1);
});
