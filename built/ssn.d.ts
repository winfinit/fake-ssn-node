export declare class RandomSSN {
    private _state;
    private _ssn;
    constructor(state?: string);
    value(): SSN;
}
export declare class SSN {
    private _ssn;
    private _state;
    private _areaNumber;
    private _groupNumber;
    private _serialNumber;
    constructor(state: SSNState, ssn: string);
    toFormattedString(): string;
    toString(): string;
    areaNumber(): AreaNumber;
    groupNumber(): GroupNumber;
    serialNumber(): SerialNumber;
    state(): SSNState;
}
export declare class SSNState {
    private _state;
    private _states;
    constructor(state: string);
    toString(): string;
    areaNumbers(): Array<number>;
    hasAreaNumber(areaNumber: number): boolean;
}
export declare class AreaNumber {
    private _state;
    private _areaNumber;
    constructor(state: SSNState, areaNumber: number);
    state(): SSNState;
    value(): number;
    toString(): string;
}
export declare class GroupNumber {
    private _groupNumber;
    constructor(groupNumber: number);
    value(): number;
    toString(): string;
}
export declare class SerialNumber {
    private _serialNumber;
    constructor(serialNumber: number);
    value(): number;
    toString(): string;
}
export declare class AreaNumberToState {
    private _state;
    constructor(areaNumber: number);
    private findState(areaNumber);
    state(): SSNState;
}
export declare class ParseSSN {
    private _ssn;
    constructor(ssn: string);
    ssn(): SSN;
}
