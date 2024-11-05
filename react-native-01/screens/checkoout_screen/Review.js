import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,Image } from 'react-native';
import HeaderProgress from './HeaderProgress';  // Import HeaderProgress
import  Icon  from 'react-native-vector-icons/MaterialIcons';
const ReviewScreen = ({ navigation }) => {
  const handleConfirmOrder = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
         <View style={styles.headernav}>
        <TouchableOpacity onPress={() => navigation.navigate("Shipping")}>
          <Icon name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <Icon name="shopping-cart" size={24} color="black" />
      </View>
      <HeaderProgress currentStep="Review" />  


      <View style={styles.cardProduct}>
        <View style={styles.cardImage}>
          <Image source={{uri: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/486d1232144c454ba6b9cd03a1ef4753_9366/Real_Madrid_24-25_Home_Jersey_White_IU5011_HM30.jpg'}} style={styles.image} />
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.productName}>Real Madrid Kit Home Jeysey</Text>
          <Text style={styles.price}>$100</Text>
        </View>
      </View>
      <Text style={styles.label}>Order Summary</Text>
      <View style={styles.item}>
        <Text>Modern Chair</Text>
        <Text>$100</Text>
      </View>
      <View style={styles.item}>
        <Text>Vintage Chair</Text>
        <Text>$100</Text>
      </View>
      <View style={styles.summary}>
        <Text>Total:</Text>
        <Text>$200</Text>
      </View>
      <View style={styles.summary}>
        <Text>Shipping Fee:</Text>
        <Text>$10</Text>
      </View>
      <View style={styles.summary}>
        <Text>Subtotal:</Text>
        <Text>$210</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headernav: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop:20,
    justifyContent: 'space-between', 
    width: '100%',
  },
  cardProduct: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    backgroundColor: '#fff', 
    
    shadowColor: '#878484', 
    shadowOffset: {
      width: 5,
      height: 6, 
    },
    shadowOpacity: 1, 
    shadowRadius: 10, 
    
    elevation: 10, 
  },
  cardImage: {
    width: 100, 
    height: 100, 
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10, 
    
  },
  image: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain', 
  },
  cardDetails:{
    flexDirection: 'column',
  },
  price:{
    color:"red",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    justifyContent:"flex-end"
  },
  productName:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    fontWeight: 'bold',
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

export default ReviewScreen;
