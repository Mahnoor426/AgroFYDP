import { Text, ImageBackground, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.overlay}>
            <View style={styles.box}>
              <Text style={styles.title}>About Us</Text>
              <Text style={styles.content}>
                Welcome to AgroOptimizer! Our mission is to revolutionize agriculture through cutting-edge technology. 
                Our app leverages advanced AI algorithms specifically designed to maximize Rabi crop yields, ensuring 
                farmers achieve the best possible harvests. With a user-friendly interface and comprehensive data analysis, 
                we provide farmers with the tools they need to optimize their farming practices and make informed decisions.
              </Text>
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
  title: {
    fontSize: wp(10),
    fontWeight: 'bold',
    color: '#02391E',
    marginBottom: 10,
  },
  content: {
    fontSize: wp(6),
    color: '#333',
    textAlign: 'center',
    justifyContent: 'center',
  },
});