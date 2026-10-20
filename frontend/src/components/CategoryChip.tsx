import { color } from "../constants/colors";
import { memo } from "react";

type PillProp = {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export const Category = memo(({label, selected, onPress}: PillProp) => {
    return (
        <div className="Category_nav">
            <button onClick={onPress} style={{...style.base, ...selected ? style.selected : style.unselected}}>
                <p >
                    {label}
                </p>
            </button>
        </div>
    )
});

const style = {
    base: {},
    selected: {
        backgroundColor: color.buttonColor,
        color:  "#000"
    },
    unselected: {
        backgroundColor: color.buttonUnselected,
        color: "#000"
    },
    text:{}, 
    textSelected: {
        color: "#fff"
    },
    textUnselected: {
        color: "#fff"
    }
}