import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function SampleScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { predictedCrop, predictedYield } = route.params;

  const formattedCropName = predictedCrop.toLowerCase().replace(/ /g, '_'); // Format the crop name

  useEffect(() => {
    console.log('Predicted crop received:', predictedCrop); // Log to check received parameters
    console.log('Formatted crop name:', formattedCropName); // Log to check formatted crop name
    console.log('Predicted yield received:', predictedYield); // Log to check received parameters
  }, [predictedCrop, formattedCropName, predictedYield]);

  const cropImages = {
    wheat: require('../assets/Wheat.jpeg'),
    barley: require('../assets/Barley.jpeg'),
    gram: require('../assets/Gram.jpeg'),
    fodder_crop: require('../assets/Fodder.jpeg'),
    mustard_seed: require('../assets/Mustard.jpeg'),
    rape_seed: require('../assets/Rapeseed.jpeg'),
  };

  const cropRecommendations = {
    wheat: [
      '1. Wheat is a major cereal crop. It is used for making flour, bread, and other food products.',
      '2. Plant wheat in well-drained soil.',
      '3. Use a balanced fertilizer for optimal growth.',
      '4. Ensure adequate sunlight for wheat crops.',
    ],
    barley: [
      '1. Barley is used for animal feed, brewing beer, and health foods.',
      '2. Plant barley in cool, dry climates.',
      '3. Use nitrogen-rich fertilizers.',
      '4. Rotate barley crops to prevent soil depletion.',
    ],
    gram: [
      '1. Gram is a good source of protein and used in various dishes.',
      '2. Plant gram in well-drained loamy soil.',
      '3. Use phosphorus-rich fertilizers.',
      '4. Ensure adequate irrigation during flowering and pod formation.',
    ],
    fodder_crop: [
      '1. Fodder crops are used to feed livestock.',
      '2. Plant fodder crops in fertile soil.',
      '3. Use organic manure for better growth.',
      '4. Ensure proper water supply for optimal yield.',
    ],
    mustard_seed: [
      '1. Mustard seeds are used for oil extraction and as a spice.',
      '2. Plant mustard in sandy loam soil.',
      '3. Use potash-rich fertilizers.',
      '4. Ensure moderate irrigation for mustard crops.',
    ],
    rape_seed: [
      '1. Rapeseed is used for oil extraction and animal feed.',
      '2. Plant rapeseed in well-drained soil.',
      '3. Use nitrogen-rich fertilizers.',
      '4. Ensure adequate sunlight for rapeseed crops.',
    ],
  };


  const [isRecommendationVisible, setIsRecommendationVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const toggleRecommendationBox = () => {
    setIsRecommendationVisible(!isRecommendationVisible);
    Animated.timing(slideAnim, {
      toValue: isRecommendationVisible ? 300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const goToDetailScreen = () => {
    navigation.navigate('Details');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/bg3.jpeg')}
        style={styles.backgroundImage}
      />


      <Text style={styles.title}>Your fields are destined to flourish with:</Text>
      <Text style={styles.predictedCrop}>{predictedCrop}</Text>
      <Image source={cropImages[formattedCropName]} style={styles.image} />
      
      {predictedYield !== null && (
        <View style={styles.yieldContainer}>
        <Text style={styles.yieldLabel}>Expected Crop Yield:</Text>
        <Text style={styles.yieldValue}>{predictedYield} tons/acre</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleRecommendationBox} style={styles.button3}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Tap for more Recommendations</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={goToDetailScreen} style={styles.button4}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Back</Text>
      </TouchableOpacity>

      {isRecommendationVisible && cropRecommendations[formattedCropName] && (
        <Animated.View style={[styles.recommendationBox, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.recommendationTitle}>Recommendations for {predictedCrop}</Text>
          <ScrollView style={styles.recommendationTextContainer}>
            {cropRecommendations[formattedCropName].map((recommendation, index) => (
              <Text key={index} style={styles.recommendationText}>
                {recommendation}
              </Text>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    margin: 20,
    marginBottom: 5,
  },
  predictedCrop: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color to capture attention
    textAlign: 'center',
    marginVertical: 5,
  },
  image: {
    width: 400,
    height: 330,
    margin: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
  },
  yieldText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 10,
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
  button4: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
    bottom: -10,
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
  recommendationBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  recommendationTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationTextContainer: {
    flex: 1,
  },
  recommendationText: {
    fontSize: 20,
    marginBottom: 10,
  },
  yieldContainer: {
    alignItems: 'center',
    marginVertical: 2,
  },
  yieldLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  yieldValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

