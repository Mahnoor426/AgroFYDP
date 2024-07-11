import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Animated, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ContactScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendMessage = () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter your name.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert('Message Sent!', 'Thank you for reaching out to AgroOptimizer. We will get back to you soon.');
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={styles.header}>Get in Touch With AgroOptimizer</Text>

            <Animated.View style={[styles.form, { opacity: animatedValue, transform: [{ scale: animatedValue }] }]}>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Your Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Subject"
                placeholderTextColor="#999"
                value={subject}
                onChangeText={setSubject}
              />
              <TextInput
                style={styles.textArea}
                placeholder="Message"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={5}
                value={message}
                onChangeText={setMessage}
              />

              <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
                <Text style={styles.buttonText}>Send Message</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90ee90',
  },
  scroll: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#daa520',
    borderWidth: 5,
    padding: 20,
    width: wp(90),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#02391E',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#333',
  },
  textArea: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#A2E284',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#02391E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});