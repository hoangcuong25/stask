/* esm-bundle - @angular/cdk/observers - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/cdk/coercion', '@angular/core', 'rxjs', 'rxjs/operators'], (function (exports) {
    'use strict';
    var coerceElement, coerceBooleanProperty, coerceNumberProperty, i0, Injectable, EventEmitter, Directive, Output, Input, NgModule, Observable, Subject, debounceTime;
    return {
        setters: [function (module) {
            coerceElement = module.coerceElement;
            coerceBooleanProperty = module.coerceBooleanProperty;
            coerceNumberProperty = module.coerceNumberProperty;
        }, function (module) {
            i0 = module;
            Injectable = module.Injectable;
            EventEmitter = module.EventEmitter;
            Directive = module.Directive;
            Output = module.Output;
            Input = module.Input;
            NgModule = module.NgModule;
        }, function (module) {
            Observable = module.Observable;
            Subject = module.Subject;
        }, function (module) {
            debounceTime = module.debounceTime;
        }],
        execute: (function () {

            /**
             * Factory that creates a new MutationObserver and allows us to stub it out in unit tests.
             * @docs-private
             */
            class MutationObserverFactory {
              create(callback) {
                return typeof MutationObserver === 'undefined' ? null : new MutationObserver(callback);
              }
              static {
                this.ɵfac = function MutationObserverFactory_Factory(t) {
                  return new (t || MutationObserverFactory)();
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: MutationObserverFactory,
                  factory: MutationObserverFactory.ɵfac,
                  providedIn: 'root'
                });
              }
            } exports("MutationObserverFactory", MutationObserverFactory);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MutationObserverFactory, [{
                type: Injectable,
                args: [{
                  providedIn: 'root'
                }]
              }], null, null);
            })();
            /** An injectable service that allows watching elements for changes to their content. */
            class ContentObserver {
              constructor(_mutationObserverFactory) {
                this._mutationObserverFactory = _mutationObserverFactory;
                /** Keeps track of the existing MutationObservers so they can be reused. */
                this._observedElements = new Map();
              }
              ngOnDestroy() {
                this._observedElements.forEach((_, element) => this._cleanupObserver(element));
              }
              observe(elementOrRef) {
                const element = coerceElement(elementOrRef);
                return new Observable(observer => {
                  const stream = this._observeElement(element);
                  const subscription = stream.subscribe(observer);
                  return () => {
                    subscription.unsubscribe();
                    this._unobserveElement(element);
                  };
                });
              }
              /**
               * Observes the given element by using the existing MutationObserver if available, or creating a
               * new one if not.
               */
              _observeElement(element) {
                if (!this._observedElements.has(element)) {
                  const stream = new Subject();
                  const observer = this._mutationObserverFactory.create(mutations => stream.next(mutations));
                  if (observer) {
                    observer.observe(element, {
                      characterData: true,
                      childList: true,
                      subtree: true
                    });
                  }
                  this._observedElements.set(element, {
                    observer,
                    stream,
                    count: 1
                  });
                } else {
                  this._observedElements.get(element).count++;
                }
                return this._observedElements.get(element).stream;
              }
              /**
               * Un-observes the given element and cleans up the underlying MutationObserver if nobody else is
               * observing this element.
               */
              _unobserveElement(element) {
                if (this._observedElements.has(element)) {
                  this._observedElements.get(element).count--;
                  if (!this._observedElements.get(element).count) {
                    this._cleanupObserver(element);
                  }
                }
              }
              /** Clean up the underlying MutationObserver for the specified element. */
              _cleanupObserver(element) {
                if (this._observedElements.has(element)) {
                  const {
                    observer,
                    stream
                  } = this._observedElements.get(element);
                  if (observer) {
                    observer.disconnect();
                  }
                  stream.complete();
                  this._observedElements.delete(element);
                }
              }
              static {
                this.ɵfac = function ContentObserver_Factory(t) {
                  return new (t || ContentObserver)(i0.ɵɵinject(MutationObserverFactory));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: ContentObserver,
                  factory: ContentObserver.ɵfac,
                  providedIn: 'root'
                });
              }
            } exports("ContentObserver", ContentObserver);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentObserver, [{
                type: Injectable,
                args: [{
                  providedIn: 'root'
                }]
              }], function () {
                return [{
                  type: MutationObserverFactory
                }];
              }, null);
            })();
            /**
             * Directive that triggers a callback whenever the content of
             * its associated element has changed.
             */
            class CdkObserveContent {
              /**
               * Whether observing content is disabled. This option can be used
               * to disconnect the underlying MutationObserver until it is needed.
               */
              get disabled() {
                return this._disabled;
              }
              set disabled(value) {
                this._disabled = coerceBooleanProperty(value);
                this._disabled ? this._unsubscribe() : this._subscribe();
              }
              /** Debounce interval for emitting the changes. */
              get debounce() {
                return this._debounce;
              }
              set debounce(value) {
                this._debounce = coerceNumberProperty(value);
                this._subscribe();
              }
              constructor(_contentObserver, _elementRef, _ngZone) {
                this._contentObserver = _contentObserver;
                this._elementRef = _elementRef;
                this._ngZone = _ngZone;
                /** Event emitted for each change in the element's content. */
                this.event = new EventEmitter();
                this._disabled = false;
                this._currentSubscription = null;
              }
              ngAfterContentInit() {
                if (!this._currentSubscription && !this.disabled) {
                  this._subscribe();
                }
              }
              ngOnDestroy() {
                this._unsubscribe();
              }
              _subscribe() {
                this._unsubscribe();
                const stream = this._contentObserver.observe(this._elementRef);
                // TODO(mmalerba): We shouldn't be emitting on this @Output() outside the zone.
                // Consider brining it back inside the zone next time we're making breaking changes.
                // Bringing it back inside can cause things like infinite change detection loops and changed
                // after checked errors if people's code isn't handling it properly.
                this._ngZone.runOutsideAngular(() => {
                  this._currentSubscription = (this.debounce ? stream.pipe(debounceTime(this.debounce)) : stream).subscribe(this.event);
                });
              }
              _unsubscribe() {
                this._currentSubscription?.unsubscribe();
              }
              static {
                this.ɵfac = function CdkObserveContent_Factory(t) {
                  return new (t || CdkObserveContent)(i0.ɵɵdirectiveInject(ContentObserver), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone));
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: CdkObserveContent,
                  selectors: [["", "cdkObserveContent", ""]],
                  inputs: {
                    disabled: ["cdkObserveContentDisabled", "disabled"],
                    debounce: "debounce"
                  },
                  outputs: {
                    event: "cdkObserveContent"
                  },
                  exportAs: ["cdkObserveContent"]
                });
              }
            } exports("CdkObserveContent", CdkObserveContent);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkObserveContent, [{
                type: Directive,
                args: [{
                  selector: '[cdkObserveContent]',
                  exportAs: 'cdkObserveContent'
                }]
              }], function () {
                return [{
                  type: ContentObserver
                }, {
                  type: i0.ElementRef
                }, {
                  type: i0.NgZone
                }];
              }, {
                event: [{
                  type: Output,
                  args: ['cdkObserveContent']
                }],
                disabled: [{
                  type: Input,
                  args: ['cdkObserveContentDisabled']
                }],
                debounce: [{
                  type: Input
                }]
              });
            })();
            class ObserversModule {
              static {
                this.ɵfac = function ObserversModule_Factory(t) {
                  return new (t || ObserversModule)();
                };
              }
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: ObserversModule
                });
              }
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
                  providers: [MutationObserverFactory]
                });
              }
            } exports("ObserversModule", ObserversModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ObserversModule, [{
                type: NgModule,
                args: [{
                  exports: [CdkObserveContent],
                  declarations: [CdkObserveContent],
                  providers: [MutationObserverFactory]
                }]
              }], null, null);
            })();

        })
    };
}));
//# sourceMappingURL=observers.js.map
