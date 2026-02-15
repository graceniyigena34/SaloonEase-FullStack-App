import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SERVICE_CATEGORIES = ['All', 'Hair', 'Makeup', 'Skincare', 'Nails', 'Spa'];

const SERVICES = [
  {
    id: '1',
    name: 'Hair Cut & Styling',
    category: 'Hair',
    price: '$45-65',
    duration: '45-60 min',
    description: 'Professional haircut with styling. Includes consultation, wash, cut, and blow-dry.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    popular: true
  },
  {
    id: '2',
    name: 'Hair Coloring',
    category: 'Hair',
    price: '$85-150',
    duration: '90-120 min',
    description: 'Full hair coloring service including highlights, lowlights, and color correction.',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
    popular: true
  },
  {
    id: '3',
    name: 'Professional Makeup',
    category: 'Makeup',
    price: '$65-120',
    duration: '60-90 min',
    description: 'Complete makeup application for special events, weddings, or photo shoots.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
    popular: false
  },
  {
    id: '4',
    name: 'Facial Treatment',
    category: 'Skincare',
    price: '$80-150',
    duration: '75-90 min',
    description: 'Deep cleansing facial with exfoliation, extraction, and moisturizing treatment.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    popular: true
  },
  {
    id: '5',
    name: 'Manicure & Pedicure',
    category: 'Nails',
    price: '$35-55',
    duration: '45-60 min',
    description: 'Complete nail care including shaping, cuticle care, and polish application.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    popular: false
  },
  {
    id: '6',
    name: 'Relaxing Massage',
    category: 'Spa',
    price: '$90-180',
    duration: '60-90 min',
    description: 'Full body relaxing massage to relieve stress and muscle tension.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    popular: true
  },
  {
    id: '7',
    name: 'Eyebrow Shaping',
    category: 'Makeup',
    price: '$25-40',
    duration: '30 min',
    description: 'Professional eyebrow shaping and tinting for perfect brow definition.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    popular: false
  },
  {
    id: '8',
    name: 'Hair Treatment',
    category: 'Hair',
    price: '$55-85',
    duration: '45-60 min',
    description: 'Deep conditioning treatment to restore hair health and shine.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    popular: false
  },
  {
    id: '9',
    name: 'Bridal Makeup',
    category: 'Makeup',
    price: '$150-250',
    duration: '120 min',
    description: 'Complete bridal makeup package with trial session and wedding day application.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    popular: true
  },
  {
    id: '10',
    name: 'Hair Extensions',
    category: 'Hair',
    price: '$200-400',
    duration: '180 min',
    description: 'Premium hair extensions application for length and volume enhancement.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    popular: false
  },
  {
    id: '11',
    name: 'Anti-Aging Facial',
    category: 'Skincare',
    price: '$120-200',
    duration: '90 min',
    description: 'Advanced anti-aging facial with collagen treatment and LED therapy.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    popular: true
  },
  {
    id: '12',
    name: 'Gel Nail Art',
    category: 'Nails',
    price: '$45-75',
    duration: '60 min',
    description: 'Creative gel nail art with custom designs and long-lasting finish.',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80',
    popular: false
  },
  {
    id: '13',
    name: 'Hot Stone Massage',
    category: 'Spa',
    price: '$120-200',
    duration: '90 min',
    description: 'Therapeutic hot stone massage for deep muscle relaxation and stress relief.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    popular: true
  },
  {
    id: '14',
    name: 'Keratin Treatment',
    category: 'Hair',
    price: '$180-300',
    duration: '150 min',
    description: 'Professional keratin treatment for smooth, frizz-free hair that lasts months.',
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80',
    popular: false
  },
  {
    id: '15',
    name: 'Microdermabrasion',
    category: 'Skincare',
    price: '$100-160',
    duration: '60 min',
    description: 'Advanced microdermabrasion treatment for skin resurfacing and rejuvenation.',
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
    popular: false
  },
  {
    id: '16',
    name: 'Aromatherapy Spa',
    category: 'Spa',
    price: '$150-250',
    duration: '120 min',
    description: 'Complete aromatherapy spa experience with essential oils and relaxation therapy.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    popular: true
  }
];

export default function ServicesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredServices = SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('./appointment')}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      
      {item.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Popular</Text>
        </View>
      )}

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.serviceDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.duration}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.price}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={() => router.push('./appointment')}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Services</Text>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Ionicons name={showSearch ? "close" : "search-outline"} size={24} color="#1A1D1E" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      )}

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoryContainer}
      >
        {SERVICE_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.activeCategoryText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        renderItem={renderServiceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.servicesList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1D1E'
  },
  categoryContainer: { paddingHorizontal: 20, paddingVertical: 15, gap: 12 },
  categoryButton: { 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 20, 
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  activeCategoryButton: { backgroundColor: '#6366F1', borderColor: '#6366F1' },
  categoryText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  activeCategoryText: { color: '#FFFFFF' },
  servicesList: { paddingHorizontal: 20, paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  serviceCard: { 
    width: '48%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
    position: 'relative'
  },
  serviceImage: { width: '100%', height: 120 },
  popularBadge: { 
    position: 'absolute', 
    top: 8, 
    right: 8, 
    backgroundColor: '#EF4444', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12 
  },
  popularText: { fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' },
  serviceInfo: { padding: 12 },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 4 },
  serviceDescription: { fontSize: 12, color: '#6B7280', lineHeight: 16, marginBottom: 8 },
  serviceDetails: { marginBottom: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  detailText: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  bookButton: { 
    backgroundColor: '#6366F1', 
    paddingVertical: 8, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  bookButtonText: { fontSize: 12, color: '#FFFFFF', fontWeight: '600' }
});