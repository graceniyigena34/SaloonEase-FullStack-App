import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const TRANSACTIONS = [
  { id: '1', salonName: 'Bella Rinova', service: 'Hair Cut', date: 'Oct 24, 2025', amount: '$45.00', status: 'Completed', icon: 'content-cut', color: '#6366F1' },
  { id: '2', salonName: 'The Galleria', service: 'Makeup', date: 'Oct 20, 2025', amount: '$85.00', status: 'Completed', icon: 'lipstick', color: '#EC4899' },
  { id: '3', salonName: 'Green Apple Spa', service: 'Massage', date: 'Oct 15, 2025', amount: '$120.00', status: 'Pending', icon: 'spa', color: '#10B981' },
  { id: '4', salonName: 'Style Studio', service: 'Manicure', date: 'Oct 10, 2025', amount: '$30.00', status: 'Cancelled', icon: 'hand-wash', color: '#F59E0B' },
];

interface Transaction {
  id: string;
  salonName: string;
  service: string;
  date: string;
  amount: string;
  status: string;
  icon: string;
  color: string;
}

export default function PaymentHistoryScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Transaction }) => {
    const isCompleted = item.status === 'Completed';
    const isPending = item.status === 'Pending';
    
    const bg = isCompleted ? '#DCFCE7' : isPending ? '#FEF3C7' : '#FEE2E2';
    const text = isCompleted ? '#166534' : isPending ? '#92400E' : '#991B1B';

    return (
      <TouchableOpacity style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
          <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
        </View>
        
        <View style={styles.info}>
          <Text style={styles.salonName}>{item.salonName}</Text>
          <Text style={styles.serviceText}>{item.service}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.amount}</Text>
          <View style={[styles.statusBadge, { backgroundColor: bg }]}>
            <Text style={[styles.statusText, { color: text }]}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment History</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={TRANSACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={styles.summaryCard}>
            <View>
              <Text style={styles.summaryLabel}>Total Spent (Oct)</Text>
              <Text style={styles.summaryValue}>$280.00</Text>
            </View>
            <Ionicons name="receipt-outline" size={32} color="rgba(255,255,255,0.4)" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  backBtn: { padding: 4 },
  listContent: { paddingHorizontal: 20 },
  summaryCard: {
    backgroundColor: '#6366F1',
    padding: 24,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  },
  summaryLabel: { color: '#E0E7FF', fontSize: 14 },
  summaryValue: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  iconBox: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1, marginLeft: 15 },
  salonName: { fontSize: 16, fontWeight: 'bold' },
  serviceText: { color: '#6B7280', fontSize: 13 },
  dateText: { color: '#9CA3AF', fontSize: 12 },
  priceContainer: { alignItems: 'flex-end' },
  priceText: { fontWeight: 'bold', fontSize: 16 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 4 },
  statusText: { fontSize: 10, fontWeight: 'bold' }
});