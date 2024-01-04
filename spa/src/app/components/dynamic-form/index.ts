export enum InputTypes {
    // Primitives
    string,   // 0
    number,   // 1
    date,     // 2
    // Advanced data types
    code,     // 3
    range,    // 4
    selector, // 5
    // Utility types
    object,   // 6
}

export type InputInfo = {
    type: InputTypes;
    label: string;
    icon?: string;
    props?: { [key: string]: any };
    keys?: { [key: string]: InputInfo };
}

export type RecursiveInputTypes = {
    [key: string]: InputInfo
};