export enum InputTypes {
    // Primitives
    string,
    int,
    float,
    date,
    // Advanced data types
    code,
    range,
    selector,
    // Utility types
    object,
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