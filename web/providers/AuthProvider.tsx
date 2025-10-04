import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRequest } from "./RequestProvider";
import { makeRequest, MakeRequestError } from "./Request";

type AuthContextType = {
  username: string;
  setUsername: (name: string) => void;

  userId?: string;           // uuid-like string
  token: string;             // access token
  refreshToken?: string;     // refresh token

  loggedIn: boolean;

  login: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string, email: string) => Promise<boolean>;
  logout: () => void;

  refreshAccessToken?: () => Promise<void>; // optional for later
};


interface JwtUserId {
  refresh: string;
  access: string;
  userId?: string; //uuid like string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState<string | undefined>(); // UUID based string
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const loggedIn = !!token;

  const handleAuthResponse = async (
    promise: Promise<JwtUserId>,
    action: "login" | "signup"
  ): Promise<boolean> => {
    try {
      const data = await promise;
      console.log(`RWC ${action} success`, data);

      setToken(data.access);
      setRefreshToken(data.refresh);
      setUserId(data.userId);

      return true;
    } catch (err) {
      console.error(`${action} error:`, err);

      if (err instanceof MakeRequestError) {
        console.log(`RWC catch Error ${err.status}: ${err.statusText}`);
      } else {
        console.log(`RWC catch Network Error ${err.message}`);
      }

      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log("RWC login makePostRequest");
    return handleAuthResponse(
      makeRequest<JwtUserId>("/api/accounts/token/", {
        method: "POST",
        body: { username, password },
      }),
      "login"
    );
  };

  const signUp = async (username: string, password: string, email: string): Promise<boolean> => {
    console.log("RWC signUp makePostRequest");
    return handleAuthResponse(
      makeRequest<JwtUserId>("/api/accounts/register/", {
        method: "POST",
        body: { username, password, email },
      }),
      "signup"
    );
  };

  const logout = () => {
    console.log("RWC logout ");
        setUsername("");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        userId,
        token,
        refreshToken,
        loggedIn,
        login,
        signUp,
        logout,
        refreshAccessToken: undefined, // wire in later
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 normal useAuth (throws if no provider)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


// 🔹 safe variant (returns undefined instead of throwing)
export const useSafeAuth = () => {
  return useContext(AuthContext); // may be undefined
};