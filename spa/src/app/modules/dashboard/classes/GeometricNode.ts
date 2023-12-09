import { ElementRef } from "@angular/core";

export class geometricNode {
    constructor(private hostView: ElementRef) { }

    get offsetTop(): number {
        return this.hostView.nativeElement.offsetTop;
    }

    get offsetLeft(): number {
        return this.hostView.nativeElement.offsetLeft;
    }

    get clientHeight(): number {
        return this.hostView.nativeElement.clientHeight;
    }

    get clientWidth(): number {
        return this.hostView.nativeElement.clientWidth;
    }
}