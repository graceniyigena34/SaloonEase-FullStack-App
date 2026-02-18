import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../config';

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

const TOKEN_KEY = 'auth_token';

/**
 * Generic API handler
 */
export const api = {
    get: async <T>(endpoint: string, token?: string): Promise<T> => {
        return request<T>(endpoint, 'GET', undefined, token);
    },

    post: async <T>(endpoint: string, body: unknown, token?: string): Promise<T> => {
        return request<T>(endpoint, 'POST', body, token);
    },

    put: async <T>(endpoint: string, body: unknown, token?: string): Promise<T> => {
        return request<T>(endpoint, 'PUT', body, token);
    },

    delete: async <T>(endpoint: string, token?: string): Promise<T> => {
        return request<T>(endpoint, 'DELETE', undefined, token);
    },
};

async function request<T>(
    endpoint: string,
    method: string,
    body?: unknown,
    token?: string
): Promise<T> {
    const headers: HeadersInit = {
        ...CONFIG.HEADERS,
    };

    // Auto-include token from storage if not provided
    // Using AsyncStorage directly to avoid circular dependency with authService
    const authToken = token || await AsyncStorage.getItem(TOKEN_KEY);

    if (authToken) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(`${CONFIG.API_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle structured validation errors from Zod
            if (data.errors && data.errors.fieldErrors) {
                const fieldErrors = data.errors.fieldErrors;
                const errorMessages = Object.keys(fieldErrors)
                    .map(field => `${field}: ${fieldErrors[field].join(', ')}`)
                    .join('\n');
                throw new Error(errorMessages);
            }
            throw new Error(data.message || data.error || 'API Request Failed');
        }

        return data as T;
    } catch (error: any) {
        console.error(`API Error (${method} ${endpoint}):`, error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        throw error;
    }
}
