/* esm-bundle - @angular/cdk/bidi - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core', '@angular/common'], (function (exports) {
    'use strict';
    var InjectionToken, inject, EventEmitter, i0, Injectable, Optional, Inject, Directive, Output, Input, NgModule, DOCUMENT;
    return {
        setters: [function (module) {
            InjectionToken = module.InjectionToken;
            inject = module.inject;
            EventEmitter = module.EventEmitter;
            i0 = module;
            Injectable = module.Injectable;
            Optional = module.Optional;
            Inject = module.Inject;
            Directive = module.Directive;
            Output = module.Output;
            Input = module.Input;
            NgModule = module.NgModule;
        }, function (module) {
            DOCUMENT = module.DOCUMENT;
        }],
        execute: (function () {

            /**
             * Injection token used to inject the document into Directionality.
             * This is used so that the value can be faked in tests.
             *
             * We can't use the real document in tests because changing the real `dir` causes geometry-based
             * tests in Safari to fail.
             *
             * We also can't re-provide the DOCUMENT token from platform-browser because the unit tests
             * themselves use things like `querySelector` in test code.
             *
             * This token is defined in a separate file from Directionality as a workaround for
             * https://github.com/angular/angular/issues/22559
             *
             * @docs-private
             */
            const DIR_DOCUMENT = exports("DIR_DOCUMENT", new InjectionToken('cdk-dir-doc', {
              providedIn: 'root',
              factory: DIR_DOCUMENT_FACTORY
            }));
            /** @docs-private */
            function DIR_DOCUMENT_FACTORY() {
              return inject(DOCUMENT);
            }

            /** Regex that matches locales with an RTL script. Taken from `goog.i18n.bidi.isRtlLanguage`. */
            const RTL_LOCALE_PATTERN = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
            /** Resolves a string value to a specific direction. */
            function _resolveDirectionality(rawValue) {
              const value = rawValue?.toLowerCase() || '';
              if (value === 'auto' && typeof navigator !== 'undefined' && navigator?.language) {
                return RTL_LOCALE_PATTERN.test(navigator.language) ? 'rtl' : 'ltr';
              }
              return value === 'rtl' ? 'rtl' : 'ltr';
            }
            /**
             * The directionality (LTR / RTL) context for the application (or a subtree of it).
             * Exposes the current direction and a stream of direction changes.
             */
            class Directionality {
              constructor(_document) {
                /** The current 'ltr' or 'rtl' value. */
                this.value = 'ltr';
                /** Stream that emits whenever the 'ltr' / 'rtl' state changes. */
                this.change = new EventEmitter();
                if (_document) {
                  const bodyDir = _document.body ? _document.body.dir : null;
                  const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
                  this.value = _resolveDirectionality(bodyDir || htmlDir || 'ltr');
                }
              }
              ngOnDestroy() {
                this.change.complete();
              }
              static {
                this.ɵfac = function Directionality_Factory(t) {
                  return new (t || Directionality)(i0.ɵɵinject(DIR_DOCUMENT, 8));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: Directionality,
                  factory: Directionality.ɵfac,
                  providedIn: 'root'
                });
              }
            } exports("Directionality", Directionality);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Directionality, [{
                type: Injectable,
                args: [{
                  providedIn: 'root'
                }]
              }], function () {
                return [{
                  type: undefined,
                  decorators: [{
                    type: Optional
                  }, {
                    type: Inject,
                    args: [DIR_DOCUMENT]
                  }]
                }];
              }, null);
            })();

            /**
             * Directive to listen for changes of direction of part of the DOM.
             *
             * Provides itself as Directionality such that descendant directives only need to ever inject
             * Directionality to get the closest direction.
             */
            class Dir {
              constructor() {
                /** Normalized direction that accounts for invalid/unsupported values. */
                this._dir = 'ltr';
                /** Whether the `value` has been set to its initial value. */
                this._isInitialized = false;
                /** Event emitted when the direction changes. */
                this.change = new EventEmitter();
              }
              /** @docs-private */
              get dir() {
                return this._dir;
              }
              set dir(value) {
                const previousValue = this._dir;
                // Note: `_resolveDirectionality` resolves the language based on the browser's language,
                // whereas the browser does it based on the content of the element. Since doing so based
                // on the content can be expensive, for now we're doing the simpler matching.
                this._dir = _resolveDirectionality(value);
                this._rawDir = value;
                if (previousValue !== this._dir && this._isInitialized) {
                  this.change.emit(this._dir);
                }
              }
              /** Current layout direction of the element. */
              get value() {
                return this.dir;
              }
              /** Initialize once default value has been set. */
              ngAfterContentInit() {
                this._isInitialized = true;
              }
              ngOnDestroy() {
                this.change.complete();
              }
              static {
                this.ɵfac = function Dir_Factory(t) {
                  return new (t || Dir)();
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: Dir,
                  selectors: [["", "dir", ""]],
                  hostVars: 1,
                  hostBindings: function Dir_HostBindings(rf, ctx) {
                    if (rf & 2) {
                      i0.ɵɵattribute("dir", ctx._rawDir);
                    }
                  },
                  inputs: {
                    dir: "dir"
                  },
                  outputs: {
                    change: "dirChange"
                  },
                  exportAs: ["dir"],
                  features: [i0.ɵɵProvidersFeature([{
                    provide: Directionality,
                    useExisting: Dir
                  }])]
                });
              }
            } exports("Dir", Dir);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Dir, [{
                type: Directive,
                args: [{
                  selector: '[dir]',
                  providers: [{
                    provide: Directionality,
                    useExisting: Dir
                  }],
                  host: {
                    '[attr.dir]': '_rawDir'
                  },
                  exportAs: 'dir'
                }]
              }], null, {
                change: [{
                  type: Output,
                  args: ['dirChange']
                }],
                dir: [{
                  type: Input
                }]
              });
            })();
            class BidiModule {
              static {
                this.ɵfac = function BidiModule_Factory(t) {
                  return new (t || BidiModule)();
                };
              }
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: BidiModule
                });
              }
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({});
              }
            } exports("BidiModule", BidiModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BidiModule, [{
                type: NgModule,
                args: [{
                  exports: [Dir],
                  declarations: [Dir]
                }]
              }], null, null);
            })();

        })
    };
}));
//# sourceMappingURL=bidi.js.map
