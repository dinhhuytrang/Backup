import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";  
import Ionicons from "react-native-vector-icons/Ionicons";  
import { useNavigation } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyAddress = () => {
  const navigation = useNavigation();

  // Initialize state for addresses
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      address: 'Gia Phong, Gia Viễn, Ninh Bình',
    },
    {
      id: '2',
      address: 'Thạch Hòa, Thạch Thất, Hà Nội',
    },
  ]);

  // Function to delete an address by ID
  const deleteAddress = (id) => {
    setAddresses((prevAddresses) => 
      prevAddresses.filter((address) => address.id !== id)
    );
  };

  // Component for rendering a single address item
  const AddressItem = ({ item }) => (
    <View style={styles.addressContainer}>
      <View style={styles.leftContainer}>
        <MaterialIcon name="home" size={24} color="#2196F3" /> 
        <View style={styles.addressInfo}>
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate("EditAddress")} style={styles.editButton}>
          <FontAwesome name="edit" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => deleteAddress(item.id)} 
        >
          <MaterialIcon name="delete" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back button */}
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
        onPress={() => navigation.navigate("AddAddressScreen")}
      >
        <Text style={styles.addButtonText}>ADD NEW ADDRESS</Text>
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
