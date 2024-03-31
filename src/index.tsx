import React from 'react';
import Calculator from './screens/Calculator';
import {SafeAreaView, StyleSheet} from 'react-native';

function CalculatorApp() {
  return (
    <SafeAreaView style={styles.container}>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalculatorApp;
