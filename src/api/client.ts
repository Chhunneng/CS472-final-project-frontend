const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000"

interface ValidationError {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}

interface ApiError {
  error: string;
  details?: ValidationError[];
}

export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export async function post<T>(endpoint: string, data: object): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json() as ApiError;
    throw errorData;
  }

  return response.json() as Promise<T>
}

export async function put<T>(endpoint: string, data: object): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json() as ApiError;
    throw errorData;
  }

  return response.json() as Promise<T>
}

export async function del(endpoint: string): Promise<void> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }
}
