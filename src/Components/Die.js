import React from "react";
import { useEffect, useState } from "react";

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld? "#59E391": "white"
    }

    
    return(
        <h3 
            style={styles}
            className="box"
            onClick={props.holdDice}
         >
         {props.value}</h3>
    )
}