
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const services = [

    { image: require('../assets/crop10.jpeg'), text: 'Future-Proof Farming: Stay ahead with predictive insights.' },

    { image: require('../assets/crop9.jpeg'), text: 'Unlock Potential of your Farm : Unleash the power of data for better yields' },

    { image: require('../assets/crop8.jpeg'), text: 'Precision Farming: Optimize crop yields with advanced analytics.' },

  { image: require('../assets/crop7.jpeg'), text: 'Maximize Your Yield: Empower your farm with data-driven insights'},
 
 
   { image: require('../assets/crop11.jpeg'), text: 'Grow Smart, Not Hard: Revolutionizing agriculture with technology' },
];

export default function ServicesScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % services.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeIn"
        duration={2000}
        source={services[index].image}
        style={styles.image}
        key={services[index].image}
      />
      <Animatable.Text
        animation="fadeIn"
        duration={2000}
        style={styles.text}
        key={services[index].text}
      >
        {services[index].text}
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height:'100%',
    position: 'absolute',
  },
  text: {
    position: 'absolute',
    bottom: 50, // Adjust this value as needed
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Ensure the text is visible over the image
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for readability
    paddingVertical: 10,
  },
});