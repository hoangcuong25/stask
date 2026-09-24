/**
 * @license
 * Copyright @fpt-is/flx. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  Renderer2
} from '@angular/core';

import { FlxButton } from './base-button';

@Component({
  selector: 'button[flxButton],a[flxButton],input[type="button"][flxButton],input[type="submit"][flxButton]',
  template: `
    <ng-content></ng-content>
  `,
  providers: [
    { provide: FlxButton, useExisting: FlxButtonComponent },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlxButtonComponent extends FlxButton {

  /** trạng thái loading */
  @Input() set loading(value: boolean) {
    this._loading = value;

    if (value) {
      this.showSpinner();
      this.setDisabled(true);
    } else {
      this.hideSpinner();
      this.setDisabled(false);
    }
  }

  get loading() {
    return this._loading;
  }

  private _loading = false;
  private spinnerEl?: HTMLElement;

  @HostListener('click', ['$event'])
  onClick(event: UIEvent) {
    if (this.disabled || this._loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  constructor(
    protected override renderer: Renderer2,
    protected override hostElement: ElementRef<HTMLElement>,
    protected override cd: ChangeDetectorRef,
    protected override zone: NgZone
  ) {
    super(renderer, hostElement, cd, zone);
  }

  /** Tạo và chèn spinner vào trước nội dung button */
  private showSpinner() {
    if (this.spinnerEl) return; // tránh tạo nhiều lần

    this.spinnerEl = this.renderer.createElement('span');
    this.renderer.addClass(this.spinnerEl, 'spinner-border');
    this.renderer.addClass(this.spinnerEl, 'spinner-border-sm');
    this.renderer.addClass(this.spinnerEl, 'me-2');

    this.renderer.insertBefore(
      this.hostElement.nativeElement,
      this.spinnerEl,
      this.hostElement.nativeElement.firstChild
    );
  }

  /** Remove spinner */
  private hideSpinner() {
    if (this.spinnerEl) {
      this.renderer.removeChild(
        this.hostElement.nativeElement,
        this.spinnerEl
      );
      this.spinnerEl = undefined;
    }
  }

  /** Disable/enable button */
  private setDisabled(state: boolean) {
    if (state) {
      this.renderer.setAttribute(this.hostElement.nativeElement, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.hostElement.nativeElement, 'disabled');
    }
  }
}
