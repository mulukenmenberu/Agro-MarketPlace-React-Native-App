// Import necessary modules
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';

// CheckoutPage component
const CheckoutPage = ({ navigation }) => {
  // State to store selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Function to handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Function to proceed to payment
  const handleProceedToPayment = () => {
    // You can implement your payment processing logic here
    // For this example, we'll just navigate to a confirmation screen
    navigation.navigate('OrderConfirmation', {
      paymentMethod: selectedPaymentMethod,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.paymentMethodsContainer}>
        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'credit_card'
              ? styles.selectedPaymentMethod
              : null,
          ]}
          onPress={() => handlePaymentMethodSelect('credit_card')}
        >
          <Text style={styles.paymentMethodText}>Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentMethod,
            selectedPaymentMethod === 'paypal' ? styles.selectedPaymentMethod : null,
          ]}
          onPress={() => handlePaymentMethodSelect('paypal')}
        >
          <Text style={styles.paymentMethodText}>PayPal</Text>
        </TouchableOpacity>

        {/* Add more payment methods here */}
      </View>

      <Input
        placeholder="Card Number"
        leftIcon={{ type: 'font-awesome', name: 'credit-card' }}
        containerStyle={styles.inputContainer}
      />
      {/* Add more input fields for card expiry, CVV, etc. */}

      <Button
        title="Proceed to Payment"
        onPress={handleProceedToPayment}
        disabled={!selectedPaymentMethod}
        buttonStyle={styles.proceedButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethod: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  selectedPaymentMethod: {
    borderColor: '#007BFF',
    backgroundColor: '#E1F5FE',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: '#007BFF',
  },
});

export default CheckoutPage;
