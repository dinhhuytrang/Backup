import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import HomeScreen from './screens/bottom_tab/HomeScreens';
import FavoritesScreen from './screens/bottom_tab/FavoritesScreen';
import CartScreen from './screens/bottom_tab/CartScreen';
import ProfileScreen from './screens/bottom_tab/ProfileScreen';
import ProductDetails from './screens/product_screens/ProductsDetail';
import ProductList from './screens/product_screens/ListProducts';
import AddAddressScreen from './screens/profile_screens/AddAddressScreen';
import AddCardScreen from './screens/profile_screens/AddCardScreen';
import EditProfile from './screens/profile_screens/EditProfiile';
import SignInScreen from './screens/auth/signIn'; 
import SignUpScreen from './screens/auth/signUp'; 
import ResetPasswordScreen from './screens/auth/resetPw';
import VerificationScreen from './screens/auth/verification'; 
import ShippingScreen from './screens/checkoout_screen/ShipingDetail';
import PaymentScreen from './screens/checkoout_screen/PaymentMethod';
import ReviewScreen from './screens/checkoout_screen/Review';
import SuccessScreen from './screens/checkoout_screen/OderSucces';
import OrderHistoryScreen from './screens/profile_screens/OrderHistory';
import MyAddress from './screens/profile_screens/Address_List';
import EditAddress from './screens/profile_screens/Edit Address';
import ChangePasswordScreen from './screens/auth/changepw';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ListProductStack = createStackNavigator();
const CartStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createStackNavigator(); 

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}


function ListProductStackScreen() {
  return (
    <ListProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ListProductStack.Screen name="ListProduct" component={ProductList} options={{ title: 'Product List' }} />
      <ListProductStack.Screen name="ProductDetails" component={ProductDetails} />
    </ListProductStack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Shipping" component={ShippingScreen} />
      <CartStack.Screen name="Payment" component={PaymentScreen} />
      <CartStack.Screen name="Review" component={ReviewScreen} />
      <CartStack.Screen name="Success" component={SuccessScreen} />
    </CartStack.Navigator>
  );
}


function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="MyAddress" component={MyAddress} />
      <ProfileStack.Screen name="EditAddress" component={EditAddress} />
      <ProfileStack.Screen name="AddAddressScreen" component={AddAddressScreen} />
      <ProfileStack.Screen name="AddCardScreen" component={AddCardScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="History" component={OrderHistoryScreen} />
      <ProfileStack.Screen name="SignIn" component={SignInScreen} />
    </ProfileStack.Navigator>
  );
}


function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ListProduct') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'AddToCart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="ListProduct" component={ListProductStackScreen} />
      <Tab.Screen name="AddToCart" component={CartStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}


function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <AuthStack.Screen name="Verification" component={VerificationScreen} />
      <AuthStack.Screen name="Changepw" component={VerificationScreen}/>
      <AuthStack.Screen name="Home" component={HomeStackScreen} />
    </AuthStack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
        
        // Clear the login data temporarily
        await AsyncStorage.removeItem('isLoggedIn');
      } catch (error) {
        console.log('Error checking login status:', error);
      } finally {
        setLoading(false); 
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; 
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainApp /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
