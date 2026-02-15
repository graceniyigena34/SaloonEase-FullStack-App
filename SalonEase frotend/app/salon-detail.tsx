import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../src/services/api';

export default function SalonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState('About');
  const [isFavorite, setIsFavorite] = useState(false);
  const [salon, setSalon] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const salonData = await api.get<any>(`/salons/${id}`);
        setSalon(salonData);

        const servicesData = await api.get<any[]>(`/services?salon=${id}`);
        setServices(servicesData);
      } catch (error) {
        console.error('Fetch salon details error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  if (!salon) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Salon not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const salonImages = salon.images && salon.images.length > 0
    ? salon.images
    : [salon.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'];

  const renderImageItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.galleryImage} />
  );

  const renderServiceItem = ({ item }: { item: any }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDuration}>{item.duration} min</Text>
      </View>
      <Text style={styles.servicePrice}>${item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header with Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: salonImages[0] }} style={styles.heroImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#FF4D4F" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Salon Info */}
        <View style={styles.salonInfo}>
          <View style={styles.salonHeader}>
            <Text style={styles.salonName}>{salon.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.rating}>{salon.rating || '4.8'}</Text>
              <Text style={styles.reviewCount}>({salon.reviewCount || 100} reviews)</Text>
            </View>
          </View>

          <Text style={styles.address}>
            {typeof salon.address === 'string'
              ? salon.address
              : `${salon.address?.street ? salon.address.street + ', ' : ''}${salon.address?.city || ''}, ${salon.address?.state || ''}`}
          </Text>

          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={16} color="#6366F1" />
              <Text style={styles.infoText}>5 km away</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text style={styles.infoText}>9:00 AM - 8:00 PM</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={16} color="#6B7280" />
              <Text style={styles.infoText}>{salon.phone || '+1 (555) 123-4567'}</Text>
            </View>
          </View>
        </View>

        {/* Gallery */}
        {salonImages.length > 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <FlatList
              data={salonImages}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.gallery}
            />
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['About', 'Services', 'Reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'About' && (
            <View>
              <Text style={styles.aboutText}>
                {salon.description || `${salon.name} is a premier beauty salon offering exceptional services. Our experienced team is dedicated to helping you look and feel your best.`}
              </Text>
              <View style={styles.amenities}>
                <Text style={styles.amenitiesTitle}>Amenities</Text>
                <View style={styles.amenityList}>
                  <Text style={styles.amenityItem}>• Free WiFi</Text>
                  <Text style={styles.amenityItem}>• Complimentary Refreshments</Text>
                  <Text style={styles.amenityItem}>• Air Conditioning</Text>
                  <Text style={styles.amenityItem}>• Parking Available</Text>
                </View>
              </View>
            </View>
          )}

          {selectedTab === 'Services' && (
            <View>
              {services.length === 0 ? (
                <Text style={styles.emptyText}>No services available for this salon yet.</Text>
              ) : (
                services.map((service) => (
                  <View key={service._id}>{renderServiceItem({ item: service })}</View>
                ))
              )}
            </View>
          )}

          {selectedTab === 'Reviews' && (
            <Text style={styles.emptyText}>No reviews yet.</Text>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={20} color="#6366F1" />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => router.push({ pathname: '/appointment', params: { salonId: salon._id } })}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { fontSize: 18, color: '#6B7280', marginBottom: 20 },
  backLink: { padding: 12, backgroundColor: '#6366F1', borderRadius: 8 },
  backLinkText: { color: '#FFF', fontWeight: 'bold' },
  heroContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 250 },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  salonInfo: { padding: 20 },
  salonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salonName: { fontSize: 24, fontWeight: 'bold', color: '#1A1D1E', flex: 1 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 16, fontWeight: '600', color: '#1A1D1E', marginLeft: 4 },
  reviewCount: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  address: { fontSize: 16, color: '#6B7280', marginTop: 8 },
  quickInfo: { flexDirection: 'row', marginTop: 16, gap: 20 },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  infoText: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 12 },
  gallery: { gap: 12 },
  galleryImage: { width: 120, height: 90, borderRadius: 12 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#6366F1' },
  tabText: { fontSize: 16, color: '#6B7280', fontWeight: '500' },
  activeTabText: { color: '#6366F1', fontWeight: '600' },
  tabContent: { paddingHorizontal: 20 },
  aboutText: { fontSize: 16, color: '#4B5563', lineHeight: 24 },
  amenities: { marginTop: 20 },
  amenitiesTitle: { fontSize: 16, fontWeight: '600', color: '#1A1D1E', marginBottom: 8 },
  amenityList: { gap: 4 },
  amenityItem: { fontSize: 14, color: '#6B7280' },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: '600', color: '#1A1D1E' },
  serviceDuration: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  servicePrice: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 20 },
  bottomBar: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    gap: 12
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#6366F1',
    borderRadius: 12
  },
  callButtonText: { fontSize: 16, color: '#6366F1', fontWeight: '600', marginLeft: 8 },
  bookButton: {
    flex: 2,
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  bookButtonText: { fontSize: 16, color: '#FFFFFF', fontWeight: '600' }
});