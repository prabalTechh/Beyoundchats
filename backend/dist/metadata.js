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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeMetadata = scrapeMetadata;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class MetadataScrapingError extends Error {
    constructor(message, url) {
        super(message);
        this.url = url;
        this.name = 'MetadataScrapingError';
    }
}
function scrapeMetadata(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate URL
            new URL(url); // Will throw if URL is invalid
            console.log(`Fetching metadata from ${url}`);
            // Fetch the webpage
            const response = yield axios_1.default.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; MetadataScraper/1.0)'
                }
            });
            const html = response.data;
            //@ts-ignore
            const $ = cheerio_1.default.load(html);
            // Initialize metadata object with null values
            const metadata = {
                title: null,
                description: null,
                keywords: null,
                author: null,
                ogTitle: null,
                ogDescription: null,
                ogImage: null,
                twitterCard: null,
                twitterTitle: null,
                twitterDescription: null,
                twitterImage: null,
                favicon: null,
                canonicalUrl: null
            };
            // Basic metadata
            metadata.title = $('title').text() || $('meta[name="title"]').attr('content') || null;
            metadata.description = $('meta[name="description"]').attr('content') || null;
            metadata.keywords = $('meta[name="keywords"]').attr('content') || null;
            metadata.author = $('meta[name="author"]').attr('content') || null;
            // Open Graph metadata
            metadata.ogTitle = $('meta[property="og:title"]').attr('content') || null;
            metadata.ogDescription = $('meta[property="og:description"]').attr('content') || null;
            metadata.ogImage = $('meta[property="og:image"]').attr('content') || null;
            // Twitter Card metadata
            metadata.twitterCard = $('meta[name="twitter:card"]').attr('content') || null;
            metadata.twitterTitle = $('meta[name="twitter:title"]').attr('content') || null;
            metadata.twitterDescription = $('meta[name="twitter:description"]').attr('content') || null;
            metadata.twitterImage = $('meta[name="twitter:image"]').attr('content') || null;
            // Other important metadata
            metadata.favicon = $('link[rel="icon"]').attr('href') ||
                $('link[rel="shortcut icon"]').attr('href') || null;
            metadata.canonicalUrl = $('link[rel="canonical"]').attr('href') || null;
            console.log('Metadata scraping successful:', metadata);
            return metadata;
        }
        catch (error) {
            console.error(`Error scraping metadata from ${url}:`, error);
            throw new MetadataScrapingError('Failed to scrape metadata', url);
        }
    });
}
exports.default = scrapeMetadata;
