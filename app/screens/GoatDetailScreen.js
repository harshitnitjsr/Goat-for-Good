import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoatDetailScreen = ({ route }) => {
  const { beneficiary } = route.params;
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('PersonalInfo');
  }

  const handleGoatPress = (goatId) => {
    navigation.navigate('PersonalInfo', { goatId });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for {beneficiary.name}</Text>
      <Text style={styles.subtitle}>Address: {beneficiary.address}</Text>
      <Text style={styles.subtitle}>Phone Number: {beneficiary.PhoneNumber}</Text>
      <Text style={styles.subtitle}>Location: {beneficiary.latitude}, {beneficiary.longitude}</Text>
      <Text style={styles.subtitle}>Goats:</Text>
      <FlatList
        data={beneficiary.Goats}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleGoatPress(item)}>
            <View style={styles.goatItem}>
              <Text style={styles.goatDetails}>Tag: {item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Goat" onPress={handleNext} />
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
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  goatItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  goatDetails: {
    fontSize: 14,
    color: '#333',
  },
});

export default GoatDetailScreen;
