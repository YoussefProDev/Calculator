import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  ContenitoreScreen: {
    flex: 1,
    width: '100%',
  },
  scrollContainer:{
    //borderWidth:5,
    //borderColor:"green",
    marginTop:40,
  },
  // Contenitore per la cronologia
  HistoryContainer: {
    flex: 0.8,
    flexDirection: "column-reverse",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
   // borderWidth:3,
   // borderColor:"white",
  },
  HistoryText: {
    textAlign: 'right',
    color: 'gray',
    paddingHorizontal: 32,
   // borderWidth:8,
   // borderColor:"pink",
    height:60,
  },

  // Area input numerico
  InputContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '100%',
    color: 'white',
    fontFamily: 'serif',
    fontWeight: '100',
    textAlign: 'right',
    paddingHorizontal: 32,
    marginBottom: 5,
  },

  // Contenitore della tastiera
  KeyboardContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
   // borderWidth:2,
   // borderColor:"white",
  },
});