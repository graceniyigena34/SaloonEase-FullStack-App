import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Hero Image */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' }}
          style={styles.heroImage}
        />

        {/* Content */}
        <View style={styles.content}>
          
          {/* Company Info */}
          <View style={styles.section}>
            <Text style={styles.companyName}>SalonEase</Text>
            <Text style={styles.tagline}>Your Beauty, Our Priority</Text>
            
            <Text style={styles.description}>
              SalonEase is your premier destination for discovering and booking the finest beauty services. 
              We connect you with top-rated salons and beauty professionals in your area, making it easier 
              than ever to look and feel your best.
            </Text>
          </View>

          {/* Mission */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.sectionText}>
              To revolutionize the beauty industry by providing a seamless platform that connects 
              beauty enthusiasts with exceptional salons and professionals, ensuring every appointment 
              is a step towards confidence and self-expression.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What We Offer</Text>
            
            <View style={styles.featureItem}>
              <Ionicons name="calendar-outline" size={20} color="#6366F1" />
              <Text style={styles.featureText}>Easy online booking system</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="location-outline" size={20} color="#6366F1" />
              <Text style={styles.featureText}>Find salons near you</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="star-outline" size={20} color="#6366F1" />
              <Text style={styles.featureText}>Verified reviews and ratings</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="heart-outline" size={20} color="#6366F1" />
              <Text style={styles.featureText}>Save your favorite salons</Text>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={18} color="#6B7280" />
              <Text style={styles.contactText}>support@salonease.com</Text>
            </View>
            
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={18} color="#6B7280" />
              <Text style={styles.contactText}>1-800-SALON-EASE</Text>
            </View>
            
            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={18} color="#6B7280" />
              <Text style={styles.contactText}>123 Beauty Street, Style City, SC 12345</Text>
            </View>
          </View>

          {/* Version */}
          <View style={styles.versionSection}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.copyrightText}>© 2024 SalonEase. All rights reserved.</Text>
          </View>

        </View>
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
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1D1E' },
  heroImage: { width: '100%', height: 200, resizeMode: 'cover' },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  section: { marginTop: 25 },
  companyName: { fontSize: 28, fontWeight: 'bold', color: '#1A1D1E', textAlign: 'center' },
  tagline: { fontSize: 16, color: '#6366F1', textAlign: 'center', marginTop: 5, fontStyle: 'italic' },
  description: { fontSize: 16, color: '#4B5563', lineHeight: 24, marginTop: 15, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 12 },
  sectionText: { fontSize: 16, color: '#4B5563', lineHeight: 24 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  featureText: { fontSize: 16, color: '#4B5563', marginLeft: 12 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  contactText: { fontSize: 16, color: '#4B5563', marginLeft: 10 },
  versionSection: { marginTop: 30, alignItems: 'center', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  versionText: { fontSize: 14, color: '#9CA3AF' },
  copyrightText: { fontSize: 12, color: '#9CA3AF', marginTop: 5 }
});