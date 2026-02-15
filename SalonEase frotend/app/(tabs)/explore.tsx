import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Data remains the same
const CATEGORIES = [
  { id: '1', name: 'Hair Cut', icon: '✂️', color: '#FF6B6B' },
  { id: '2', name: 'Makeup', icon: '💄', color: '#4ECDC4' },
  { id: '3', name: 'Massage', icon: '💆', color: '#45B7D1' },
  { id: '4', name: 'Skincare', icon: '🧴', color: '#96CEB4' },
  { id: '5', name: 'Nails', icon: '💅', color: '#FFEAA7' },
  { id: '6', name: 'Spa', icon: '🛁', color: '#DDA0DD' }
];

const TRENDING_SALONS = [
  { id: '1', name: 'Bella Rinova', rating: '4.8', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80', services: 'Hair, Makeup, Spa' },
  { id: '2', name: 'The Galleria', rating: '4.9', image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80', services: 'Full Service' },
  { id: '3', name: 'Green Apple', rating: '4.7', image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80', services: 'Skincare, Massage' }
];

const NEARBY_SALONS = [
  { id: '1', name: 'Style Studio', distance: '0.5 km', rating: '4.6', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80' },
  { id: '2', name: 'Beauty Hub', distance: '1.2 km', rating: '4.8', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80' },
  { id: '3', name: 'Glamour Zone', distance: '2.1 km', rating: '4.5', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80' }
];

export default function ExploreScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  // Fixed Trending Salon Render
  const renderTrendingSalon = ({ item }: any) => (
    <TouchableOpacity style={styles.trendingCard}>
      <Image source={{ uri: item.image }} style={styles.trendingImage} />
      <View style={styles.trendingInfo}>
        <Text style={styles.trendingName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.trendingServices} numberOfLines={1}>{item.services}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={24} color="#1A1D1E" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search salons, services..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories - FIX: Use a View with FlexWrap instead of nested FlatList */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {CATEGORIES.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.categoryCard, { backgroundColor: item.color + '15' }]}
              >
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Salons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Salons</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
          </View>
          <FlatList
            data={TRENDING_SALONS}
            renderItem={renderTrendingSalon}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
          />
        </View>

        {/* Nearby Salons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Salons</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
          </View>
          
          {NEARBY_SALONS.map((salon) => (
            <TouchableOpacity key={salon.id} style={styles.nearbyCard}>
              <Image source={{ uri: salon.image }} style={styles.nearbyImage} />
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyName}>{salon.name}</Text>
                <View style={styles.nearbyDetails}>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color="#6366F1" />
                    <Text style={styles.distanceText}>{salon.distance}</Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{salon.rating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookText}>Book</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1D1E' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1A1D1E' },
  section: { marginBottom: 25, paddingHorizontal: 20 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 15
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E' },
  viewAll: { color: '#6366F1', fontSize: 14, fontWeight: '500' },
  
  // FIX: Flex container for Categories
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%', // Three columns
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 16,
  },
  categoryIcon: { fontSize: 28, marginBottom: 8 },
  categoryName: { fontSize: 13, fontWeight: '600', color: '#1F2937' },

  trendingList: { paddingRight: 20 },
  trendingCard: { 
    width: 180, 
    marginRight: 15, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden' 
  },
  trendingImage: { width: '100%', height: 110 },
  trendingInfo: { padding: 12 },
  trendingName: { fontSize: 15, fontWeight: 'bold', color: '#1A1D1E' },
  trendingServices: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingText: { fontSize: 12, color: '#1A1D1E', marginLeft: 4, fontWeight: '600' },

  nearbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F9FAFB'
  },
  nearbyImage: { width: 65, height: 65, borderRadius: 12 },
  nearbyInfo: { flex: 1, marginLeft: 15 },
  nearbyName: { fontSize: 16, fontWeight: 'bold', color: '#1A1D1E' },
  nearbyDetails: { flexDirection: 'row', marginTop: 5, gap: 15 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  distanceText: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  bookButton: { 
    backgroundColor: '#6366F1', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 10 
  },
  bookText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }
});