import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/build/Ionicons';

export default function EnableLocation() {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        {/* Illustration - Replace with your local asset */}
        <View style={styles.imageContainer}>
             <Ionicons name="location-sharp" size={80} color="#6C63FF" />
        </View>

        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.subtitle}>
          We need to know your location in order to suggest nearby services.
        </Text>

        <TouchableOpacity 
          style={styles.enableButton} 
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.buttonText}>Enable</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.notNowButton} 
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.notNowText}>Not now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#F0EFFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
  },
  enableButton: {
    backgroundColor: '#6C63FF',
    width: '100%',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  notNowButton: {
    padding: 10,
  },
  notNowText: {
    color: '#A0A0A0',
    fontWeight: '600',
  },
});