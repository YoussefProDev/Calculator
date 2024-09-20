import { View, Text } from 'react-native'
import React from 'react'
import { style } from './stile'

export default function CurrencyPage() {
  return (
    <View style={style.container}>
      <Text style={style.titolo}>Currency converter</Text>
    </View>
  )
}