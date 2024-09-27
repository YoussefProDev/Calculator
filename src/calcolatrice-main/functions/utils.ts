
export function formatNumber(numberString:string):string {

    let meno:boolean=false;

    if(numberString.includes("-")){
        meno=true;
        numberString=numberString.replace("-", "");
    }

    if(numberString==="0" || numberString==="Infinity")return numberString;
    // Separiamo la parte intera e la parte decimale
    let [integerPart, decimalPart] = numberString.split('.');


    if(integerPart!=="0")
        integerPart = integerPart.replace(/^0+/, '');

   
    integerPart = integerPart.replace(/,/g, "");
    // Iniziamo a formattare la parte intera
    let formattedIntegerPart = '';
    for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
        if (count > 0 && count % 3 === 0) {
            formattedIntegerPart = "," + formattedIntegerPart;
        }
        formattedIntegerPart = integerPart[i] + formattedIntegerPart;
    }
    if(meno){
        formattedIntegerPart="-"+formattedIntegerPart;
    }

    // Ricomponiamo la parte intera formattata e la parte decimale (se esiste)
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}

export function cleanNumber(numberString:string):string{
    return numberString.replace(/,/g, "");
}

export function CompattaNumero(numero:number):string{

    if(numero.toString()==="0")return "0";

    if (!isNaN(numero)) {
        // Converti il numero in una stringa con precisione arbitraria, eliminando gli errori float
        let preciseValue:number= parseFloat(numero.toPrecision(10));
        
        const thresholdUp = 1_000_000_000;
        const thresholdDown = 0.0000000001;
    
        // Se il valore è maggiore o uguale al limite, usa la notazione scientifica
        if (Math.abs(preciseValue) >= thresholdUp || (Math.abs(preciseValue) <= thresholdDown && Math.abs(preciseValue) > 0)) {
            // Usa toExponential per la notazione scientifica, limitando il numero di decimali a 2
            return (preciseValue.toExponential(2));
        }else
            return (preciseValue.toString());

        
    }
    else{
      // Se la stringa non è un numero valido, la impostiamo comunque come testo
      //error or infinity
      return numero.toString();
  }



}