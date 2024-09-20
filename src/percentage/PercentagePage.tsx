import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

//TODO 
export default function PercentagePage() {
  return (
    <SafeAreaView>
      <View>
        <Text style={{fontSize:32, fontWeight: "bold", textAlign: "center"}}>Inserisci la tua percentuale</Text>
      </View>
    </SafeAreaView>
  )
}