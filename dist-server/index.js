import express from "express";
const app = express();
const port = 5174; // Avoid 5173 (Vite default)
app.get("/api/hello", (_req, res) => {
    res.json({ message: "Hello from server!" });
});
app.listen(port, () => {
    console.log(`✅ Backend running at http://localhost:${port}`);
});
