import express, { Request, Response } from "express";
import * as cheerio from "cheerio";
import { middleware } from "../middleware";
import Client from "../db/db";

const router = express.Router();

interface ScrapeResponse {
  title: string;
  description: string;
  images: string[];
}

// Route for web scraping
// @ts-ignore
router.post("/", middleware, async (req: Request, res: Response) => {
  const { url }: { url?: string } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  //@ts-ignore
  const userId = req.userId
  try {
    // Validate URL format
    new URL(url);

    const response = await fetch(url, {
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

    const html = await response.text();

    if (!html.trim()) {
      return res.status(500).json({
        error: "Failed to fetch valid content from the URL",
      });
    }

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract data safely
    const title = $("title").text().trim() || "No title found";
    const description = $('meta[name="description"]').attr("content")?.trim() || "No description found";
    const images = $('img').map((i, el) => $(el).attr('src') || '').get()
      .filter(src => src && (src.startsWith('http') || src.startsWith('/')))
      .slice(0, 10);

    // Return scraped data
    const scrapedData: ScrapeResponse = { title, description, images };

    const addData = await Client.urls.create({
      data: {
        title: scrapedData.title,
        description: scrapedData.description,
        imgUrl: scrapedData.images,
        user: { connect: { id: userId } },
      }
    })
    res.json({
     
      addData
    })

  } catch (error) {
    console.error("Error during scraping:", error);

    if (error instanceof TypeError && error.message.includes("URL")) {
      return res.status(400).json({ error: "Invalid URL provided" });
    }

    return res.status(500).json({
      error: "An error occurred while scraping the URL",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});


router.get('/user-data', middleware, async(req,res)=>{
//@ts-ignore
 const userId = req.userId
  const responseData = await Client.urls.findMany({
      where:{
        userId
      }
  })
  res.json(responseData);
})


export default router;
