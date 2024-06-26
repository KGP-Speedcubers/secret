export type solvePenalty = "none" |"+2" | "DNF";

export type status = "idle" | "keyPressed" | "inspection" | "solving";

export type timeObject =  {
    time: number;
    penalty: solvePenalty;
    // scramble: scramble;
}

export interface timerObject {
    timerStatus: status;
    timerColor: string;
    isKeyPressed: boolean;
    keyPressTime: number;
}

export interface inspectionObject {
    time: number;
    warning: string;   
}

export type timeList = timeObject[];