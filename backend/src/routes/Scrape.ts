import express, { Request, Response } from "express";
import * as cheerio from 'cheerio';

const router = express.Router();

interface ScrapeResponse {
  title: string;
  description: string;
  text: string;
  // Add other fields as needed
}
// @ts-ignore
router.post("/", async (req: Request, res: Response) => {
  const { url }: { url?: string } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Validate URL format
    new URL(url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MetadataScraper/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    

    if (!html) {
      return res.status(500).json({
        error: "Failed to fetch the content from the URL"
      });
    }

    let $;
    try {
      $ = cheerio.load(html);
    } catch (cheerioError) {
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
      description = $("meta[name='description']").attr('content')?.trim() || ""; // Meta description tag
      text = $("body").text().trim(); // Scraping all the body text, adjust selector as needed
    } catch (extractError) {
      console.error("Data extraction error:", extractError);
    }

    const scrapedData: ScrapeResponse = {
      title: title || "No title found",
      description: description || "No description found",
      text: text || "No content found"
    };

    res.json(scrapedData);

  } catch (error) {
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
});

export default router;
