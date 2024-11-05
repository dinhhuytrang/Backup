import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons (make sure to install expo vector icons)
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
  const [username, setUsername] = useState('yANCHUI');
  const [email, setEmail] = useState('yanchui@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+14987889999');
  const [password, setPassword] = useState('evFTbyVVCd');

  const handleUpdate = () => {
    // handle update logic here
    console.log('Profile Updated!');
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity>
          <Ionicons name="share-social" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg' }} // Placeholder image
          style={styles.avatar}
        />
        <TouchableOpacity>
          <Text style={styles.changePictureText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Email I’d</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#ffffff',
    height: 120,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40, // For status bar padding
  },
  headerTitle: {
    color: '#00000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginTop: -60,
    alignItems: 'center',
  },
  avatar: {
    marginTop:40,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  changePictureText: {
    marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
