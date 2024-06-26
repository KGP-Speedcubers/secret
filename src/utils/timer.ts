import type { timeList, timeObject } from "../types/types";

export const displayedTime = (time: timeObject) => {
    switch (time.penalty) {
        case "none":
            return (time.time/100).toFixed(2);
        case "+2":
            return ((time.time + 200)/100).toFixed(2);
        case "DNF":
            return "DNF";
        default: 
            return "0.00";
    }
}
