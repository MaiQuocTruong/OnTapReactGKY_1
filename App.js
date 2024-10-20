import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';  // Đường dẫn có thể thay đổi tùy vào vị trí file LoginScreen.js
import ElectronicsScreen from './screens/ElectronicsScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Electronics">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ẩn header cho màn hình đăng nhập
        />
        <Stack.Screen 
          name="Electronics" 
          component={ElectronicsScreen} 
          options={{ 
            headerTitle: '',
            headerBackTitleVisible: false, 
            headerStyle: {
              elevation: 0, 
              shadowOpacity: 0, 
              borderBottomWidth: 0, 
            },
            header: () => null,
          }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{ 
            headerTitle: '',
            headerBackTitleVisible: false, 
            headerStyle: {
              elevation: 0, 
              shadowOpacity: 0, 
              borderBottomWidth: 0, 
            },
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
