import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Home');
  };

  const DoneButtonComponent = ({ onPress }) => (
    <TouchableOpacity style={styles.doneButton} onPress={onPress}>
      <Text>Done</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={DoneButtonComponent}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#4CBB17',
            image: (
              <View style={styles.lottie}>
                <Lottie style={styles.animation}
                  source={require('../assets/Animations/anime1.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Welcome to AgroOptimizer!',
            subtitle:
              'Your ultimate companion for smarter farming. Lets help you grow better crops with accurate predictions and personalized recommendations.',
          },
          {
            backgroundColor: '#90EE90',
            image: (
              <View style={styles.lottie}>
                <Lottie style={styles.animation}
                  source={require('../assets/Animations/anime2.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'How It Works',
            subtitle:
              'Just provide a few details about your field and let our advanced algorithms predict the best crops for you.',
          },
          {
            backgroundColor: '#32CD32',
            image: (
              <View style={styles.lottie}>
                <Lottie style={styles.animation}
                  source={require('../assets/Animations/anime3.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Easy Data Input',
            subtitle:
              'Enter your field details quickly and effortlessly. Our user-friendly interface ensures you spend less time on data entry and more time on farming',
          },
          {
            backgroundColor: '#90EE90',
            image: (
              <View style={styles.lottie}>
                <Lottie style={styles.animation}
                  source={require('../assets/Animations/anime4.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Ready to Begin?',
            subtitle:
              'Lets get started on your journey to better farming. Tap below to begin predicting your crops!',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    // Add any other styles you need for your button
  },
  animation: {
    width: Dimensions.get("screen").width - 60,
    height: 290,
    marginTop: 50,
  }
});
