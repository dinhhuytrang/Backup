import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import HeaderProgress from './HeaderProgress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useOrder } from '../../OrderContext';
import axios from 'axios';

const PaymentScreen = ({ navigation }) => {
  const { orderData, setOrderData } = useOrder();
  const { paymentMethod } = orderData;


  const handleConfirm = async () => {
    // Save payment details in context
    setOrderData((prev) => ({
      ...prev,
      paymentMethod
    }));
    console.log(orderData);
    
    // Now send all `orderData` to the server
    try {
      await axios.post('http://192.168.0.102:9999/order/create', orderData);
      navigation.navigate('Success');
    } catch (error) {
      console.error('Error saving order:', error.response||error.message);
    }
  };
  const handlePaymentMethodChange = (method) => {
    setOrderData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headernav}>
          <TouchableOpacity onPress={() => navigation.navigate("Review")}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
          <Icon name="shopping-cart" size={24} color="black" />
        </View>
        <HeaderProgress currentStep="Payment" navigation={navigation} />

        <Text style={styles.label}>Select a Payment Method</Text>

        <TouchableOpacity
          onPress={() => handlePaymentMethodChange('Credit Card')}
          style={[
            styles.option,
            paymentMethod === 'Credit Card' && styles.selectedOption // Highlight if selected
          ]}
        >
          <Text style={paymentMethod === 'Credit Card' ? styles.selectedText : null}>Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePaymentMethodChange('cod')}
          style={[
            styles.option,
            paymentMethod === 'cod' && styles.selectedOption // Highlight if selected
          ]}
        >
          <Text style={paymentMethod === 'cod' ? styles.selectedText : null}>Thanh toán khi nhận hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePaymentMethodChange('Google Pay')}
          style={[
            styles.option,
            paymentMethod === 'Google Pay' && styles.selectedOption // Highlight if selected
          ]}
        >
          <Text style={paymentMethod === 'Google Pay' ? styles.selectedText : null}>Google Pay</Text>
        </TouchableOpacity>

        {paymentMethod === 'Credit Card' && (
          <View>
            <Text style={styles.label}>Card Holder Name</Text>
            <TextInput
              value={cardName}
              onChangeText={setCardName}
              style={styles.input}
              placeholder="Enter card holder name"
            />
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              value={cardNumber}
              onChangeText={setCardNumber}
              style={styles.input}
              placeholder="Enter card number"
              keyboardType="number-pad"
            />
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              value={expiryDate}
              onChangeText={setExpiryDate}
              style={styles.input}
              placeholder="MM/YY"
            />
            <Text style={styles.label}>CVV</Text>
            <TextInput
              value={cvv}
              onChangeText={setCvv}
              style={styles.input}
              placeholder="CVV"
              secureTextEntry
              keyboardType="number-pad"
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  option: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#c8e6c9', // Light green background for selected option
    borderWidth: 1,
    borderColor: '#4caf50', // Green border for selected option
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#4caf50', // Green text for selected option
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default PaymentScreen;
