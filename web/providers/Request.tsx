import React, { createContext, useContext, ReactNode } from "react";
import { useSafeAuth } from "./AuthProvider"; // <-- assume you already have this

const PORT = 8443;
const BASE_URL = '192.168.0.200';
// -------------------------
// Error Class
// -------------------------
export class MakeRequestError extends Error {
    status: number;
    statusText: string;
    responseBody: any;

    constructor(message: string, status: number, statusText: string, responseBody?: any) {
        super(message);
        this.name = "MakeRequestError";
        this.status = status;
        this.statusText = statusText;
        this.responseBody = responseBody;
    }
}

// -------------------------
// Types
// -------------------------
type RequestBody = Record<string, any> | string | FormData | Blob | ArrayBuffer;

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: RequestBody;
    query?: Record<string, string | number | boolean>; // 👈 new query object
    token?: string; // the jwtoken to use 
    baseUrl?: string; // 👈 allow overriding base URL
    port?: number;    // 👈 allow overriding port
}

type RequestFn = <T>(path: string, options?: RequestOptions) => Promise<T>;

export const makeRequest: RequestFn = async <T,>(
    path: string,
    options: RequestOptions = {}
): Promise<T> => {
    console.log("RWC makeRequest");

    const {
        body,
        headers,
        query,
        baseUrl = BASE_URL,  // default base URL
        port = PORT,         // default port
        protocol = "https",  // ✅ added: allow choosing "http" or "https"
        ...rest
    } = options;

    // Build full URL
    const url = new URL(`${protocol}://${baseUrl}:${port}${path}`); // ✅ changed: use protocol variable

    if (query) {
        console.log("RWC makeRequest queries", query);

        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const init: RequestInit = {
        ...rest,
        headers: {
            ...(headers || {}),
        },
    };

    // Attach token if present
    if (options.token) {
        console.log("RWC makeRequest with token");
        (init.headers as Record<string, string>)["Authorization"] = `Bearer ${options.token}`;
    }

    // Handle body + content-type
    if (body !== undefined) {
        if (
            typeof body === "object" &&
            !(body instanceof FormData) &&
            !(body instanceof Blob) &&
            !(body instanceof ArrayBuffer)
        ) {
            init.body = JSON.stringify(body);
            (init.headers as Record<string, string>)["Content-Type"] = "application/json";
        } else {
            init.body = body as any;
        }
    }

    // Make the request
    let response: Response;
    try {
        response = await fetch(url.toString(), init);   // ✅ wrapped in try/catch
    } catch (err) {
        console.error("RWC fetch threw an error");
        console.error("RWC url:", url.toString());
        console.error("RWC init:", init);
        console.error("RWC error:", err);
        throw err; // rethrow so caller can still handle it
    }

    const contentType = response.headers.get("Content-Type") || "";
    let responseBody: any;

    if (contentType.includes("application/json")) {
        responseBody = await response.json();
    } else if (contentType.startsWith("text/")) {
        responseBody = await response.text();
    } else {
        responseBody = await response.arrayBuffer(); // fallback
    }

    if (!response.ok) {
        console.log(`RWC MakeRequestError ${response.status} - ${response.statusText}`);
        console.log(`RWC url ${String(url)} - body ${String(init.body)}`);
        throw new MakeRequestError(
            `${response.status} - ${response.statusText}`,
            response.status,
            response.statusText,
            responseBody
        );
    }

    return responseBody as T;
};

