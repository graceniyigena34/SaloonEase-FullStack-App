import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const DATES = [
  { day: 'Su', date: '16' },
  { day: 'Mo', date: '17' },
  { day: 'Tu', date: '18' },
  { day: 'We', date: '19' },
  { day: 'Th', date: '20' },
];

const SPECIALISTS = [
  { id: '1', name: 'Lily', role: 'Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { id: '2', name: 'Lee', role: 'Sr. Barber', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: '3', name: 'Connor', role: 'Makeup Artist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
];

export default function AppointmentDetail() {
  const router = useRouter();
  const { id, name, address, image } = useLocalSearchParams();
  
  const [selectedDate, setSelectedDate] = useState('18');
  const [selectedSpecialist, setSelectedSpecialist] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Section 1: Select Date */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Select Date</Text>
          <TouchableOpacity style={styles.monthSelector}>
            <Text style={styles.monthText}>Feb</Text>
            <Ionicons name="chevron-down" size={14} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateListContainer}>
          {DATES.map((item) => (
            <TouchableOpacity 
              key={item.date} 
              onPress={() => setSelectedDate(item.date)}
              style={[
                styles.dateCard, 
                selectedDate === item.date ? styles.activeDateCard : styles.inactiveDateCard
              ]}
            >
              <Text style={[styles.dateDay, selectedDate === item.date && styles.activeDateText]}>{item.day}</Text>
              <Text style={[styles.dateNumber, selectedDate === item.date && styles.activeDateText]}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section 2: Select Time */}
        <Text style={styles.sectionLabel}>Select Time</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.selectedTimeText}>11:00</Text>
          <View style={styles.rulerWrapper}>
             {/* The Purple Indicator Line */}
            <View style={styles.indicatorContainer}>
               <View style={styles.indicatorLine} />
               <View style={styles.indicatorDot} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rulerTicks}>
              {[...Array(40)].map((_, i) => (
                <View key={i} style={[styles.tick, i % 5 === 0 ? styles.longTick : null]} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Section 3: Select Specialist */}
        <Text style={styles.sectionLabel}>Select specialist</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialistList}>
          {SPECIALISTS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              onPress={() => setSelectedSpecialist(item.id)}
              style={[
                styles.specialistCard, 
                selectedSpecialist === item.id ? styles.activeSpecialistCard : styles.inactiveSpecialistCard
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.specialistImg} />
              <Text style={styles.specialistName}>{item.name}</Text>
              <Text style={styles.specialistRole}>{item.role}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.continueBtn} 
          onPress={() => router.push({
            pathname: "/Appointment/select-service",
            params: { id, name, image, address, selectedDate, time: '11:00' }
          })}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingHorizontal: 25, paddingTop: 10, marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1A3F' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 20 },
  sectionLabel: { fontSize: 18, fontWeight: 'bold', color: '#1A1A3F', marginBottom: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  monthSelector: { flexDirection: 'row', alignItems: 'center' },
  monthText: { fontSize: 14, color: '#A0A0A0', marginRight: 4 },
  dateListContainer: { marginBottom: 35 },
  dateCard: { width: 68, height: 90, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  inactiveDateCard: { backgroundColor: '#FFFFFF' },
  activeDateCard: { borderWidth: 2, borderColor: '#6C63FF', backgroundColor: '#FFFFFF' },
  dateDay: { fontSize: 13, color: '#C0C0C0', marginBottom: 4 },
  dateNumber: { fontSize: 18, fontWeight: 'bold', color: '#1A1A3F' },
  activeDateText: { color: '#6C63FF' },
  timeContainer: { alignItems: 'center', marginBottom: 35 },
  selectedTimeText: { fontSize: 20, fontWeight: 'bold', color: '#6C63FF', marginBottom: 15 },
  rulerWrapper: { height: 60, width: '100%', justifyContent: 'center' },
  indicatorContainer: { position: 'absolute', left: '50%', zIndex: 10, alignItems: 'center' },
  indicatorLine: { width: 2, height: 40, backgroundColor: '#6C63FF' },
  indicatorDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#6C63FF', marginTop: -3 },
  rulerTicks: { alignItems: 'center', paddingHorizontal: '50%' },
  tick: { width: 1, height: 15, backgroundColor: '#E0E0E0', marginRight: 8 },
  longTick: { height: 30, backgroundColor: '#D0D0D0' },
  specialistList: { marginBottom: 20 },
  specialistCard: { width: 115, paddingVertical: 20, borderRadius: 25, alignItems: 'center', marginRight: 15 },
  inactiveSpecialistCard: { backgroundColor: '#F9F9F9' },
  activeSpecialistCard: { borderWidth: 2, borderColor: '#6C63FF', backgroundColor: '#FFFFFF' },
  specialistImg: { width: 55, height: 55, borderRadius: 18, marginBottom: 12 },
  specialistName: { fontSize: 14, fontWeight: 'bold', color: '#1A1A3F', marginBottom: 4 },
  specialistRole: { fontSize: 11, color: '#C0C0C0' },
  footer: { flexDirection: 'row', paddingHorizontal: 25, paddingBottom: 30, justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { padding: 10 },
  backBtnText: { color: '#C0C0C0', fontWeight: 'bold', fontSize: 16 },
  continueBtn: { backgroundColor: '#6C63FF', paddingHorizontal: 25, paddingVertical: 18, borderRadius: 20, flexDirection: 'row', alignItems: 'center', minWidth: 160, justifyContent: 'center' },
  continueBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginRight: 8 }
});