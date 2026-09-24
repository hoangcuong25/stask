/* esm-bundle - single-spa-angular/parcel - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core'], (function (exports) {
    'use strict';
    var i0, Component, ChangeDetectionStrategy, Input, NgModule;
    return {
        setters: [function (module) {
            i0 = module;
            Component = module.Component;
            ChangeDetectionStrategy = module.ChangeDetectionStrategy;
            Input = module.Input;
            NgModule = module.NgModule;
        }],
        execute: (function () {

            class ParcelComponent {
              constructor(host) {
                this.host = host;
                this.config = null;
                this.mountParcel = null;
                this.onParcelMount = null;
                this.wrapWith = 'div';
                this.customProps = {};
                this.appendTo = null;
                this.handleError = error => console.error(error);
                this.hasError = false;
                this.wrapper = null;
                this.parcel = null;
                this.task = null;
              }
              ngOnChanges() {
                this.scheduleTask("update" /* Action.Update */, () => {
                  if (this.parcel !== null && this.parcel.update) {
                    return this.parcel.update(this.customProps);
                  }
                });
              }
              ngOnInit() {
                this.scheduleTask("mount" /* Action.Mount */, () => {
                  if ((typeof ngDevMode === 'undefined' || ngDevMode) && this.mountParcel === null) {
                    throw new Error('single-spa-angular: the [mountParcel] binding is required when using the <parcel> component. You can either (1) import mountRootParcel from single-spa or (2) use the mountParcel prop provided to single-spa applications.');
                  }
                  this.wrapper = document.createElement(this.wrapWith);
                  if (this.appendTo !== null) {
                    this.appendTo.appendChild(this.wrapper);
                  } else {
                    this.host.nativeElement.appendChild(this.wrapper);
                  }
                  this.parcel = this.mountParcel(this.config, {
                    ...this.customProps,
                    domElement: this.wrapper
                  });
                  if (this.onParcelMount !== null) {
                    this.parcel.mountPromise.then(this.onParcelMount);
                  }
                  this.unmounted = false;
                  return this.parcel.mountPromise;
                });
              }
              ngOnDestroy() {
                this.scheduleTask("unmount" /* Action.Unmount */, () => {
                  if (this.parcel !== null && this.parcel.getStatus() === 'MOUNTED') {
                    return this.parcel.unmount();
                  }
                });
                if (this.wrapper !== null) {
                  this.wrapper.parentNode.removeChild(this.wrapper);
                }
                this.unmounted = true;
              }
              scheduleTask(action, task) {
                if (this.hasError && action !== "unmount" /* Action.Unmount */) {
                  // In an error state, we don't do anything anymore except for unmounting
                  return;
                }
                this.task = (this.task || Promise.resolve()).then(() => {
                  if (this.unmounted && action !== "unmount" /* Action.Unmount */) {
                    // Never do anything once the angular component unmounts
                    return;
                  }
                  return task();
                }).catch(error => {
                  this.task = Promise.resolve();
                  this.hasError = true;
                  if (error?.message) {
                    error.message = `During '${action}', parcel threw an error: ${error.message}`;
                  }
                  if (typeof this.handleError === 'function') {
                    this.handleError(error);
                  } else {
                    setTimeout(() => {
                      throw error;
                    });
                  }
                  // No more things to do should be done -- the parcel is in an error state
                  throw error;
                });
              }
              /** @nocollapse */
              static {
                this.ɵfac = function ParcelComponent_Factory(t) {
                  return new (t || ParcelComponent)(i0.ɵɵdirectiveInject(i0.ElementRef));
                };
              }
              /** @nocollapse */
              static {
                this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
                  type: ParcelComponent,
                  selectors: [["parcel"]],
                  inputs: {
                    config: "config",
                    mountParcel: "mountParcel",
                    onParcelMount: "onParcelMount",
                    wrapWith: "wrapWith",
                    customProps: "customProps",
                    appendTo: "appendTo",
                    handleError: "handleError"
                  },
                  standalone: true,
                  features: [i0.ɵɵNgOnChangesFeature, i0.ɵɵStandaloneFeature],
                  decls: 0,
                  vars: 0,
                  template: function ParcelComponent_Template(rf, ctx) {},
                  encapsulation: 2,
                  changeDetection: 0
                });
              }
            } exports("ParcelComponent", ParcelComponent);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ParcelComponent, [{
                type: Component,
                args: [{
                  selector: 'parcel',
                  template: '',
                  changeDetection: ChangeDetectionStrategy.OnPush,
                  standalone: true
                }]
              }], function () {
                return [{
                  type: i0.ElementRef
                }];
              }, {
                config: [{
                  type: Input
                }],
                mountParcel: [{
                  type: Input
                }],
                onParcelMount: [{
                  type: Input
                }],
                wrapWith: [{
                  type: Input
                }],
                customProps: [{
                  type: Input
                }],
                appendTo: [{
                  type: Input
                }],
                handleError: [{
                  type: Input
                }]
              });
            })();
            class ParcelModule {
              /** @nocollapse */static {
                this.ɵfac = function ParcelModule_Factory(t) {
                  return new (t || ParcelModule)();
                };
              }
              /** @nocollapse */
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: ParcelModule
                });
              }
              /** @nocollapse */
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({});
              }
            } exports("ParcelModule", ParcelModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ParcelModule, [{
                type: NgModule,
                args: [{
                  imports: [ParcelComponent],
                  exports: [ParcelComponent]
                }]
              }], null, null);
            })();

        })
    };
}));
//# sourceMappingURL=parcel.js.map
