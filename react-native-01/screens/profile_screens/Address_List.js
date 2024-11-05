import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";  
import Ionicons from "react-native-vector-icons/Ionicons";  
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { viewAddress, deleteAddress } from '../../services/UserAPI'; 

const MyAddress = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndAddresses = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(user);
      if (!user) {
        navigation.navigate('SignIn');
        return;
      }
  
      try {
        const response = await viewAddress(user.id);
        // Handle case where response data has an `addresses` property.
        const addressData = response.data.addresses
          ? Array.isArray(response.data.addresses)
            ? response.data.addresses
            : [{ id: "1", address: response.data.addresses }] // If single address, wrap in an array
          : [];
        setAddresses(addressData);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };
  
    fetchUserAndAddresses();
  }, []);
  

  

  const AddressItem = ({ item }) => (
    <View style={styles.addressContainer}>
      <View style={styles.leftContainer}>
        <MaterialIcon name="home" size={24} color="#2196F3" /> 
        <View style={styles.addressInfo}>
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profilebutton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>My Address</Text>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AddressItem item={item} />}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.addButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  profilebutton: {
    marginTop: 35,
    justifyContent: "flex-start",
    marginBottom: 20,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 35,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#E7F0FE",
    borderRadius: 8,
    marginBottom: 20,
  },
  leftContainer: {
    flexDirection: "column",
  },
  addressInfo: {
    width: 250,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
  },
  rightContainer: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {},
  addButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyAddress;
