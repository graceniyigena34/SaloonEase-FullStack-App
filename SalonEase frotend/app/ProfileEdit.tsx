import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { api } from '../src/services/api';
import { authService } from '../src/services/auth';

export default function ProfileEditScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    allergies: '',
    skinType: '',
    preferredServices: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await authService.getUser();
        if (!user || (!user.id && !user._id)) {
          Alert.alert('Error', 'User not found. Please log in again.');
          return;
        }
        const userId = user.id || user._id;
        const data = await api.get<any>(`/users/${userId}`);
        setProfile({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dateOfBirth: data.dateOfBirth || '',
          address: data.address || '',
          emergencyContact: data.emergencyContact || '',
          allergies: data.allergies || '',
          skinType: data.skinType || '',
          preferredServices: data.preferredServices || '',
        });
      } catch (error) {
        console.error('Fetch profile error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = await authService.getUser();
      const userId = user.id || user._id;
      await api.put(`/users/${userId}`, {
        name: profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.name,
        email: profile.email,
        phone: profile.phone,
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        address: profile.address,
        emergencyContact: profile.emergencyContact,
        allergies: profile.allergies,
        skinType: profile.skinType,
        preferredServices: profile.preferredServices,
      });
      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color="#6366F1" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => router.push('./help-center')}
          >
            <Ionicons name="help-circle-outline" size={20} color="#6366F1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={profile.firstName}
            onChangeText={(text) => updateField('firstName', text)}
            placeholder="Enter first name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={profile.lastName}
            onChangeText={(text) => updateField('lastName', text)}
            placeholder="Enter last name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="Enter email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={profile.phone}
            onChangeText={(text) => updateField('phone', text)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={profile.dateOfBirth}
            onChangeText={(text) => updateField('dateOfBirth', text)}
            placeholder="MM/DD/YYYY"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.address}
            onChangeText={(text) => updateField('address', text)}
            placeholder="Enter address"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Emergency Contact</Text>
          <TextInput
            style={styles.input}
            value={profile.emergencyContact}
            onChangeText={(text) => updateField('emergencyContact', text)}
            placeholder="Name and phone number"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Allergies</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.allergies}
            onChangeText={(text) => updateField('allergies', text)}
            placeholder="List any allergies"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Skin Type</Text>
          <TextInput
            style={styles.input}
            value={profile.skinType}
            onChangeText={(text) => updateField('skinType', text)}
            placeholder="e.g., Oily, Dry, Combination"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Preferred Services</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profile.preferredServices}
            onChangeText={(text) => updateField('preferredServices', text)}
            placeholder="List preferred beauty services"
            multiline
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1A1D1E' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  helpButton: { padding: 4 },
  saveText: { color: '#6366F1', fontSize: 16, fontWeight: '600' },
  form: { paddingHorizontal: 20, paddingBottom: 40 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#1A1D1E', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1D1E'
  },
  textArea: { height: 80, textAlignVertical: 'top' }
});