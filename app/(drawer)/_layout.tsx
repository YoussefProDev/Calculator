import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

const DrawerLayout = () => (
  <Drawer
  screenOptions={{
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'black', // Colore di sfondo dell'header
    },
    headerTintColor: 'white', // Colore del testo dell'header (titolo)
    headerTitleStyle: {
      fontWeight: 'bold', // Opzioni per il titolo
    },
    drawerStyle: {
      backgroundColor: 'black', // Colore di sfondo del drawer
    },
    drawerLabelStyle: {
      color: 'white', // Colore del testo dell'etichetta del drawer
    },
  }}
>
  <Drawer.Screen
    name="index"
    options={{
      headerShown: true, // Mostra la barra dell'intestazione
      title: "",
      drawerLabel: 'Calculator',
      drawerIcon: ({ size, color }) => (
        <Ionicons name="calculator-outline" size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name="currency-converter/index"
    options={{
      headerShown: true,
      drawerLabel: 'Currency',
      drawerIcon: ({ size, color }) => (
        <Ionicons name="cash-outline" size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name="percentage/index"
    options={{
      headerShown: true,
      drawerLabel: 'Percentage',
      drawerIcon: ({ size, color }) => (
        <Ionicons name="stats-chart-outline" size={size} color={color} />
      ),
    }}
  />
</Drawer>
);

export default DrawerLayout;
