import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// 1. Import the router
import { useRouter } from 'expo-router';

export default function PaymentTab() {
  // 2. Initialize the router
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="credit-card-outline" size={100} color="#2D2D43" />
        </View>

        <Text style={styles.message}>
          You don't have any payment method. Add now.
        </Text>

        <TouchableOpacity 
          style={styles.addBtn}
          // 3. Update the route path to your Add Card screen
          onPress={() => router.push('/payment/add-card')} 
        >
          <Text style={styles.addBtnText}>Add New</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ... styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    paddingHorizontal: 25, 
    paddingVertical: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2D2D43' },
  content: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 40 
  },
  iconContainer: { marginBottom: 30 },
  message: { 
    fontSize: 16, 
    color: '#2D2D43', 
    textAlign: 'center', 
    marginBottom: 40,
    lineHeight: 24 
  },
  addBtn: { 
    backgroundColor: '#6C63FF', 
    paddingVertical: 18, 
    borderRadius: 20, 
    width: '100%', 
    alignItems: 'center' 
  },
  addBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});