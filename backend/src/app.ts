import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";
import cacheRoutes from "./routes/cache.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Fidenz Weather Analytics API is running",
  });
});

app.use("/api/weather", weatherRoutes);
app.use("/api/cache", cacheRoutes);

export default app;