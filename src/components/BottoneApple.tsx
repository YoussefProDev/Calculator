import { View, Text, Pressable, StyleSheet,Image} from 'react-native';
import React from 'react';
import { Bottone } from '../data/@types';
import { styles } from '../stili/stileBottone';

export default function BottoneApple(props: Bottone) {

  const Premuto=()=>{
    if(props.alPremere)
      props.alPremere(props.text);
    else
      null
  }

  return (
    <View style={[{width: props.larghezza, height: props.altezza}, styles.container]}>
      <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'white' : props.BackgroundColor,
          },
          styles.pressable,
        ]}

      onPress={Premuto}>
        {props?.icon?
        //usa require solo per una risorsa indispensabile e sempre presente
        //uri solo e solo se e´nel WEB
        <Image source={props.icon} style={props.BackgroundColor==="orange"?styles.image1:styles.image2}/>:
         <Text style={[styles.text, {color: props.fontColor}]}>{props.text}</Text>
         }
      </Pressable>
    </View>
  );
}


