import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DATA = [
  { id: '1', unread: true, title: 'Your appointment at Bella Rinova is confirmed for Dec 15, 2024 at 2:00 PM', time: 'Just now', type: 'booking' },
  { id: '2', unread: true, title: 'You have an appointment at The Galleria Hair Salon at 8:00am today', time: '2 hours ago', type: 'appointment' },
  { id: '3', unread: false, title: 'Your password is successfully changed', time: '2 hours ago', type: 'security' },
  { id: '4', unread: false, title: 'Completed your profile to be better health consults.', link: 'Complete Profile', time: '3 days ago', type: 'profile' },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [dnd, setDnd] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={22} color="#1A1D1E" /></TouchableOpacity>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.subText}>Mark all as read</Text>
        <View style={styles.row}>
          <Text style={styles.subText}>Do not disturb</Text>
          <Switch value={dnd} onValueChange={setDnd} trackColor={{ false: '#F2F4F7', true: '#6366F1' }} />
        </View>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.notifItem}
            onPress={() => {
              if (item.type === 'booking' || item.type === 'appointment') {
                router.push('./messages');
              } else if (item.type === 'profile') {
                router.push('./profile-completion');
              }
            }}
          >
            <View style={[styles.dot, { backgroundColor: item.unread ? '#6366F1' : '#D1D5DB' }]} />
            <View style={styles.textContent}>
              <Text style={styles.notifTitle}>
                {item.title} {item.link && <Text style={styles.linkText}>{item.link}</Text>}
              </Text>
              <Text style={styles.notifTime}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#1A1D1E' },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginTop: 25, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F2F4F7' },
  subText: { color: '#98A2B3', fontSize: 13 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notifItem: { flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 20 },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 6, marginRight: 15 },
  textContent: { flex: 1 },
  notifTitle: { fontSize: 14, color: '#344054', lineHeight: 20 },
  linkText: { color: '#6366F1', fontWeight: '600' },
  notifTime: { fontSize: 12, color: '#98A2B3', marginTop: 6 }
});