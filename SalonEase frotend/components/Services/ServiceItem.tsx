import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ServiceItemProps {
  name: string;
  image: any;
}

export const ServiceItem = ({ name, image }: ServiceItemProps) => (
  <TouchableOpacity style={styles.container} activeOpacity={0.7}>
    <View style={styles.imageWrapper}>
      <Image source={image} style={styles.image} />
    </View>
    <Text style={styles.label}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 20, // Matches the rounded square look in your image
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});