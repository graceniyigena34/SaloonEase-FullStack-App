import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  type?: 'text' | 'image' | 'booking';
}

const MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hi! I would like to book an appointment',
    timestamp: '2:15 PM',
    isOwn: true,
  },
  {
    id: '2',
    text: 'Sure! What service would you like?',
    timestamp: '2:16 PM',
    isOwn: false,
  },
  {
    id: '3',
    text: 'I need a haircut and styling',
    timestamp: '2:17 PM',
    isOwn: true,
  },
  {
    id: '4',
    text: 'Perfect! I have availability on Saturday at 10 AM. Does that work for you?',
    timestamp: '2:18 PM',
    isOwn: false,
  },
  {
    id: '5',
    text: 'Yes, that works perfectly!',
    timestamp: '2:19 PM',
    isOwn: true,
  },
  {
    id: '6',
    text: 'Your appointment is confirmed for tomorrow at 2 PM',
    timestamp: '2:30 PM',
    isOwn: false,
  },
];

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => (
  <View
    style={[
      styles.messageBubbleContainer,
      message.isOwn ? styles.ownBubbleContainer : styles.otherBubbleContainer,
    ]}
  >
    <View
      style={[
        styles.messageBubble,
        message.isOwn ? styles.ownBubble : styles.otherBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          message.isOwn ? styles.ownMessageText : styles.otherMessageText,
        ]}
      >
        {message.text}
      </Text>
      <Text
        style={[
          styles.messageTime,
          message.isOwn ? styles.ownMessageTime : styles.otherMessageTime,
        ]}
      >
        {message.timestamp}
      </Text>
    </View>
  </View>
);

export default function ChatScreen() {
  const router = useRouter();
  const { id, name, avatar } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Auto-scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E1E2D" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.headerInfo}
          onPress={() => router.push({
            pathname: '/saloon/[id]',
            params: { id: Array.isArray(id) ? id[0] : id },
          })}
        >
          <Image source={{ uri: avatar as string }} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{name}</Text>
            <Text style={styles.headerStatus}>Active now</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="call" size={22} color="#6C63FF" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Messages */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputSection}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  placeholderTextColor="#C0C0C0"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  maxLength={500}
                />

                <View style={styles.inputActions}>
                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="add-circle-outline" size={24} color="#6C63FF" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="image-outline" size={24} color="#6C63FF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.sendButton,
                      !inputText.trim() && styles.sendButtonDisabled,
                    ]}
                    onPress={handleSendMessage}
                    disabled={!inputText.trim()}
                  >
                    <Ionicons
                      name="send"
                      size={20}
                      color={inputText.trim() ? '#FFF' : '#D0D0D0'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E2D',
  },
  headerStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    fontWeight: '500',
  },
  headerAction: {
    padding: 8,
  },

  /* Messages */
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },

  messageBubbleContainer: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  ownBubbleContainer: {
    justifyContent: 'flex-end',
  },
  otherBubbleContainer: {
    justifyContent: 'flex-start',
  },

  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  ownBubble: {
    backgroundColor: '#6C63FF',
  },
  otherBubble: {
    backgroundColor: '#F5F5F5',
  },

  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  ownMessageText: {
    color: '#FFF',
  },
  otherMessageText: {
    color: '#1E1E2D',
  },

  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  ownMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherMessageTime: {
    color: '#A0A0A0',
  },

  /* Input Section */
  inputSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1E1E2D',
    marginRight: 8,
  },

  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
});
