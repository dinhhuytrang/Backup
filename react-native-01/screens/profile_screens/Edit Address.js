import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const EditAddress = () => {
  const navigation = useNavigation();
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [commune, setCommune] = useState("");

  const handleSave = () => {
    // Implement save functionality here
    console.log("Address Saved:", { street, district, village, commune });
    // You can navigate back or show a success message after saving
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilebutton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Street Name"
        value={street}
        onChangeText={setStreet}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter District Name"
        value={district}
        onChangeText={setDistrict}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Enter Village"
          value={village}
          onChangeText={setVillage}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Enter Commune Name"
          value={commune}
          onChangeText={setCommune}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  profilebutton: {
    marginTop: 35,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  saveButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditAddress;
