import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen';
import Details from '../screens/DetailsScreen';
import VideoScreen from '../screens/videoScreen';
import AudioScreen from '../screens/AudioRecording';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="AudioScreen" component={AudioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
