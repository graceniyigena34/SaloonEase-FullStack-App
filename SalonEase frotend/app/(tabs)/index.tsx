import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '../../components/Header/Header';
import { AppointmentCard } from '../../components/Appointment/AppointmentCard';
import { ServiceList } from '../../components/Services/Servicelist';
import { SalonCard } from '../../components/salon/SalonCard';
import { api } from '../../src/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const [salons, setSalons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const data = await api.get<any[]>('/salons');
        setSalons(data);
      } catch (error: any) {
        console.error('Fetch salons error:', error);
        Alert.alert('Connection Error', 'Could not load salons. Please check your network and ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* 1. Header Section */}
          <Header />

          {/* 2. Appointment Banner - Navigates to Booking */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/appointment')}
            style={styles.appointmentWrapper}
          >
            <AppointmentCard />
          </TouchableOpacity>

          {/* 3. Services Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity onPress={() => router.push('/services')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ServiceList />

          {/* 4. Nearest Salon Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearest salon</Text>
            <TouchableOpacity onPress={() => router.push('/salon-list')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listPadding}>
            {loading ? (
              <ActivityIndicator size="small" color="#6366F1" />
            ) : (
              salons.map((salon) => (
                <TouchableOpacity
                  key={salon._id}
                  onPress={() => router.push({ pathname: '/salon-detail', params: { id: salon._id } })}
                  style={{ marginBottom: 15 }}
                >
                  <SalonCard
                    name={salon.name}
                    address={salon.address}
                    rating={salon.rating || "4.8"}
                    dist="5"
                    image={{ uri: salon.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' }}
                  />
                  <View style={styles.quickBookRow}>
                    <TouchableOpacity
                      style={styles.quickBookBtn}
                      onPress={() => router.push({ pathname: '/appointment', params: { salonId: salon._id } })}
                    >
                      <Ionicons name="flash" size={14} color="#FFF" />
                      <Text style={styles.quickBookText}>Quick Book</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
            {salons.length === 0 && !loading && (
              <Text style={{ textAlign: 'center', color: '#999', marginTop: 10 }}>No salons found nearby.</Text>
            )}
          </View>

          <View style={styles.bottomSpacer} />

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  appointmentWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  viewAll: {
    color: '#A0A0A0',
    fontSize: 12
  },
  listPadding: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  bottomSpacer: {
    height: 120,
  },
  quickBookRow: {
    position: 'absolute',
    bottom: 25,
    right: 15,
  },
  quickBookBtn: {
    backgroundColor: '#6366F1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  quickBookText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  }
});