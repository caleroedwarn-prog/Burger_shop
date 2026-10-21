import React, { memo } from "react";
import { color } from "../constants/colors";

type InputFieldProp = {
    label: string;
    value: string;
    onChangeText: (text:string) => void;
    error?: string;
    keyboardType?: 'text' | 'email' | 'tel' | 'number' | 'password';
}

export const InputField = memo(({ label, value, onChangeText, error ='', keyboardType = 'text' }: InputFieldProp) => {
    <div>
        {/* label */}
        <label>{label}</label>

        <input
           type={keyboardType === 'password' ? 'password' : keyboardType}
           value={value}
           onChange={(e) => onChangeText(e.target.value)}  />

           { error !== '' && (
            <p>{error}</p>
           )}
    </div>
})