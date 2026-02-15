import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PasswordSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Checkmark Circle */}
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={60} color="#4CAF50" />
        </View>

        <Text style={styles.title}>Password Reset</Text>
        <Text style={styles.subtitle}>
          Your password has been reset successfully
        </Text>

        {/* Sign In Button - Takes user back to the start */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace("/enable-location")}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 40 
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#1A1A1A', 
    marginBottom: 12 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#A0A0A0', 
    textAlign: 'center', 
    marginBottom: 40 
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