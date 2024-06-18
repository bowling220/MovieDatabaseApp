// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Search from './Search';
import Details from './Details';
import CastDetails from './CastDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={Search} options={{ title: 'Movie Search' }} />
          <Stack.Screen name="Details" component={Details} options={{ title: 'Movie Details' }} />
          <Stack.Screen name="CastDetails" component={CastDetails} options={{ title: 'Cast Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
