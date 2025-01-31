"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cheerio = __importStar(require("cheerio"));
const middleware_1 = require("../middleware");
const db_1 = __importDefault(require("../db/db"));
const router = express_1.default.Router();
// Route for web scraping
// @ts-ignore
router.post("/", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }
    //@ts-ignore
    const userId = req.userId;
    try {
        // Validate URL format
        new URL(url);
        const response = yield fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (compatible; MetadataScraper/1.0)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
                "Accept-Language": "en-US,en;q=0.5",
            },
        });
        if (!response.ok) {
            return res.status(502).json({
                error: "Failed to fetch from the target URL",
                status: response.status,
            });
        }
        const html = yield response.text();
        if (!html.trim()) {
            return res.status(500).json({
                error: "Failed to fetch valid content from the URL",
            });
        }
        // Load HTML into Cheerio
        const $ = cheerio.load(html);
        // Extract data safely
        const title = $("title").text().trim() || "No title found";
        const description = ((_a = $('meta[name="description"]').attr("content")) === null || _a === void 0 ? void 0 : _a.trim()) || "No description found";
        const images = $('img').map((i, el) => $(el).attr('src') || '').get()
            .filter(src => src && (src.startsWith('http') || src.startsWith('/')))
            .slice(0, 10);
        // Return scraped data
        const scrapedData = { title, description, images };
        const addData = yield db_1.default.urls.create({
            data: {
                title: scrapedData.title,
                description: scrapedData.description,
                imgUrl: scrapedData.images,
                user: { connect: { id: userId } },
            }
        });
        res.json({
            addData
        });
    }
    catch (error) {
        console.error("Error during scraping:", error);
        if (error instanceof TypeError && error.message.includes("URL")) {
            return res.status(400).json({ error: "Invalid URL provided" });
        }
        return res.status(500).json({
            error: "An error occurred while scraping the URL",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
router.get('/user-data', middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const responseData = yield db_1.default.urls.findMany({
        where: {
            userId
        }
    });
    res.json(responseData);
}));
exports.default = router;
