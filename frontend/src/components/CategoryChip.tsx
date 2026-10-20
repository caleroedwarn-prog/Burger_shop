import { color } from "../constants/colors";
import { memo } from "react";

type CategoryProp = {
    label: string;
    selected: boolean;
    onPress: () => void;
}

function 