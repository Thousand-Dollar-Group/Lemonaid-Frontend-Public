import * as Models from "../models";
import { getApiOrigin } from "../utils/apiConfig";

// Define the function with async keyword and proper arguments
export async function postChatbot(
  formData: FormData
): Promise<Models.ChatbotRes> {
  const apiOrigin = getApiOrigin();
  const response = await fetch(`${apiOrigin}/api/chatbot`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res || "Failed to fetch");
  }

  // Await the JSON parsing and return the result
  return await response.json();
}

export async function postBackground(
  records: Models.Record[]
): Promise<string> {
  const apiOrigin = getApiOrigin();
  try {
    const bgRes = await fetch(`${apiOrigin}/api/background`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(records),
    });
    const bgData = await bgRes.json();
    if (bgRes.ok) return bgData.results || "";
    else return "";
  } catch (err) {
    console.error("Background update failed:", err);
    return "";
  }
}
