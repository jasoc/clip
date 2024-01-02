import { Component, EventEmitter, Input, Output } from "@angular/core";
import { InputInfo, InputTypes, RecursiveInputTypes } from ".";
import { CommonModule } from "@angular/common";
import { M3InputComponent } from "../m3-input/m3-input.component";
import { M3ButtonComponent } from "../m3-button/m3-button.component";
import { M3IconComponent } from "../m3-icon/m3-icon.component";

@Component({
    selector: 'dynamic-form',
    standalone: true,
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    imports: [CommonModule, M3InputComponent, M3ButtonComponent, M3IconComponent],
})
export class DynamicFormComponent {

    @Input()
    level: number = 0;

    @Input("initial-values")
    initialValues: { [key: string]: any } = { };

    @Input("properties")
    propertiesObject: RecursiveInputTypes = {
        "ApiKind": { type: InputTypes.string, label: "Api Kind", icon: "api" },
        "level": { type: InputTypes.int, label: "level" },
        "Pene": {
            icon: "home",
            type: InputTypes.object,
            label: "Pene",
            keys: {
                "ps": { type: InputTypes.string, label: "Pisellone" },
                "Colore": {
                    type: InputTypes.object,
                    label: "Colore",
                    keys: {
                        "Palle": { type: InputTypes.string, label: "Palle" },
                        "Culo": { type: InputTypes.string, label: "Culo" },
                    }
                },
                "Dimensione": {
                    type: InputTypes.object,
                    label: "Dimensione",
                    keys: {
                        "lp": { type: InputTypes.float, label: "Lunghezza pene" },
                        "dp": { type: InputTypes.float, label: "Diametro palle" },
                    }
                },
            }
        },
    };

    @Output()
    public valueChanged = new EventEmitter<{ key: string, value: any }>();

    constructor() { }

    checkUniqueKeys(obj: RecursiveInputTypes, keySet = new Set<string>()): boolean {
        for (const key in obj) {
            if (keySet.has(key)) {
                return false;
            }
            keySet.add(key);
            if (obj[key].keys) {
                const isUnique = this.checkUniqueKeys(obj[key].keys!, keySet);
                if (!isUnique) {
                    return false;
                }
            }
        }
        return true;
    }

    ngOnInit() {
        if (!this.checkUniqueKeys(this.propertiesObject)) {
            throw new Error("Keys among the object [propertiesObject] must be all uniques.");
        }
    }

    onValueChanged(key: string, value: any) {
        this.valueChanged.emit({ key, value });
    }

    getInitialValue(key: string): any {
        if (!this.initialValues) {
            return undefined;
        }
        if (this.initialValues.hasOwnProperty(key)) {
            return this.initialValues[key];
        }
        return undefined;
    }
}