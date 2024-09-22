import { View,SafeAreaView, TextInput} from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import {NULLA } from './data/@types'
import Tastiera from './components/Tastiera'
import { formatNumber, cleanNumber, CompattaNumero} from './functions/utils'
import { styles } from './stili/stileCalcolatrice'
import { ScrollView } from 'react-native-gesture-handler'

export default function CalculatorPage() {

  const scrollViewRef = useRef<ScrollView>(null); // Referenza per ScrollView

  const [blocco, setBlocco]=useState<boolean>(false);
  const [begin, setBegin]=useState<boolean>(true);
  //input text
  const [inputText, setInputText]= useState<string>("0");
  const [historyText, setHistoryText]= useState<string>("");
  const [historyFontSize, setHistoryFontSize]=useState<number>(35);
  const [sizeOutput, setSizeOutput] = useState<number>(100);

  const [operando1, setOperando1]=useState<string>(NULLA);
  const [operando2, setOperando2]=useState<string>(NULLA);
  const [vecchioOperando2, setvecchioOperando2]= useState<string>(NULLA);
  const [vecchioSimbolo, setvecchioSimbolo]= useState<string>(NULLA);
  const [simbolo, setSimbolo]=useState<string>(NULLA);
  const [risultato, setRisultato]=useState<string>(NULLA);


  const onClickHandle=(tasto:string)=>{
     
      switch(tasto){

        case (isNumber(tasto)):{
            setBegin(false);
            if(simbolo==NULLA){

              if(operando1===NULLA){
                setOperando1(tasto);
                SetInput(tasto);
              }else{
                setOperando1((prev)=>prev+tasto);
                SetInput(inputText + tasto);
              }
            }else{
              if(operando2===NULLA){
                setOperando2(tasto);
                SetInput(tasto);
              }else{
                setOperando2((prev)=>prev+tasto);
                SetInput(inputText +tasto);
              }
            }
          break;
        }

        case(isSimbol(tasto)):{
          if(operando1===NULLA && risultato===NULLA){
            setOperando1("0");
          }
          else if(operando1!==NULLA&&operando2===NULLA){
            setSimbolo(tasto);
          }
          else if(operando1!==NULLA&&operando2!==NULLA){
            let result=EseguiOperazione(parseFloat(operando1),parseFloat(operando2));
            setOperando1(result.toString());
            setSimbolo(tasto);
          }
          
          break;
        }

        case("="):{

          let ris:number=0;
          
          if(operando1!==NULLA&&operando2!==NULLA&&simbolo!==NULLA){
            ris=EseguiOperazione(parseFloat(operando1),parseFloat(operando2));
          }
          else if(risultato!==NULLA && vecchioOperando2 !==NULLA&&  vecchioSimbolo !==NULLA){
            setSimbolo(vecchioSimbolo);
            ris=EseguiOperazione(parseFloat(operando1),parseFloat(vecchioOperando2));
          }

          break;
        }

        case("+/-"):{

          let valore:number=parseFloat(cleanNumber(inputText));
         
          if(valore!==0){
          let nuovoValore:string= ((valore-valore*2)).toString();
           //frontend subito aggiornato
          SetInput(nuovoValore);
          //aggiorno operando
          Aggiornamento(nuovoValore)};
          break;
        }

        case("%"):{

          let valore:number=parseFloat(cleanNumber(inputText));
          //frontend subito aggiornato
          if(valore!==0){
          let nuovoValore:string= (valore/100).toString();
          SetInput(nuovoValore);

          Aggiornamento(nuovoValore)};
          break;
        }

        case("."):{
          //frontend subito aggiornato
          //se ho giá la virgola non metto la virgola
          if(!inputText.includes(".") && !blocco){
            let nuovoValore:string= inputText + ".";
            setInputText(nuovoValore);

            Aggiornamento(nuovoValore);
          }
          break;
        }

        case("AC"):{
          
          if(begin){
              setHistoryText("");
          }
          Pulizia();
           break;
        
        };

      }

  }

  /**MAIN OPERATION FUNCTION */
  const EseguiOperazione=(op1:number,op2:number):number=>{

    var risultato:number=0;
    var simbol= simbolo===NULLA?vecchioSimbolo:simbolo;
    switch(simbol){
        case('+'):{risultato=op1+op2; break}
        case('-'):{risultato=op1-op2; break}
        case('x'):{risultato=op1*op2; break}
        case('/'):{risultato=op1/op2; break}
    }
    
    setRisultato(risultato.toString());
    SetResult(risultato.toString());
    setHistoryText(CompattaNumero(op1)+simbol+CompattaNumero(op2)+"="+CompattaNumero(risultato));
    setvecchioOperando2(op2.toString());

    simbolo!==NULLA?setvecchioSimbolo(simbolo):null;

    //operando 1 diventa il risultato, per fare
    //in modo che possa essere eseguita un altra operazione
    setOperando1(risultato.toString());

    //operando 2 e simbolo nulli
    setOperando2(NULLA);
    setSimbolo(NULLA);
    
  
    return risultato;
  }

  /**MAIN POLISH FUNCTION */
  const Pulizia=()=>{
      setOperando2(NULLA);
      setSimbolo(NULLA);
      setOperando1(NULLA);
      setRisultato(NULLA);
      setvecchioOperando2(NULLA);
      setvecchioSimbolo(NULLA);
      SetInput("0");
      setSizeOutput(100);
      setBlocco(false);
      setBegin(true);
  }
  

//aggiorna valori in caso di "%",".","+-"
  const Aggiornamento=(value: string)=>{
    if(operando1!==NULLA&&operando2===NULLA)
      setOperando1(value);
    else if(operando1!==NULLA&&operando2!==NULLA)
      setOperando2(value);
    else if(operando1===NULLA&&operando2===NULLA)
      setOperando1(value);
  }

  //**controlla se il tasto premuto é un numero */
  const isNumber=(tasto:string)=>{

    try{
      let numero=parseInt(tasto);

      if(numero>=0&&numero<=9)
        return tasto;
      else
        return "no number";
    }
    catch(error){
      return "no number";
    }
  }

    //**controlla se il tasto premuto é segno di operazione */
  const isSimbol=(tasto:string)=>{
    try{
      if(tasto==="/"||tasto==="x"||tasto==="+"||tasto==="-"){
        
        return tasto;
      }
      else
       return "no simbol";
      
    }catch(error){
        return "no simbol";
      }
  }


  const SetResult=(value:string)=>{

    console.log("risultato è: " + value);
    // Converti la stringa in numro float
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
        // Converti il numero in una stringa con precisione arbitraria, eliminando gli errori float
        let preciseValue:number= parseFloat(numericValue.toPrecision(10));
        console.log("risultato è: " + Math.abs(preciseValue));

        const thresholdUp:number = 1000000000;
        const thresholdDown:number= 0.0000000001;

        // Se il valore è maggiore o uguale al limite, usa la notazione scientifica
        if (Math.abs(preciseValue) >= thresholdUp || (Math.abs(preciseValue) <= thresholdDown && Math.abs(preciseValue) > 0)) {
            // Usa toExponential per la notazione scientifica, limitando il numero di decimali a 2
            alert("sono entrato");
            SetInput(preciseValue.toExponential(2));
        }else
            SetInput(preciseValue.toString());
    }
    else{
      // Se la stringa non è un numero valido, la impostiamo comunque come testo
      //error or infinity
      setInputText(value);
  }

  }

  /**LAVORO SOLO SULLA FORMATTAZIONE del output */
  const SetInput = (value: string) => {
 
      const zeros = /0.00?/; //espressione regolare
      const parsed= parseFloat(value);
  
      let finito:string="";
      if(zeros.test(value))
        finito=value;
      else 
        finito= parsed===0?"0":formatNumber(value);

      CambiaFontSize(finito.length);
      
      setInputText(finito);
    
};

