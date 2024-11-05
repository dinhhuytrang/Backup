import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const orders = [
  {
    id: "10001",
    name: "Real Madrid Jersey 2023",
    price: 75.0,
    date: "12 FEB, 15:45",
    items: 1,
    orderStatus: "Delivered",
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/486d1232144c454ba6b9cd03a1ef4753_9366/Real_Madrid_24-25_Home_Jersey_White_IU5011_HM30.jpg", // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: "10002",
    name: "Barcelona Jersey 2023",
    price: 78.5,
    date: "14 FEB, 10:30",
    items: 1,
    orderStatus: "Canceled",
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b38cbf7df9c04f92bb509a7357898535_9366/Juventus_24-25_Home_Jersey_White_IS8002_HM30.jpg", // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: "10003",
    name: "Manchester United Shorts",
    price: 40.0,
    date: "16 FEB, 17:20",
    items: 2,
    orderStatus: "Shipped",
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/017bd9fc18c941bc8fbfac62db414c7e_9366/Arsenal_24-25_Home_Jersey_Red_IT6141_HM30.jpg", // Thay thế bằng URL hình ảnh thực tế
  },
];

const OrderItem = ({ item }) => (
  <View style={styles.orderContainer}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.price}>{item.price} VNĐ</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.items}>{item.items} Items</Text>
      <Text
        style={[
          styles.orderStatus,
          item.orderStatus === "Delivered"
            ? styles.completed
            : item.orderStatus === "Canceled"
            ? styles.canceled
            : styles.shipped,
        ]}
      >
        {item.orderStatus}
      </Text>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.rateButton}>
          <Text style={styles.buttonText}>Rate</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.buttonText}>Re-Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* Header Navigation */}
      <View style={styles.headernav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
        <Icon name="shopping-cart" size={24} color="black" />
      </View>

      {/* Order List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  items: {
    fontSize: 12,
    color: "#888",
  },
  orderStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  completed: {
    color: "green",
  },
  canceled: {
    color: "red",
  },
  shipped: {
    color: "blue",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  rateButton: {
    borderWidth: 1,
    borderColor: "#FF9800",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  reorderButton: {
    backgroundColor: "black",
    justifyContent:"flex-end",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  headernav: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderHistoryScreen;
