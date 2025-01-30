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
const router = express_1.default.Router();
// @ts-ignore
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }
    try {
        // Validate URL format
        new URL(url);
        const response = yield fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; MetadataScraper/1.0)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = yield response.text();
        if (!html) {
            return res.status(500).json({
                error: "Failed to fetch the content from the URL"
            });
        }
        let $;
        try {
            $ = cheerio.load(html);
        }
        catch (cheerioError) {
            console.error("Cheerio loading error:", cheerioError);
            return res.status(500).json({
                error: "Failed to parse the HTML content"
            });
        }
        // Extract data with error handling
        let title = "";
        let description = "";
        let text = "";
        try {
            title = $("title").text().trim();
            description = ((_a = $("meta[name='description']").attr('content')) === null || _a === void 0 ? void 0 : _a.trim()) || ""; // Meta description tag
            text = $("body").text().trim(); // Scraping all the body text, adjust selector as needed
        }
        catch (extractError) {
            console.error("Data extraction error:", extractError);
        }
        const scrapedData = {
            title: title || "No title found",
            description: description || "No description found",
            text: text || "No content found"
        };
        res.json(scrapedData);
    }
    catch (error) {
        console.error("Error during scraping:", error);
        // Handle URL validation errors
        if (error instanceof TypeError && error.message.includes('URL')) {
            return res.status(400).json({
                error: "Invalid URL provided"
            });
        }
        // Handle HTTP errors
        if (error instanceof Error) {
            if (error.message.includes('HTTP error!')) {
                return res.status(502).json({
                    error: "Failed to fetch from the target URL",
                    details: error.message
                });
            }
            return res.status(500).json({
                error: "There was an error scraping the URL",
                details: error.message
            });
        }
        res.status(500).json({
            error: "An unexpected error occurred"
        });
    }
}));
exports.default = router;
