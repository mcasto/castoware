import wretch from "wretch";
import type { Wretch } from "wretch";

interface ApiOptions {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  payload?: Record<string, unknown>;
  useAuth?: boolean;
  token?:string
}

// Generic function with proper typing
export default async function api<T = unknown>({
  path,
  method,
  payload,
  useAuth = false,
  token
}: ApiOptions): Promise<T> {
  // Initialize the base request
  let request: Wretch = wretch("/api");

  if(useAuth){
    request.auth(`Bearer ${token}`)
  }

  // Handle GET vs. other methods
  if (method === "get" && payload) {
    // Append payload to path for GET (e.g., /api/test/1)
    const payloadValue = Object.values(payload).shift();
    const url = `${path}/${payloadValue}`;
    request = request.url(url);
  } else {
    // For non-GET methods, use payload as the body
    request = request.url(path);

    if (payload) {
      request = request.json(payload); // Set JSON body
    }
  }

  // Execute the request - remove the type annotation or use the correct type
  const response = await request[method]();

  return response
    .error(422, (error) => {
      // You can handle 422 errors specifically here
      const validationError = {
        message: 'Validation failed',
        details: error.json
      };
      throw validationError;
    })
    .json() as Promise<T>;
}
