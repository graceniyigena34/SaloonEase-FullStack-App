import { api } from './api';

export interface BookingPayload {
    service: string; // Service ID
    salon: string;   // Salon ID
    date: string;    // ISO Date
    time: string;    // Time string
    notes?: string;
}

export const bookingService = {
    createBooking: async (data: BookingPayload): Promise<any> => {
        return api.post('/bookings', data);
    },

    getUserBookings: async (): Promise<any[]> => {
        return api.get('/bookings');
    },

    updateStatus: async (id: string, status: string): Promise<any> => {
        return api.put(`/bookings/${id}/status`, { status });
    }
};
