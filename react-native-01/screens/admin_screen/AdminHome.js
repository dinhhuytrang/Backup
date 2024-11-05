import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Các màn hình mẫu
function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Thống kê</Text>
    </View>
  );
}

function RoomManagementScreen() {
  return (
    <View style={styles.screen}>
      <Text>Quản lý phòng</Text>
    </View>
  );
}

function BookingConfirmationScreen() {
  return (
    <View style={styles.screen}>
      <Text>Xác nhận đơn đặt phòng</Text>
    </View>
  );
}

function UserManagementScreen() {
  return (
    <View style={styles.screen}>
      <Text>Quản lý người dùng</Text>
    </View>
  );
}

function CancelledOrdersScreen() {
  return (
    <View style={styles.screen}>
      <Text>Đơn bị hủy</Text>
    </View>
  );
}

function LogoutScreen() {
  return (
    <View style={styles.screen}>
      <Text>Đăng Xuất</Text>
    </View>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#000',
          drawerInactiveTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#000', // Màu nền đen cho menu
            width: 240,
          },
          drawerLabelStyle: {
            color: '#fff', // Màu trắng cho chữ
          },
        }}
      >
        <Drawer.Screen name="Thống kê" component={HomeScreen} />
        <Drawer.Screen name="Quản lý phòng" component={RoomManagementScreen} />
        <Drawer.Screen name="Xác nhận đơn đặt phòng" component={BookingConfirmationScreen} />
        <Drawer.Screen name="Quản lý người dùng" component={UserManagementScreen} />
        <Drawer.Screen name="Đơn bị hủy" component={CancelledOrdersScreen} />
        <Drawer.Screen name="Đăng Xuất" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
