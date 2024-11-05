import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateProfile, viewProfile } from '../../services/UserAPI';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [user, setUser] = useState()
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"))
      setUser(user)
      if (!user) {
        navigation.navigate('SignIn');
        return;
      }

      const response = await viewProfile(user.id);
      if (response && response.data) {
        setProfileData({
          username: response.data.username || '',
          email: response.data.email || '',
          phoneNumber: response.data.phoneNumber || '',
          address: response.data.address || '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error.message);
      Alert.alert('Error', 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setUser(user);
      
      if (!user) {
        navigation.navigate('SignIn');
        return;
      }
  
      await updateProfile(user.id, profileData);
      Alert.alert('Success', 'Profile updated successfully');
      navigation.navigate('Profile')
    } catch (error) {
      console.error('Failed to update profile:', error.message);
      Alert.alert('Error', 'Failed to update profile');
    }
  };
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg' }}
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
          value={profileData.username}
          onChangeText={(value) => setProfileData({ ...profileData, username: value })}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profileData.email}
          onChangeText={(value) => setProfileData({ ...profileData, email: value })}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={profileData.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={(value) => setProfileData({ ...profileData, phoneNumber: value })}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={profileData.address}
          onChangeText={(value) => setProfileData({ ...profileData, address: value })}
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
    marginTop: 40,
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
