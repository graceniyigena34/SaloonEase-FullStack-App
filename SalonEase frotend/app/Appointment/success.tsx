import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={60} color="#4CAF50" />
        </View>

        {/* Text Content */}
        <Text style={styles.title}>Your appointment booking is successfully.</Text>
        
        <Text style={styles.subtitle}>
          You can view the appointment booking info in the "Appointment" section.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueBtn} 
            onPress={() => router.replace("/(tabs)/Booking")}
          >
            <Text style={styles.continueText}>Continue Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.appointmentBtn} 
            onPress={() => router.replace("/(tabs)/messages")}
          >
            <Text style={styles.appointmentText}>Go to Messages</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D2D43',
    lineHeight: 30,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  continueBtn: {
    backgroundColor: '#6C63FF',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    width: '100%',
  },
  continueText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  appointmentBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  appointmentText: {
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: 16,
  },
});