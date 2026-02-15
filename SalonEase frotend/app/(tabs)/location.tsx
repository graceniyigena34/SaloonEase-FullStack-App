import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// This prevents the app from crashing on Web
let MapView: any, Marker: any;
if (Platform.OS !== 'web') {
    try {
        const Maps = require('react-native-maps');
        MapView = Maps.default;
        Marker = Maps.Marker;
    } catch (error) {
        console.log('Maps not available');
    }
}

const NEARBY_SALONS = [
    { id: '1', name: 'Green Apple', address: '6391 Elgin St. Celina, Delaware', rating: '5.0', dist: '0.5 km', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', lat: 37.78825, lng: -122.4324 },
    { id: '2', name: 'Bella Rinova', address: '8502 Preston Rd. Inglewood', rating: '4.0', dist: '1.2 km', image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400', lat: 37.78925, lng: -122.4334 },
    { id: '3', name: 'The Galleria', address: '4140 Parker Rd. Allentown', rating: '3.0', dist: '2.1 km', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400', lat: 37.78725, lng: -122.4314 },
];

export default function LocationScreen() {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    if (Platform.OS === 'web' || !MapView) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.webContainer}>
                    <Text style={styles.webTitle}>Find Nearby Salons</Text>
                    <Text style={styles.webSubtitle}>Maps are not supported on Web. Please open on mobile device.</Text>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={20} color="#A0A0A0" />
                        <TextInput
                            placeholder="Search location"
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                    <ScrollView style={styles.salonsList}>
                        {NEARBY_SALONS.map((salon) => (
                            <TouchableOpacity
                                key={salon.id}
                                style={styles.salonCard}
                                onPress={() => router.push({
                                    pathname: `/salon-detail`,
                                    params: { id: salon.id }
                                })}
                            >
                                <Image source={{ uri: salon.image }} style={styles.salonImage} />
                                <View style={styles.salonInfo}>
                                    <Text style={styles.salonName}>{salon.name}</Text>
                                    <Text style={styles.salonAddress}>{salon.address}</Text>
                                    <View style={styles.salonMeta}>
                                        <Ionicons name="star" size={14} color="#FFB800" />
                                        <Text style={styles.rating}>{salon.rating}</Text>
                                        <Text style={styles.distance}> • {salon.dist}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {NEARBY_SALONS.map((salon) => (
                    <Marker
                        key={salon.id}
                        coordinate={{ latitude: salon.lat, longitude: salon.lng }}
                        title={salon.name}
                        description={salon.address}
                    />
                ))}
            </MapView>
            <View style={styles.overlay}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#A0A0A0" />
                    <TextInput
                        placeholder="Search location"
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={20} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomSheet}>
                <Text style={styles.nearbyTitle}>Nearby Salons</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {NEARBY_SALONS.map((salon) => (
                        <TouchableOpacity
                            key={salon.id}
                            style={styles.nearbyCard}
                            onPress={() => router.push({
                                pathname: `/salon-detail`,
                                params: { id: salon.id }
                            })}
                        >
                            <Image source={{ uri: salon.image }} style={styles.nearbyImage} />
                            <Text style={styles.nearbyName}>{salon.name}</Text>
                            <Text style={styles.nearbyDistance}>{salon.dist}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { ...StyleSheet.absoluteFillObject },
    webContainer: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
    webTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
    webSubtitle: { fontSize: 14, color: '#A0A0A0', marginBottom: 30 },
    overlay: { position: 'absolute', top: 60, left: 20, right: 20 },
    searchContainer: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 15, paddingHorizontal: 15, height: 50, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
    filterBtn: { borderLeftWidth: 1, borderLeftColor: '#E0E0E0', paddingLeft: 10 },
    bottomSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: 200 },
    nearbyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    nearbyCard: { alignItems: 'center', marginRight: 20, width: 80 },
    nearbyImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
    nearbyName: { fontSize: 12, fontWeight: '500', textAlign: 'center', marginBottom: 4 },
    nearbyDistance: { fontSize: 10, color: '#A0A0A0' },
    salonsList: { flex: 1, marginTop: 20 },
    salonCard: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    salonImage: { width: 70, height: 70, borderRadius: 10 },
    salonInfo: { flex: 1, marginLeft: 15, justifyContent: 'center' },
    salonName: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 4 },
    salonAddress: { fontSize: 13, color: '#A0A0A0', marginBottom: 8 },
    salonMeta: { flexDirection: 'row', alignItems: 'center' },
    rating: { marginLeft: 4, fontSize: 13, fontWeight: '500' },
    distance: { fontSize: 13, color: '#A0A0A0' }
});