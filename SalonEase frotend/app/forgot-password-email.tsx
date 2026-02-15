import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ForgotPasswordEmail() {
  const router = useRouter();
  const [isSent, setIsSent] = useState(false); // State to toggle between input and success

  if (isSent) {
    // SUCCESS STATE: "Code has been sent"
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContent}>
          <View style={styles.envelopeContainer}>
            <MaterialCommunityIcons name="email-outline" size={80} color="#1A1A1A" />
          </View>
          
          <Text style={styles.title}>Code has been sent</Text>
          <Text style={styles.subtitle}>
            You'll shortly receive an email with a code to setup a new password.
          </Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/reset-password")}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // INPUT STATE: "Enter your email"
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>
          Please enter your email address to reset your password instruction
        </Text>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#999" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setIsSent(true)}
        >
          <Text style={styles.buttonText}>Send link</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  backButton: { padding: 24 },
  content: { paddingHorizontal: 24, marginTop: 20 },
  successContent: { 
    flex: 1, 
    paddingHorizontal: 40, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  envelopeContainer: {
    marginBottom: 40,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#1A1A1A', 
    textAlign: 'center',
    marginBottom: 12 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#A0A0A0', 
    textAlign: 'center', 
    lineHeight: 22, 
    marginBottom: 40 
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 30,
  },
  input: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    color: "#1A1A1A",
  },
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
    elevation: 4,
  },
  buttonText: { 
    color: '#FFF', 
    fontWeight: '700', 
    fontSize: 16 
  },
});