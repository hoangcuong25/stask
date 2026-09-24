/* esm-bundle - @angular/platform-browser-dynamic - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/compiler', '@angular/core', '@angular/common', '@angular/platform-browser'], (function (exports) {
    'use strict';
    var ResourceLoader, CompilerConfig, createPlatformFactory, platformCore, COMPILER_OPTIONS, CompilerFactory, i0, Injectable, Version, ViewEncapsulation, MissingTranslationStrategy, Injector, Compiler, PLATFORM_ID, _global, _PLATFORM_BROWSER_ID, _INTERNAL_BROWSER_PLATFORM_PROVIDERS;
    return {
        setters: [function (module) {
            ResourceLoader = module.ResourceLoader;
            CompilerConfig = module.CompilerConfig;
        }, function (module) {
            createPlatformFactory = module.createPlatformFactory;
            platformCore = module.platformCore;
            COMPILER_OPTIONS = module.COMPILER_OPTIONS;
            CompilerFactory = module.CompilerFactory;
            i0 = module;
            Injectable = module.Injectable;
            Version = module.Version;
            ViewEncapsulation = module.ViewEncapsulation;
            MissingTranslationStrategy = module.MissingTranslationStrategy;
            Injector = module.Injector;
            Compiler = module.Compiler;
            PLATFORM_ID = module.PLATFORM_ID;
            _global = module.ɵglobal;
        }, function (module) {
            _PLATFORM_BROWSER_ID = module.ɵPLATFORM_BROWSER_ID;
        }, function (module) {
            _INTERNAL_BROWSER_PLATFORM_PROVIDERS = module.ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS;
        }],
        execute: (function () {

            /**
             * @license Angular v16.2.12
             * (c) 2010-2022 Google LLC. https://angular.io/
             * License: MIT
             */

            const COMPILER_PROVIDERS = [{
              provide: Compiler,
              useFactory: () => new Compiler()
            }];
            /**
             * @publicApi
             *
             * @deprecated
             * Ivy JIT mode doesn't require accessing this symbol.
             * See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for
             * additional context.
             */
            class JitCompilerFactory {
              /** @internal */
              constructor(defaultOptions) {
                const compilerOptions = {
                  useJit: true,
                  defaultEncapsulation: ViewEncapsulation.Emulated,
                  missingTranslation: MissingTranslationStrategy.Warning
                };
                this._defaultOptions = [compilerOptions, ...defaultOptions];
              }
              createCompiler(options = []) {
                const opts = _mergeOptions(this._defaultOptions.concat(options));
                const injector = Injector.create({
                  providers: [COMPILER_PROVIDERS, {
                    provide: CompilerConfig,
                    useFactory: () => {
                      return new CompilerConfig({
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        useJit: opts.useJit,
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        defaultEncapsulation: opts.defaultEncapsulation,
                        missingTranslation: opts.missingTranslation,
                        preserveWhitespaces: opts.preserveWhitespaces
                      });
                    },
                    deps: []
                  }, opts.providers]
                });
                return injector.get(Compiler);
              }
            } exports("JitCompilerFactory", JitCompilerFactory);
            function _mergeOptions(optionsArr) {
              return {
                useJit: _lastDefined(optionsArr.map(options => options.useJit)),
                defaultEncapsulation: _lastDefined(optionsArr.map(options => options.defaultEncapsulation)),
                providers: _mergeArrays(optionsArr.map(options => options.providers)),
                missingTranslation: _lastDefined(optionsArr.map(options => options.missingTranslation)),
                preserveWhitespaces: _lastDefined(optionsArr.map(options => options.preserveWhitespaces))
              };
            }
            function _lastDefined(args) {
              for (let i = args.length - 1; i >= 0; i--) {
                if (args[i] !== undefined) {
                  return args[i];
                }
              }
              return undefined;
            }
            function _mergeArrays(parts) {
              const result = [];
              parts.forEach(part => part && result.push(...part));
              return result;
            }

            /**
             * A platform that included corePlatform and the compiler.
             *
             * @publicApi
             */
            const platformCoreDynamic = exports("ɵplatformCoreDynamic", createPlatformFactory(platformCore, 'coreDynamic', [{
              provide: COMPILER_OPTIONS,
              useValue: {},
              multi: true
            }, {
              provide: CompilerFactory,
              useClass: JitCompilerFactory,
              deps: [COMPILER_OPTIONS]
            }]));
            class ResourceLoaderImpl extends ResourceLoader {
              get(url) {
                let resolve;
                let reject;
                const promise = new Promise((res, rej) => {
                  resolve = res;
                  reject = rej;
                });
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'text';
                xhr.onload = function () {
                  const response = xhr.response;
                  let status = xhr.status;
                  // fix status code when it is 0 (0 status is undocumented).
                  // Occurs when accessing file resources or on Android 4.1 stock browser
                  // while retrieving files from application cache.
                  if (status === 0) {
                    status = response ? 200 : 0;
                  }
                  if (200 <= status && status <= 300) {
                    resolve(response);
                  } else {
                    reject(`Failed to load ${url}`);
                  }
                };
                xhr.onerror = function () {
                  reject(`Failed to load ${url}`);
                };
                xhr.send();
                return promise;
              }
              static {
                this.ɵfac = /* @__PURE__ */function () {
                  let ɵResourceLoaderImpl_BaseFactory;
                  return function ResourceLoaderImpl_Factory(t) {
                    return (ɵResourceLoaderImpl_BaseFactory || (ɵResourceLoaderImpl_BaseFactory = i0.ɵɵgetInheritedFactory(ResourceLoaderImpl)))(t || ResourceLoaderImpl);
                  };
                }();
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: ResourceLoaderImpl,
                  factory: ResourceLoaderImpl.ɵfac
                });
              }
            }
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResourceLoaderImpl, [{
                type: Injectable
              }], null, null);
            })();

            /**
             * @publicApi
             */
            const INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = exports("ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS", [_INTERNAL_BROWSER_PLATFORM_PROVIDERS, {
              provide: COMPILER_OPTIONS,
              useValue: {
                providers: [{
                  provide: ResourceLoader,
                  useClass: ResourceLoaderImpl,
                  deps: []
                }]
              },
              multi: true
            }, {
              provide: PLATFORM_ID,
              useValue: _PLATFORM_BROWSER_ID
            }]);

            /**
             * An implementation of ResourceLoader that uses a template cache to avoid doing an actual
             * ResourceLoader.
             *
             * The template cache needs to be built and loaded into window.$templateCache
             * via a separate mechanism.
             *
             * @publicApi
             *
             * @deprecated This was previously necessary in some cases to test AOT-compiled components with View
             *     Engine, but is no longer since Ivy.
             */
            class CachedResourceLoader extends ResourceLoader {
              constructor() {
                super();
                this._cache = _global.$templateCache;
                if (this._cache == null) {
                  throw new Error('CachedResourceLoader: Template cache was not found in $templateCache.');
                }
              }
              get(url) {
                if (this._cache.hasOwnProperty(url)) {
                  return Promise.resolve(this._cache[url]);
                } else {
                  return Promise.reject('CachedResourceLoader: Did not find cached template for ' + url);
                }
              }
            }

            /**
             * @module
             * @description
             * Entry point for all public APIs of the platform-browser-dynamic package.
             */
            /**
             * @publicApi
             */
            const VERSION = exports("VERSION", new Version('16.2.12'));

            /**
             * @publicApi
             *
             * @deprecated This was previously necessary in some cases to test AOT-compiled components with View
             *     Engine, but is no longer since Ivy.

             */
            const RESOURCE_CACHE_PROVIDER = exports("RESOURCE_CACHE_PROVIDER", [{
              provide: ResourceLoader,
              useClass: CachedResourceLoader,
              deps: []
            }]);
            /**
             * @publicApi
             */
            const platformBrowserDynamic = exports("platformBrowserDynamic", createPlatformFactory(platformCoreDynamic, 'browserDynamic', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS));

        })
    };
}));
//# sourceMappingURL=platform-browser-dynamic.js.map
