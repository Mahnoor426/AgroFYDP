import React from 'react';
import { Text, SafeAreaView, ScrollView, StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function RabiScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>What are Rabi Crops?</Text>
       <Text style={styles.text}> Rabi crops, also known as winter crops, are agricultural crops that are sown in the winter and harvested in the spring. These crops play a vital role in the agricultural economy of many countries, particularly in South Asia. Here are some key details about Rabi crops:</Text>
        <Text style={styles.heading}>Characteristics</Text>
        <Image source={require('../assets/ag16.jpg')} style={styles.image} />
        <Text style={styles.subheading}>1. Sowing Season:</Text>
        <Text style={styles.text}>Rabi crops are sown from October to December.</Text>
        <Text style={styles.subheading}>2. Harvesting Season:</Text>
        <Text style={styles.text}>These crops are harvested between April and June.</Text>
        <Text style={styles.subheading}>3. Climate Requirements:</Text>
        <Text style={styles.text}>Rabi crops require a cold climate during the sowing period and a warm climate during the harvesting period.</Text>
        <Text style={styles.subheading}>4. Water Requirements:</Text>
        <Text style={styles.text}>They generally rely on irrigation, as they are grown in the dry season when there is little rainfall.</Text>
        
        <Text style={styles.heading}>Major Rabi Crops</Text>
        <Image source={require('../assets/ag17.jpg')} style={styles.image} />
        <Text style={styles.subheading}>1. Wheat:</Text>
        <Text style={styles.text}>One of the most important Rabi crops, widely grown for its grain, which is a staple food in many countries.</Text>
        <Text style={styles.subheading}>2. Barley:</Text>
        <Text style={styles.text}>Used for food, fodder, and brewing beer.</Text>
        <Text style={styles.subheading}>3. Mustard:</Text>
        <Text style={styles.text}>Cultivated for its seeds, which are used to produce mustard oil, a common cooking ingredient.</Text>
        <Text style={styles.subheading}>4. Peas:</Text>
        <Text style={styles.text}>Grown for their edible seeds, used in cooking and as animal fodder.</Text>
        <Text style={styles.subheading}>5. Gram (Chickpea):</Text>
        <Text style={styles.text}>An important legume crop, rich in protein and used in a variety of culinary dishes.</Text>
        <Text style={styles.subheading}>6. Lentils:</Text>
        <Text style={styles.text}>Another legume crop, used widely in cooking and as a protein source.</Text>
        
            
        <Text style={styles.heading}>Importance in Sustainable Agriculture</Text>
        <Image source={require('../assets/ag15.jpg')} style={styles.image} />
        <Text style={styles.subheading}>1. Crop Rotation:</Text>
        <Text style={styles.text}>Rabi crops are often used in crop rotation systems to maintain soil fertility and reduce the risk of pests and diseases.</Text>
        <Text style={styles.subheading}>2. Soil Health:</Text>
        <Text style={styles.text}>Legume Rabi crops, such as gram and lentils, help fix nitrogen in the soil, improving soil health for subsequent crops.</Text>
        <Text style={styles.subheading}>3. Food Security:</Text>
        <Text style={styles.text}>These crops contribute to food security by providing essential nutrients and diversifying food sources.</Text>
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
    padding: 16,
  },
  title: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#02391E',
    marginBottom: 20,
    textAlign: 'center',
  },
  heading: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: '#02391E',
    marginBottom: 10,
  },
  subheading: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  text: {
    fontSize: wp(5),
    color: 'black',
    marginBottom: 10,
    textAlign: 'justify',
  },
  image: {
    width: '100%',
    height: wp(50), // Adjust the height as necessary
    marginBottom: 20,
    borderRadius: 10,
  },
});