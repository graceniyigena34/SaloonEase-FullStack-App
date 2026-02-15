import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../src/services/api';
import { bookingService } from '../src/services/booking';
import { authService } from '../src/services/auth';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00'
];

export default function AppointmentScreen() {
  const router = useRouter();
  const { salonId } = useLocalSearchParams();
  const [salon, setSalon] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (!salonId) {
      Alert.alert('Error', 'Please select a salon first');
      router.back();
      return;
    }

    const fetchData = async () => {
      try {
        const salonData = await api.get<any>(`/salons/${salonId}`);
        setSalon(salonData);

        const servicesData = await api.get<any[]>(`/services?salon=${salonId}`);
        setServices(servicesData);
      } catch (error) {
        console.error('Fetch appointment data error:', error);
        Alert.alert('Error', 'Failed to load salon details');
        router.back();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [salonId, router]);


  const handleBooking = async () => {
    const token = await authService.getToken();
    if (!token) {
      Alert.alert('Authentication Required', 'Please log in to book an appointment.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Login', onPress: () => router.push('/') }
      ]);
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      Alert.alert('Error', 'Please select a service and time');
      return;
    }

    setBookingLoading(true);
    try {
      await bookingService.createBooking({
        service: selectedService._id,
        salon: salon._id,
        date: selectedDate,
        time: selectedTime,
        notes: "Booking via mobile app"
      });

      router.push('/booking-confirmation');
    } catch (error: any) {
      Alert.alert('Booking Failed', error.message || 'Could not complete booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const getNext14Days = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        full: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  };

  const dates = getNext14Days();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Salon Info */}
        <View style={styles.salonInfo}>
          <Text style={styles.salonName}>{salon?.name || 'Salon'}</Text>
          <Text style={styles.salonAddress}>
            {typeof salon?.address === 'string'
              ? salon.address
              : `${salon?.address?.street ? salon.address.street + ', ' : ''}${salon?.address?.city || ''}, ${salon?.address?.state || ''}`}
          </Text>
        </View>

        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          {services.length === 0 ? (
            <Text style={styles.emptyText}>No services available.</Text>
          ) : (
            services.map((service) => (
              <TouchableOpacity
                key={service._id}
                style={[
                  styles.serviceItem,
                  selectedService?._id === service._id && styles.selectedServiceItem
                ]}
                onPress={() => setSelectedService(service)}
              >
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDuration}>{service.duration} min</Text>
                </View>
                <Text style={styles.servicePrice}>${service.price}</Text>
                {selectedService?._id === service._id && (
                  <Ionicons name="checkmark-circle" size={20} color="#6366F1" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroller}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date.full}
                style={[
                  styles.dateCard,
                  selectedDate === date.full && styles.selectedDateCard
                ]}
                onPress={() => setSelectedDate(date.full)}
              >
                <Text style={[styles.dayName, selectedDate === date.full && styles.selectedDateText]}>
                  {date.dayName}
                </Text>
                <Text style={[styles.dayNum, selectedDate === date.full && styles.selectedDateText]}>
                  {date.dayNum}
                </Text>
                <Text style={[styles.monthName, selectedDate === date.full && styles.selectedDateText]}>
                  {date.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Booking Summary */}
        {selectedService && (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service:</Text>
              <Text style={styles.summaryValue}>{selectedService.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>{selectedService.duration} min</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>{selectedDate}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>{selectedTime || 'Not selected'}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${selectedService.price}</Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Book Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedService || !selectedTime || bookingLoading) && styles.disabledButton
          ]}
          onPress={handleBooking}
          disabled={!selectedService || !selectedTime || bookingLoading}
        >
          {bookingLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.bookButtonText}>
              Confirm Booking {selectedService ? `$${selectedService.price}` : ''}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1D1E' },
  salonInfo: { paddingHorizontal: 20, marginBottom: 20 },
  salonName: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E' },
  salonAddress: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 16 },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 12,
    position: 'relative'
  },
  selectedServiceItem: { borderColor: '#6366F1', backgroundColor: '#F0F9FF' },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: '600', color: '#1A1D1E' },
  serviceDuration: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  servicePrice: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  checkIcon: { position: 'absolute', top: 8, right: 8 },
  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 10 },
  dateContainer: { marginTop: 8 },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12
  },
  dateText: { fontSize: 16, color: '#1A1D1E', marginLeft: 12 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center'
  },
  selectedTimeSlot: { borderColor: '#6366F1', backgroundColor: '#6366F1' },
  timeText: { fontSize: 14, color: '#1A1D1E', fontWeight: '500' },
  selectedTimeText: { color: '#FFFFFF' },
  summary: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 20
  },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, color: '#1A1D1E', fontWeight: '500' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 12, marginTop: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A1D1E' },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  dateScroller: { marginBottom: 10 },
  dateCard: {
    width: 65,
    height: 90,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedDateCard: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  dayName: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  dayNum: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 2 },
  monthName: { fontSize: 12, color: '#6B7280' },
  selectedDateText: { color: '#FFFFFF' },
  bottomBar: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF'
  },
  bookButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    height: 56,
    justifyContent: 'center'
  },
  disabledButton: { backgroundColor: '#9CA3AF' },
  bookButtonText: { fontSize: 16, color: '#FFFFFF', fontWeight: '600' }
});