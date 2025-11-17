import * as Models from "../models";
import { getApiOrigin } from "../utils/apiConfig";

// get/userInfo
export async function login(): Promise<Models.UserInfo> {
  const apiOrigin = getApiOrigin();
  const response = await fetch(`${apiOrigin}/auth/user`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res || "Failed to get login info");
  }
  return await response.json();
}

// get/userInfo
export async function logout(): Promise<Models.UserInfo> {
  const apiOrigin = getApiOrigin();
  const response = await fetch(`${apiOrigin}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res || "Failed to get login info");
  }
  return await response.json();
}
