import { color } from "../constants/colors";
import { memo } from "react";



type buttonProps = {
    title:string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean; 
};

export const CustomButton = memo(({title, onPress,  loading = false, disabled = false}: buttonProps) => {
    const isDisabled = disabled || loading;

    return (
        <button
        onClick={(e) => {
            e.stopPropagation();
            onPress();
        }}
        disabled={isDisabled}
        style={{
            background: isDisabled? "grey" : color.primary,
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            cursor: isDisabled? "not-allowed" : "pointer"
        }}
        >
            {loading ? <span>⏳</span> : title}
        </button>
    )
});