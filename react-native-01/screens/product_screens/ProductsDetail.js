import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getProductByID, getToCart } from "../../services/ListProductAPI"; 

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      // console.log("Fetching product details for ID:", productId);
      try {
        const response = await getProductByID(productId);
        // console.log("API response:", response);

        if (response.data) {
          setProduct(response.data); // Assuming response.data is the product object
        } else {
          setError(new Error("Product not found or empty response"));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleNextImage = () => {
    if (product && product.gallery) {
      setCurrentImageIndex((prevIndex) => (prevIndex === product.gallery.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handlePrevImage = () => {
    if (product && product.gallery) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.gallery.length - 1 : prevIndex - 1));
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    const productToAdd = {
      id: product._id, // Adjust according to your product structure
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: product.color,
      image: product.image_url,
      quantity: 1,
    };

    try {
      await getToCart(productToAdd);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching product details: {error.message}</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }
  const MAX_DESCRIPTION_LENGTH = 100;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ListProduct")}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <Icon name="heart-outline" size={30} color="#000" />
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handlePrevImage}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>

        <Image
          style={styles.productImage}
          source={{ uri: product.gallery[currentImageIndex] }}
        />

        <TouchableOpacity onPress={handleNextImage}>
          <Icon name="chevron-forward" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        {/* <Text style={styles.category}>{product.category_id}</Text> */}
        <Text style={styles.productTitle}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{product.rating || "N/A"}</Text>
        </View>

        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.productDescription}>
          {isDescriptionExpanded
            ? product.description
            : `${product.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`}
        </Text>

        <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
          <Text style={styles.readMoreText}>
            {isDescriptionExpanded ? "Read Less" : "Read More"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Color: {product.color}</Text>

        <Text style={styles.sectionTitle}>Select Size</Text>
        <View style={styles.sizeRow}>
          {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
            <TouchableOpacity
              key={size} // Use size as key for uniqueness
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.selectedSizeButtonText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sizeGuide} onPress={() => setIsModalVisible(true)}>
          Size guide
        </Text>

        <View style={styles.footer}>
          <Text style={styles.totalPrice}>
            Total Price: {product.price} VND
          </Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Icon name="cart-outline" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Size Guide</Text>

            <ScrollView horizontal={true} style={styles.scrollView}>
              <View style={styles.table}>
                <View style={[styles.tableRow, { backgroundColor: "#dedfe4" }]}>
                  <Text style={[styles.tableHeader, styles.borderCell, styles.smallColumn]}>S</Text>
                  <Text style={[styles.tableHeader, styles.borderCell, styles.smallColumn]}>M</Text>
                  <Text style={[styles.tableHeader, styles.borderCell, styles.smallColumn]}>L</Text>
                  <Text style={[styles.tableHeader, styles.borderCell, styles.smallColumn]}>XL</Text>
                  <Text style={[styles.tableHeader, styles.borderCell, styles.smallColumn]}>2XL</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.borderCell, styles.smallColumn]}>87 - 92 cm</Text>
                  <Text style={[styles.tableCell, styles.borderCell, styles.smallColumn]}>93 - 100 cm</Text>
                  <Text style={[styles.tableCell, styles.borderCell, styles.smallColumn]}>101 - 108 cm</Text>
                  <Text style={[styles.tableCell, styles.borderCell, styles.smallColumn]}>109 - 118 cm</Text>
                  <Text style={[styles.tableCell, styles.borderCell, styles.smallColumn]}>119 - 130 cm</Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 15,
  },
  category: {
    color: "gray",
    fontSize: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  readMoreText: {
    color: "blue", 
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  sizeRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  selectedSizeButton: {
    backgroundColor: "black",
  },
  sizeButtonText: {
    fontSize: 16,
  },
  selectedSizeButtonText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  totalPrice: {
    marginLeft:-10,
    marginRight:5,
    fontSize: 20,
    fontWeight: "bold",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  addToCartText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  borderCell: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    fontWeight: "bold",
    padding: 5,
  },
  tableCell: {
    padding: 5,
  },
  smallColumn: {
    width: "20%",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  sizeGuide: {
    color: "black",
    textDecorationLine: "underline",
    marginVertical: 10,
    backgroundColor:"black",
    color: "white",
    padding: 5,
    borderRadius: 5,
    width:100,
    borderWidth: 1,
    textAlign:"center",
    fontSize: 16,
  },
});

