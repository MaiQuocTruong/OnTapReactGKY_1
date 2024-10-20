import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Image, StyleSheet } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/cartItems')
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
        calculateTotal(data);
      });
  }, []);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(totalPrice);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Text style={styles.quantity}>x{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.voucherSection}>
        <TextInput style={styles.voucherInput} placeholder="Enter voucher code" />
        <Button title="Apply" onPress={() => {}} />
      </View>
      <View style={styles.totalSection}>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.totalPrice}>${total}</Text>
      </View>
      <Button title="Next" onPress={() => {}} color="#00C2FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  details: {
    flex: 1
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  description: {
    color: '#777',
    fontSize: 14
  },
  price: {
    marginTop: 5,
    fontSize: 16
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  voucherSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  voucherInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: '70%'
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CartScreen;