const CambiaFontSize=(arg:number)=>{
  if(arg<=7){
    setSizeOutput(100);
  }else if(arg==8){
    setSizeOutput(90);
  }else if(arg==9){
    setSizeOutput(80);
  }else if(arg==10 || arg==11){
    setSizeOutput(70);
  }else if(arg>11){
    setSizeOutput(60);
  }
}

return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.ContenitoreScreen}>

      {/* Sezione Cronologia */}
      <View style={styles.HistoryContainer}>
        <ScrollView
          horizontal
          style={styles.scrollContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        >
          <TextInput
            editable={false}
            value={historyText}
            style={[styles.HistoryText, { fontSize: historyFontSize }]}
          />
        </ScrollView>
        <ScrollView
          horizontal
          style={styles.scrollContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        >
          <TextInput
            editable={false}
            value={historyText}
            style={[styles.HistoryText, { fontSize: historyFontSize }]}
          />
        </ScrollView>
      </View>

      {/* Sezione Input Numerico */}
      <View style={styles.InputContainer}>
        <TextInput
          editable={false}
          value={inputText}
          style={[styles.textInput, { fontSize: sizeOutput }]}
        />
      </View>

      {/* Sezione Tastiera */}
      <View style={styles.KeyboardContainer}>
        <Tastiera onClick={onClickHandle} />
      </View>

    </View>
  </SafeAreaView>
);
}