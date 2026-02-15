import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SERVICES = [
  { id: '1', name: 'Regular haircut', price: '$5.00', time: '1023 Booked' },
  { id: '2', name: 'Undercut', price: '$6.00', time: '756 Booked' },
  { id: '3', name: 'Classic shaving', price: '$3.12', time: '300 Booked' },
];

export default function SelectService() {
  const router = useRouter();
  const { id, name, image, address, selectedDate, time } = useLocalSearchParams();
  const [selected, setSelected] = useState('1');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Service</Text>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} /></TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 20 }}>
        {SERVICES.map(service => (
          <TouchableOpacity 
            key={service.id} 
            style={[styles.card, selected === service.id && styles.activeCard]}
            onPress={() => setSelected(service.id)}
          >
            <View style={styles.left}>
               <View style={styles.imgPlaceholder} />
               <View>
                 <Text style={styles.name}>{service.name}</Text>
                 <Text style={styles.booked}>{service.time}</Text>
                 <Text style={styles.price}>{service.price}</Text>
               </View>
            </View>
            <View style={[styles.radio, selected === service.id && styles.radioActive]}>
              {selected === service.id && <Ionicons name="checkmark" color="#FFF" size={12} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.doneBtn} 
          onPress={() => router.push({
            pathname: '/Appointment/checkout',
            params: { id, name, image, address, selectedDate, time }
          })}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 25, paddingTop: 60 },
  title: { fontSize: 20, fontWeight: 'bold' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#F8F8F8', borderRadius: 20, marginBottom: 15 },
  activeCard: { borderWidth: 2, borderColor: '#6C63FF', backgroundColor: '#FFF' },
  left: { flexDirection: 'row', alignItems: 'center' },
  imgPlaceholder: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#E0E0E0', marginRight: 15 },
  name: { fontWeight: 'bold', fontSize: 15 },
  booked: { fontSize: 12, color: '#A0A0A0', marginVertical: 2 },
  price: { color: '#6C63FF', fontWeight: 'bold' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  radioActive: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  footer: { padding: 20 },
  doneBtn: { backgroundColor: '#6C63FF', padding: 18, borderRadius: 15, alignItems: 'center' },
  doneText: { color: '#FFF', fontWeight: 'bold' }
});