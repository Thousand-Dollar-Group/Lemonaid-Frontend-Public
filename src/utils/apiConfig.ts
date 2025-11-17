const ENV = import.meta.env.VITE_ENV;
const API_HOSTNAME = import.meta.env.VITE_API_HOSTNAME ?? "";
const API_PORT = import.meta.env.VITE_API_PORT ?? "";

export function getApiOrigin(): string {
  if (ENV === "DEV") {
    return window.location.origin;
  }
  return `${API_HOSTNAME}${API_PORT ? `:${API_PORT}` : ""}`;
}
