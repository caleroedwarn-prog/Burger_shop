import { memo } from "react";
import { color } from "../constants/colors";


type messageProp = {
    message: string;
}

export const Empty = memo(({ message }: messageProp) => {
    return (
        <div style={style.base}>
            <p style={style.message}>{message}</p>
        </div>
    )
})

const style = {
     base: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
     },

     message: {
        color: color.mutedText
     }
}