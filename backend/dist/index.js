"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const Scrape_1 = __importDefault(require("./routes/Scrape"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//@ts-ignore
app.use("/scrape", Scrape_1.default);
app.use("/api/v1", index_1.default);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        error: "Not Found",
        status: 404
    });
});
// Error handler
app.use((error, _req, res) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: "Internal server error",
        status: 500
    });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
exports.default = app;
