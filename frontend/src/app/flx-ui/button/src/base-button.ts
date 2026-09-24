import {
  ChangeDetectorRef, Directive,
  ElementRef, HostBinding,
  Input,
  NgZone, Renderer2
} from '@angular/core';

export type FlxButtonAppearance = 'filled' | 'outline' | 'ghost' | 'hero';

@Directive()
export abstract class FlxButton {

  
  /**
   * Button status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input() status: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';

  @Input() size: 'sm' | 'md' | 'default' = 'default';
  /**
   * Disables the button
   */
  
  get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  @HostBinding('attr.aria-disabled')
  @HostBinding('class.btn-disabled')
  set disabled(value: boolean) {
    if (this.disabled !== value) {
      this._disabled = !this.disabled;
      this.renderer.setProperty(this.hostElement.nativeElement, 'disabled', this.disabled);
    }
  }
  private _disabled: boolean = false;

  @HostBinding('class')
  get additionalClasses(): string[] {
    const classes = ['btn'];
    this.status && this.status !== 'default' && classes.push(`btn-${this.status}`);
    this.size && this.size !== 'default' && classes.push(`btn-${this.size}`);
    return classes;
  }


  protected constructor(
    protected renderer: Renderer2,
    protected hostElement: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
    protected zone: NgZone
  ) {
  }
}
