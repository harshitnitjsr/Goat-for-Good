import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalInfoScreen from './screens/PersonalInfoScreen';
import ReviewSubmitScreen from './screens/ReviewSubmitScreen';
import VisitListScreen from './screens/VisitListScreen';
import GoatDetailScreen from './screens/GoatDetailScreen';
import LoginPage from './screens/LoginPage';
import CacheListScreen from './screens/CacheListScreen';

const Stack = createStackNavigator();
export const FormContext = createContext();

const App = () => {
  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="VisitList" component={VisitListScreen} />
          <Stack.Screen name="GoatDetails" component={GoatDetailScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="ReviewSubmit" component={ReviewSubmitScreen} />
          <Stack.Screen name="CacheList" component={CacheListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FormContext.Provider>
  );
};

export default App;
