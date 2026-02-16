import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { authService } from "../src/services/auth";

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as 'customer' | 'owner'
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('Sending signup request:', {
        name: formData.fullName,
        email: formData.email,
        role: formData.role
      });
      const response = await authService.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      console.log('Signup response:', response);
      Alert.alert('Success', response.message || 'OTP sent to your email!');
      router.push({ pathname: "/otp-code", params: { email: formData.email } });
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.push("/")}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      {/* Role Selection */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleBtn, formData.role === 'customer' && styles.roleBtnActive]}
          onPress={() => setFormData({ ...formData, role: 'customer' })}
        >
          <Ionicons name="person" size={20} color={formData.role === 'customer' ? "#FFF" : "#6C63FF"} />
          <Text style={[styles.roleText, formData.role === 'customer' && styles.roleTextActive]}>Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleBtn, formData.role === 'owner' && styles.roleBtnActive]}
          onPress={() => setFormData({ ...formData, role: 'owner' })}
        >
          <Ionicons name="business" size={20} color={formData.role === 'owner' ? "#FFF" : "#6C63FF"} />
          <Text style={[styles.roleText, formData.role === 'owner' && styles.roleTextActive]}>Salon Owner</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={20} color="#999" />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={20} color="#999" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Sign up'}</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.login}>Sign in</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  container: { flex: 1, backgroundColor: "#F8F8F8", padding: width * 0.05, paddingTop: 80 },
  back: { position: 'absolute', top: 60, left: width * 0.05, zIndex: 10 },
  title: { fontSize: width * 0.07, fontWeight: "700", color: "#1A1A1A" },
  subtitle: { fontSize: width * 0.035, color: "#A0A0A0", marginBottom: 20 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6C63FF',
    marginHorizontal: 5,
    backgroundColor: '#FFF'
  },
  roleBtnActive: { backgroundColor: '#6C63FF' },
  roleText: { marginLeft: 8, fontSize: width * 0.035, color: '#6C63FF', fontWeight: '600' },
  roleTextActive: { color: '#FFF' },
  inputBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 },
  input: { marginLeft: 10, fontSize: width * 0.035, flex: 1, color: "#1A1A1A" },
  button: { backgroundColor: "#6C63FF", paddingVertical: 16, borderRadius: 16, alignItems: "center", marginBottom: 20, marginTop: 10 },
  buttonDisabled: { backgroundColor: "#A0A0A0" },
  buttonText: { color: "#FFFFFF", fontSize: width * 0.04, fontWeight: "600" },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  footerText: { fontSize: width * 0.033, color: "#A0A0A0" },
  login: { color: "#6C63FF", fontWeight: "600", fontSize: width * 0.033 }
});