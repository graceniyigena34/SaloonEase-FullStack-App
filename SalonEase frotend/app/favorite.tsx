import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = ['All', 'Haircuts', 'Make up', 'Massage', 'Skincare'];

const FAVOURITES = [
  { id: '1', name: 'Green Apple', address: '8502 Preston Rd. Inglewood, M...', distance: '22 km', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' },
  { id: '2', name: 'Bella Rinova', address: '8502 Preston Rd. Inglewood, M...', distance: '22 km', image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80' },
  { id: '3', name: 'The Galleria', address: '4140 Parker Rd. Allentown, New...', distance: '48 km', image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80' },
  { id: '4', name: 'Michael Saldana', address: '3891 Ranchview Dr. Richardson...', distance: '89 km', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80' },
];

export default function FavouriteScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState(FAVOURITES);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardAddress} numberOfLines={1}>{item.address}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={14} color="#6366F1" />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={styles.heartButton}
              onPress={() => removeFavorite(item.id)}
            >
              <Ionicons name="heart" size={16} color="#FF4D4F" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#1A1D1E" />
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCategory(cat)}
              style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
            >
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 15, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1D1E' },
  categoryList: { paddingHorizontal: 25, paddingVertical: 10, gap: 10 },
  categoryBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F9FAFB' },
  categoryBtnActive: { backgroundColor: '#1A1D1E' },
  categoryText: { color: '#9CA3AF', fontSize: 14, fontWeight: '500' },
  categoryTextActive: { color: '#FFFFFF' },
  listContainer: { paddingHorizontal: 25, paddingTop: 10 },
  card: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  cardImage: { width: 85, height: 85, borderRadius: 15 },
  cardInfo: { flex: 1, marginLeft: 15 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#1A1D1E' },
  cardAddress: { fontSize: 13, color: '#9CA3AF', marginTop: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  distanceText: { fontSize: 12, color: '#1A1D1E', marginLeft: 4, fontWeight: '500' },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heartButton: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: '#F2F4F7', justifyContent: 'center', alignItems: 'center' },
  bookButton: { backgroundColor: '#6366F1', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 8 },
  bookText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
});