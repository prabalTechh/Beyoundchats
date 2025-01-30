"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./User"));
const Scrape_1 = __importDefault(require("./Scrape"));
const mainRouter = express_1.default.Router();
mainRouter.use("/user", User_1.default);
mainRouter.use("/data", Scrape_1.default);
exports.default = mainRouter;
