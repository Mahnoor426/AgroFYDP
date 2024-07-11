import { Text, Image, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function FrontScreen() {
  const titleTranslateY = useSharedValue(hp(100));
  const taglineTranslateY = useSharedValue(hp(100));

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => titleTranslateY.value = withSpring(0), 1000);
    setTimeout(() => taglineTranslateY.value = withSpring(0), 1200);
    setTimeout(() => navigation.navigate('Home'), 3000);
  }, [navigation, titleTranslateY, taglineTranslateY]);



  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
          <Image source={require('../assets/logo.jpeg')} style={styles.image} />
      <Animated.Text style={[styles.title, titleStyle]}>AgroOptimizer</Animated.Text>
      <Animated.Text style={[styles.tagline, taglineStyle]}>Smart Farming, Smarter Yields!</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02391E',
  },
 
  image: {
    width: hp(80), // Adjust the size as needed
    height: hp(80), // Adjust the size as needed
    // borderRadius: 120, // Ensure this is half of the width/height to make it a circle
    resizeMode: 'cover',
    top: 55,
  },
  title: {
    fontSize: hp(6.5),
    textAlign: 'center',
    fontWeight: 'bold',
    top: -190,
    color: '#daa520',
  },
  tagline: {
    fontSize: hp(2.5),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#daa520',
    top: -185,
  },
});