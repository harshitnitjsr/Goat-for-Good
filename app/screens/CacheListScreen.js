import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CacheListScreen = ({ navigation }) => {
  const [formDataList, setFormDataList] = useState([]);
  const [beneficiaryId] = useState('666df039d963f6ceeb6a2292'); // Assuming this is a constant

  useEffect(() => {
    const getFormDataFromCache = async () => {
      try {
        const storedFormData = await AsyncStorage.getItem('formData');
        if (storedFormData) {
          setFormDataList([JSON.parse(storedFormData)]);
        }
      } catch (error) {
        console.error('Failed to load form data from cache:', error);
      }
    };

    getFormDataFromCache();
  }, []);

  const handlePress = async () => {
    if (formDataList.length > 0) {
      const updatedFormData = {
        ...formDataList[0],
        paravatId: 'XWcKwN9oTfScr99ABtj0aaQH4Yd2',
        beneficiaryId: '666df039d963f6ceeb6a2292',
        date: new Date().toISOString(), // Set current date
      };

      console.log('Data:', updatedFormData);

      try {
        // const response = await axios.post('http://100.72.59.2:3080/api/v1/visit/update', updatedFormData);
        Alert.alert('Success', 'Data saved successfully');
        // Optionally, clear the cache or update the UI upon successful submission
        console.log(updatedFormData);
        await AsyncStorage.removeItem('formData');
        setFormDataList([]);
      } catch (error) {
        console.error('Failed to clear form data:', error);
      }
    }
  };

  const renderFormDataList = () => {
    return formDataList.map((formData, index) => (
      <View key={index} style={styles.formDataItem}>
        {Object.entries(formData).map(([key, value]) => {
          let displayValue = value;

          switch (key) {
            case 'currentWeight':
              displayValue = `${value} kg`;
              break;
            case 'isAlive':
              displayValue = value ? 'Yes' : 'No';
              break;
            case 'health':
            case 'gender':
              displayValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
              break;
            // Add more cases here to format other fields as needed
          }

          return (
            <Text style={styles.dataItem} key={key}>
              {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayValue}`}
            </Text>
          );
        })}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stored Form Data:</Text>
      {renderFormDataList()}
      <Button title="Submit" onPress={handlePress} />
      <Button title="Back to Home" onPress={() => navigation.navigate('VisitList', { beneficiaryIdToExclude: beneficiaryId })} />
    </ScrollView>
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
  formDataItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dataItem: {
    marginBottom: 8,
  },
});

export default CacheListScreen;
