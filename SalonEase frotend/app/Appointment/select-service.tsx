import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../src/services/api';

export default function SelectService() {
  const router = useRouter();
  const { id, name, image, address, selectedDate, time } = useLocalSearchParams();
  const [services, setServices] = useState<any[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.get(`/services?salon=${id}`);
      setServices(data);
      if (data.length > 0) setSelected(data[0]._id);
    } catch (error) {
      console.error('Fetch services error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Service</Text>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={24} /></TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      ) : (
        <ScrollView style={{ padding: 20 }}>
          {services.map(service => (
            <TouchableOpacity 
              key={service._id} 
              style={[styles.card, selected === service._id && styles.activeCard]}
              onPress={() => setSelected(service._id)}
            >
              <View style={styles.left}>
                 <View style={styles.imgPlaceholder} />
                 <View>
                   <Text style={styles.name}>{service.name}</Text>
                   <Text style={styles.booked}>{service.duration} min</Text>
                   <Text style={styles.price}>${service.price}</Text>
                 </View>
              </View>
              <View style={[styles.radio, selected === service._id && styles.radioActive]}>
                {selected === service._id && <Ionicons name="checkmark" color="#FFF" size={12} />}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.doneBtn} 
          onPress={() => router.push({
            pathname: '/Appointment/checkout',
            params: { id, name, image, address, selectedDate, time, serviceId: selected, salonId: id }
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