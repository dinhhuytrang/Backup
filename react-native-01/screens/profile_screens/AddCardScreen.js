import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const AddCardScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [ccv, setCcv] = useState('');
  const [exp, setExp] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handleSave = () => {
    // Implement save functionality here
    console.log('Card Saved:', { cardNumber, ccv, exp, cardholderName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilebutton}>
         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="chevron-back-outline" size={30} />
      </TouchableOpacity>
      </View>

      <Text style={styles.title}>Add Card</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="CCV"
          value={ccv}
          onChangeText={setCcv}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Exp"
          value={exp}
          onChangeText={setExp}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Cardholder Name"
        value={cardholderName}
        onChangeText={setCardholderName}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    
  },
  profilebutton:{
    marginTop:35,
    justifyContent:"flex-start"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCardScreen;
