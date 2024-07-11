import React, { useState } from 'react';
import { Text, Image, StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Dots from 'react-native-dots-pagination';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlideOffer, setActiveSlideOffer] = useState(0);

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const goToDetailsScreen = () => {
    navigation.navigate('Details');
  };

  const onScroll = (event, setActiveSlide) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setActiveSlide(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {/* logo */}
        <View style={styles.logo}>
          <Text style={styles.title}>AgroOptimizer</Text>
          <Text style={[styles.tagline]}>Smart Farming, Smarter Yields!</Text>
        </View>
        <View style={styles.bannercontainer}>
          <Image source={require('../assets/ag26.jpeg')} style={styles.banner} />
        </View>
        <View style={styles.destination}>
          <Text style={styles.exploreText}>Let's Explore </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            onScroll={(event) => onScroll(event, setActiveSlide)}
            pagingEnabled
          >
            <TouchableOpacity onPress={() => navigateToScreen('About')}>
              <View style={styles.imageContainer}>
                <Image source={require('../assets/ag24.jpeg')} style={styles.exploreImage} />
                <Text style={styles.imageText}>Know About Us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('Rabi')}>
              <View style={styles.imageContainer}>
                <Image source={require('../assets/ag3.jpeg')} style={styles.exploreImage} />
                <Text style={styles.imageText}>About Rabi Crops</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('Tips')}>
              <View style={styles.imageContainer}>
                <Image source={require('../assets/ag21.jpeg')} style={styles.exploreImage} />
                <Text style={styles.imageText}>Agricultural Growth Hacks</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('Contribute')}>
              <View style={styles.imageContainer}>
                <Image source={require('../assets/ag19.jpeg')} style={styles.exploreImage} />
                <Text style={styles.imageText}>Our Contributors</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          <Dots length={2} active={activeSlide} activeColor="#3e6606" />
        </View>

        <View style={styles.destination}>
          <Text style={styles.exploreText}>What We Offer </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            onScroll={(event) => onScroll(event, setActiveSlideOffer)}
            pagingEnabled
          >
            <View style={styles.imageContainer}>
              <Image source={require('../assets/crop12.jpeg')} style={styles.provideImage} />
              <Text style={styles.imageText1}>Crop Yield Optimization</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/crop13.jpeg')} style={styles.provideImage} />
              <Text style={styles.imageText1}>Decision Support System</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/crop14.jpeg')} style={styles.provideImage} />
              <Text style={styles.imageText1}>Best Sowing Time Prediction</Text>
            </View>
          </ScrollView>
          <Dots length={2} active={activeSlideOffer} activeColor="#3e6606" />
        </View>

        <TouchableOpacity onPress={goToDetailsScreen} style={styles.button3}>
          <Text style={{ color: '#02391E', fontWeight: 'bold', fontSize: 16 }}>Let's find out the most suitable crop to grow</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scroll: {
    marginTop: 6,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(12),
    fontWeight: 'bold',
    color: '#02391E',
    marginTop: 17,
  },
  tagline: {
    fontSize: hp(2),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#02391E',
    top: -5,
  },
  banner: {
    width: 400,
    height: 300,
    borderRadius: 20,
  },
  bannercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 4,
  },
  destination: {
    marginTop: 20,
  },
  exploreText: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#02391E',
    textAlign: 'center',
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  exploreImage: {
    width: wp(45),
    height: hp(30),
    borderRadius: 10,
  },
  imageText: {
    marginTop: 5,
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#02391E',
    textAlign: 'center',
  },
  provideImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#3e6606',
  },
  imageText1: {
    marginTop: 5,
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#02391E',
    textAlign: 'center',
  },
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    margin: 8,
    paddingHorizontal: 32,
    marginVertical: 20,
    fontSize: 20,
    top: -5,
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
});