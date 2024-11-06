import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import HeaderProgress from './HeaderProgress'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useOrder } from '../../OrderContext';

const ReviewScreen = ({ navigation }) => {
  const { orderData, setOrderData } = useOrder();

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const shippingCost = 20000;

  const fetchCart = async () => {
    try {
      const userLocal = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(userLocal);
      const cartApi = await axios.get(`http://192.168.0.102:9999/cart/${userLocal?.id}`);
      setCart(cartApi.data);
      setOrderData((prev) => ({ ...prev, cart: cartApi.data }));
    } catch (error) {
      console.error('Error fetching cart:', error.response || error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCart();
    }, [])
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };
  const subtotal = cart.reduce((sum, item) => {
    const priceWithoutDots = item.product.price
    const numericPrice = parseFloat(priceWithoutDots);
    return sum + numericPrice * item.quantity;
  }, 0);
  const total = subtotal + shippingCost;
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headernav}>
        <TouchableOpacity onPress={() => navigation.navigate("Shipping")}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <Icon name="shopping-cart" size={24} color="black" />
      </View>
      <HeaderProgress currentStep="Review" />

      {cart.map((item, index) => (
        <View key={index} style={styles.cardProduct}>
          <View style={styles.cardImage}>
            <Image source={{ uri: item.product.image_url }} style={styles.image} />
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.productName}>{item.product.name}</Text>
            <Text style={styles.itemInfo}>Size - {item.size} | Color - {item.product.color}</Text>
            <Text style={styles.itemPrice}>x {item.quantity}</Text>
            <Text style={styles.itemPrice}>
              {formatCurrency(item.product.price * item.quantity)}
            </Text>
          </View>
        </View>
      ))}

      <Text style={styles.label}>Order Summary</Text>
     
     
      <View style={styles.summary}>
        <Text>Subtotal:</Text>
        <Text>{formatCurrency(subtotal)}</Text>
      </View>
      <View style={styles.summary}>
        <Text>Shipping Fee:</Text>
        <Text>{formatCurrency(shippingCost)}</Text>
      </View>
      <View style={styles.summary}>
        <Text>Total:</Text>
        <Text>{formatCurrency(total)}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headernav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
    shadowOffset: { width: 5, height: 6 },
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
  cardDetails: {
    flexDirection: 'column',
  },
  price: {
    color: "red",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    justifyContent: "flex-end",
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemInfo: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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
});

export default ReviewScreen;
