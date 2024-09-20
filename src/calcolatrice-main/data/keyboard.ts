//NUMERIC KEYBOARD

import { Colors } from "~/global/appearence/Colors";
import { Bottone } from "./@types";

const bgLightGray:string= Colors.dark.gray;
const bgDarkGray:string="#303030";
const bgOrange:string="orange";

export const ButtonSize={
    height:88,
    width:88,
}

export const Keyboard: Bottone[]=[
    {
        text:"AC",
        BackgroundColor: Colors.dark.gray,
        fontColor: "black",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/cBella.png"),
    },
    {
        text:"+/-",
        BackgroundColor: bgLightGray,
        fontColor: "black",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/sign2.png"),
    },
    {
        text:"%",
        BackgroundColor: bgLightGray,
        fontColor: "black",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/percent.png"),
    },
    {
        text:"/",
        BackgroundColor: bgOrange,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/division2.png"),
    },
    {
        text:"7",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"8",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"9",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"x",
        BackgroundColor: bgOrange,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/multiply.png"),
    },
    {
        text:"4",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"5",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"6",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"-",
        BackgroundColor: bgOrange,
        fontColor:"white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/minus.png"),
    },
    {
        text:"1",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"2",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"3",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"+",
        BackgroundColor: bgOrange,
        fontColor: "white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/plus2.png"), //required
    },
    {
        text:"0",
        BackgroundColor: bgDarkGray,
        fontColor: "white",
        altezza:ButtonSize.height, //ButtonSize.height*2,
        larghezza: ButtonSize.width*2.2,//ButtonSize.width*2,
    },
    {
        text:".",
        BackgroundColor: bgDarkGray,
        fontColor:"white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
    },
    {
        text:"=",
        BackgroundColor: bgOrange,
        fontColor:"white",
        altezza: ButtonSize.height,
        larghezza: ButtonSize.width,
        icon: require("./../img/equal.png"),
    },
];

