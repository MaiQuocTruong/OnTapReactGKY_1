import React, { useContext } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Platform, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Remove getTotal
  const navigation = useNavigation();

  // Tính tổng giá sản phẩm
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', '')); // Chuyển đổi giá từ chuỗi sang số
    return sum + price * item.quantity;
  }, 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Text style={styles.quantity}>x{item.quantity}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <MaterialIcons name="remove-circle" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={{ width: "100%", height: '100%' }}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cart</Text>
          </View>

          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.productList}
          />
          
          <View style={styles.voucherSection}>
            <TextInput style={styles.voucherInput} placeholder="Enter voucher code" />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalText}>TOTAL</Text>
            <Text style={styles.totalPrice}>${total.toFixed(2)}</Text> {/* Định dạng tổng giá */}
          </View>
          
          <TouchableOpacity style={styles.nextButton} onPress={() => {}} >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    marginLeft: '-3%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    marginLeft: 10,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#777',
    fontSize: 14,
  },
  price: {
    marginTop: 5,
    fontSize: 16,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  voucherSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  voucherInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: '70%',
    borderRadius: 10,
  },
  applyButton: {
    backgroundColor: '#00A8E8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#00C2FF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productList: {
    paddingHorizontal: 16,
  },
});

export default CartScreen;
