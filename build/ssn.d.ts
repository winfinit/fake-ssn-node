export declare class SSNGenerator {
    private state;
    constructor(state?: string);
    create(): SSN;
}
export declare class SSN {
    ssn: string;
    constructor(ssn: string);
    toFormattedString(): string;
    toString(): string;
    areaNumbers(): string;
    groupNumbers(): string;
    lastFourNumbers(): string;
    state(): SSNState;
}
export declare class SSNState {
    state: string;
    constructor(state: string);
}
export declare class SSNValidator {
    private ssn;
    private state;
    constructor(state: SSNState, ssn: SSN);
    isValid(): boolean;
    isValidLenth(): boolean;
}
