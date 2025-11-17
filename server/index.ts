import express from "express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import * as Models from "../src/models";

const app = express();
const port = 5174;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

async function readSourcesFile() {
  try {
    const filePath = path.resolve(__dirname, "resource.txt");
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

async function startServer() {
  const resource = await readSourcesFile();

  app.post("/api/chatbot", upload.array("attachments"), async (req, res) => {
    try {
      const body: Models.ChatbotReq = JSON.parse(req.body.chatbotReq);
      const query = body.query.trim();
      const uploadedFiles = req.files
        ? (req.files as Express.Multer.File[])
        : [];

      if (uploadedFiles && uploadedFiles.length > 0) {
        console.log(`receive ${uploadedFiles.length} attachments`);
        uploadedFiles.forEach((file, index) => {
          console.log(`attachment ${index + 1}:`);
          console.log(`- name: ${file.originalname}`);
          console.log(`- type: ${file.mimetype}`);
          console.log(`- size: ${file.size} bytes`);
          console.log(`- content length (Buffer): ${file.buffer.length} bytes`);
          // (file.buffer)
        });
      }

      let result: Models.ChatResult;

      if (/^[1-9][0-9]*$/.test(query)) {
        const len = Number(query);
        if (!resource) {
          return res.status(500).json({ error: "Resource not loaded" });
        }
        if (len <= 0 || len > resource.length) {
          return res.status(400).json({ error: "Length out of range" });
        }
        result = {
          text: resource.slice(0, len),
          email: null,
        };
      } else if (query.startsWith("email")) {
        result = {
          text: query,
          email: {
            to: ["to1@gmail.com", "to2@gmail.com"],
            cc: ["cc1@gmail.com", "cc2@gmail.com"],
            bcc: ["bcc1@gmail.com", "bcc2@gmail.com"],
            subject: "",
            body: "Hello it is a sample email" + query,
          },
        };
      } else {
        result = {
          text: query,
          email: null,
        };

        let tmp = "";
        if (uploadedFiles && uploadedFiles.length > 0) {
          tmp += ` (includes ${uploadedFiles.length} attachments)`;
        }
        result.text += tmp;
      }

      const chatbotRes: Models.ChatbotRes = {
        query,
        file_description: "Attachemnt processed",
        resources: (uploadedFiles || []).map((file) => file.originalname),
        result,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      res.json(chatbotRes);
    } catch (error) {
      console.error("Failed to process attachments:", error);
      res.status(500).json({ error: "internal error" });
    }
  });

  app.post("/api/background", (req, res) => {
    const records: Models.Record[] = req.body;

    console.log("📥 receive background records:", records.length);

    const summary = `background: receive ${records.length} records`;
    res.json({ results: summary });
  });

  app.listen(port, () => {
    console.log(`✅ Fake backend running at http://localhost:${port}`);
  });
}

startServer();
