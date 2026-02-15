import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, ScrollView, TouchableOpacity, 
  Image, Alert, FlatList 
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'paypal';
  label: string;
  cardNumber?: string;
  expiryDate?: string;
  isDefault: boolean;
  cardHolder?: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: '1',
    type: 'paypal',
    label: 'Jenny Wilson',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    label: '**** **** **** 8295',
    cardNumber: '8295',
    expiryDate: '12/25',
    cardHolder: 'Jenny Wilson',
    isDefault: false,
  },
  {
    id: '3',
    type: 'visa',
    label: '**** **** **** 5445',
    cardNumber: '5445',
    expiryDate: '03/26',
    cardHolder: 'Jenny Wilson',
    isDefault: false,
  },
];

interface PaymentCardProps {
  item: PaymentMethod;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ item, onDelete, onSetDefault }) => {
  return (
    <View style={[styles.paymentCard, item.isDefault && styles.defaultCard]}>
      <View style={styles.cardLeft}>
        <View style={styles.iconContainer}>
          {item.type === 'paypal' && (
            <FontAwesome name="paypal" size={28} color="#003087" />
          )}
          {item.type === 'mastercard' && (
            <FontAwesome name="cc-mastercard" size={28} color="#EB001B" />
          )}
          {item.type === 'visa' && (
            <FontAwesome name="cc-visa" size={28} color="#1A1F71" />
          )}
        </View>
        
        <View style={styles.cardInfo}>
          <Text style={styles.cardLabel}>{item.label}</Text>
          {item.expiryDate && (
            <Text style={styles.expiryText}>Expires {item.expiryDate}</Text>
          )}
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.moreBtn}
          onPress={() => Alert.alert(
            'Payment Method',
            'Choose an action',
            [
              !item.isDefault && {
                text: 'Set as Default',
                onPress: () => onSetDefault(item.id),
              },
              {
                text: 'Delete',
                onPress: () => onDelete(item.id),
                style: 'destructive',
              },
              { text: 'Cancel', style: 'cancel' },
            ].filter(Boolean) as any
          )}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#A0A0A0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(PAYMENT_METHODS);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(paymentMethods.filter(method => method.id !== id));
          },
        },
      ]
    );
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E1E2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoIcon}>
            <Ionicons name="information-circle-outline" size={20} color="#6C63FF" />
          </View>
          <Text style={styles.infoText}>
            Your payment information is secure and encrypted. We don't store your full card details.
          </Text>
        </View>

        {/* Payment Methods List */}
        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
        <View style={styles.methodsList}>
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <PaymentCard
                key={method.id}
                item={method}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons 
                name="credit-card-outline" 
                size={48} 
                color="#D0D0D0" 
              />
              <Text style={styles.emptyText}>No payment methods added yet</Text>
              <Text style={styles.emptySubtext}>Add a payment method to get started</Text>
            </View>
          )}
        </View>

        {/* Add New Card Section */}
        <View style={styles.addSection}>
          <Text style={styles.sectionTitle}>Add New Payment Method</Text>
          <TouchableOpacity 
            style={styles.addCardBtn}
            onPress={() => router.push('/payment/add-card')}
          >
            <View style={styles.addBtnContent}>
              <View style={styles.addIconCircle}>
                <Ionicons name="add" size={28} color="#FFF" />
              </View>
              <View>
                <Text style={styles.addBtnTitle}>Add Card</Text>
                <Text style={styles.addBtnSubtitle}>Visa, Mastercard, or other</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.addPaypalBtn}
            onPress={() => Alert.alert('PayPal', 'PayPal integration coming soon')}
          >
            <View style={styles.addBtnContent}>
              <View style={[styles.addIconCircle, { backgroundColor: '#003087' }]}>
                <FontAwesome name="paypal" size={20} color="#FFF" />
              </View>
              <View>
                <Text style={styles.addBtnTitle}>Add PayPal</Text>
                <Text style={styles.addBtnSubtitle}>Quick and secure</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.doneBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.doneBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingVertical: 15 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1E1E2D' 
  },
  content: { 
    flex: 1 
  },
  scrollContent: { 
    paddingHorizontal: 25, 
    paddingBottom: 100 
  },

  /* Info Section */
  infoSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F0EBFF', 
    borderRadius: 16, 
    padding: 12, 
    marginBottom: 30 
  },
  infoIcon: { 
    marginRight: 12 
  },
  infoText: { 
    flex: 1, 
    fontSize: 13, 
    color: '#5A5A7A', 
    lineHeight: 18 
  },

  /* Section Title */
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1E1E2D', 
    marginBottom: 15 
  },

  /* Payment Methods List */
  methodsList: { 
    marginBottom: 30 
  },
  paymentCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#F8F8F8', 
    borderRadius: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  defaultCard: { 
    backgroundColor: '#F0EBFF',
    borderColor: '#E0D5FF'
  },
  cardLeft: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  iconContainer: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  cardInfo: { 
    flex: 1 
  },
  cardLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1E1E2D' 
  },
  expiryText: { 
    fontSize: 12, 
    color: '#A0A0A0', 
    marginTop: 2 
  },
  defaultBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 6 
  },
  defaultText: { 
    fontSize: 12, 
    color: '#4CAF50', 
    marginLeft: 4, 
    fontWeight: '500' 
  },
  cardActions: { 
    marginLeft: 12 
  },
  moreBtn: { 
    padding: 8 
  },

  /* Empty State */
  emptyState: { 
    alignItems: 'center', 
    paddingVertical: 40 
  },
  emptyText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#1E1E2D', 
    marginTop: 12 
  },
  emptySubtext: { 
    fontSize: 13, 
    color: '#A0A0A0', 
    marginTop: 4 
  },

  /* Add Section */
  addSection: { 
    marginBottom: 20 
  },
  addCardBtn: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#F8F8F8', 
    borderRadius: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  addPaypalBtn: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#F0F7FF', 
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D0E3FF'
  },
  addBtnContent: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  addIconCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, 
    backgroundColor: '#6C63FF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  addBtnTitle: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1E1E2D' 
  },
  addBtnSubtitle: { 
    fontSize: 12, 
    color: '#A0A0A0', 
    marginTop: 2 
  },

  /* Footer */
  footer: { 
    paddingHorizontal: 25, 
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
  },
  doneBtn: { 
    backgroundColor: '#6C63FF', 
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center' 
  },
  doneBtnText: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 16 
  },
});
