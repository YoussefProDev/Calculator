import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    keyboardContainer: {
      flexDirection: 'row',      // flex-row in Tailwind
      flexWrap: 'wrap',          // flex-wrap in Tailwind
      width: '100%',             // w-screen in Tailwind
      paddingHorizontal: 10,     // px-4 in Tailwind (4 equivale a 16px)
      height: '50%',             // h-1/2 in Tailwind
      marginBottom: 28,          // mb-7 in Tailwind (7 equivale a 28px)
      justifyContent: 'space-between', // justify-between in Tailwind
    },
  });