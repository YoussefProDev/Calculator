import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

const DrawerLayout = () => (
  /**Mounting point della nostra applicazione */
  <Drawer>
    <Drawer.Screen
      name="(calcolatrice-main)"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
      {/**FILE BASED ROUTING**/}
      <Drawer.Screen 
      name="(currency-converter)"
      options={{
        headerTitle: 'Convert Currency',
        drawerLabel: 'Currency',
      }}
    />
  </Drawer>
);

export default DrawerLayout;
