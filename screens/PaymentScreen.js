import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://localhost:3000/paymentMethods')
      .then(response => {
        setPaymentMethods(response.data);
        const selected = response.data.find(method => method.selected);
        setSelectedMethod(selected?.id || null);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSelectMethod = (id) => {
    setSelectedMethod(id);
  };

  const renderPaymentMethod = ({ item }) => {
    const isSelected = selectedMethod === item.id;

    return (
      <TouchableOpacity
        style={[styles.paymentMethod, isSelected && styles.selectedMethod]}
        onPress={() => handleSelectMethod(item.id)}
      >
        <Image
          style={styles.logo}
          source={
            item.brand === 'visa'
              ? require('../assets/Data/visa.png')
              : item.brand === 'mastercard'
              ? require('../assets/Data/mastercard.png')
              : require('../assets/Data/paypal.png')
          }
        />
        <Text style={styles.cardInfo}>
          {item.type === 'PayPal' ? item.email : `****** ${item.number}`}
        </Text>
        <View style={styles.radioButtonContainer}>
          <View style={[styles.radioButton, isSelected ? styles.selectedRadioButton : styles.defaultRadioButton]}>
            {isSelected && <View style={styles.radioButtonInner} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000"/>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>
        <Text style={styles.totalText}>TOTAL</Text>
        <Text style={styles.amountText}>$3,080</Text>
        
        <View style={styles.paymentContainer}>
          <FlatList
            data={paymentMethods}
            renderItem={renderPaymentMethod}
            keyExtractor={item => item.id.toString()}
            style={styles.paymentList}
          />
          <TouchableOpacity style={styles.payButton}>
            <MaterialIcons name="payment" size={24} color="#fff" style={styles.icon}/>
            <Text style={styles.payButtonText}>Pay now</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'flex-start', 
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
  totalText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  amountText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentList: {
    marginVertical: 20,
    width: '100%',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '100%',
  },
  selectedMethod: {
    borderColor: '#FF5722',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: 'contain',
  },
  cardInfo: {
    fontSize: 18,
    flex: 1,
  },
  payButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },  
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  defaultRadioButton: {
    borderWidth: 2,
    borderColor: '#ddd',
  },
  radioButtonInner: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#FF5722',
  },
});

export default PaymentScreen;
