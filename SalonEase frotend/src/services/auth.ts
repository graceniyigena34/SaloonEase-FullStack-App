import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role?: 'customer' | 'owner';
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    message?: string;
    token?: string;
    user?: any;
    otp?: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const authService = {
    register: async (data: RegisterPayload): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/signup', data);
        if (response.token) {
            await AsyncStorage.setItem(TOKEN_KEY, response.token);
            if (response.user) {
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
            }
        }
        return response;
    },

    login: async (data: LoginPayload): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.token) {
            await AsyncStorage.setItem(TOKEN_KEY, response.token);
            if (response.user) {
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
            }
        }
        return response;
    },

    logout: async (): Promise<void> => {
        try {
            await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    getToken: async (): Promise<string | null> => {
        return AsyncStorage.getItem(TOKEN_KEY);
    },

    getUser: async (): Promise<any | null> => {
        const userData = await AsyncStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    sendEmailOtp: async (email: string): Promise<AuthResponse> => {
        return api.post<AuthResponse>('/auth/resend-otp', { email });
    },

    verifyOtp: async (email: string, otp: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/verify-otp', { email, otpEntered: otp });
        if (response.token) {
            await AsyncStorage.setItem(TOKEN_KEY, response.token);
            if (response.user) {
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.user));
            }
        }
        return response;
    }
};
