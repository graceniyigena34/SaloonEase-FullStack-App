import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Reusable Security Toggle Component
const SecurityToggle = ({ title, value, onToggle }: { title: string, value: boolean, onToggle: () => void }) => (
  <View style={styles.settingRow}>
    <Text style={styles.settingText}>{title}</Text>
    <Switch
      trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
      thumbColor={'#FFF'}
      onValueChange={onToggle}
      value={value}
    />
  </View>
);

// Reusable Action Link Component
const SecurityLink = ({ title, onPress }: { title: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress}>
    <Text style={styles.settingText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#ADB5BD" />
  </TouchableOpacity>
);

export default function SecurityScreen() {
  const router = useRouter();
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [touchId, setTouchId] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
          </TouchableOpacity>
          <Text style={styles.title}>Security</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Section 1: Authentication */}
          <Text style={styles.sectionHeader}>Authentication</Text>
          <SecurityToggle 
            title="Remember me" 
            value={rememberMe} 
            onToggle={() => setRememberMe(!rememberMe)} 
          />
          <SecurityToggle 
            title="Face ID" 
            value={faceIdEnabled} 
            onToggle={() => setFaceIdEnabled(!faceIdEnabled)} 
          />
          <SecurityToggle 
            title="Touch ID" 
            value={touchId} 
            onToggle={() => setTouchId(!touchId)} 
          />

          {/* Section 2: Password & 2FA */}
          <View style={styles.divider} />
          <Text style={styles.sectionHeader}>Account Security</Text>
          
          <SecurityLink 
            title="Change Password" 
            onPress={() => router.push('./change-password')} 
          />
          <SecurityLink 
            title="Two-Factor Authentication" 
            onPress={() => console.log('2FA settings')} 
          />
          <SecurityLink 
            title="Google Authenticator" 
          />

          {/* Button Section */}
          <TouchableOpacity style={styles.changePasswordBtn}>
            <Text style={styles.btnText}>Change Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: { padding: 5 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1A1D1E' },
  placeholder: { width: 34 },
  content: { paddingHorizontal: 20, paddingTop: 10 },
  sectionHeader: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1A1D1E', 
    marginVertical: 15 
  },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB'
  },
  settingText: { fontSize: 16, color: '#374151', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginTop: 10 },
  changePasswordBtn: {
    backgroundColor: '#F5F5FF',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0FF'
  },
  btnText: { color: '#6366F1', fontWeight: 'bold', fontSize: 16 }
});