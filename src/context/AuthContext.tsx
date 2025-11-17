import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import * as Models from "../models/index";
import { login, logout } from "../services/authApi";

interface AuthContextType {
  user: Models.UserInfo | null;
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<Models.UserInfo | null>;
  handleLoginAuth: () => void;
  getUserInfo: () => Promise<Models.UserInfo | null>;
  handleLogout: () => void;
  MessageCount: number;
  isLimitReached: boolean;
  setLimitReached: (value: boolean) => void;
  incrementMessageCount: () => void;
  checkMessageLimit: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.UserInfo | null>(null);
  const [MessageCount, setMessageCount] = useState(0);
  const [isLimitReached, setLimitReached] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const MESSAGE_LIMIT = 10;

  const handleLoginAuth = () => {
    const cognitoDomain =
      "https://us-west-1aton6ffsb.auth.us-west-1.amazoncognito.com";
    const clientId = "3nhoedgj4ir3n3heauvdng0sje";
    // const redirectUri = "https://o49zyk22if.execute-api.us-west-1.amazonaws.com/dev/auth/callback";
    const redirectUri = "http://localhost:8000/auth/callback";
    const scope = "openid email profile";

    const loginUrl =
      `${cognitoDomain}/oauth2/authorize` +
      `?identity_provider=Google` +
      `&client_id=${clientId}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
    const authWindow = window.open(loginUrl, "GoogleLogin", windowFeatures);

    if (!authWindow) {
      console.error("Popup was blocked by the browser.");
      return Promise.reject(new Error("Popup blocked"));
    }

    return new Promise<void>((resolve, _reject) => {
      const checkInterval = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkInterval);
          console.log("Popup closed, refreshing parent window...");
          window.location.reload();
          resolve();
        }
      }, 500);
    });
  };

  const checkAuthStatus = async (): Promise<Models.UserInfo | null> => {
    try {
      const loginRes = await login();
      const userData: Models.UserInfo = {
        user_id: loginRes.user_id,
        username: loginRes.username,
        email: loginRes.email,
      };
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      console.log("User not authenticated:", error);
      setUser(null);
      return null;
    }
  };

  const getUserInfo = async (): Promise<Models.UserInfo> => {
    try {
      const loginRes = await login();
      const userData: Models.UserInfo = {
        user_id: loginRes.user_id,
        username: loginRes.username,
        email: loginRes.email,
      };
      setUser(userData);
      console.log(userData);
      return userData;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        throw new Error(`Login failed: ${error.message}`);
      } else {
        console.error("Login failed:", String(error));
        throw new Error("Login failed: 404");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();

      setUser(null);
      setMessageCount(0);
      setLimitReached(false);
      setIsAuthenticated(false);

      return res;
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      throw error;
    }
  };

  const incrementMessageCount = () => {
    setMessageCount((prevCount) => prevCount + 1);
  };

  const checkMessageLimit = (): boolean => {
    const isLimit = MessageCount >= MESSAGE_LIMIT;
    if (isLimit && !isLimitReached) {
      setLimitReached(true);
    }
    return isLimit;
  };

  // {console.log("AuthProvider: MessageCount =", MessageCount, "isLimitReached =", isLimitReached)} Debugging line to trace state changes

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    isAuthenticated,
    checkAuthStatus,
    handleLoginAuth,
    getUserInfo,
    handleLogout,
    MessageCount,
    isLimitReached,
    setLimitReached,
    incrementMessageCount,
    checkMessageLimit,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
