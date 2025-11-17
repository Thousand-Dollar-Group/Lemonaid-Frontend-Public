# Lemonaid-Web

This repository houses the client-side application for the Lemonaid System, designed to provide a comprehensive and intuitive user experience.

Key Features Include:

* Interactive Chatbot: A real-time interface for engaging with the Lemonaid core.

* Secure User Authentication: Handles login and session management.

* Conversation History: Provides a persistent record and easy access to past interactions.

* Email Preview: Dedicated views for reviewing, editing, and instantly sending email content with a one-click action.

* Attachment Preview: Supports viewing various file attachments directly within the application.

This public version of the project has been modified to comply with data sharing agreements. All data and underlying support previously supplied by our external supply chain collaboration partner have been removed.

Frontend Contributors:
| Contributor | GitHub Profile |
| :--- | :--- |
| **Tim** | [Tim](https://github.com/timjtchang) |
| **Tony** | [Tony](https://github.com/LuoZihYuan) |
| **Duncan** | [Duncan](https://github.com/DuncanShuo) |
| **Benson** | [Benson](https://github.com/Bisonlee) |

## 📁 Directory Overview

- `src/` – Frontend code lives here (React + Vite)
- `server/` – Fake backend to simulate responses from agents

---

## 🚀 Fake Server Usage

- `pnpm dev` – Run client and server **concurrently**
- `pnpm client` – Run **frontend only**
- `pnpm server` – Run **backend only**
- `pnpm build` – Build frontend
- `pnpm build:server` – Build backend only

### 🔗 API Endpoints

- `GET /api/chatbot` – Get a sample chatbot response
- `GET /api/chatbot/:length` – Get a response with up to `:length` characters (max 1651)

📌 Modify the server response in `server/index.ts` if needed.  
💡 Want to see how the frontend talks to the backend? Check out `src/components/ChatInput.tsx`.

---

## 🤝 Contribution Guide

1. Follow the steps in repo doc/contribution.md to set things up.
2. Create a new branch:
   ```bash
   git checkout -b RAG-[task-number]
   ```
3. Tack your changes
   ```bash
   git add [your-updated-files]
   ```
4. Push your branch
   ```bash
   git push origin RAG-[task-number]
   ```
5. Open a pull request and fill out the PR template.
