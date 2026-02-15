import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../../src/services/auth';
import { api } from '../../src/services/api';

const StatCard = ({ title, value, icon, color }: any) => (
    <View style={styles.statCard}>
        <View style={[styles.iconBg, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
        <View>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    </View>
);

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dashboard stats
                const statsData = await api.get<any>('/admin/dashboard');
                setStats(statsData);

                // Fetch all bookings (as owner)
                const bookingsData = await api.get<any[]>('/bookings');
                setBookings(bookingsData);
            } catch (error) {
                console.error('Admin Fetch Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        await authService.logout();
        router.replace('/');
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6366F1" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Admin Dashboard</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.statsGrid}>
                    <StatCard title="Total Bookings" value={stats?.bookings || 0} icon="calendar-check" color="#6366F1" />
                    <StatCard title="Total Users" value={stats?.users || 0} icon="account-group" color="#10B981" />
                    <StatCard title="Active Salons" value={stats?.salons?.active || 0} icon="store" color="#F59E0B" />
                </View>

                <Text style={styles.sectionTitle}>Recent Bookings</Text>
                {bookings.length === 0 ? (
                    <Text style={styles.emptyText}>No bookings yet.</Text>
                ) : (
                    bookings.map((item) => (
                        <View key={item._id} style={styles.bookingCard}>
                            <View style={styles.bookingHeader}>
                                <Text style={styles.customerName}>{item.user?.name || 'Customer'}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: item.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7' }]}>
                                    <Text style={[styles.statusText, { color: item.status === 'confirmed' ? '#065F46' : '#92400E' }]}>
                                        {item.status}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.bookingDetail}>{item.service?.name}</Text>
                            <View style={styles.bookingFooter}>
                                <Text style={styles.bookingTime}>{item.date?.split('T')[0]} at {item.time}</Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
    scrollContent: { padding: 20 },
    statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 24, flexWrap: 'wrap' },
    statCard: { flex: 1, minWidth: '45%', backgroundColor: '#FFF', padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 },
    iconBg: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    statValue: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
    statTitle: { fontSize: 12, color: '#6B7280' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
    bookingCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#6366F1' },
    bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    customerName: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    statusText: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
    bookingDetail: { fontSize: 14, color: '#4B5563', marginBottom: 8 },
    bookingFooter: { borderTopWidth: 1, borderTopColor: '#F3F4FB', paddingTop: 8 },
    bookingTime: { fontSize: 12, color: '#9CA3AF' },
    emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 20 },
});
