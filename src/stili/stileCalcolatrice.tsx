import {StyleSheet, Platform} from 'react-native';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
      },
      ContenitoreScreen: {
        flex: 1,
        alignItems: 'center',
      },
      AreaInterazione: {
        position: 'absolute',
        bottom: 0,
        width:"100%",
        alignItems: 'center',
      },
      History:{
        position: 'absolute',
        top:  Platform.OS==="android"?90:150,
        width: "100%",
        height:50,
      },
      HistoryText:{
        textAlign: "right",
        color:"gray",
        height:50,
        paddingHorizontal: 32, // px-8 in Tailwind
        marginBottom:5,
      },
      textInput: {
        height: 110, // h-20 in Tailwind
        width: '100%', // w-screen in Tailwind
        color: 'white',
        fontFamily: 'serif',
        fontWeight: '100', // font-extralight in Tailwind
        textAlign: 'right',
        paddingHorizontal: 32, // px-8 in Tailwind
        marginBottom:5,
      },
    });