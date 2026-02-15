import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const services = [
  { 
    id: '1', 
    name: 'Haircuts', 
    uri: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: '2', 
    name: 'Make up', 
    uri: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: '3', 
    name: 'Manicure', 
    uri: 'https://images.unsplash.com/photo-1604654894610-df490651e19c?q=80&w=200&auto=format&fit=crop' 
  },
  { 
    id: '4', 
    name: 'Massage', 
    uri: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=200&auto=format&fit=crop' 
  },
];

export const ServiceList = () => {
  return (
    <View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.container}
      >
        {services.map((item) => (
          <TouchableOpacity key={item.id} style={styles.item} activeOpacity={0.8}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.uri }} style={styles.image} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    paddingLeft: 20, 
    paddingRight: 10, // Adds space at the end of the scroll
    paddingTop: 10,
    paddingBottom: 5,
  },
  item: { 
    alignItems: 'center', 
    marginRight: 18, 
  },
  imageWrapper: {
    // Adds a subtle shadow/border like the image
    backgroundColor: '#FFF',
    borderRadius: 28,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { 
    width: 90, 
    height: 110, 
    borderRadius: 24, // High border radius for that "squircle" look
  },
  name: { 
    marginTop: 10,
    fontSize: 14, 
    fontWeight: '500',
    color: '#4A4A4A', 
  },
});