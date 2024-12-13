import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './admin screen/SplashScreen';
import LoginScreen from './Login/LoginScreen';
import SignUpScreen from './Login/SignupScreen';
import HomeScreenAdmin from './admin screen/HomeScreenAdmin';
import ProfileScreenAdmin from './admin screen/ProfileScreenAdmin';
import PinjamanScreenAdmin from './admin screen/PinjamanScreenAdmin';
import ManageBooksScreen from './admin screen/ManageBookScreen';
import HomeScreenCustomer from './customer screen/HomeScreenCustomer';
import ProfileScreenCustomer from './customer screen/ProfileScreenCustomer';
import PinjamanScreenCustomer from './customer screen/PinjamanScreenCustomer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
        {/* Admin */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
        />
        <Stack.Screen
          name="Home Admin"
          component={HomeScreenAdmin}
        />
        <Stack.Screen
          name="Profile Admin"
          component={ProfileScreenAdmin}
        />
        <Stack.Screen
          name="Pinjaman Admin"
          component={PinjamanScreenAdmin}
        />
        <Stack.Screen
          name="ManageBooks"
          component={ManageBooksScreen}
        />
        {/* Customer */}
        <Stack.Screen
          name="Home Customer"
          component={HomeScreenCustomer}
        />
        <Stack.Screen
          name="Profile Customer"
          component={ProfileScreenCustomer}
        />
        <Stack.Screen
          name="Pinjaman Customer"
          component={PinjamanScreenCustomer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// options={{
//   title: 'Kelola Buku',
//   headerLeft: () => null, // Menghilangkan tombol panah kiri
// }}
