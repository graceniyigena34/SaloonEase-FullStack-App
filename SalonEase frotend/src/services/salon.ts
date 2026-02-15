import { api } from './api';

export interface Salon {
    _id: string;
    name: string;
    description?: string;
    address: {
        street?: string;
        city: string;
        state: string;
        zipCode?: string;
    };
    phone: string;
    email: string;
    images: string[];
    rating: number;
    openingHours: {
        day: string;
        open: string;
        close: string;
    }[];
}

export const salonService = {
    getSalons: async (): Promise<Salon[]> => {
        return api.get('/salons');
    },

    getSalonById: async (id: string): Promise<Salon> => {
        return api.get(`/salons/${id}`);
    }
};
