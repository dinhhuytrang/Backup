import React, { useState } from "react";
import {  View,  Text,  TextInput,  TouchableOpacity,  StyleSheet,  Image,  ScrollView,} from "react-native";
import { forgotPassword } from '../../services/Authentication';
const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const handlePasswordReset = async () => {
    try {
      const response = await forgotPassword(email);
      console.log("Đã gửi liên kết đặt lại mật khẩu:", response.data);
      navigation.navigate("Verification");
    } catch (error) {
      console.error("Lỗi khi gửi liên kết đặt lại mật khẩu:", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topSection}>
          <Image
            source={{
              uri: "https://www.tennis-point.co.uk/on/demandware.static/-/Library-Sites-TennisPoint/en_GB/dwef851813/webflow/16227/images/Performance_Logo_BWr.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subTitle}>
            Please sign up to your existing account
          </Text>
        </View>

        {/* Bottom section with white background and rounded top corners */}
        <View style={styles.bottomSection}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handlePasswordReset}
          >
            <Text style={styles.loginButtonText}>SEND</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text>Already have an account?</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1C29",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: "black",
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 125,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    fontSize: 16,
    color: "#B0B0B0",
    textAlign: "center",
    marginBottom: 10,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: "#333",
  },
  passwordContainer: {
    position: "relative",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    color: "#333",
  },
  forgotPassword: {
    color: "black",
  },
  loginButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#000",
    marginLeft: 5,
  },
});

export default ResetPasswordScreen;
