import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SalonCardProps {
  name: string;
  address: string | {
    street?: string;
    city: string;
    state: string;
    postalCode?: string;
    country?: string;
  };
  rating: string;
  dist: string;
  image: any;
}

export const SalonCard = ({ name, address, rating, dist, image }: SalonCardProps) => {
  const formattedAddress = typeof address === 'string'
    ? address
    : `${address.street ? address.street + ', ' : ''}${address.city}, ${address.state}`;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      {/* 1. Large Top Image */}
      <Image source={image} style={styles.image} />

      {/* 2. Content Container */}
      <View style={styles.infoContainer}>
        {/* Row 1: Name and Stars */}
        <View style={styles.topRow}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name="star" size={14} color="#FFD700" />
            ))}
          </View>
        </View>

        {/* Row 2: Address and Distance */}
        <View style={styles.bottomRow}>
          <Text style={styles.address} numberOfLines={1}>
            {formattedAddress}
          </Text>
          <View style={styles.distanceRow}>
            <Ionicons name="location-sharp" size={14} color="#666" />
            <Text style={styles.distance}>{dist} km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24, // Matches the smooth corners in your image
    marginBottom: 20,
    overflow: 'hidden',
    // Elevation for Android
    elevation: 4,
    // Shadows for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontSize: 13,
    color: '#9E9E9E',
    flex: 1,
    marginRight: 12,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
});