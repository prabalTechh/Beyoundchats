import express, { Request, Response } from "express";
import cors from "cors";
import mainRouter from "./routes/index";
import * as cheerio from 'cheerio';

const app = express();

app.use(express.json());
app.use(cors());

interface ScrapeResponse {
  title: string;
  // Add other fields as needed
}
//@ts-ignore
app.post("/scrape", async (req: Request, res: Response) => {
  const { url }: { url?: string } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Validate URL
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

    // Ensure cheerio is properly loaded with error handling
    let $;
    try {
      $ = cheerio.load(html);
    } catch (cheerioError) {
      console.error("Cheerio loading error:", cheerioError);
      return res.status(500).json({ 
        error: "Failed to parse the HTML content" 
      });
    }

    // Safely extract data with error handling
    let title;
    try {
      title = $("title").text().trim();
    } catch (extractError) {
      console.error("Data extraction error:", extractError);
      title = "";
    }

    const scrapedData: ScrapeResponse = {
      title: title || "No title found"
    };

    res.json(scrapedData);

  } catch (error) {
    console.error("Error during scraping:", error);

    if (error instanceof TypeError && error.message.includes('URL')) {
      return res.status(400).json({ 
        error: "Invalid URL provided" 
      });
    }

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

app.use("/api/v1", mainRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    status: 404
  });
});

// Error handler
app.use((error: Error, _req: Request, res: Response) => {
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

export default app;