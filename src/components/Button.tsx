import { useState } from "react";
import { ButtonHTMLAttributes} from 'react';
import '../styles/button.scss';

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {isOutline?:boolean}



export const Button = ({isOutline = false , ...props}:PropsButton)=> {
    return (
        <button className={ `button ${isOutline? 'outline': ''}`} {...props}></button>
    );
}