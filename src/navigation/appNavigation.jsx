import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../pages/HomeScreen/homescreen.jsx'
import MovieScreen from "../pages/MovieScreen/moviescreen.jsx";
import SearchScreen from "../pages/SearchScreen/searchscreen.jsx";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
            <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
            <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }