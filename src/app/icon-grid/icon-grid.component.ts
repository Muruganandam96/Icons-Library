import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as svgtojsx from 'svg-to-jsx';


@Component({
    selector: 'app-icon-grid',
    templateUrl: './icon-grid.component.html',
    styleUrls: ['./icon-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconGridComponent implements AfterViewInit {

    @ViewChild('icon') iconContainer: ElementRef;
    svgIcon: string;
    search = 'text';
    @Input()
    get IconName(): string { return this._iconName; }
    set IconName(IconName: string) {
        this.IconNameAssuch = IconName;
        this._iconName = IconName.replace(/([A-Z])/g, ' $1');
        this._iconName = this._iconName.charAt(0).toUpperCase() + this._iconName.slice(1);
    }
    @Input() svg: string;

    private IconNameAssuch = '';
    private _iconName = '';

    constructor(private elRef: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.svgIcon = '';
        this.svgIcon = this.svg || null;
        if (this.svgIcon) {
            this.iconContainer.nativeElement.innerHTML = this.svgIcon;
            this.iconContainer.nativeElement.children[0].setAttribute('width', '24px');
            this.iconContainer.nativeElement.children[0].setAttribute('height', '24px');
            const label = document.createElement('p');
            label.className += 'icon-label';
            label.innerHTML = this._iconName;
            this.iconContainer.nativeElement.append(label);
        }
    }

    displayCopiedText(ele: HTMLElement): void {
        const buttonText = ele.innerHTML;
        ele.innerHTML = 'Copied!';
        setTimeout(() => {
            ele.innerHTML = buttonText;
        }, 1200);
    }

    copyText(event, option): void {
        const svg = this.svgIcon || null;
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        if (option === 'svg') {
            selBox.value = this.svgIcon;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
            this.displayCopiedText(event.target);
        } else {
            this.transform(selBox, svg, event);

        }
    }

    transform(selBox: HTMLTextAreaElement, svg: string, event): void {
        svgtojsx(svg).then((jsx) => {
            selBox.value = jsx;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
            this.displayCopiedText(event.target);
        });
    }
}
