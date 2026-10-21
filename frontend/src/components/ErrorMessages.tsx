import { memo } from "react";
import { CustomButton } from "./primaryButtons";
import { color } from "../constants/colors";

type ErrorProp = {
    message: string;
    onRetry: () => void;
}

export const ErrorMessage = memo(({ message, onRetry }: ErrorProp) => {
    <div style={style.base}>
        <p style={style.message}>{message}</p><br />
        <CustomButton title="Try again" onPress= {onRetry} />
    </div>
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
        color: color.danger
    }
}