import express, { Request, Response } from "express";
import cors from "cors";
import mainRouter from "./routes/index";
import Scrape from "./routes/Scrape"

const app = express();

app.use(express.json());
app.use(cors());

interface ScrapeResponse {
  title: string;
  // Add other fields as needed
}
//@ts-ignore
app.use("/scrape", Scrape)

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