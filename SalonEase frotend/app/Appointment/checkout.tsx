import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const PAYMENT_METHODS = [
  { id: 'paypal', label: 'Jenny Wilson', icon: 'paypal', type: 'fa' },
  { id: 'mastercard', label: '**** **** **** 8295', icon: 'cc-mastercard', type: 'fa' },
  { id: 'visa', label: '**** **** **** 5445', icon: 'cc-visa', type: 'fa' },
];

export default function CheckoutScreen() {
  const { name, image, address, selectedDate } = useLocalSearchParams();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('paypal');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Salon Header Card */}
        <View style={styles.salonCard}>
          <Image source={{ uri: image as string }} style={styles.salonThumb} />
          <View style={styles.salonInfo}>
            <Text style={styles.salonName}>{name || 'Salon Name'}</Text>
            <Text style={styles.salonAddress}>{address || '8502 Preston Rd. Inglewood, M...'}</Text>
            <View style={styles.statsRow}>
              {[1, 2, 3, 4].map((i) => (
                <Ionicons key={i} name="star" size={14} color="#FFB800" />
              ))}
              <Ionicons name="star-outline" size={14} color="#FFB800" />
              <Text style={styles.distText}>  📍 22 km</Text>
            </View>
          </View>
        </View>

        {/* Services Section */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.serviceItem}>
          <View style={styles.serviceLeft}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100' }} style={styles.serviceIcon} />
            <Text style={styles.serviceName}>Regular haircut</Text>
          </View>
          <Text style={styles.servicePrice}>$5.00</Text>
        </View>
        <View style={styles.serviceItem}>
          <View style={styles.serviceLeft}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1621605815840-2094895642ce?w=100' }} style={styles.serviceIcon} />
            <Text style={styles.serviceName}>Classic shaving</Text>
          </View>
          <Text style={styles.servicePrice}>$3.12</Text>
        </View>

        {/* Date & Time Summary */}
        <View style={styles.dateTimeRow}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <Text style={styles.dateTimeValue}>{selectedDate || '12'} September, 12:00</Text>
        </View>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity 
            key={method.id}
            style={[styles.paymentCard, selectedPayment === method.id && styles.activePaymentCard]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <View style={styles.paymentLeft}>
              <FontAwesome name={method.icon as any} size={24} color={method.id === 'paypal' ? '#003087' : '#1A1A1A'} />
              <Text style={styles.paymentLabel}>{method.label}</Text>
            </View>
            <View style={[styles.radio, selectedPayment === method.id && styles.radioSelected]}>
              {selectedPayment === method.id && <Ionicons name="checkmark" size={12} color="#FFF" />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        
        {/* UPDATED: Navigates to Success Page */}
        <TouchableOpacity 
          style={styles.payBtn} 
          onPress={() => router.push("/Appointment/success")}
        >
          <Text style={styles.payBtnText}>Continue</Text>
          <Text style={styles.payAmount}>$8.12</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 25 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#2D2D43' },
  content: { paddingHorizontal: 25 },
  salonCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  salonThumb: { width: 80, height: 80, borderRadius: 20 },
  salonInfo: { marginLeft: 15, flex: 1 },
  salonName: { fontSize: 18, fontWeight: 'bold' },
  salonAddress: { fontSize: 12, color: '#A0A0A0', marginVertical: 4 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  distText: { fontSize: 12, color: '#2D2D43', fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 20 },
  serviceItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  serviceLeft: { flexDirection: 'row', alignItems: 'center' },
  serviceIcon: { width: 35, height: 35, borderRadius: 10, marginRight: 12 },
  serviceName: { fontSize: 14, color: '#2D2D43', fontWeight: '500' },
  servicePrice: { fontSize: 14, fontWeight: 'bold', color: '#6C63FF' },
  dateTimeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateTimeValue: { fontSize: 14, color: '#6C63FF', fontWeight: '600' },
  paymentCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 20, 
    backgroundColor: '#F8F8F8', 
    marginBottom: 12 
  },
  activePaymentCard: { borderWidth: 1.5, borderColor: '#6C63FF', backgroundColor: '#FFF' },
  paymentLeft: { flexDirection: 'row', alignItems: 'center' },
  paymentLabel: { marginLeft: 15, fontSize: 14, color: '#A0A0A0' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  radioSelected: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  footer: { flexDirection: 'row', padding: 25, justifyContent: 'space-between', alignItems: 'center' },
  backText: { color: '#A0A0A0', fontWeight: 'bold', fontSize: 16 },
  payBtn: { 
    backgroundColor: '#6C63FF', 
    flexDirection: 'row', 
    paddingHorizontal: 30, 
    paddingVertical: 18, 
    borderRadius: 20, 
    minWidth: 220, 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  payBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  payAmount: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});