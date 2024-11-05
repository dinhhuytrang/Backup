import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { changePassword } from '../../services/Authentication'; // Assuming this is the API to change password

const ChangePasswordScreen = ({ navigation }) => {
  const [resetCode, setResetCode] = useState(''); // State for reset code
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      if (newPassword === confirmNewPassword) {
        // Call changePassword with resetCode instead of currentPassword
        const response = await changePassword(resetCode, newPassword, confirmNewPassword);

        console.log('Password changed successfully:', response.data);
        // Navigate to the Sign In screen after successful password change
        navigation.navigate('SignIn');
      } else {
        console.error('Passwords do not match');
        // Show an error message to the user (you might want to use a Toast or Alert)
      }
    } catch (error) {
      console.error('Password change failed:', error.response ? error.response.data : error.message);
      // Show an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: 'https://www.tennis-point.co.uk/on/demandware.static/-/Library-Sites-TennisPoint/en_GB/dwef851813/webflow/16227/images/Performance_Logo_BWr.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.note}>Check the password sent to your email!</Text>
      </View>

      {/* Bottom Section with rounded top corners */}
      <View style={styles.bottomSection}>
        <Text style={styles.label}>RESET CODE</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your reset code"
          placeholderTextColor="#B0B0B0"
          value={resetCode}
          onChangeText={setResetCode}
        />

        <Text style={styles.label}>NEW PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>CONFIRM NEW PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#B0B0B0"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />

        {/* Change Password Button */}
        <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
          <Text style={styles.changeButtonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>

        {/* Log In Option */}
        <View style={styles.signInContainer}>
          <Text>Remembered your password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInText}> LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1C29', // Dark background
  },
  topSection: {
    backgroundColor: 'black',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 125,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: 'white', // White background
    borderTopLeftRadius: 30, // Rounded corners
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20, // Overlap top section slightly
  },
  label: {
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  note: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  changeButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  changeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#1B1C29',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
