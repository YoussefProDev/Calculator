import { Ionicons } from '@expo/vector-icons';
// import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="(main-calculator)/index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="currency-exchange/index"
      options={{
        headerTitle: 'currency',
        drawerLabel: 'currency',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
  </Drawer>
);

export default DrawerLayout;
