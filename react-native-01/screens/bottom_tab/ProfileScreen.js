import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
  const profileData = {
    name: 'RYAN HIERRO',
    email: 'hierroryan@gmail.com',
    phone: '121-224-7890',
    imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg' // You can replace this with the actual image URL
  };
const navigation = useNavigation();
  const menuItems = [
    { id: '1', title: 'Address', screen: 'MyAddress' }, 
    { id: '2', title: 'Card', screen: 'AddCardScreen' },
    { id: '3', title: 'Payment', screen: 'Payment' },
    { id: '4', title: 'Order History', screen: 'History' },
    { id: '5', title: 'Support', screen: 'Support' },
  ];
  
  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.screen)} 
    >
      <Text style={styles.menuItemText}>{item.title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Ionicons name="chevron-back-outline" size={30} />
          </TouchableOpacity>
        

        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="ellipsis-horizontal" size={30} />
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileData.imageUrl }} style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
          <Text style={styles.profilePhone}>{profileData.phone}</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={styles.menuList}
      />

      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
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
  header: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#888',
    marginVertical: 3,
  },
  profilePhone: {
    color: '#888',
  },
  editText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  signOutButton: {
    marginTop: 10,
    marginBottom:20,
    alignItems: 'center',
  },
  signOutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
