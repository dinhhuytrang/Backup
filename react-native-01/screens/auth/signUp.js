import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Top section with black background, white text, and logo */}
        <View style={styles.topSection}>
          <Image
            source={{ uri: 'https://www.tennis-point.co.uk/on/demandware.static/-/Library-Sites-TennisPoint/en_GB/dwef851813/webflow/16227/images/Performance_Logo_BWr.png' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subTitle}>Please sign up to your existing account</Text>
        </View>

        {/* Bottom section with white background and rounded top corners */}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#B0B0B0"
            keyboardType="default"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="********"
              placeholderTextColor="#B0B0B0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="********"
              placeholderTextColor="#B0B0B0"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUpText}> LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  passwordContainer: {
    position: 'relative',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#333',
  },
  forgotPassword: {
    color: 'black',
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#000',
    marginLeft: 5,
  },
});

export default SignUpScreen;
