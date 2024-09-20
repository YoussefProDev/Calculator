/**ESEMPIO DI COMPONENTE CHE PIU' SCHERMATE POTREBBERO USARE */

import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definiamo le proprietà attese (props) per il componente
interface BottoneFigoProps {
  onPress: () => void; // Funzione che viene eseguita al click del bottone
  title: string; // Testo che appare nel bottone
  iconName?: keyof typeof Ionicons.glyphMap; // Icona opzionale, nome dell'icona da Ionicons
  iconColor?: string; // Colore opzionale per l'icona
}

const BottoneFigo: React.FC<BottoneFigoProps> = ({ onPress, title, iconName, iconColor }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Riduciamo la scala per simulare pressione
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    onPress(); // Chiamata alla funzione onPress
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <View style={styles.contentContainer}>
          {iconName && (
            <Ionicons name={iconName} size={24} color={iconColor || "#fff"} style={styles.icon} />
          )}
          <Text style={styles.text}>{title}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: "60%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#001f6b', // Colore di sfondo scuro simile a quello mostrato
    borderWidth: 2,
    borderColor: '#0040ff', // Bordo blu per dare un look più appariscente
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // Effetto ombra per Android
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff', // Testo bianco per risaltare sul background scuro
    fontFamily: 'Helvetica Neue', // Font stile Apple
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default BottoneFigo;

