import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormContext } from '../App';

const ReviewSubmitScreen = ({ navigation }) => {
  const { formData } = useContext(FormContext);

  useEffect(() => {
    const saveFormDataToCache = async () => {
      try {
        console.log('formData:', formData); // Check formData content
        await AsyncStorage.setItem('formData', JSON.stringify(formData));
        console.log('Form data saved successfully.');
      } catch (error) {
        console.error('Failed to save form data to cache:', error);
        // Optionally, alert the user or retry saving the data
      }
    };

    saveFormDataToCache();
  }, [formData]);

  const handleSubmit = () => {
    navigation.navigate('CacheList');
  };

  const renderFormData = () => {
    return Object.entries(formData).map(([key, value]) => {
      let displayValue = value;

      switch (key) {
        case 'currentWeight':
          displayValue = `${value} kg`;
          break;
        case 'isAlive':
          displayValue = value ? 'Yes' : 'No';
          break;
        case 'gender':
          displayValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
          break;
        case 'health':
          displayValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
          break;
        // Add more cases here to format other fields as needed
      }

      return (
        <Text style={styles.dataItem} key={key}>
          {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayValue}`}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Data:</Text>
      <View style={styles.dataContainer}>{renderFormData()}</View>
      <Button title="Save data" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dataContainer: {
    marginBottom: 20,
  },
  dataItem: {
    marginBottom: 8,
  },
});

export default ReviewSubmitScreen;
