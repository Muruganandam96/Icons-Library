import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appdropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;
  @HostListener('mouseover', ['$event']) onMouseOver(event: Event) {
    this.isOpen = true;
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event: Event) {
    console.log('leve');
    this.isOpen = false;
  }


  constructor( private elRef: ElementRef) { }





}
