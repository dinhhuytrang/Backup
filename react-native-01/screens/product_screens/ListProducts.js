import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getAllListProduct} from '../../services/ListProductAPI'; 

const shop = {
  name: 'Football Club Merchandise Store',
  description: 'Find the latest Adidas jerseys from your favorite football clubs. Get your hands on authentic kits and exclusive club merchandise.',
  rating: 4.7,
  delivery: 'Gia Vien District, Ninh Binh Province, VietNam',
};

const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllListProduct(); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

 
  

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image_url }} style={styles.productImage} />

      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
        <Text style={styles.productName}>{item.name}</Text>
      </TouchableOpacity>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('ProductDetails',{ productId: item.id })} // Call handleAddToCart when button is pressed
        >
          <Text style={styles.addButtonText}>View Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Product List</Text>
        <Ionicons name="ellipsis-horizontal" size={30} />
      </View>

      <View style={styles.shopInfo}>
        <Image 
          source={{ uri: 'https://t4.ftcdn.net/jpg/02/93/41/77/360_F_293417739_ugGZF5kIW3fewcxektk2Hd2QtR1QsMGd.jpg' }} 
          style={styles.shopImage} 
        />
        <Text style={styles.shopName}>{shop.name}</Text>
        <Text style={styles.shopDescription}>{shop.description}</Text>
        <View style={styles.shopDetails}>
          <Text style={styles.detailText}>
            <Ionicons name="star" size={18} color="orange" /> {shop.rating}
          </Text>
          <Text style={styles.detailText}>
            <Ionicons name="map" size={18} color="gray" /> {shop.delivery}
          </Text>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  shopInfo: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  shopImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  shopName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  shopDescription: {
    color: 'gray',
    marginTop: 5,
  },
  shopDetails: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detailText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    fontSize: 14,
  },
  productList: {
    paddingHorizontal: 10,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  price: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ProductList;
