import { View, Text, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottoneFigo from '~/global/shared_components/BottoneFigo'

//TODO 
export default function PercentagePage() {
  return (
    <SafeAreaView>
      <View>
        <Text style={{fontSize:32, fontWeight: "bold", textAlign: "center"}}>Inserisci la tua percentuale</Text>
        <BottoneFigo onPress={()=>Alert.alert("ciaoo")} title="Premimi"/>
      </View>
    </SafeAreaView>
  )
}