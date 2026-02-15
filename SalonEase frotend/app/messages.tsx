import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MESSAGES = [
  {
    id: '1',
    salon: 'Bella Rinova',
    message: 'Your appointment is confirmed for Dec 15, 2024 at 2:00 PM. We look forward to seeing you!',
    time: '2 min ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80'
  },
  {
    id: '2',
    salon: 'The Galleria Hair Salon',
    message: 'Thank you for booking with us! Your appointment is today at 8:00 AM. Please arrive 10 minutes early.',
    time: '2 hours ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80'
  },
  {
    id: '3',
    salon: 'Green Apple Spa',
    message: 'We have a special offer on facial treatments this week. Book now and get 20% off!',
    time: '1 day ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400&q=80'
  },
  {
    id: '4',
    salon: 'Style Studio',
    message: 'Your last appointment was amazing! Don\'t forget to leave us a review. Book your next visit today.',
    time: '3 days ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80'
  }
];

export default function MessagesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#1A1D1E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {MESSAGES.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageItem}>
            <Image source={{ uri: message.avatar }} style={styles.avatar} />
            
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.salonName}>{message.salon}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
              
              <Text 
                style={[styles.messageText, message.unread && styles.unreadMessage]} 
                numberOfLines={2}
              >
                {message.message}
              </Text>
            </View>

            {message.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={() => router.push('./appointment')}>
            <View style={styles.actionIcon}>
              <Ionicons name="calendar-outline" size={20} color="#6366F1" />
            </View>
            <Text style={styles.actionText}>Book New Appointment</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={() => router.push('./salon-list')}>
            <View style={styles.actionIcon}>
              <Ionicons name="location-outline" size={20} color="#6366F1" />
            </View>
            <Text style={styles.actionText}>Find Nearby Salons</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={() => router.push('./help-center')}>
            <View style={styles.actionIcon}>
              <Ionicons name="help-circle-outline" size={20} color="#6366F1" />
            </View>
            <Text style={styles.actionText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
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
  messageItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    position: 'relative'
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  messageContent: { flex: 1, marginLeft: 12 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salonName: { fontSize: 16, fontWeight: '600', color: '#1A1D1E' },
  messageTime: { fontSize: 12, color: '#9CA3AF' },
  messageText: { fontSize: 14, color: '#6B7280', marginTop: 4, lineHeight: 20 },
  unreadMessage: { color: '#1A1D1E', fontWeight: '500' },
  unreadDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#6366F1',
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -4
  },
  quickActions: { paddingHorizontal: 20, paddingTop: 20 },
  quickActionsTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 16 },
  actionItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  actionIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#F0F9FF', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 12
  },
  actionText: { flex: 1, fontSize: 16, color: '#1A1D1E', fontWeight: '500' }
});