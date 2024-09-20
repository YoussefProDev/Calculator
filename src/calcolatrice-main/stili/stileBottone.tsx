import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      borderRadius: 9999, // Equivalent to rounded-full in Tailwind CSS
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical:7,
    },
    pressable: {
      width: '100%',
      height: '100%',
      borderRadius: 9999, // Equivalent to rounded-full in Tailwind CSS
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 40, // Equivalent to text-5xl in Tailwind CSS
      fontFamily: 'serif',
      fontWeight:"bold",
    },
    image1:{
      width:30,
      height:30,
      tintColor:"white",
    },
    image2:{
      width:30,
      height:30,
      tintColor:"black",
    }
  });