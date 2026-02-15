import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { authService } from '../src/services/auth';

export default function VerifyPhone() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Registration completed!', [
        { text: 'OK', onPress: () => router.replace('/') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your email!</Text>
      <Text style={styles.subtitle}>A 4 digit security code will be sent to your email address.</Text>
      
      <View style={styles.emailInputRow}>
        <TextInput 
          style={styles.emailInput} 
          placeholder="Enter your email address" 
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleContinue}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Continue'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#A0A0A0', marginVertical: 20 },
  emailInputRow: { marginBottom: 30 },
  emailInput: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12, fontSize: 16 },
  button: { backgroundColor: '#6C63FF', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#A0A0A0' },
  buttonText: { color: '#FFF', fontWeight: '700' }
});