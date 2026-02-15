import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const ACTION_ITEMS = [
  { id: 'call', icon: 'call', label: 'Call' },
  { id: 'message', icon: 'chatbubble', label: 'Message' },
  { id: 'direction', icon: 'navigate', label: 'Direction' },
  { id: 'share', icon: 'share', label: 'Share' },
];

const SPECIALISTS = [
  { id: '1', name: 'Lily', role: 'Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { id: '2', name: 'Lee', role: 'Sr. Barber', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: '3', name: 'Connor', role: 'Makeup Artist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
];

const SERVICES = [
  { id: '1', name: 'Hair cuts', count: 8 },
  { id: '2', name: 'Beard & mustache', count: 3 },
  { id: '3', name: 'Face cleaning', count: 5 },
];

export default function SalonDetail() {
  const router = useRouter();
  const { id, name, image, address } = useLocalSearchParams();

  const handleActionPress = (actionId: string) => {
    console.log(`Action pressed: ${actionId}`);
  };

  const handleBooking = () => {
    router.push({
      pathname: '/Appointment/[id]',
      params: { 
        id: Array.isArray(id) ? id[0] : id, 
        name: Array.isArray(name) ? name[0] : name, 
        image: Array.isArray(image) ? image[0] : image, 
        address: Array.isArray(address) ? address[0] : address 
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Salon Image */}
        <Image
          source={{
            uri: (Array.isArray(image) ? image[0] : image) || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
          }}
          style={styles.salonImage}
        />

        {/* Salon Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View>
              <Text style={styles.salonName}>{(Array.isArray(name) ? name[0] : name) || 'Bella Rinova'}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4].map((i) => (
                  <Ionicons key={i} name="star" size={14} color="#FFB800" />
                ))}
                <Ionicons name="star-outline" size={14} color="#FFB800" />
                <Text style={styles.reviewCount}> (75 Reviews)</Text>
              </View>
            </View>
            <View style={styles.openBadge}>
              <Text style={styles.openText}>Open</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsRow}>
            {ACTION_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.actionButton}
                onPress={() => handleActionPress(item.id)}
              >
                <Ionicons name={item.icon as any} size={22} color="#6C63FF" />
                <Text style={styles.actionLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Salon Specialists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salon specialists</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialistsList}
          >
            {SPECIALISTS.map((specialist) => (
              <View key={specialist.id} style={styles.specialistCard}>
                <Image source={{ uri: specialist.image }} style={styles.specialistImage} />
                <Text style={styles.specialistName}>{specialist.name}</Text>
                <Text style={styles.specialistRole}>{specialist.role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.servicesHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Feather name="filter" size={18} color="#A0A0A0" />
              <Text style={styles.filterText}>Filters</Text>
            </TouchableOpacity>
          </View>

          {SERVICES.map((service) => (
            <View key={service.id}>
              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() =>
                  router.push({
                    pathname: '/saloon/service/[id]',
                    params: {
                      id: service.id,
                      name: service.name,
                      salonId: Array.isArray(id) ? id[0] : id,
                      salonName: Array.isArray(name) ? name[0] : name,
                      salonImage: Array.isArray(image) ? image[0] : image,
                    },
                  })
                }
              >
                <View style={styles.serviceLeft}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                </View>
                <View style={styles.serviceRight}>
                  <Text style={styles.serviceCount}>{service.count} types</Text>
                  <Ionicons name={'chevron-forward'} size={20} color="#A0A0A0" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About us</Text>
          <Text style={styles.aboutText}>
            Axe Hair salon is located in Houston, Virginia was formed in 2003. Opened with the premise of exceptional service for a fair price. We are committed to delivering the highest quality in hair care and customer satisfaction. Our team of experienced stylists is dedicated to making you look and feel your best.
          </Text>
        </View>

        {/* Opening Hours Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opening Hours</Text>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Monday - Friday</Text>
            <Text style={styles.timeText}>8:30 am - 9:30 pm</Text>
          </View>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Saturday</Text>
            <Text style={styles.timeText}>9:00 am - 1:00 pm</Text>
          </View>
          <View style={styles.hourRow}>
            <Text style={styles.dayText}>Sunday</Text>
            <Text style={styles.timeText}>Closed</Text>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <TouchableOpacity style={styles.contactRow}>
            <Ionicons name="call" size={18} color="#6C63FF" />
            <Text style={styles.contactText}>(555) 123-4567</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactRow}>
            <Ionicons name="mail" size={18} color="#6C63FF" />
            <Text style={styles.contactText}>info@bellarinova.com</Text>
          </TouchableOpacity>
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.addressText}>
            {(Array.isArray(address) ? address[0] : address) || '8502 Preston Rd. Inglewood, CA 90305'}
          </Text>
          <Image
            source={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-118.3580,34.0195,12,0/400x200@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example' }}
            style={styles.mapImage}
          />
          <TouchableOpacity style={styles.directionsButton}>
            <Ionicons name="navigate" size={18} color="#FFF" />
            <Text style={styles.directionsText}>Get directions - 4 km</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Book Now Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>BOOK NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingBottom: 100 },
  headerWrapper: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 10 : 15, zIndex: 10 },
  backButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  favoriteButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  salonImage: { width: '100%', height: 280 },
  infoCard: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 25, paddingTop: 25, marginTop: -32 },
  infoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  salonName: { fontSize: 24, fontWeight: 'bold', color: '#1E1E2D', marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  reviewCount: { fontSize: 12, color: '#A0A0A0', marginLeft: 4 },
  openBadge: { backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  openText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  actionButtonsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  actionButton: { alignItems: 'center' },
  actionLabel: { fontSize: 12, color: '#1E1E2D', marginTop: 8, fontWeight: '500' },
  section: { paddingHorizontal: 25, marginTop: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E1E2D', marginBottom: 15 },
  specialistsList: { paddingRight: 20 },
  specialistCard: { alignItems: 'center', marginRight: 20 },
  specialistImage: { width: 70, height: 70, borderRadius: 35, marginBottom: 8 },
  specialistName: { fontSize: 14, fontWeight: '600', color: '#1E1E2D' },
  specialistRole: { fontSize: 12, color: '#A0A0A0', marginTop: 2 },
  servicesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  filterButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, gap: 4 },
  filterText: { fontSize: 12, color: '#A0A0A0', fontWeight: '500' },
  serviceItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  serviceLeft: { flex: 1 },
  serviceName: { fontSize: 15, fontWeight: '500', color: '#1E1E2D' },
  serviceRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  serviceCount: { fontSize: 13, color: '#A0A0A0' },
  serviceDetails: { paddingVertical: 12, paddingHorizontal: 12, backgroundColor: '#F8F8F8', borderRadius: 8, marginBottom: 8 },
  serviceDetailText: { fontSize: 13, color: '#666', fontStyle: 'italic' },
  aboutText: { fontSize: 14, color: '#6C757D', lineHeight: 20, marginBottom: 10 },
  hourRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  dayText: { fontSize: 14, color: '#1E1E2D', fontWeight: '500' },
  timeText: { fontSize: 14, color: '#A0A0A0' },
  contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingVertical: 8 },
  contactText: { marginLeft: 12, fontSize: 14, color: '#6C63FF', fontWeight: '500' },
  addressText: { fontSize: 14, color: '#6C757D', lineHeight: 20, marginBottom: 12 },
  mapImage: { width: '100%', height: 150, borderRadius: 12, marginBottom: 12 },
  directionsButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6C63FF', paddingVertical: 12, borderRadius: 10 },
  directionsText: { color: '#FFF', fontWeight: '600', marginLeft: 8 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 25, paddingVertical: 20, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  bookButton: { backgroundColor: '#6C63FF', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  bookButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});