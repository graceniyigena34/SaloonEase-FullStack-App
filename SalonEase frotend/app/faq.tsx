import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FAQ_DATA = [
  { id: '1', question: 'What is Flo Cutters?', answer: 'Flo Cutters is your premium destination for high-end hair styling and grooming services.' },
  { id: '2', question: 'How much does this cost?', answer: 'We provide high-end services without the high-end price. A moderate price allows us to provide the high-end services you enjoy... Prices for services are subject to consultation.' },
  { id: '3', question: 'Do you accept paypal?', answer: 'Yes, we accept PayPal along with all major credit cards and digital wallets.' },
  { id: '4', question: 'Where are you located?', answer: 'We are located at the heart of the city in The Galleria Mall, Suite 402.' },
  { id: '5', question: 'Can I just come in or do I have to make an appointment?', answer: 'While we accept walk-ins based on availability, we highly recommend making an appointment.' },
];

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>('2'); // '2' is open in your screenshot
  const router = useRouter();

  const toggleAccordion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FAQs</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#1A1D1E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {FAQ_DATA.map((item) => (
          <View key={item.id} style={styles.faqWrapper}>
            <TouchableOpacity 
              style={styles.faqHeader} 
              onPress={() => toggleAccordion(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.questionText}>{item.question}</Text>
              <Ionicons 
                name={expandedId === item.id ? "remove" : "add"} 
                size={22} 
                color="#D1D5DB" 
              />
            </TouchableOpacity>
            
            {expandedId === item.id && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingTop: 60, 
    paddingBottom: 20 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1D1E' },
  scrollContent: { paddingHorizontal: 25 },
  faqWrapper: { marginBottom: 5 },
  faqHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 20 
  },
  questionText: { fontSize: 16, fontWeight: '600', color: '#1A1D1E', flex: 1, paddingRight: 10 },
  answerContainer: { paddingBottom: 20 },
  answerText: { fontSize: 14, color: '#667085', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#F3F4F6' }
});