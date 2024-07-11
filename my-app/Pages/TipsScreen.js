import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, StyleSheet, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const tips = [
  {
    text: "Ensure proper soil preparation before sowing to improve yield.",
    image: require('../assets/ag27.jpeg'),
  },
  {
    text: "Use high-quality seeds for better crop performance.",
    image: require('../assets/ag28.jpeg'),
  },
  {
    text: "Implement crop rotation to maintain soil fertility.",
    image: require('../assets/ag29.jpeg'),
  },
  {
    text: "Regularly monitor crops for pests and diseases.",
    image: require('../assets/ag30.jpeg'),
  },
  {
    text: "Optimize irrigation to provide adequate water supply.",
    image: require('../assets/ag31.jpeg'),
  },
];

export default function TipsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.overlay}>
            <View style={styles.box}>
              <Text style={styles.title}>How to Grow Better?</Text>
              <Image source={tips[currentTipIndex].image} style={styles.tipImage} />
              <Text style={styles.content}>{tips[currentTipIndex].text}</Text>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#90ee90',
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
  tipImage: {
    width: wp(80),
    height: hp(60),
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: wp(8),
    fontWeight: 'bold',
    color: '#02391E',
    marginBottom: 10,
  },
  content: {
    fontSize: wp(7),
    color: '#333',
    textAlign: 'center',
  },
});