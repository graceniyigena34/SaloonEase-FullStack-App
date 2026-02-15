import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { bookingService } from '../src/services/booking';

export default function PaymentHistoryScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getUserBookings();
        setBookings(data);
      } catch (error) {
        console.error('Fetch payments/bookings error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const isCompleted = item.status === 'completed' || item.status === 'confirmed';
    const isPending = item.status === 'pending';
    const isCancelled = item.status === 'cancelled';

    const bg = isCompleted ? '#DCFCE7' : isPending ? '#FEF3C7' : '#FEE2E2';
    const text = isCompleted ? '#166534' : isPending ? '#92400E' : '#991B1B';

    const color = isCompleted ? '#10B981' : isPending ? '#F59E0B' : '#EF4444';
    const icon = item.service?.category === 'Hair' ? 'content-cut' :
      item.service?.category === 'Spa' ? 'spa' :
        item.service?.category === 'Nails' ? 'hand-wash' : 'lipstick';

    return (
      <TouchableOpacity style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
          <MaterialCommunityIcons name={icon as any} size={24} color={color} />
        </View>

        <View style={styles.info}>
          <Text style={styles.salonName}>{item.salon?.name || 'Salon'}</Text>
          <Text style={styles.serviceText}>{item.service?.name || 'Service'}</Text>
          <Text style={styles.dateText}>{item.date} • {item.time}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>${item.service?.price || '0.00'}</Text>
          <View style={[styles.statusBadge, { backgroundColor: bg }]}>
            <Text style={[styles.statusText, { color: text }]}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking History</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" color="#6366F1" /></View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <View style={styles.summaryCard}>
              <View>
                <Text style={styles.summaryLabel}>Total Bookings</Text>
                <Text style={styles.summaryValue}>{bookings.length}</Text>
              </View>
              <Ionicons name="receipt-outline" size={32} color="rgba(255,255,255,0.4)" />
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: '#9CA3AF' }}>No bookings found.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  backBtn: { padding: 4 },
  listContent: { paddingHorizontal: 20 },
  summaryCard: {
    backgroundColor: '#6366F1',
    padding: 24,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  summaryLabel: { color: '#E0E7FF', fontSize: 14 },
  summaryValue: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  iconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1, marginLeft: 15 },
  salonName: { fontSize: 16, fontWeight: 'bold' },
  serviceText: { color: '#6B7280', fontSize: 13 },
  dateText: { color: '#9CA3AF', fontSize: 12 },
  priceContainer: { alignItems: 'flex-end' },
  priceText: { fontWeight: 'bold', fontSize: 16 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' }
});