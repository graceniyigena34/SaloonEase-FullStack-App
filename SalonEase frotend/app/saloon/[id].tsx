import React from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, TouchableOpacity,
  Dimensions, FlatList, Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Data for Specialists from your image
const SPECIALISTS = [
  { id: '1', name: 'Lily', role: 'Hair Stylist', image: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Lee', role: 'Sr. Barber', image: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Connor', role: 'Makeup Artist', image: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Jaxon', role: 'Hair Stylist', image: 'https://i.pravatar.cc/150?u=4' },
];

export default function SalonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Access the ID from the URL

  return (
    <View style={styles.container}>
      {/* Background Image Header */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000' }} 
        style={styles.headerImage} 
      />
      
      {/* Navigation Layer */}
      <SafeAreaView style={styles.topNav}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#1E1E2D" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Ionicons name="heart-outline" size={22} color="#1E1E2D" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentCard}>
          {/* Title Section */}
          <View style={styles.titleRow}>
            <Text style={styles.salonName}>Bella Rinova</Text>
            <View style={styles.openBadge}>
              <Text style={styles.openText}>Open</Text>
            </View>
          </View>
          
          <Text style={styles.locationSub}>6391 Elgin St. Celina, Delaware 10299</Text>
          
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4].map(i => <FontAwesome key={i} name="star" size={16} color="#FFA500" />)}
            <FontAwesome name="star-o" size={16} color="#FFA500" />
            <Text style={styles.reviewText}> (76 Reviews)</Text>
          </View>

          {/* Quick Action Icons */}
          <View style={styles.quickActions}>
            <ActionIcon icon="globe-outline" label="Website" />
            <ActionIcon icon="call-outline" label="Call" />
            <ActionIcon icon="location-outline" label="Direction" />
            <ActionIcon icon="share-social-outline" label="Share" />
          </View>

          {/* Specialists Row */}
          <Text style={styles.sectionHeader}>Salon specialists</Text>
          <FlatList
            horizontal
            data={SPECIALISTS}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.specialistCard}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <Text style={styles.specName}>{item.name}</Text>
                <Text style={styles.specRole}>{item.role}</Text>
              </View>
            )}
          />

          {/* Tab Navigation Menu */}
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.activeTab}><Text style={styles.activeTabText}>About</Text></TouchableOpacity>
            <Text style={styles.inactiveTab}>Services</Text>
            <Text style={styles.inactiveTab}>Package</Text>
            <Text style={styles.inactiveTab}>Gallery</Text>
          </View>

          <Text style={styles.aboutText}>
            Ace Hair salon is located in Houston, Virginia was formed in 2003. Opened with the premise of exceptional service for a fair price. Good ... <Text style={styles.readMore}>Readmore</Text>
          </Text>

          {/* Opening Hours Section */}
          <Text style={styles.sectionHeader}>Opening Hours</Text>
          <View style={styles.hourRow}><Text style={styles.day}>Monday - Friday:</Text><Text style={styles.time}>8:30 am - 9:30 pm</Text></View>
          <View style={styles.hourRow}><Text style={styles.day}>Saturday - Sunday:</Text><Text style={styles.time}>9:00 am - 1:00 pm</Text></View>

          {/* Placeholder Map (Styled like image) */}
          <Text style={styles.sectionHeader}>Address</Text>
          <View style={styles.mapBox}>
             <Image 
               source={{ uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800' }} 
               style={styles.mapPlaceholder} 
             />
             <View style={styles.pin}><Ionicons name="location" size={30} color="#6C63FF" /></View>
          </View>

          {/* Bottom Button */}
          <TouchableOpacity style={styles.directionBtn}>
            <Ionicons name="navigate" size={20} color="#FFF" style={{marginRight: 10}} />
            <Text style={styles.directionText}>Get directions - 8 km</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const ActionIcon = ({ icon, label }: { icon: any, label: string }) => (
  <View style={styles.actionItem}>
    <Ionicons name={icon} size={24} color="#2D2D43" />
    <Text style={styles.actionLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  headerImage: { width: '100%', height: 350, position: 'absolute' },
  topNav: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  navBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
  scrollContainer: { flex: 1, marginTop: 280 },
  scrollContent: { paddingBottom: 50 },
  contentCard: { backgroundColor: '#FFF', borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 25 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salonName: { fontSize: 24, fontWeight: 'bold', color: '#1E1E2D' },
  openBadge: { backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },
  openText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  locationSub: { color: '#A0A0A0', fontSize: 13, marginTop: 5, marginBottom: 10 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  reviewText: { color: '#A0A0A0', fontSize: 13, marginLeft: 5 },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  actionItem: { alignItems: 'center' },
  actionLabel: { fontSize: 12, color: '#A0A0A0', marginTop: 8 },
  sectionHeader: { fontSize: 17, fontWeight: '700', color: '#1E1E2D', marginVertical: 15 },
  specialistCard: { marginRight: 20, alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 8 },
  specName: { fontWeight: '600', color: '#1E1E2D' },
  specRole: { fontSize: 11, color: '#A0A0A0' },
  tabs: { flexDirection: 'row', alignItems: 'center', marginTop: 25, marginBottom: 15 },
  activeTab: { backgroundColor: '#1E1E2D', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25 },
  activeTabText: { color: '#FFF', fontWeight: 'bold' },
  inactiveTab: { color: '#D0D0D0', marginHorizontal: 15, fontWeight: '600' },
  aboutText: { color: '#707070', lineHeight: 22 },
  readMore: { color: '#6C63FF', fontWeight: 'bold' },
  hourRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  day: { color: '#A0A0A0' },
  time: { fontWeight: '600', color: '#1E1E2D' },
  mapBox: { height: 180, borderRadius: 20, overflow: 'hidden', marginVertical: 15, position: 'relative' },
  mapPlaceholder: { width: '100%', height: '100%' },
  pin: { position: 'absolute', alignSelf: 'center', top: '40%' },
  directionBtn: { backgroundColor: '#6C63FF', height: 60, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  directionText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});