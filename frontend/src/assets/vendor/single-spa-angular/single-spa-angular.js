/* esm-bundle - single-spa-angular - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core', 'single-spa-angular/internals', '@angular/common'], (function (exports) {
    'use strict';
    var i0, Injectable, Inject, getContainerElementAndSetTemplate, BrowserPlatformLocation, DOCUMENT, PlatformLocation;
    return {
        setters: [function (module) {
            i0 = module;
            Injectable = module.Injectable;
            Inject = module.Inject;
        }, function (module) {
            getContainerElementAndSetTemplate = module.getContainerElementAndSetTemplate;
        }, function (module) {
            BrowserPlatformLocation = module.BrowserPlatformLocation;
            DOCUMENT = module.DOCUMENT;
            PlatformLocation = module.PlatformLocation;
        }],
        execute: (function () {

            exports({
                enableProdMode: enableProdMode,
                getSingleSpaExtraProviders: getSingleSpaExtraProviders,
                singleSpaAngular: singleSpaAngular
            });

            function enableProdMode() {
              try {
                // The `enableProdMode` will throw an error if it's called multiple times,
                // but it may be called multiple times when dependencies are shared.
                i0.enableProdMode();
              } catch {
                // Nothing to do here.
              }
            }
            class SingleSpaPlatformLocation extends BrowserPlatformLocation {
              constructor() {
                super(...arguments);
                // This is a simple marker that helps us to ignore PopStateEvents
                // that was not dispatched by the browser.
                this.skipNextPopState = false;
                this.source = 'Window.addEventListener:popstate';
              }
              pushState(state, title, url) {
                this.skipNextPopState = true;
                super.pushState(state, title, url);
              }
              replaceState(state, title, url) {
                this.skipNextPopState = true;
                super.replaceState(state, title, url);
              }
              onPopState(fn) {
                // `Zone.current` will reference the zone that serves as an execution context
                // to some specific application, especially when `onPopState` is called.
                const zone = Zone.current;
                // Wrap any event listener into zone that is specific to some application.
                // The main issue is `back/forward` buttons of browsers, because they invoke
                // `history.back|forward` which dispatch `popstate` event. Since `single-spa`
                // overrides `history.replaceState` Angular's zone cannot intercept this event.
                // Only the root zone is able to intercept all events.
                // See https://github.com/single-spa/single-spa-angular/issues/94 for more details
                fn = zone.wrap(fn, this.source);
                const onPopStateListener = event => {
                  // The `LocationChangeEvent` doesn't have the `singleSpa` property, since it's added
                  // by `single-spa` starting from `5.4` version. We need this check because we want
                  // to skip "unnatural" PopStateEvents, the one caused by `single-spa`.
                  const popStateEventWasDispatchedBySingleSpa = !!event.singleSpa;
                  if (this.skipNextPopState && popStateEventWasDispatchedBySingleSpa) {
                    this.skipNextPopState = false;
                  } else {
                    fn(event);
                  }
                };
                return super.onPopState(onPopStateListener);
              }
              /** @nocollapse */
              static {
                this.ɵfac = /* @__PURE__ */function () {
                  let ɵSingleSpaPlatformLocation_BaseFactory;
                  return function SingleSpaPlatformLocation_Factory(t) {
                    return (ɵSingleSpaPlatformLocation_BaseFactory || (ɵSingleSpaPlatformLocation_BaseFactory = i0.ɵɵgetInheritedFactory(SingleSpaPlatformLocation)))(t || SingleSpaPlatformLocation);
                  };
                }();
              }
              /** @nocollapse */
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: SingleSpaPlatformLocation,
                  factory: SingleSpaPlatformLocation.ɵfac
                });
              }
            }
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SingleSpaPlatformLocation, [{
                type: Injectable
              }], null, null);
            })();
            /**
             * The `PlatformLocation` class is an "injectee" of the `PathLocationStrategy`,
             * which creates `Subject` internally for listening on `popstate` events. We want
             * to provide this class in the most top injector that's used during bootstrapping.
             */
            function getSingleSpaExtraProviders() {
              return [{
                provide: SingleSpaPlatformLocation,
                deps: [[new Inject(DOCUMENT)]]
              }, {
                provide: PlatformLocation,
                useExisting: SingleSpaPlatformLocation
              }];
            }
            const defaultOptions = {
              // Required options that will be set by the library consumer.
              NgZone: null,
              bootstrapFunction: null,
              template: null,
              // Optional options
              Router: undefined,
              domElementGetter: undefined,
              updateFunction: () => Promise.resolve(),
              bootstrappedNgModuleRefOrAppRef: null
            };
            const NG_DEV_MODE = typeof ngDevMode === 'undefined' || ngDevMode;
            function singleSpaAngular(userOptions) {
              if (NG_DEV_MODE && typeof userOptions !== 'object') {
                throw Error('single-spa-angular requires a configuration object');
              }
              const options = {
                ...defaultOptions,
                ...userOptions
              };
              if (NG_DEV_MODE && typeof options.bootstrapFunction !== 'function') {
                throw Error('single-spa-angular must be passed an options.bootstrapFunction');
              }
              if (NG_DEV_MODE && typeof options.template !== 'string') {
                throw Error('single-spa-angular must be passed options.template string');
              }
              if (NG_DEV_MODE && !options.NgZone) {
                throw Error(`single-spa-angular must be passed the NgZone option`);
              }
              if (NG_DEV_MODE && options.Router && !options.NavigationStart) {
                // We call `console.warn` except of throwing `new Error()` since this will not
                // be a breaking change.
                console.warn(`single-spa-angular must be passed the NavigationStart option`);
              }
              return {
                bootstrap: bootstrap.bind(null, options),
                mount: mount.bind(null, options),
                unmount: unmount.bind(null, options),
                update: options.updateFunction
              };
            }
            async function bootstrap(options, props) {
              // Angular provides an opportunity to develop `zone-less` application, where developers
              // have to trigger change detection manually.
              // See https://angular.io/guide/zone#noopzone
              if (options.NgZone === 'noop') {
                return;
              }
              // In order for multiple Angular apps to work concurrently on a page, they each need a unique identifier.
              options.zoneIdentifier = `single-spa-angular:${props.name || props.appName}`;
              // This is a hack, since NgZone doesn't allow you to configure the property that identifies your zone.
              // See https://github.com/PlaceMe-SAS/single-spa-angular-cli/issues/33,
              // https://github.com/single-spa/single-spa-angular/issues/47,
              // https://github.com/angular/angular/blob/a14dc2d7a4821a19f20a9547053a5734798f541e/packages/core/src/zone/ng_zone.ts#L144,
              // and https://github.com/angular/angular/blob/a14dc2d7a4821a19f20a9547053a5734798f541e/packages/core/src/zone/ng_zone.ts#L257
              options.NgZone.isInAngularZone = () => {
                // @ts-ignore
                return window.Zone.current._properties[options.zoneIdentifier] === true;
              };
              options.routingEventListener = () => {
                options.bootstrappedNgZone.run(() => {
                  // See https://github.com/single-spa/single-spa-angular/issues/86
                  // Zone is unaware of the single-spa navigation change and so Angular change detection doesn't work
                  // unless we tell Zone that something happened
                });
              };
            }
            async function mount(options, props) {
              getContainerElementAndSetTemplate(options, props);
              const bootstrapPromise = options.bootstrapFunction(props);
              if (NG_DEV_MODE && !(bootstrapPromise instanceof Promise)) {
                throw Error(`single-spa-angular: the options.bootstrapFunction must return a promise, but instead returned a '${typeof bootstrapPromise}' that is not a Promise`);
              }
              const ngModuleRefOrAppRef = await bootstrapPromise;
              if (NG_DEV_MODE) {
                if (!ngModuleRefOrAppRef || typeof ngModuleRefOrAppRef.destroy !== 'function') {
                  throw Error(`single-spa-angular: the options.bootstrapFunction returned a promise that did not resolve with a valid Angular module or ApplicationRef. Did you call platformBrowserDynamic().bootstrapModule() correctly?`);
                }
              }
              const singleSpaPlatformLocation = ngModuleRefOrAppRef.injector.get(SingleSpaPlatformLocation, null);
              const ngZoneEnabled = options.NgZone !== 'noop';
              // The user has to provide `BrowserPlatformLocation` only if his application uses routing.
              // So if he provided `Router` but didn't provide `BrowserPlatformLocation` then we have to inform him.
              // Also `getSingleSpaExtraProviders()` function should be called only if the user doesn't use
              // `zone-less` change detection, if `NgZone` is `noop` then we can skip it.
              if (NG_DEV_MODE && ngZoneEnabled && options.Router && singleSpaPlatformLocation === null) {
                throw new Error(`
      single-spa-angular: could not retrieve extra providers from the platform injector. Did you call platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule()?
    `);
              }
              const bootstrappedOptions = options;
              if (ngZoneEnabled) {
                const ngZone = ngModuleRefOrAppRef.injector.get(options.NgZone);
                const zoneIdentifier = bootstrappedOptions.zoneIdentifier;
                // `NgZone` can be enabled but routing may not be used thus `getSingleSpaExtraProviders()`
                // function was not called.
                if (singleSpaPlatformLocation !== null) {
                  skipLocationChangeOnNonImperativeRoutingTriggers(ngModuleRefOrAppRef, options);
                }
                bootstrappedOptions.bootstrappedNgZone = ngZone;
                bootstrappedOptions.bootstrappedNgZone._inner._properties[zoneIdentifier] = true;
                window.addEventListener('single-spa:routing-event', bootstrappedOptions.routingEventListener);
              }
              bootstrappedOptions.bootstrappedNgModuleRefOrAppRef = ngModuleRefOrAppRef;
              return ngModuleRefOrAppRef;
            }
            function unmount(options) {
              return Promise.resolve().then(() => {
                if (options.routingEventListener) {
                  window.removeEventListener('single-spa:routing-event', options.routingEventListener);
                }
                options.bootstrappedNgModuleRefOrAppRef.destroy();
                options.bootstrappedNgModuleRefOrAppRef = null;
              });
            }
            function skipLocationChangeOnNonImperativeRoutingTriggers(ngModuleRefOrAppRef, options) {
              if (!options.NavigationStart) {
                // As discussed we don't do anything right now if the developer doesn't provide
                // `options.NavigationStart` since this might be a breaking change.
                return;
              }
              const router = ngModuleRefOrAppRef.injector.get(options.Router);
              const subscription = router.events.subscribe(event => {
                if (event instanceof options.NavigationStart) {
                  const currentNavigation = router.getCurrentNavigation();
                  // This listener will be set up for each Angular application
                  // that has routing capabilities.
                  // We set `skipLocationChange` for each non-imperative navigation,
                  // Angular router checks under the hood if it has to change
                  // the browser URL or not.
                  // If `skipLocationChange` is truthy then Angular router will not call
                  // `setBrowserUrl()` which calls `history.replaceState()` and dispatches `popstate` event.
                  if (currentNavigation.trigger !== 'imperative') {
                    currentNavigation.extras.skipLocationChange = true;
                    currentNavigation.extras.replaceUrl = false;
                  }
                }
              });
              ngModuleRefOrAppRef.onDestroy(() => subscription.unsubscribe());
            }

        })
    };
}));
//# sourceMappingURL=single-spa-angular.js.map
