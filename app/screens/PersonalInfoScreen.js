import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { CheckBox, ButtonGroup } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { FormContext } from '../App';

const PersonalInfoScreen = ({ route, navigation }) => {
  const { goatId } = route.params || {};
  const { formData, setFormData } = useContext(FormContext);
  const [personalInfo, setPersonalInfo] = useState({
    goatId: goatId || '',
    health: '',
    isAlive: false,
    gender: '',
    currentWeight: '',
    breed: '',
    isPregnant: '',
    soldFor: '',
  });

  useEffect(() => {
    if (goatId) {
      setPersonalInfo((prevInfo) => ({ ...prevInfo, goatId }));
    }
  }, [goatId]);

  const handleNext = () => {
    setFormData({ ...formData, ...personalInfo });
    navigation.navigate('ReviewSubmit');
  };

  return (
    <View style={styles.container}>
      <TextInput
        editable={false}
        placeholderTextColor="white"
        style={styles.input}
        placeholder="Goat tag ID"
        value={personalInfo.goatId}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, goatId: text })}
      />

      <RNPickerSelect
        onValueChange={(value) => setPersonalInfo({ ...personalInfo, health: value })}
        items={[
          { label: 'Healthy', value: 'Healthy' },
          { label: 'Mild', value: 'Mild' },
          { label: 'Severe', value: 'Severe' },
        ]}
        placeholder={{ label: 'Select Health Status', value: null }}
        style={pickerSelectStyles}
        value={personalInfo.health}
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Gender:</Text>
        <ButtonGroup
          onPress={(selectedIndex) => setPersonalInfo({ ...personalInfo, gender: selectedIndex === 0 ? 'Male' : 'Female' })}
          selectedIndex={personalInfo.gender === 'Male' ? 0 : 1}
          buttons={['Male', 'Female']}
          containerStyle={styles.radioGroup}
        />
      </View>

      <CheckBox
        title="Is Alive"
        checked={personalInfo.isAlive}
        onPress={() => setPersonalInfo({ ...personalInfo, isAlive: !personalInfo.isAlive })}
        containerStyle={styles.checkbox}
        textStyle={styles.checkboxText}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Current Weight"
        value={personalInfo.currentWeight}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, currentWeight: text })}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Breed"
        value={personalInfo.breed}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, breed: text })}
      />
      <CheckBox
        title="Is Pregnant"
        checked={personalInfo.isPregnant}
        onPress={() => setPersonalInfo({ ...personalInfo, isPregnant: !personalInfo.isPregnant })}
        containerStyle={styles.checkbox}
        textStyle={styles.checkboxText}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Sold for?"
        value={personalInfo.soldFor}
        onChangeText={(text) => setPersonalInfo({ ...personalInfo, soldFor: text })}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#141B2D',
  },
  input: {
    height: 40,
    borderColor: '#1F2A40',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#1F2A40',
    color: '#fff',
  },
  radioContainer: {
    marginBottom: 12,
  },
  radioLabel: {
    color: '#fff',
    marginBottom: 8,
  },
  radioGroup: {
    borderColor: '#1F2A40',
  },
  checkbox: {
    backgroundColor: '#141B2D',
    borderColor: '#1F2A40',
    marginBottom: 12,
  },
  checkboxText: {
    color: '#fff',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: '#1F2A40',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#1F2A40',
    color: '#fff',
  },
  inputAndroid: {
    height: 40,
    borderColor: '#1F2A40',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#1F2A40',
    color: '#fff',
  },
});

export default PersonalInfoScreen;
