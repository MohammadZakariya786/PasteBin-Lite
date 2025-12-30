import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.js";
import pasteRoutes from "./routes/pastes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api", pasteRoutes);
app.use("/", pasteRoutes);

export default app;
