import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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

export default function ExploreScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

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

        {/* About Us Card */}
        <View style={styles.aboutCard}>
          <View style={styles.aboutContent}>
            <Text style={styles.aboutLabel}>About Us</Text>
            <Text style={styles.aboutTitle}>Discover the Best Salons</Text>
            <Text style={styles.aboutText}>
              We connect you with top-rated beauty professionals and luxury spas.
            </Text>
            <TouchableOpacity style={styles.learnMoreBtn} onPress={() => router.push('./about')}>
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400' }} 
            style={styles.aboutImage} 
          />
        </View>

        {/* Categories Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {CATEGORIES.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.categoryCard, { backgroundColor: item.color + '15' }]}>
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
            <TouchableOpacity onPress={() => router.push('./favorite')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.trendingList}
          >
            {TRENDING_SALONS.map((item) => (
              <TouchableOpacity key={item.id} style={styles.trendingCard}>
                <Image source={{ uri: item.image }} style={styles.trendingImage} />
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingName}>{item.name}</Text>
                  <Text style={styles.trendingServices}>{item.services}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1D1E' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 20, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 12, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  
  aboutCard: { flexDirection: 'row', backgroundColor: '#6366F1', marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 25, overflow: 'hidden' },
  aboutContent: { flex: 1, zIndex: 1 },
  aboutLabel: { color: '#E0E7FF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  aboutTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  aboutText: { color: '#E0E7FF', fontSize: 12, marginTop: 5, lineHeight: 18 },
  learnMoreBtn: { backgroundColor: '#FFF', alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, marginTop: 15 },
  learnMoreText: { color: '#6366F1', fontSize: 12, fontWeight: 'bold' },
  aboutImage: { width: 100, height: 120, position: 'absolute', right: -10, bottom: -10, opacity: 0.5, borderRadius: 10 },

  section: { marginBottom: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E' },
  categoriesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15 },
  categoryCard: { width: '31%', alignItems: 'center', paddingVertical: 15, marginBottom: 10, borderRadius: 16 },
  categoryIcon: { fontSize: 24, marginBottom: 8 },
  categoryName: { fontSize: 12, fontWeight: '600', color: '#1A1D1E' },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  viewAll: { color: '#6366F1', fontSize: 14, fontWeight: '500' },
  trendingList: { paddingRight: 20 },
  trendingCard: { width: 200, marginRight: 15, backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#F3F4F6', overflow: 'hidden' },
  trendingImage: { width: '100%', height: 110 },
  trendingInfo: { padding: 12 },
  trendingName: { fontSize: 16, fontWeight: 'bold' },
  trendingServices: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  ratingText: { fontSize: 12, marginLeft: 4, fontWeight: '600' }
});