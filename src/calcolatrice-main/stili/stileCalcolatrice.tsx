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
   // borderWidth:5,
  // borderColor:"green",
  },
  // Contenitore per la cronologia
  HistoryContainer: {
    flex: 0.8,
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
   // borderWidth:3,
   // borderColor:"white",
  },
  HistoryText: {
    textAlign: 'right',
    paddingHorizontal: 32,
    height:60,
  },

  HistoryText1:{
    color: "#a1a9b5",
    fontSize: 30,

  },
  HistoryText2:{
    color: "#757b85",
    fontSize: 25,

  },
  HistoryText3:{
    color:"#494c52",
    fontSize: 20,
    marginTop:50,
  },
  textContainer:{
    flex:0.5,
    flexDirection:"column",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    //borderWidth:3,
    //borderColor:"white",
  },
  // Area input numerico
  textInput: {
    width: '100%',
    color: 'white',
    fontFamily: 'serif',
    fontWeight: '100',
    textAlign: 'right',
    paddingHorizontal: 32,
    marginBottom: 5,
   // borderWidth:3,
   // borderColor:"white",
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