import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const contributes = [
  {
    text: "NED University Of Engineering And Technology",
    image: require('../assets/NED.png'),
  },
  {
    text: "Smart City Lab, NCAI NEDUET",
    image: require('../assets/SMART.png'),
  },
  {
    text: "Pakistan Agriculture Research Council",
    image: require('../assets/PARC.jpeg'),
  },
  {
    text: "Punjab Bureau of Statistics",
    image: require('../assets/punjab.jpeg'),
  },
  
];

export default function ContributeScreen() {
  const [currentContributeIndex, setCurrentContributeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentContributeIndex((prevIndex) => (prevIndex + 1) % contributes.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.overlay}>
            <View style={styles.box}>
              <Text style={styles.title}>Our Contributors</Text>
              <Image source={contributes[currentContributeIndex].image} style={styles.contImage} />
              <Text style={styles.content}>{contributes[currentContributeIndex].text}</Text>
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
    borderWidth: 10,
    padding: 20,
    width: wp(95),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  contImage: {
    width: wp(80),
    height: hp(37),
    borderRadius: 5,
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