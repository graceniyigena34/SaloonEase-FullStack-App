import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { authService } from '../src/services/auth';

export default function OtpCodeScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  // Refs to automatically move focus to the next box
  const pin1Ref = useRef<TextInput>(null);
  const pin2Ref = useRef<TextInput>(null);
  const pin3Ref = useRef<TextInput>(null);
  const pin4Ref = useRef<TextInput>(null);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      const nextRef = [pin2Ref, pin3Ref, pin4Ref][index];
      nextRef.current?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      Alert.alert('Error', 'Please enter complete OTP code');
      return;
    }

    setLoading(true);
    try {
      const verifyEmail = email || '';
      if (!verifyEmail) {
        throw new Error('Verification email missing. Please try signing up again.');
      }

      const response = await authService.verifyOtp(verifyEmail, otpCode);

      Alert.alert('Success', 'Email verified! Please sign in.');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid OTP code');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await authService.sendEmailOtp(email);
      Alert.alert('Success', 'A new OTP code has been sent to your email.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Verify email</Text>
        <Text style={styles.subtitle}>
          Please enter the 4 digit security code we just sent to your Gmail address:{"\n"}
          <Text style={styles.emailText}>{email || 'your email'}</Text>
        </Text>

        <View style={styles.otpRow}>
          <TextInput
            ref={pin1Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[0]}
            onChangeText={(text) => handleOtpChange(text, 0)}
          />
          <TextInput
            ref={pin2Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[1]}
            onChangeText={(text) => handleOtpChange(text, 1)}
          />
          <TextInput
            ref={pin3Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[2]}
            onChangeText={(text) => handleOtpChange(text, 2)}
          />
          <TextInput
            ref={pin4Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[3]}
            onChangeText={(text) => handleOtpChange(text, 3)}
          />
        </View>

        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Didn't receive a code? <Text style={styles.timer}>Resend</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: '#A0A0A0' }]}
          onPress={handleVerify}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  backButton: { padding: 24 },
  content: { paddingHorizontal: 24, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
  subtitle: { textAlign: 'center', color: '#A0A0A0', lineHeight: 22, marginBottom: 40 },
  emailText: { color: '#6C63FF', fontWeight: '600' },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  resendText: { color: '#A0A0A0', fontSize: 14, marginBottom: 40 },
  timer: { color: '#6C63FF', fontWeight: '600' },
  button: {
    backgroundColor: '#6C63FF',
    width: '100%',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 }
});