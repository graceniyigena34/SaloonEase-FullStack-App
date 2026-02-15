import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, View, Text, FlatList, TouchableOpacity, 
  SafeAreaView, Image, Share, Alert, ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';

interface FriendContact {
  id: string;
  name: string;
  phone?: string;
  image?: string;
}

export default function InviteFriendsScreen() {
  const router = useRouter();
  const [contacts, setContacts] = useState<FriendContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          const formatted = data.map(c => ({
            id: c.id,
            name: c.name,
            phone: c.phoneNumbers?.[0]?.number,
            image: c.image?.uri
          })).filter(c => c.phone); // Only show contacts with numbers
          setContacts(formatted);
        }
      }
      setLoading(false);
    })();
  }, []);

  const onInvite = async (name: string) => {
    try {
      await Share.share({
        message: `Hey ${name}, check out this amazing Salon app! Use my code SALON2026 to get 20% off your first booking. Download here: https://expo.dev/salon-app`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const renderItem = ({ item }: { item: FriendContact }) => (
    <View style={styles.contactCard}>
      <View style={styles.avatarPlaceholder}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarInitial}>{item.name.charAt(0)}</Text>
        )}
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity 
        style={styles.inviteButton} 
        onPress={() => onInvite(item.name)}
      >
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite Friends</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.referralCard}>
        <Ionicons name="gift-outline" size={40} color="#FFF" />
        <View style={styles.referralTextContainer}>
          <Text style={styles.referralTitle}>Give $10, Get $10</Text>
          <Text style={styles.referralSub}>For every friend that signs up and books.</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No contacts found</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  referralCard: {
    backgroundColor: '#6366F1',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  referralTextContainer: { marginLeft: 15 },
  referralTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  referralSub: { color: '#E0E7FF', fontSize: 12, marginTop: 2 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  avatarPlaceholder: {
    width: 50, height: 50, borderRadius: 25, 
    backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center'
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  avatarInitial: { fontSize: 18, fontWeight: 'bold', color: '#6B7280' },
  contactInfo: { flex: 1, marginLeft: 15 },
  contactName: { fontSize: 16, fontWeight: '600', color: '#1A1D1E' },
  contactPhone: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  inviteButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  inviteButtonText: { color: '#6366F1', fontWeight: 'bold', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 40 }
});