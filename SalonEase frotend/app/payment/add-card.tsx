import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, TextInput, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform, Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function AddCardScreen() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isDefault, setIsDefault] = useState(true);

  // Dynamic Brand Detection: Detects Visa (starts with 4) or Mastercard (starts with 5)
  const getCardBrandIcon = () => {
    const firstDigit = cardNumber.replace(/\D/g, '')[0];
    if (firstDigit === '4') return { type: 'FontAwesome', name: 'cc-visa' };
    if (firstDigit === '5') return { type: 'FontAwesome', name: 'cc-mastercard' };
    return { type: 'MaterialCommunityIcons', name: 'credit-card-chip' };
  };

  const cardBrand = getCardBrandIcon();

  // Formatting helper for Card Number: 4 digits + space
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const matched = cleaned.match(/.{1,4}/g);
    setCardNumber(matched ? matched.join(' ') : cleaned);
  };

  // Formatting helper for Expiry: MM/YY
  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setExpiry(cleaned);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {/* Header - Simple Modal Style */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add Card</Text>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#2D2D43" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>
            {/* Visual Card Preview */}
            <View style={styles.cardVisual}>
              <View style={styles.cardRowTop}>
                <MaterialCommunityIcons name="chip" size={38} color="#E5C158" />
                {cardBrand.type === 'FontAwesome' ? (
                  <FontAwesome name={cardBrand.name as any} size={32} color="#FFF" />
                ) : (
                  <MaterialCommunityIcons name={cardBrand.name as any} size={32} color="#FFF" />
                )}
              </View>
              
              <Text style={styles.cardNumbersPreview}>
                {cardNumber || "4950  4545  1234  9876"}
              </Text>
              
              <View style={styles.cardRowBottom}>
                <View>
                  <Text style={styles.cardLabel}>Card holder</Text>
                  <Text style={styles.cardValue}>{name.toUpperCase() || "JENNY WILSON"}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.cardLabel}>Expires</Text>
                  <Text style={styles.cardValue}>{expiry || "03/22"}</Text>
                </View>
              </View>
            </View>

            {/* Input Section */}
            <Text style={styles.inputLabel}>Card number</Text>
            <View style={styles.inputWrapper}>
               <MaterialCommunityIcons name="credit-card-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
               <TextInput 
                 style={styles.fieldInput} 
                 placeholder="4950 4545 1234 9876"
                 placeholderTextColor="#C0C0C0"
                 keyboardType="number-pad"
                 maxLength={19}
                 value={cardNumber}
                 onChangeText={formatCardNumber}
               />
            </View>

            <Text style={styles.inputLabel}>Card holder</Text>
            <TextInput 
              style={styles.singleInput} 
              placeholder="Jenny Wilson"
              placeholderTextColor="#C0C0C0"
              value={name}
              onChangeText={setName}
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.inputLabel}>Exp Date</Text>
                <TextInput 
                  style={styles.singleInput} 
                  placeholder="MM/YY"
                  placeholderTextColor="#C0C0C0"
                  keyboardType="number-pad"
                  maxLength={5}
                  value={expiry}
                  onChangeText={formatExpiry}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput 
                  style={styles.singleInput} 
                  placeholder="000"
                  placeholderTextColor="#C0C0C0"
                  keyboardType="number-pad"
                  maxLength={3}
                  secureTextEntry
                  value={cvv}
                  onChangeText={setCvv}
                />
              </View>
            </View>

            {/* Checkbox Section */}
            <TouchableOpacity 
              style={styles.checkboxContainer} 
              onPress={() => setIsDefault(!isDefault)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons 
                name={isDefault ? "checkbox-marked" : "checkbox-blank-outline"} 
                size={24} 
                color={isDefault ? "#6C63FF" : "#D0D0D0"} 
              />
              <Text style={styles.checkboxText}>Set as your default payment method</Text>
            </TouchableOpacity>

            {/* Action Button */}
            <TouchableOpacity 
              style={[styles.addButton, !cardNumber && styles.disabledButton]}
              onPress={() => router.back()}
              disabled={!cardNumber}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1E1E2D' },
  closeBtn: { padding: 5 },
  form: { paddingHorizontal: 25, paddingVertical: 10 },
  
  cardVisual: {
    height: 190,
    backgroundColor: '#6C63FF',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
    marginBottom: 30,
    // iOS Shadow
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    // Android Shadow
    elevation: 8,
  },
  cardRowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardNumbersPreview: { color: '#FFF', fontSize: 22, letterSpacing: 2, fontWeight: '600', marginVertical: 15 },
  cardRowBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 4, textTransform: 'uppercase' },
  cardValue: { color: '#FFF', fontSize: 15, fontWeight: '600', letterSpacing: 1 },

  inputLabel: { fontSize: 14, color: '#1E1E2D', marginBottom: 8, fontWeight: '700' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 60,
  },
  inputIcon: { marginRight: 10 },
  fieldInput: { flex: 1, fontSize: 16, color: '#2D2D43', fontWeight: '500' },
  singleInput: { 
    backgroundColor: '#F8F9FB', 
    height: 60, 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    marginBottom: 20,
    color: '#2D2D43',
    fontWeight: '500'
  },
  row: { flexDirection: 'row' },

  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 25 },
  checkboxText: { marginLeft: 10, fontSize: 14, color: '#6C63FF', fontWeight: '500' },
  
  addButton: { 
    backgroundColor: '#6C63FF', 
    height: 60, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10,
    marginBottom: 40,
    elevation: 4,
  },
  disabledButton: { backgroundColor: '#B0B0CC' },
  addButtonText: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});