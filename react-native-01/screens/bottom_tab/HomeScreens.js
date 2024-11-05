import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAllListProduct, getAllClub } from '../../services/ListProductAPI';
const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const HomeScreen = ({ navigation }) => {
  const scrollRef = useRef(null);
  const [club, setClub] = useState([]); // Clubs state
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await getAllClub(); 
        setClub(response.data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getAllListProduct(); 
        setFeaturedItems(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchClubs();
    fetchProducts();
  }, []);
  

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -100 : 100;
    scrollRef.current.scrollTo({ x: scrollAmount, animated: true });
  };

  const featuredChunks = chunkArray(featuredItems, 3); // Split featured items into rows of 3

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello Trang,</Text>
        <Text style={styles.welcomeSubText}>Welcome</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("Cart")} style={styles.cartIcon}>
          <Icon name="shopping-cart" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Search</Text>
      </View>

      {/* Clubs Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>FIND YOUR TEAM</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ListProduct')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {/* Scroll Left Button */}
        <TouchableOpacity onPress={() => scroll('left')} style={styles.scrollButton}>
          <Icon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>

        {/* Horizontal Clubs List */}
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {club.map((item) => (
            <View key={item.id} style={styles.categoryItem}>
              <Image source={{ uri: item.logo_url }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Scroll Right Button */}
        <TouchableOpacity onPress={() => scroll('right')} style={styles.scrollButton}>
          <Icon name="chevron-right" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Big Sale Banner */}
      <View style={styles.saleBanner}>
        <Image source={{ uri: 'https://img.freepik.com/premium-vector/halloween-sale-horizontal-banner-with-with-monster-pumpkins-inviting-shopping-with-big-discounts-template-web-poster-flyers-ad-promotions-blogs-social-media-marketing-vector-illustration_1436-713.jpg' }} style={styles.saleImage} />
      </View>

      {/* Featured Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ListProduct')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Items List */}
      <FlatList
        data={featuredChunks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.featuredRow}>
            {item.map((product) => (
              <View key={product.id} style={styles.featuredItem}>
                <Image source={{ uri: product.image_url }} style={styles.featuredImage} />
                <Text style={styles.featuredText}>{product.name}</Text>
                <Text style={styles.featuredPrice}>{product.price} đ</Text>
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
  },
  welcomeSubText: {
    fontSize: 16,
    color: '#888',
  },
  cartIcon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  searchText: {
    marginLeft: 10,
    color: '#888',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    color: '#007bff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollButton: {
    padding: 2,
    opacity:0.2
  },
  categoriesList: {
    flexDirection: 'row',
  },
  categoryItem: {
    marginRight: 8.7,
    alignItems: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  saleBanner: {
    marginBottom: 20,
  },
  saleImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  featuredRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featuredItem: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  featuredText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  featuredPrice: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
