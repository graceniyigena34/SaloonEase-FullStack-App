import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Using MaterialCommunityIcons as you did
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'; 

export const AppointmentCard = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Appointment</Text>
      <Text style={styles.timeLabel}>Today, Morning</Text>
    </View>
    
    {/* The Purple Banner */}
    <View style={styles.banner}>
      <View style={styles.bannerContent}>
        {/* Added the white icon container found in the image */}
        <View style={styles.iconContainer}>
          <Icon name="calendar-month" size={18} color="#6C63FF" />
        </View>
        <Text style={styles.bannerText}>At The Galleria Hair Salon</Text>
      </View>
      
      {/* Time display */}
      <Text style={styles.time}>9:00 AM</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 20, 
    marginVertical: 15 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 12 
  },
  title: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#2D2D53' // Deepened slightly to match the "Hi, Jenny" color
  },
  timeLabel: { 
    color: '#A0A0A0', 
    fontSize: 12 // Made smaller to match screenshot
  },
  banner: { 
    backgroundColor: '#6C63FF', 
    padding: 14, 
    borderRadius: 20, // More rounded like the image
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  bannerContent: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconContainer: {
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  bannerText: { 
    color: '#fff', 
    fontWeight: '500',
    fontSize: 14
  },
  time: { 
    color: '#fff', 
    fontWeight: '600',
    fontSize: 14,
    opacity: 0.9 // Slight transparency for the time to match UI
  }
});