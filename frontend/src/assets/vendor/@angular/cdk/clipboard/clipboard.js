/* esm-bundle - @angular/cdk/clipboard - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/common', '@angular/core'], (function (exports) {
    'use strict';
    var DOCUMENT, i0, Injectable, Inject, InjectionToken, EventEmitter, Directive, Optional, Input, Output, NgModule;
    return {
        setters: [function (module) {
            DOCUMENT = module.DOCUMENT;
        }, function (module) {
            i0 = module;
            Injectable = module.Injectable;
            Inject = module.Inject;
            InjectionToken = module.InjectionToken;
            EventEmitter = module.EventEmitter;
            Directive = module.Directive;
            Optional = module.Optional;
            Input = module.Input;
            Output = module.Output;
            NgModule = module.NgModule;
        }],
        execute: (function () {

            /**
             * A pending copy-to-clipboard operation.
             *
             * The implementation of copying text to the clipboard modifies the DOM and
             * forces a re-layout. This re-layout can take too long if the string is large,
             * causing the execCommand('copy') to happen too long after the user clicked.
             * This results in the browser refusing to copy. This object lets the
             * re-layout happen in a separate tick from copying by providing a copy function
             * that can be called later.
             *
             * Destroy must be called when no longer in use, regardless of whether `copy` is
             * called.
             */
            class PendingCopy {
              constructor(text, _document) {
                this._document = _document;
                const textarea = this._textarea = this._document.createElement('textarea');
                const styles = textarea.style;
                // Hide the element for display and accessibility. Set a fixed position so the page layout
                // isn't affected. We use `fixed` with `top: 0`, because focus is moved into the textarea
                // for a split second and if it's off-screen, some browsers will attempt to scroll it into view.
                styles.position = 'fixed';
                styles.top = styles.opacity = '0';
                styles.left = '-999em';
                textarea.setAttribute('aria-hidden', 'true');
                textarea.value = text;
                // Making the textarea `readonly` prevents the screen from jumping on iOS Safari (see #25169).
                textarea.readOnly = true;
                // The element needs to be inserted into the fullscreen container, if the page
                // is in fullscreen mode, otherwise the browser won't execute the copy command.
                (this._document.fullscreenElement || this._document.body).appendChild(textarea);
              }
              /** Finishes copying the text. */
              copy() {
                const textarea = this._textarea;
                let successful = false;
                try {
                  // Older browsers could throw if copy is not supported.
                  if (textarea) {
                    const currentFocus = this._document.activeElement;
                    textarea.select();
                    textarea.setSelectionRange(0, textarea.value.length);
                    successful = this._document.execCommand('copy');
                    if (currentFocus) {
                      currentFocus.focus();
                    }
                  }
                } catch {
                  // Discard error.
                  // Initial setting of {@code successful} will represent failure here.
                }
                return successful;
              }
              /** Cleans up DOM changes used to perform the copy operation. */
              destroy() {
                const textarea = this._textarea;
                if (textarea) {
                  textarea.remove();
                  this._textarea = undefined;
                }
              }
            } exports("PendingCopy", PendingCopy);

            /**
             * A service for copying text to the clipboard.
             */
            class Clipboard {
              constructor(document) {
                this._document = document;
              }
              /**
               * Copies the provided text into the user's clipboard.
               *
               * @param text The string to copy.
               * @returns Whether the operation was successful.
               */
              copy(text) {
                const pendingCopy = this.beginCopy(text);
                const successful = pendingCopy.copy();
                pendingCopy.destroy();
                return successful;
              }
              /**
               * Prepares a string to be copied later. This is useful for large strings
               * which take too long to successfully render and be copied in the same tick.
               *
               * The caller must call `destroy` on the returned `PendingCopy`.
               *
               * @param text The string to copy.
               * @returns the pending copy operation.
               */
              beginCopy(text) {
                return new PendingCopy(text, this._document);
              }
              static {
                this.ɵfac = function Clipboard_Factory(t) {
                  return new (t || Clipboard)(i0.ɵɵinject(DOCUMENT));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: Clipboard,
                  factory: Clipboard.ɵfac,
                  providedIn: 'root'
                });
              }
            } exports("Clipboard", Clipboard);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Clipboard, [{
                type: Injectable,
                args: [{
                  providedIn: 'root'
                }]
              }], function () {
                return [{
                  type: undefined,
                  decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                  }]
                }];
              }, null);
            })();

            /** Injection token that can be used to provide the default options to `CdkCopyToClipboard`. */
            const CDK_COPY_TO_CLIPBOARD_CONFIG = exports("CDK_COPY_TO_CLIPBOARD_CONFIG", new InjectionToken('CDK_COPY_TO_CLIPBOARD_CONFIG'));
            /**
             * Provides behavior for a button that when clicked copies content into user's
             * clipboard.
             */
            class CdkCopyToClipboard {
              constructor(_clipboard, _ngZone, config) {
                this._clipboard = _clipboard;
                this._ngZone = _ngZone;
                /** Content to be copied. */
                this.text = '';
                /**
                 * How many times to attempt to copy the text. This may be necessary for longer text, because
                 * the browser needs time to fill an intermediate textarea element and copy the content.
                 */
                this.attempts = 1;
                /**
                 * Emits when some text is copied to the clipboard. The
                 * emitted value indicates whether copying was successful.
                 */
                this.copied = new EventEmitter();
                /** Copies that are currently being attempted. */
                this._pending = new Set();
                if (config && config.attempts != null) {
                  this.attempts = config.attempts;
                }
              }
              /** Copies the current text to the clipboard. */
              copy(attempts = this.attempts) {
                if (attempts > 1) {
                  let remainingAttempts = attempts;
                  const pending = this._clipboard.beginCopy(this.text);
                  this._pending.add(pending);
                  const attempt = () => {
                    const successful = pending.copy();
                    if (!successful && --remainingAttempts && !this._destroyed) {
                      // We use 1 for the timeout since it's more predictable when flushing in unit tests.
                      this._currentTimeout = this._ngZone.runOutsideAngular(() => setTimeout(attempt, 1));
                    } else {
                      this._currentTimeout = null;
                      this._pending.delete(pending);
                      pending.destroy();
                      this.copied.emit(successful);
                    }
                  };
                  attempt();
                } else {
                  this.copied.emit(this._clipboard.copy(this.text));
                }
              }
              ngOnDestroy() {
                if (this._currentTimeout) {
                  clearTimeout(this._currentTimeout);
                }
                this._pending.forEach(copy => copy.destroy());
                this._pending.clear();
                this._destroyed = true;
              }
              static {
                this.ɵfac = function CdkCopyToClipboard_Factory(t) {
                  return new (t || CdkCopyToClipboard)(i0.ɵɵdirectiveInject(Clipboard), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(CDK_COPY_TO_CLIPBOARD_CONFIG, 8));
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: CdkCopyToClipboard,
                  selectors: [["", "cdkCopyToClipboard", ""]],
                  hostBindings: function CdkCopyToClipboard_HostBindings(rf, ctx) {
                    if (rf & 1) {
                      i0.ɵɵlistener("click", function CdkCopyToClipboard_click_HostBindingHandler() {
                        return ctx.copy();
                      });
                    }
                  },
                  inputs: {
                    text: ["cdkCopyToClipboard", "text"],
                    attempts: ["cdkCopyToClipboardAttempts", "attempts"]
                  },
                  outputs: {
                    copied: "cdkCopyToClipboardCopied"
                  }
                });
              }
            } exports("CdkCopyToClipboard", CdkCopyToClipboard);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkCopyToClipboard, [{
                type: Directive,
                args: [{
                  selector: '[cdkCopyToClipboard]',
                  host: {
                    '(click)': 'copy()'
                  }
                }]
              }], function () {
                return [{
                  type: Clipboard
                }, {
                  type: i0.NgZone
                }, {
                  type: undefined,
                  decorators: [{
                    type: Optional
                  }, {
                    type: Inject,
                    args: [CDK_COPY_TO_CLIPBOARD_CONFIG]
                  }]
                }];
              }, {
                text: [{
                  type: Input,
                  args: ['cdkCopyToClipboard']
                }],
                attempts: [{
                  type: Input,
                  args: ['cdkCopyToClipboardAttempts']
                }],
                copied: [{
                  type: Output,
                  args: ['cdkCopyToClipboardCopied']
                }]
              });
            })();
            class ClipboardModule {
              static {
                this.ɵfac = function ClipboardModule_Factory(t) {
                  return new (t || ClipboardModule)();
                };
              }
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: ClipboardModule
                });
              }
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({});
              }
            } exports("ClipboardModule", ClipboardModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClipboardModule, [{
                type: NgModule,
                args: [{
                  declarations: [CdkCopyToClipboard],
                  exports: [CdkCopyToClipboard]
                }]
              }], null, null);
            })();

        })
    };
}));
//# sourceMappingURL=clipboard.js.map
