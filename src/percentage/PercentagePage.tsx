import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PercentagePage: React.FC = () => {
  const [percentage, setPercentage] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const percentageInputRef = useRef<TextInput>(null);
  const numberInputRef = useRef<TextInput>(null);

  // Function to handle the change in percentage input
  const handlePercentageChange = (input: string): void => {
    setPercentage(input);

    if (input !== '' && number !== '') {
      const calculatedResult = (parseFloat(input) / 100) * parseFloat(number);
      setResult(calculatedResult.toFixed(2));
    } else {
      setResult(null);
    }
  };

  // Function to handle the change in the number input
  const handleNumberChange = (input: string): void => {
    setNumber(input);

    if (percentage !== '' && input !== '') {
      const calculatedResult = (parseFloat(percentage) / 100) * parseFloat(input);
      setResult(calculatedResult.toFixed(2));
    } else {
      setResult(null);
    }
  };

  // Function to clear all inputs and reset
  const clearAll = (): void => {
    setPercentage('');
    setNumber('');
    setResult(null);
    percentageInputRef.current?.focus(); // Focus back on percentage input
  };

  // Dynamically calculate font size based on text length
  const calculateFontSize = (text: string): number => {
    const baseFontSize = 60;
    if (text.length > 6) {
      return baseFontSize - (text.length - 6) * 2; // Reduce font size by 2px per extra character
    }
    return baseFontSize;
  };

  // Automatically focus on the percentage input when the component loads
  useEffect(() => {
    percentageInputRef.current?.focus(); // Focus on the percentage input at the start
  }, []);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"black"}}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* First line: percentage and "of" */}
        <View style={styles.firstLine}>
          <TextInput
            ref={percentageInputRef}
            style={[styles.input, { fontSize: calculateFontSize(percentage) }]} // Dynamic font size
            placeholder="0"
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={percentage}
            onChangeText={handlePercentageChange}
            returnKeyType="next"
            onSubmitEditing={() => numberInputRef.current?.focus()} // Switch to the number input
          />
          <Text style={styles.percentSymbol}>%</Text>
          <Text style={styles.text}> of</Text>
        </View>

        {/* Second line: number */}
        <TextInput
          ref={numberInputRef}
          style={[styles.input,styles.inputlungo, { fontSize: calculateFontSize(number) }]} // Dynamic font size
          placeholder="0"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={number}
          onChangeText={handleNumberChange}
          returnKeyType="done"
        />

        {/* Display the result */}
        {result && (
          <Text style={styles.result}>
            {result}
          </Text>
        )}

        {/* Clear button */}
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.clearButtonText}>CLEAR</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'black',
    padding: 20,
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Ensure the first line is centered
    marginBottom: 20, // Add some space between the first and second lines
  },
  input: {
    color: 'white',
    textAlign: 'center', // Center text
    flex: 0,
    fontFamily: 'System', // Use system font
    fontWeight: 'bold',
    width: '50%',
  },
  inputlungo:{
    width:"100%",
  },
  percentSymbol: {
    fontSize: 60,
    color: 'white',
  },
  text: {
    fontSize: 60,
    color: 'white',
  },
  result: {
    fontSize: 100,
    color: '#3F00FF',
    marginTop: 80,
    textAlign: 'center',
  },
  clearButton: {
    position: 'absolute',
    bottom: 40, // Positioned at the bottom
    right: 20,
    backgroundColor: '#3F00FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PercentagePage;
