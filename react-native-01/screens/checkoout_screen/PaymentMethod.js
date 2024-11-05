import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import HeaderProgress from './HeaderProgress';  
import Icon from 'react-native-vector-icons/MaterialIcons';
const PaymentScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleConfirm = () => {
    navigation.navigate('Success');
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
        
        <TouchableOpacity onPress={() => setPaymentMethod('Credit Card')} style={styles.option}>
          <Text>Credit Card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setPaymentMethod('PayPal')} style={styles.option}>
          <Text>PayPal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setPaymentMethod('Google Pay')} style={styles.option}>
          <Text>Google Pay</Text>
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
    flex: 1, // Đảm bảo chiếm hết màn hình
    backgroundColor: '#fff',
  },
  headernav: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop:20,
    justifyContent: 'space-between', 
    width: '100%',
  },
  scrollContainer: {
    padding: 20, // Khoảng cách trong ScrollView
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
  }
});

export default PaymentScreen;
