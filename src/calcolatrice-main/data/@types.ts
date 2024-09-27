//all the types goes here

import { ImageSourcePropType } from "react-native";

export interface Bottone{
    text:string,
    fontColor: string,
    BackgroundColor: string,
    altezza: number,
    larghezza: number,
    icon?:ImageSourcePropType | undefined,
    alPremere?:(arg0:string)=>void,
}

export interface HistoryLevel{
    level1: string,
    level2:string,
}

export const NULLA:string="NON SETTATO";
