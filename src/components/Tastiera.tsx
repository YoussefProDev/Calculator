import { View, StyleSheet} from 'react-native'
import React from 'react'
import { Keyboard } from '../data/keyboard'
import BottoneApple from './BottoneApple'
import { Bottone } from '../data/@types'
import { styles } from '../stili/stileTastiera'

interface TastieraProps{
  onClick:(arg0: string)=>void,
}

//non renderizzo la tastiera piu' volte
const Tastiera = ({ onClick }: TastieraProps) => {
  return (
    <View style={styles.keyboardContainer}>
      {
        Keyboard.map((item: Bottone, index: number) => (
          <BottoneApple {...item} alPremere={onClick} key={index} />
        ))
      }
    </View>
  );
};

export default Tastiera;