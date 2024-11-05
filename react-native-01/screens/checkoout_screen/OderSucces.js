import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,Image } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

const OrderSuccessScreen = ({ navigation }) => {
  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
        <View style={styles.headernav}>
        <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
          <Icon name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <Icon name="shopping-cart" size={24} color="black" />
      </View>
      <Image source={require('../../assets/ordersucces.png')} style={styles.image} />
      <Text style={styles.successMessage}>Your order has been placed successfully!</Text>
      <Text style={styles.details}>
        Thank you for choosing us! Feel free to continue shopping and explore our wide range of products. Happy Shopping!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContinueShopping}>
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
   
    padding: 20,
  },
  headernav: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop:20,
    justifyContent: 'space-between', 
    width: '100%',
  },
  successMessage: {
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
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
  },
  image: {
    width: '100%', 
    marginTop:100,
    height: 200, 
    resizeMode: 'contain', 
    marginBottom: 20,
  },
});

export default OrderSuccessScreen;
