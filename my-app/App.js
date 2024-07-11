import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Pages/HomeScreen';
import FrontScreen from './Pages/FrontScreen';
import RabiScreen from './Pages/RabiScreen';
import TipsScreen from './Pages/TipsScreen';
import ContributeScreen from './Pages/ContributeScreen';
import AboutScreen from './Pages/AboutScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailScreen from './Pages/DetailScreen';
import SampleScreen from './Pages/SampleScreen';
import ServicesScreen from './Pages/ServicesScreen';
import ContactScreen from './Pages/ContactScreen';
import OnboardingScreen from './Pages/OnboardingScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'call' : 'call-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'Details') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#daa520',
        tabBarInactiveTintColor: 'gray',
      })}>

      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Services" component={ServicesScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Details" component={DetailScreen}  options={{ headerShown: false }}/>
      <Tab.Screen name="Contact" component={ContactScreen}  options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName= 'Front'>
      <Stack.Screen name="Front" component={FrontScreen} screenOptions={{ headerShown: false}} />
      <Stack.Screen name="Home" component={MainTabs} screenOptions={{ headerShown: false}} />
      <Stack.Screen name="SampleScreen" component={SampleScreen} options={{ headerShown: false }}/>   
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>   
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Rabi" component={RabiScreen} />
      <Stack.Screen name="Tips" component={TipsScreen} />
      <Stack.Screen name="Contribute" component={ContributeScreen} />
    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
