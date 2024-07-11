import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Details() {
  const navigation = useNavigation();

  const [divisionName, setDivisionName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [year, setYear] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [ph, setPh] = useState('');
  const [area, setArea] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const fields = [
    [
      { label: 'Enter Division Name', value: divisionName, placeholder: 'Division Name                        ڈویژن کا نام', setter: setDivisionName, keyboardType: 'default', regex: /^[A-Za-z\s]+$/ },
      { label: 'District Name', value: districtName, placeholder: 'District Name                                      ضلع کا نام', setter: setDistrictName, keyboardType: 'default', regex: /^[A-Za-z\s]+$/ },
      { label: 'Year', value: year, placeholder: 'Year                                          سال', setter: setYear, keyboardType: 'numeric', regex: /^\d{4}$/ },
    ],
    [
      { label: 'Temperature-Max', value: tempMax, placeholder: 'Temp-MAX  زیادہ سے زیادہ درجہ حرارت', setter: setTempMax, keyboardType: 'numeric', regex: /^-?\d+(\.\d+)?$/ },
      { label: 'Temperature-Min', value: tempMin, placeholder: 'Temp-MIN     کم از کم درجہ حرارت', setter: setTempMin, keyboardType: 'numeric', regex: /^-?\d+(\.\d+)?$/ },
      { label: 'Rainfall in mm', value: rainfall, placeholder: 'Rain in mm      ملی میٹر میں بارش', setter: setRainfall, keyboardType: 'numeric', regex: /^\d+(\.\d+)?$/ },
    ],
    [
      { label: 'pH', value: ph, placeholder: 'pH                                                     پی ایچ', setter: setPh, keyboardType: 'numeric', regex: /^\d+(\.\d+)?$/ },
      { label: 'Area', value: area, placeholder: 'Area                                                       رقبہ', setter: setArea, keyboardType: 'numeric', regex: /^\d+(\.\d+)?$/ },
    ]
  ];

  const validateField = (value, regex) => {
    return regex.test(value);
  };

  const validateAndNavigate = () => {
    for (const group of fields) {
      for (const field of group) {
        if (!field.value.trim() || !validateField(field.value, field.regex)) {
          setErrorMessage(`Invalid input in field: ${field.label}`);
          return;
        }
      }
    }
    setErrorMessage(''); // Clear the error message if validation passes
    goToSampleScreen();
  };

  const nextStep = () => {
    for (const field of fields[currentStep]) {
      if (!field.value.trim() || !validateField(field.value, field.regex)) {
        setErrorMessage(`Invalid input in field: ${field.label}`);
        return;
      }
    }
    setErrorMessage('');
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      validateAndNavigate();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToSampleScreen = () => {
    const inputData = {
      division_name: divisionName,
      district_name: districtName,
      year: year,
      temperature_max: tempMax,
      temperature_min: tempMin,
      rainfall_in_mm: rainfall,
      area: area,
      ph: ph
    };

    console.log('Sending data to backend:', inputData); // Log the input data being sent
    axios.post('http://10.0.2.2:5000/predict', inputData) // Replace with your actual backend IP
      .then(response => {
        console.log('Backend response:', response.data); // Log the backend response to check
        const { predicted_crop, predicted_yield } = response.data;
        navigation.navigate('SampleScreen', {
          predictedCrop: predicted_crop,
          predictedYield: predicted_yield
        });
      })
      .catch(error => {
        console.error('Error in Axios request:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={styles.title}>Submit Your Details</Text>
            {fields[currentStep].map((field, index) => (
              <View key={index} style={styles.text1}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChangeText={field.setter}
                  keyboardType={field.keyboardType}
                />
              </View>
            ))}
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <View style={currentStep === 0 ? styles.centeredButtonContainer : styles.buttonContainer}>
              {currentStep > 0 && (
                <TouchableOpacity onPress={prevStep} style={styles.button}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={nextStep} style={styles.button}>
                <Text style={styles.buttonText}>
                  {currentStep < fields.length - 1 ? 'Next' : 'Predict'}
                </Text>
              </TouchableOpacity>
            </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  centeredButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    margin: 2,
    backgroundColor: '#A2E284',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: wp(40),
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text1: {
    top: 20,
    color: '#02391E',
    width: '100%', // Ensures the text input takes full width
  },
  title: {
    top: 10,
    fontSize: 30,
    color: '#02391E',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02391E',
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cccccc',
    width: '100%', // Makes the input field responsive to the parent container width
    padding: 20,
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});


