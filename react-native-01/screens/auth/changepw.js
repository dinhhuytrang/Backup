import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { changePassword } from '../../services/Authentication'; 

const ChangePasswordScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleCodeInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleVerifyAndChangePassword = async () => {
    try {
      const verificationCode = code.join('');
      await verifyCode(verificationCode); // Verify the code first

      if (newPassword === confirmNewPassword) {
        // Call changePassword API with the code, newPassword, and confirmNewPassword
        await changePassword(newPassword, confirmNewPassword, verificationCode);
        console.log('Password change successful');
        navigation.navigate('SignIn'); 
      } else {
        console.error('Passwords do not match');
        // Optionally, display an error message to the user here
      }
    } catch (error) {
      console.error('Verification or Password Change Failed:', error.response ? error.response.data : error.message);
      // Optionally, display an error message to the user here
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
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          We have sent a code to your email {'\n'} example@gmail.com
        </Text>
      </View>

      {/* Bottom Section with rounded top corners */}
      <View style={styles.bottomSection}>
        <Text style={styles.label}>CODE</Text>
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={text => handleCodeInput(text, index)}
            />
          ))}
        </View>
        <TouchableOpacity disabled={timer > 0} onPress={() => setTimer(120)}>
          <Text style={styles.resendText}>Resend {timer > 0 ? `in ${timer} sec` : ''}</Text>
        </TouchableOpacity>

        {/* New Password Section */}
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

        {/* Verify and Change Password Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyAndChangePassword}>
          <Text style={styles.verifyButtonText}>VERIFY AND CHANGE PASSWORD</Text>
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
    backgroundColor: '#1B1C29',
  },
  scrollViewContent: {
    flexGrow: 1,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 10,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#333',
  },
  changePasswordButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  changePasswordButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#000',
    marginLeft: 5,
  },
});

export default ChangePasswordScreen;
