import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { authService } from '../../src/services/auth';

// Specific Menu Item Component
const ProfileMenuItem = ({ icon, title, onPress }: { icon: any, title: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.6}>
    <View style={styles.menuLeft}>
      <MaterialCommunityIcons name={icon} size={22} color="#1A1D1E" />
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const userData = await authService.getUser();
      if (userData) setUser(userData);
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await authService.logout();
            router.replace('/signup');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Top Action Icons */}
        <View style={styles.topIcons}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => router.push('/Notification')}
          >
            <Ionicons name="notifications-outline" size={20} color="#1A1D1E" />
            <View style={styles.redDot} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => router.push('/favorite')}
          >
            <Ionicons name="heart-outline" size={20} color="#1A1D1E" />
          </TouchableOpacity>
        </View>

        {/* User Info Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: user?.profilePicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' }}
            style={styles.avatar}
          />
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user?.name || 'Robert Fox'}</Text>
            <TouchableOpacity onPress={() => router.push('/Edit-profile')}>
              <Feather name="edit-3" size={16} color="#6366F1" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userEmail}>{user?.email || 'robert_fox@gmail.com'}</Text>
        </View>

        {/* List Menu */}
        <View style={styles.menuList}>
          <ProfileMenuItem
            icon="heart-outline"
            title="Favourite"
            onPress={() => router.push('/favorite')}
          />
          <ProfileMenuItem
            icon="credit-card-outline"
            title="Payment Methods"
            onPress={() => router.push('/payment/payment-methods')}
          />
          <ProfileMenuItem
            icon="history"
            title="Payment History"
            onPress={() => router.push('/payment/payment-history')}
          />
          <ProfileMenuItem
            icon="lock-outline"
            title="Change Password"
            onPress={() => router.push('/security')}
          />
          <ProfileMenuItem
            icon="account-group-outline"
            title="Invites Friends"
            onPress={() => router.push('/invite-friends')}
          />
          <ProfileMenuItem
            icon="chat-question-outline"
            title="FAQs"
            onPress={() => router.push('/faq')}
          />
          <ProfileMenuItem
            icon="information-outline"
            title="About Us"
            onPress={() => router.push('/about')}
          />
          <ProfileMenuItem
            icon="logout"
            title="Logout"
            onPress={handleLogout}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topIcons: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 25, gap: 12, marginTop: 10 },
  iconCircle: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  redDot: { position: 'absolute', top: 10, right: 12, width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444', borderWidth: 1, borderColor: '#FFF' },
  profileSection: { alignItems: 'center', marginTop: 10 },
  avatar: { width: 90, height: 90, borderRadius: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#101828' },
  userEmail: { fontSize: 14, color: '#667085', marginTop: 4 },
  menuList: { marginTop: 20, paddingHorizontal: 25 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F9FAFB' },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuTitle: { fontSize: 16, color: '#1D2939', marginLeft: 15, fontWeight: '500' }
});