import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { salonService, Salon } from '../src/services/salon';

export default function SalonListScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const data = await salonService.getSalons();
        setSalons(data);
      } catch (error) {
        console.error('Fetch salons error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  const renderSalonCard = ({ item }: { item: Salon }) => (
    <TouchableOpacity
      style={styles.salonCard}
      onPress={() => router.push({ pathname: '/salon-detail', params: { id: item._id } })}
    >
      <Image
        source={{ uri: item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' }}
        style={styles.salonImage}
      />

      <View style={styles.salonInfo}>
        <View style={styles.salonHeader}>
          <Text style={styles.salonName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating || '4.8'}</Text>
          </View>
        </View>

        <Text style={styles.address} numberOfLines={1}>
          {`${item.address.street ? item.address.street + ', ' : ''}${item.address.city}, ${item.address.state}`}
        </Text>

        <View style={styles.salonFooter}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={14} color="#6366F1" />
            <Text style={styles.distance}>5 km</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text style={styles.openTime}>9:00 AM - 8:00 PM</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton} onPress={() => console.log('Call:', item.phone)}>
            <Ionicons name="call-outline" size={16} color="#6366F1" />
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => router.push({ pathname: '/appointment', params: { salonId: item._id } })}
          >
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Salons</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color="#1A1D1E" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['All', 'Hair', 'Spa', 'Nails'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.filterButtonActive]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={salons}
          renderItem={renderSalonCard}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: '#9CA3AF' }}>No salons found.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1D1E' },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB'
  },
  filterButtonActive: { backgroundColor: '#6366F1' },
  filterText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF' },
  listContainer: { paddingHorizontal: 20 },
  salonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden'
  },
  salonImage: { width: '100%', height: 180 },
  salonInfo: { padding: 16 },
  salonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salonName: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', flex: 1 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 14, fontWeight: '600', color: '#1A1D1E', marginLeft: 4 },
  address: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  servicesContainer: { flexDirection: 'row', marginTop: 12, gap: 8 },
  serviceTag: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  serviceText: { fontSize: 12, color: '#0369A1', fontWeight: '500' },
  salonFooter: { marginTop: 12, gap: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  distance: { fontSize: 12, color: '#6366F1', marginLeft: 4, fontWeight: '500' },
  openTime: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#059669', marginTop: 4 },
  actionButtons: { flexDirection: 'row', marginTop: 16, gap: 12 },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#6366F1',
    borderRadius: 8
  },
  callText: { fontSize: 14, color: '#6366F1', fontWeight: '600', marginLeft: 4 },
  bookButton: {
    flex: 1,
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  bookText: { fontSize: 14, color: '#FFFFFF', fontWeight: '600' }
});