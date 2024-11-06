import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import HeaderProgress from './HeaderProgress';  // Import HeaderProgress
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useOrder } from '../../OrderContext';

const ShippingScreen = ({ navigation }) => {
  const { orderData, setOrderData } = useOrder();
  const { fullName, phoneNumber, address } = orderData;
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const userLocal = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(userLocal);

      // Automatically fill form fields if user data exists
      if (userLocal) {
        setFullName(userLocal.fullName || '');
        setPhoneNumber(userLocal.phoneNumber || '');
        setAddress(userLocal.address || '');
      }
    };
    fetchData();
  }, []);

  const handleConfirm = () => {
    if (!fullName || !phoneNumber || !address) {
      alert("Please fill in all the fields.");
      return;
    }
    setOrderData((prev) => ({
      ...prev,
      fullName,
      phoneNumber,
      address,
    }));
    navigation.navigate('Review');
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headernav}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <Icon name="shopping-cart" size={24} color="black" />
        </View>
        <HeaderProgress currentStep="Shipping" navigation={navigation} />
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={(text) => setOrderData({...orderData, fullName: text})}
          placeholder="Enter Full Name"
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setOrderData({...orderData, phoneNumber: text})}
          placeholder="+84 |"
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setOrderData({...orderData, address: text})}
          placeholder="Enter your address"
        />

        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Đảm bảo màn hình chiếm toàn bộ không gian
    backgroundColor: '#fff',
  },
  headernav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  scrollContainer: {
    padding: 20, // Đảm bảo khoảng cách đẹp cho nội dung bên trong ScrollView
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black', // Black background
    padding: 15, // Padding around the text
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center the text
    marginTop: 20, // Margin on top for spacing
  },
  buttonText: {
    color: 'white', // White text
    fontSize: 18, // Font size
    fontWeight: 'bold', // Bold text
  },
});

export default ShippingScreen;
