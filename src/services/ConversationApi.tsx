import * as Models from "../models";
import { getApiOrigin } from "../utils/apiConfig";

// post/conversation
export async function postConversation(
  title: string
): Promise<Models.PostConversationResponse> {
  const apiOrigin = getApiOrigin();
  const requestBody = { title: title };

  const response = await fetch(`${apiOrigin}/api/conversation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
    credentials: "include",
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res || "Failed to create new conversation");
  }
  return await response.json();
}

// get/conversation
export async function getConversation(): Promise<Models.GetConversationsResponse> {
  const apiOrigin = getApiOrigin();
  const response = await fetch(`${apiOrigin}/api/conversation`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res || "Failed to fetch conversation list");
  }
  return await response.json();
}

// post/conversation/id/messages
export async function postMessages(
  conversationId: string,
  request: Models.PostMessageReq
): Promise<Models.PostMessagesResponse> {
  const apiOrigin = getApiOrigin();
  const response = await fetch(
    `${apiOrigin}/api/conversation/${conversationId}/messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(
      res || `Failed to post message array to conversation ${conversationId}`
    );
  }
  return await response.json();
}

// post/conversation/id/message
export async function postMessage(
  conversationId: string,
  request: Models.ConversationMessage
): Promise<Models.PostMessagesResponse> {
  const apiOrigin = getApiOrigin();

  console.log(request);
  const response = await fetch(
    `${apiOrigin}/api/conversation/${conversationId}/message`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(
      res || `Failed to post message to conversation ${conversationId}`
    );
  }
  return await response.json();
}

// get/conversation/id
export async function getMessages(
  conversationId: string
): Promise<Models.GetMessagesResponse> {
  const apiOrigin = getApiOrigin();
  const response = await fetch(
    `${apiOrigin}/api/conversation/${conversationId}/messages`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(
      res || `Failed to fetch messages for conversation ${conversationId}`
    );
  }
  return await response.json();
}

// post /conversation/{conversation_id}/attachments/upload-urls

export async function postAttachmentsForURLs(
  conversationId: string,
  files: File[]
): Promise<Models.PostAttachmentsURLRes> {
  let attachments: Models.PostAttachmentsURLReq = {
    files: [],
  };

  for (const file of files) {
    const attachment: Models.PostAttachmentURLType = {
      file_size: file.size,
      file_type: file.type,
      filename: file.name,
    };
    attachments.files.push(attachment);
  }

  // const formData = new FormData();
  // const jsonPayload = JSON.stringify(attachments);
  // formData.append("request", jsonPayload);

  const apiOrigin = getApiOrigin();
  const response = await fetch(
    `${apiOrigin}/api/conversation/${conversationId}/attachments/upload-urls`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(attachments),
    }
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(
      res || `Failed to get upload urls for attachments ${conversationId}`
    );
  }
  return await response.json();
}
