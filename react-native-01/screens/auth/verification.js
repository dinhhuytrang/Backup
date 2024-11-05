import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const VerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(120);

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

  const handleVerify = () => {
    console.log('Verification code:', code.join(''));
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

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
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
  subtitle: {
    color: '#B0B0B0',
    textAlign: 'center',
    marginTop: 10,
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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    backgroundColor: '#F1F1F1',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 10,
    color: '#333',
  },
  resendText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
