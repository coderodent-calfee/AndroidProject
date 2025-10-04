import React, { createContext, useContext, ReactNode } from "react";
import { useSafeAuth  } from "./AuthProvider"; // <-- assume you already have this
import { makeRequest, RequestOptions } from "./Request";

// -------------------------
// Types
// -------------------------
type RequestBody = Record<string, any> | string | FormData | Blob | ArrayBuffer;

type RequestFn = <T>(path: string, options?: RequestOptions) => Promise<T>;

type RequestHelpers = {
  makeRequest: RequestFn;
  makeGetRequest: <T>(path: string, options?: RequestOptions) => Promise<T>;
  makePostRequest: <T>(path: string, body?: RequestBody, options?: RequestOptions) => Promise<T>;
};

// -------------------------
// Context
// -------------------------
const RequestContext = createContext<RequestHelpers | null>(null);

// -------------------------
// Provider
// -------------------------
export const RequestProvider = ({ children }: { children: ReactNode }) => {
  const auth = useSafeAuth(); // ✅ won’t throw
  const token = auth?.token;

  const makeGetRequest = async <T,>(
    path: string,
    options: RequestOptions = {token}
  ): Promise<T> => {
    console.log("RWC makeGetRequest");

    return makeRequest<T>(path, { ...options, method: "GET" });
  };

  const makePostRequest = async <T,>(
    path: string,
    body?: RequestBody,
    options: RequestOptions = {}
  ): Promise<T> => {
    return makeRequest<T>(path, { ...options, method: "POST", body });
  };

  return (
    <RequestContext.Provider value={{ makeRequest, makeGetRequest, makePostRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

// -------------------------
// Hook
// -------------------------
export function useRequest() {
  const ctx = useContext(RequestContext);
  if (!ctx) {
    throw new Error("useRequest must be used within a RequestProvider");
  }
  return ctx;
}
