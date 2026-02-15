import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  SectionList,
  Platform,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Bella Rinova',
    role: 'Hair Stylist',
    avatar: 'https://i.pravatar.cc/150?u=1',
    lastMessage: 'Your appointment is confirmed for tomorrow at 2 PM',
    lastMessageTime: '2:30 PM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Lee Johnson',
    role: 'Sr. Barber',
    avatar: 'https://i.pravatar.cc/150?u=2',
    lastMessage: 'Thanks for booking! See you soon',
    lastMessageTime: '1:15 PM',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '3',
    name: 'Connor Martinez',
    role: 'Makeup Artist',
    avatar: 'https://i.pravatar.cc/150?u=3',
    lastMessage: 'Would you like to reschedule?',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: '4',
    name: 'Jaxon Davis',
    role: 'Hair Stylist',
    avatar: 'https://i.pravatar.cc/150?u=4',
    lastMessage: 'Great! See you on Saturday',
    lastMessageTime: '5 days ago',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '5',
    name: 'Lily Cooper',
    role: 'Manager',
    avatar: 'https://i.pravatar.cc/150?u=5',
    lastMessage: 'Your loyalty points have been updated',
    lastMessageTime: '1 week ago',
    unreadCount: 0,
    isOnline: true,
  },
];

const ConversationCard: React.FC<{ item: Conversation; onPress: () => void }> = ({
  item,
  onPress,
}) => (
  <TouchableOpacity style={styles.conversationCard} onPress={onPress}>
    <View style={styles.avatarContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      {item.isOnline && <View style={styles.onlineBadge} />}
    </View>

    <View style={styles.conversationContent}>
      <View style={styles.conversationHeader}>
        <Text style={styles.conversationName}>{item.name}</Text>
        <Text style={styles.timeText}>{item.lastMessageTime}</Text>
      </View>
      <View style={styles.conversationBody}>
        <Text style={styles.roleText} numberOfLines={1}>
          {item.role}
        </Text>
      </View>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {item.lastMessage}
      </Text>
    </View>

    {item.unreadCount > 0 && (
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadText}>{item.unreadCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadConversations = filteredConversations.filter(
    (conv) => conv.unreadCount > 0
  );
  const readConversations = filteredConversations.filter(
    (conv) => conv.unreadCount === 0
  );

  const sections = [
    { title: 'Unread', data: unreadConversations, isEmpty: unreadConversations.length === 0 },
    { title: 'All Messages', data: readConversations, isEmpty: readConversations.length === 0 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="ellipsis-vertical" size={20} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#C0C0C0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        )}
      </View>

      {/* Conversations List */}
      {filteredConversations.length > 0 ? (
        <SectionList
          sections={sections.filter(s => !s.isEmpty)}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <ConversationCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: '/messages/[id]',
                  params: { id: item.id, name: item.name, avatar: item.avatar },
                })
              }
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              {title === 'Unread' && (
                <TouchableOpacity>
                  <Text style={styles.sectionAction}>Mark all as read</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyState}
          showsVerticalScrollIndicator={false}
        >
          <MaterialCommunityIcons name="message-outline" size={64} color="#E0E0E0" />
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery
              ? 'No results found for your search'
              : 'Start a conversation with your specialist'}
          </Text>
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="pencil" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  headerIcon: {
    padding: 8,
  },

  /* Search Bar */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 20,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#F5F5F5',
    borderRadius: 22,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },

  /* List Content */
  listContent: {
    paddingHorizontal: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A0A0A0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionAction: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C63FF',
  },

  /* Conversation Card */
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFF',
  },

  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  timeText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  conversationBody: {
    marginBottom: 4,
  },
  roleText: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 13,
    color: '#A0A0A0',
    lineHeight: 18,
  },

  /* Unread Badge */
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },

  /* Empty State */
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 8,
    textAlign: 'center',
  },

  /* FAB */
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
