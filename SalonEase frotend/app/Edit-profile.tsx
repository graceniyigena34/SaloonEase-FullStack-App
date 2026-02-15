import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const InputField = ({ label, value, placeholder, dropdown = false }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput 
        style={styles.input} 
        value={value} 
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
      {dropdown && <Ionicons name="chevron-down" size={18} color="#1A1D1E" />}
    </View>
  </View>
);

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#1A1D1E" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }} 
            style={styles.avatar} 
          />
          <TouchableOpacity>
            <Text style={styles.changeAvatarText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <InputField label="Full name" value="Robert Fox" />
        <InputField label="Email" value="robert_fox@gmail.com" />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <InputField label="Gender" value="Male" dropdown={true} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <InputField label="Birth of date" value="08/15/2012" />
          </View>
        </View>

        <InputField label="Address" value="6391 Elgin St. Celina, Delaware 10299" />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number</Text>
          <View style={styles.phoneInputWrapper}>
            <TouchableOpacity style={styles.countryPicker}>
              <Image source={{ uri: 'https://flagcdn.com/w40/vn.png' }} style={styles.flag} />
              <Text style={styles.countryCode}>+84</Text>
              <Ionicons name="chevron-down" size={14} color="#1A1D1E" />
            </TouchableOpacity>
            <TextInput 
              style={[styles.input, { flex: 1, marginLeft: 15 }]} 
              value="365248667" 
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 10 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  avatarSection: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  avatar: { width: 80, height: 80, borderRadius: 20 },
  changeAvatarText: { marginLeft: 20, color: '#6366F1', fontWeight: '600', fontSize: 16 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    height: 56 
  },
  input: { flex: 1, color: '#1A1D1E', fontSize: 15, fontWeight: '500' },
  row: { flexDirection: 'row' },
  phoneInputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 15, 
    paddingLeft: 15, 
    height: 56 
  },
  countryPicker: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRightWidth: 1, 
    borderRightColor: '#E5E7EB', 
    paddingRight: 10 
  },
  flag: { width: 24, height: 16, borderRadius: 2, marginRight: 8 },
  countryCode: { fontSize: 15, fontWeight: '500', color: '#1A1D1E', marginRight: 4 },
  saveButton: { 
    backgroundColor: '#7165E3', 
    height: 56, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20 
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});