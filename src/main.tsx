import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import HomeLayout from "./layout/HomeLayout";
import ChatLayout from "./layout/ChatLayout";
import { ChatbotProvider } from "./context/ChatbotContext";
import { BrowserProvider } from "./context/BrowserContext";
import { AuthProvider } from "./context/AuthContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ChatbotProvider>
          <BrowserProvider>
            <App />
          </BrowserProvider>
        </ChatbotProvider>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <HomeLayout /> },
      { path: "chat", element: <ChatLayout /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);