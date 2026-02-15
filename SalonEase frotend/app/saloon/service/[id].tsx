import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ServiceDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;
  const serviceName = (params.name as string) || 'Service';
  const salonId = (params.salonId as string) || params.salon || '';
  const salonName = (params.salonName as string) || '';
  const salonImage = (params.salonImage as string) || '';

  // Placeholder data for demonstration
  const details = {
    description:
      'This service includes a full consultation, expert treatment by our professional stylists, and aftercare tips to maintain your look.',
    duration: '45 - 90 mins',
    priceRange: '$20 - $80',
    included: [
      'Consultation',
      'Main service',
      'Styling / Finish',
      'Aftercare tips',
    ],
  };

  const handleBook = () => {
    // Send user to appointment booking with salon and service info
    router.push({
      pathname: '/Appointment/select-service',
      params: {
        id: salonId,
        name: salonName,
        image: salonImage,
        serviceId,
        serviceName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1E1E2D" />
          </TouchableOpacity>
          <Text style={styles.title}>{serviceName}</Text>
          <View style={{ width: 24 }} />
        </View>

        {salonImage ? (
          <Image source={{ uri: salonImage }} style={styles.salonImage} />
        ) : null}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About this service</Text>
          <Text style={styles.text}>{details.description}</Text>

          <View style={styles.row}>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{details.duration}</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Price</Text>
              <Text style={styles.metaValue}>{details.priceRange}</Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 18 }]}>What's included</Text>
          {details.included.map((it) => (
            <View key={it} style={styles.includedItem}>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
              <Text style={styles.includedText}>{it}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
            <Text style={styles.bookBtnText}>Book this service</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 20, paddingBottom: 80 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  title: { fontSize: 18, fontWeight: '700', color: '#1E1E2D' },
  salonImage: { width: '100%', height: 160, borderRadius: 12, marginVertical: 12 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#1E1E2D' },
  text: { color: '#6C757D', lineHeight: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  metaBox: { flex: 1, alignItems: 'center' },
  metaLabel: { color: '#A0A0A0', fontSize: 12 },
  metaValue: { fontWeight: '700', marginTop: 6 },
  includedItem: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  includedText: { marginLeft: 8, color: '#1E1E2D' },
  bookBtn: { marginTop: 20, backgroundColor: '#6C63FF', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  bookBtnText: { color: '#FFF', fontWeight: '700' },
});