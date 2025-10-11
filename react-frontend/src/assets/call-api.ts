// utils/call-api.ts
import wretch from "wretch";
import type { Wretch } from "wretch";

interface ApiOptions {
    path: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    payload?: Record<string, unknown>;
    useAuth?: boolean;
}

// Import the store
import { useUserStore } from "../stores/UserStore";

// Generic function with proper typing
export default async function api<T = unknown>({
    path,
    method,
    payload,
    useAuth = false,
}: ApiOptions): Promise<T> {
    // Initialize the base request
    let request: Wretch = wretch("/api");

    if (useAuth) {
        // Get token directly from the store state
        const token = useUserStore.getState().token;
        if (token) {
            request = request.auth(`Bearer ${token}`);
        }
    }

    // Handle GET vs. other methods
    if (method === "get" && payload) {
        const payloadValue = Object.values(payload).shift();
        const url = `${path}/${payloadValue}`;
        request = request.url(url);
    } else {
        request = request.url(path);
        if (payload) {
            request = request.json(payload);
        }
    }

    // Execute the request and return JSON
    const response = await request[method]().json() as T;
    return response;
}
