import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { authService } from "../src/services/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (response.user?.role === 'owner') {
        router.replace('/admin/dashboard');
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.back} onPress={() => router.push("/signup")}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {/* Email Input */}
      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={20} color="#999" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Remember Me */}
      <View style={styles.rememberRow}>
        <Ionicons name="checkbox" size={18} color="#6C63FF" />
        <Text style={styles.rememberText}>Remember me</Text>
      </View>

      {/* Sign In Button - Links to Home Tabs */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.orText}>Or Continue with</Text>

      {/* Social Login */}
      <View style={styles.socialRow}>
        <View style={styles.socialBtn}>
          <FontAwesome name="facebook" size={18} color="#1877F2" />
        </View>
        <View style={styles.socialBtn}>
          <FontAwesome name="google" size={18} color="#DB4437" />
        </View>
        <View style={styles.socialBtn}>
          <FontAwesome name="twitter" size={18} color="#1DA1F2" />
        </View>
      </View>

      {/* Footer */}
      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.footer}>Forgot your password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signup}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 24,
    justifyContent: 'center', // Added to center the login form
  },
  back: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 14,
    color: "#A0A0A0",
    marginBottom: 30,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  input: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    color: "#1A1A1A",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#6C63FF",
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  orText: {
    textAlign: "center",
    color: "#999",
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 26,
  },
  socialBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  footer: {
    textAlign: "center",
    fontSize: 13,
    color: "#A0A0A0",
    marginBottom: 12,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: "#A0A0A0",
  },
  signup: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: 13,
  },
});