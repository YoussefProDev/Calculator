import { View,SafeAreaView, TextInput} from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import {NULLA, HistoryLevel} from './data/@types'
import Tastiera from './components/Tastiera'
import { formatNumber, cleanNumber, CompattaNumero} from './functions/utils'
import { styles } from './stili/stileCalcolatrice'
import { ScrollView } from 'react-native-gesture-handler'

export default function CalculatorPage() {

  const scrollViewRef = useRef<ScrollView>(null); // Referenza per ScrollView
  const scrollViewRef1 = useRef<ScrollView>(null); // Referenza per ScrollView
  const scrollViewRef2 = useRef<ScrollView>(null); // Referenza per ScrollView

  //managing History
  const [historyRecord, setHistoryRecord]= useState<HistoryLevel>({level1:"", level2:""});
  const [syncHistory, setSyncHistory]= useState<boolean>(false);
  const [historyText, setHistoryText]= useState<string>("");

  const [blocco, setBlocco]=useState<boolean>(false);
  const [begin, setBegin]=useState<boolean>(true);
  //input text
  const [inputText, setInputText]= useState<string>("0");
 
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

            //capire se quando annullare la cronologia
            setBegin(false);

            if(simbolo==NULLA){

              //se é dopo un =
              if(syncHistory)
                SyncHistory();

              if(operando1===NULLA){
                setOperando1(tasto);
                SetInput(tasto);
                setHistoryText((prev)=>prev+tasto);
              }else{
                setOperando1((prev)=>prev+tasto);
                SetInput(inputText + tasto);
                setHistoryText((prev)=>prev+tasto);
              }
            }else{
              if(operando2===NULLA){
                setOperando2(tasto);
                SetInput(tasto);
                setHistoryText((prev)=>prev+tasto);
              }else{
                setOperando2((prev)=>prev+tasto);
                SetInput(inputText +tasto);
                setHistoryText((prev)=>prev+tasto);
              }
            }
          break;
        }

        case(isSimbol(tasto)):{
          if(syncHistory)
            SyncHistory();

          if(operando1===NULLA && risultato===NULLA){
            setOperando1("0");
            setHistoryText((prev)=>prev+tasto);
          }
          else if(operando1!==NULLA&&operando2===NULLA){
            setSimbolo(tasto);
            setHistoryText((prev)=>prev+tasto);
          }
          else if(operando1!==NULLA&&operando2!==NULLA){
            let result=EseguiOperazione(parseFloat(operando1),parseFloat(operando2));
            setSyncHistory(false);
            setOperando1(result.toString());
            setSimbolo(tasto);
            setHistoryText(result.toString()+tasto);
          }
          
          break;
        }

        case("="):{

          let ris:number=0;
          
          if(operando1!==NULLA&&operando2!==NULLA&&simbolo!==NULLA){
            setHistoryText((prev)=>prev+tasto);
            ris=EseguiOperazione(parseFloat(operando1),parseFloat(operando2));
           
          }
          else if(risultato!==NULLA && vecchioOperando2 !==NULLA&&  vecchioSimbolo !==NULLA){
            if(syncHistory)
                SyncHistory();

            setSimbolo(vecchioSimbolo);
            setHistoryText(operando1+vecchioSimbolo+vecchioOperando2+tasto);
            ris=EseguiOperazione(parseFloat(operando1),parseFloat(vecchioOperando2));
            
          }

          break;
        }

        case("+/-"):{
          if(syncHistory)
            SyncHistory();

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
          if(syncHistory)
            SyncHistory();

          let valore:number=parseFloat(cleanNumber(inputText));
          //frontend subito aggiornato
          if(valore!==0){
          let nuovoValore:string= (valore/100).toString();
          SetInput(nuovoValore);

          Aggiornamento(nuovoValore)};
          break;
        }

        case("."):{
          if(syncHistory)
            SyncHistory();
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
              setHistoryRecord({level1:"",level2:""});
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
    setHistoryText((prev)=>prev+CompattaNumero(risultato));
    setvecchioOperando2(op2.toString());

    simbolo!==NULLA?setvecchioSimbolo(simbolo):null;

    //operando 1 diventa il risultato, per fare
    //in modo che possa essere eseguita un altra operazione
    setOperando1(risultato.toString());

    //operando 2 e simbolo nulli
    setOperando2(NULLA);
    setSimbolo(NULLA);
    
    setSyncHistory(true);
  
    return risultato;
  }

  /**MAIN POLISH FUNCTION */
  const Pulizia=()=>{
      if(risultato==NULLA)
        setHistoryText("");

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

  /**SHIFT DAL BASSO VERSO L'ALTO DELLA HISTORY DI OPERAZIONI */
  const SyncHistory = ()=>{

        const newHistory:HistoryLevel={level1:"", level2:""};

        if(historyRecord.level1!==""){
          newHistory.level2=historyRecord.level1; 
          newHistory.level1=historyText;
        }else {
          newHistory.level1=historyText;
        }

      setHistoryRecord(newHistory);


      if(operando1!=NULLA)
        setHistoryText(CompattaNumero(parseFloat(operando1)))
      else
        setHistoryText("");

      setSyncHistory(false);
  }
  

//aggiorna valori in caso di "%",".","+-"
  const Aggiornamento=(value: string)=>{
    if(operando1!==NULLA&&operando2===NULLA){
      setOperando1(value);
      setHistoryText(value);
    }
    else if(operando1!==NULLA&&operando2!==NULLA){
      setOperando2(value);
      setHistoryText(operando1+simbolo+value);
    }
    else if(operando1===NULLA&&operando2===NULLA){
        setOperando1(value);
        setHistoryText(value);
    }
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

    // Converti la stringa in numro float
    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
        // Converti il numero in una stringa con precisione arbitraria, eliminando gli errori float
        let preciseValue:number= parseFloat(numericValue.toPrecision(10));

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
          ref={scrollViewRef2}
          onContentSizeChange={() => scrollViewRef2.current?.scrollToEnd({ animated: false })}
        >
          <TextInput
            editable={false}
            value={historyRecord.level2}
            style={[styles.HistoryText, styles.HistoryText3]}
          />
        </ScrollView>
        <ScrollView
          horizontal
          style={styles.scrollContainer}
          ref={scrollViewRef1}
          onContentSizeChange={() => scrollViewRef1.current?.scrollToEnd({ animated: false })}
        >
          <TextInput
            editable={false}
            value={historyRecord.level1}
            style={[styles.HistoryText, styles.HistoryText2]}
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
            style={[styles.HistoryText, styles.HistoryText1]}
          />
        </ScrollView>
      </View>

      {/* Sezione Input Numerico */}
      <View style={styles.textContainer}>
        <ScrollView  horizontal>
          <TextInput
            editable={false}
            value={inputText}
            style={[styles.textInput, { fontSize: sizeOutput }]}
          />
        </ScrollView>
      </View>

      {/* Sezione Tastiera */}
      <View style={styles.KeyboardContainer}>
        <Tastiera onClick={onClickHandle} />
      </View>

    </View>
  </SafeAreaView>
);
}