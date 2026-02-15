import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BookingConfirmationScreen() {
  const router = useRouter();

  const bookingDetails = {
    bookingId: 'BK-2024-001',
    salon: 'Bella Rinova',
    service: 'Hair Cut',
    date: '2024-12-15',
    time: '2:00 PM',
    duration: '45 min',
    price: '$45.00',
    address: '6391 Elgin St. Celina, Delaware',
    phone: '+1 (555) 123-4567'
  };

  // Add booking notification when component mounts
  React.useEffect(() => {
    // Simulate adding notification to the system
    console.log('New booking notification added:', {
      type: 'booking',
      message: `Your appointment at ${bookingDetails.salon} is confirmed for ${bookingDetails.date} at ${bookingDetails.time}`,
      bookingId: bookingDetails.bookingId
    });
  }, []);

  const downloadPDF = async () => {
    try {
      // Simulate PDF generation and download
      Alert.alert(
        'PDF Downloaded',
        'Your appointment confirmation has been saved to Downloads folder.',
        [{ text: 'OK' }]
      );
      console.log('PDF downloaded:', bookingDetails);
    } catch (error) {
      Alert.alert('Error', 'Failed to download PDF. Please try again.');
    }
  };

  const shareBooking = async () => {
    try {
      const message = `Appointment Confirmed!\n\nBooking ID: ${bookingDetails.bookingId}\nSalon: ${bookingDetails.salon}\nService: ${bookingDetails.service}\nDate: ${bookingDetails.date}\nTime: ${bookingDetails.time}\nPrice: ${bookingDetails.price}`;
      
      await Share.share({
        message: message,
        title: 'Appointment Confirmation'
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color="#10B981" />
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successSubtitle}>
          Your appointment has been successfully booked
        </Text>

        {/* Booking Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Appointment Details</Text>
            <Text style={styles.bookingId}>#{bookingDetails.bookingId}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="business-outline" size={20} color="#6366F1" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Salon</Text>
              <Text style={styles.detailValue}>{bookingDetails.salon}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="cut-outline" size={20} color="#6366F1" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{bookingDetails.service}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#6366F1" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{bookingDetails.date} at {bookingDetails.time}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#6366F1" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{bookingDetails.duration}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#6366F1" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Address</Text>
              <Text style={styles.detailValue}>{bookingDetails.address}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={20} color="#6366F1" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{bookingDetails.phone}</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total Amount</Text>
            <Text style={styles.priceValue}>{bookingDetails.price}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.downloadButton} onPress={downloadPDF}>
            <Ionicons name="download-outline" size={20} color="#FFFFFF" />
            <Text style={styles.downloadButtonText}>Download PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={shareBooking}>
            <Ionicons name="share-outline" size={20} color="#6366F1" />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Actions */}
        <View style={styles.additionalActions}>
          <TouchableOpacity style={styles.actionLink} onPress={() => router.push('./calendar')}>
            <Ionicons name="calendar-outline" size={16} color="#6366F1" />
            <Text style={styles.actionLinkText}>Add to Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionLink} onPress={() => router.push('/')}>
            <Ionicons name="home-outline" size={16} color="#6366F1" />
            <Text style={styles.actionLinkText}>Back to Home</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 40, alignItems: 'center' },
  successIcon: { marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 8 },
  successSubtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  detailsCard: { 
    width: '100%', 
    backgroundColor: '#F9FAFB', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 24 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB'
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E' },
  bookingId: { fontSize: 14, color: '#6366F1', fontWeight: '600' },
  detailRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  detailText: { marginLeft: 12, flex: 1 },
  detailLabel: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
  detailValue: { fontSize: 14, color: '#1A1D1E', fontWeight: '500' },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB'
  },
  priceLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A1D1E' },
  priceValue: { fontSize: 18, fontWeight: 'bold', color: '#10B981' },
  actionButtons: { flexDirection: 'row', width: '100%', gap: 12, marginBottom: 24 },
  downloadButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#6366F1', 
    paddingVertical: 16, 
    borderRadius: 12 
  },
  downloadButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  shareButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: '#6366F1', 
    paddingVertical: 16, 
    borderRadius: 12 
  },
  shareButtonText: { color: '#6366F1', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  additionalActions: { flexDirection: 'row', gap: 24 },
  actionLink: { flexDirection: 'row', alignItems: 'center' },
  actionLinkText: { color: '#6366F1', fontSize: 14, fontWeight: '500', marginLeft: 4 }
});