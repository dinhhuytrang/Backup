import React, { useState } from 'react';
import { Modal, View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const SizeGuide = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button to open the size guide */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.linkText}>Click here for size guide</Text>
      </TouchableOpacity>

      {/* Modal for the size guide */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Size Guide</Text>
            {/* Your size guide content */}
            <Text style={styles.guideText}>
              S - Small: 28-30 inches
              M - Medium: 32-34 inches
              L - Large: 36-38 inches
              {/* Add more size info here */}
            </Text>

            {/* Button to close the modal */}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  guideText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default SizeGuide;
