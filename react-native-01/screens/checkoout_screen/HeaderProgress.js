import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon

const HeaderProgress = ({ currentStep, navigation }) => {
  return (
    <View style={styles.header}>
     
     

     
      <View style={styles.steps}>
        <View style={styles.step}>
          <Icon name="local-shipping" size={24} color={currentStep === 'Shipping' ? 'black' : 'gray'} />
          <Text style={styles.stepText}>Shipping</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.step}>
          <Icon name="check-circle" size={24} color={currentStep === 'Review' ? 'black' : 'gray'} />
          <Text style={styles.stepText}>Review</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.step}>
          <Icon name="payment" size={24} color={currentStep === 'Payment' ? 'black' : 'gray'} />
          <Text style={styles.stepText}>Payment</Text>
        </View>
        
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column', 
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headernav: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, 
  },
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20, 
  },
  step: {
    alignItems: 'center',
  },
  stepText: {
    fontSize: 12,
    color: 'gray',
  },
  line: {
    width: 30,
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
});

export default HeaderProgress;
