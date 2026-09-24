/* esm-bundle - angular-svg-icon - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/common/http'], (function (exports) {
    'use strict';
    var i0, Injectable, InjectionToken, PLATFORM_ID, Inject, Optional, SkipSelf, Component, Input, NgModule, makeEnvironmentProviders, of, throwError, map, tap, catchError, finalize, share, DOCUMENT, CommonModule, i1;
    return {
        setters: [function (module) {
            i0 = module;
            Injectable = module.Injectable;
            InjectionToken = module.InjectionToken;
            PLATFORM_ID = module.PLATFORM_ID;
            Inject = module.Inject;
            Optional = module.Optional;
            SkipSelf = module.SkipSelf;
            Component = module.Component;
            Input = module.Input;
            NgModule = module.NgModule;
            makeEnvironmentProviders = module.makeEnvironmentProviders;
        }, function (module) {
            of = module.of;
            throwError = module.throwError;
        }, function (module) {
            map = module.map;
            tap = module.tap;
            catchError = module.catchError;
            finalize = module.finalize;
            share = module.share;
        }, function (module) {
            DOCUMENT = module.DOCUMENT;
            CommonModule = module.CommonModule;
        }, function (module) {
            i1 = module;
        }],
        execute: (function () {

            exports({
                SVG_ICON_REGISTRY_PROVIDER_FACTORY: SVG_ICON_REGISTRY_PROVIDER_FACTORY,
                provideAngularSvgIcon: provideAngularSvgIcon
            });

            const _c0 = ["*"];
            class SvgLoader {} exports("SvgLoader", SvgLoader);
            class SvgHttpLoader extends SvgLoader {
              constructor(http) {
                super();
                this.http = http;
              }
              getSvg(url) {
                return this.http.get(url, {
                  responseType: 'text'
                });
              }
              static {
                this.ɵfac = function SvgHttpLoader_Factory(t) {
                  return new (t || SvgHttpLoader)(i0.ɵɵinject(i1.HttpClient));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: SvgHttpLoader,
                  factory: SvgHttpLoader.ɵfac
                });
              }
            } exports("SvgHttpLoader", SvgHttpLoader);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SvgHttpLoader, [{
                type: Injectable
              }], function () {
                return [{
                  type: i1.HttpClient
                }];
              }, null);
            })();
            const SERVER_URL = exports("SERVER_URL", new InjectionToken('SERVER_URL'));
            class SvgIconRegistryService {
              constructor(loader, platformId, serverUrl, _document) {
                this.loader = loader;
                this.platformId = platformId;
                this.serverUrl = serverUrl;
                this._document = _document;
                this.iconsByUrl = new Map();
                this.iconsLoadingByUrl = new Map();
                this.document = this._document;
              }
              /** Add a SVG to the registry by passing a name and the SVG. */
              addSvg(name, data) {
                if (!this.iconsByUrl.has(name)) {
                  const div = this.document.createElement('DIV');
                  div.innerHTML = data;
                  const svg = div.querySelector('svg');
                  this.iconsByUrl.set(name, svg);
                }
              }
              /** Load a SVG to the registry from a URL. */
              loadSvg(url, name = url) {
                // not sure if there should be a possibility to use name for server usage
                // so overriding it for now if provided
                // maybe should separate functionality for url and name use-cases
                if (this.serverUrl && url.match(/^(http(s)?):/) === null) {
                  url = this.serverUrl + url;
                  name = url;
                }
                if (this.iconsByUrl.has(name)) {
                  return of(this.iconsByUrl.get(name));
                } else if (this.iconsLoadingByUrl.has(name)) {
                  return this.iconsLoadingByUrl.get(name);
                }
                const o = this.loader.getSvg(url).pipe(map(svg => {
                  const div = this.document.createElement('DIV');
                  div.innerHTML = svg;
                  return div.querySelector('svg');
                }), tap(svg => this.iconsByUrl.set(name, svg)), catchError(err => {
                  console.error(err);
                  return throwError(err);
                }), finalize(() => this.iconsLoadingByUrl.delete(name)), share());
                this.iconsLoadingByUrl.set(name, o);
                return o;
              }
              /** Get loaded SVG from registry by name. (also works by url because of blended map) */
              getSvgByName(name) {
                if (this.iconsByUrl.has(name)) {
                  return of(this.iconsByUrl.get(name));
                } else if (this.iconsLoadingByUrl.has(name)) {
                  return this.iconsLoadingByUrl.get(name);
                }
                return throwError(`No svg with name '${name}' has been loaded`);
              }
              /** Remove a SVG from the registry by URL (or name). */
              unloadSvg(url) {
                if (this.iconsByUrl.has(url)) {
                  this.iconsByUrl.delete(url);
                }
              }
              static {
                this.ɵfac = function SvgIconRegistryService_Factory(t) {
                  return new (t || SvgIconRegistryService)(i0.ɵɵinject(SvgLoader), i0.ɵɵinject(PLATFORM_ID), i0.ɵɵinject(SERVER_URL, 8), i0.ɵɵinject(DOCUMENT, 8));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: SvgIconRegistryService,
                  factory: SvgIconRegistryService.ɵfac
                });
              }
            } exports("SvgIconRegistryService", SvgIconRegistryService);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SvgIconRegistryService, [{
                type: Injectable
              }], function () {
                return [{
                  type: SvgLoader
                }, {
                  type: Object,
                  decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                  }]
                }, {
                  type: undefined,
                  decorators: [{
                    type: Optional
                  }, {
                    type: Inject,
                    args: [SERVER_URL]
                  }]
                }, {
                  type: undefined,
                  decorators: [{
                    type: Optional
                  }, {
                    type: Inject,
                    args: [DOCUMENT]
                  }]
                }];
              }, null);
            })();
            function SVG_ICON_REGISTRY_PROVIDER_FACTORY(parentRegistry, loader, platformId, serverUrl, document) {
              return parentRegistry || new SvgIconRegistryService(loader, platformId, serverUrl, document);
            }
            const SVG_ICON_REGISTRY_PROVIDER = exports("SVG_ICON_REGISTRY_PROVIDER", {
              provide: SvgIconRegistryService,
              deps: [[new Optional(), new SkipSelf(), SvgIconRegistryService], SvgLoader, [PLATFORM_ID], [new Optional(), SERVER_URL], [new Optional(), DOCUMENT]],
              useFactory: SVG_ICON_REGISTRY_PROVIDER_FACTORY
            });
            class SvgIconHelper {
              constructor() {
                this.loaded = false;
              }
            }
            class SvgIconComponent {
              // Adapted from ngStyle (see:  angular/packages/common/src/directives/ng_style.ts)
              set svgStyle(values) {
                this._svgStyle = values;
                if (!this.helper.differ && values) {
                  this.helper.differ = this.differs.find(values).create();
                }
              }
              constructor(element, differs, renderer, iconReg, cdr) {
                this.element = element;
                this.differs = differs;
                this.renderer = renderer;
                this.iconReg = iconReg;
                this.cdr = cdr;
                this.stretch = false;
                this.applyClass = false;
                /** @deprecated since 9.1.0 */
                this.applyCss = false;
                this.helper = new SvgIconHelper();
                this._svgStyle = null;
              }
              ngOnInit() {
                this.init();
              }
              ngOnDestroy() {
                this.destroy();
              }
              ngOnChanges(changeRecord) {
                const elemSvg = this.element.nativeElement.firstChild;
                if (changeRecord.src || changeRecord.name) {
                  if (this.helper.loaded) {
                    this.destroy();
                  }
                  this.init();
                }
                if (changeRecord.stretch) {
                  this.stylize();
                }
                if (changeRecord.applyClass) {
                  if (this.applyClass) {
                    this.setClass(elemSvg, null, this.klass);
                  } else {
                    this.setClass(elemSvg, this.klass, null);
                  }
                }
                if (changeRecord.svgClass) {
                  this.setClass(elemSvg, changeRecord.svgClass.previousValue, changeRecord.svgClass.currentValue);
                }
                if (changeRecord.klass) {
                  const elem = this.element.nativeElement;
                  this.setClass(elem, changeRecord.klass.previousValue, changeRecord.klass.currentValue);
                  if (this.applyClass) {
                    this.setClass(elemSvg, changeRecord.klass.previousValue, changeRecord.klass.currentValue);
                  } else {
                    this.setClass(elemSvg, changeRecord.klass.previousValue, null);
                  }
                }
                if (changeRecord.viewBox) {
                  if (this.helper.loaded) {
                    this.destroy();
                  }
                  this.init();
                }
                if (changeRecord.applyCss) {
                  console.warn('applyCss deprecated since 9.1.0, will be removed in 10.0.0');
                  console.warn('use applyClass instead');
                }
                if (changeRecord.svgAriaLabel) {
                  this.doAria(changeRecord.svgAriaLabel.currentValue);
                }
              }
              ngDoCheck() {
                if (this.helper.svg && this.helper.differ) {
                  const changes = this.helper.differ.diff(this._svgStyle);
                  if (changes) {
                    this.applyChanges(changes);
                  }
                }
              }
              init() {
                if (this.name) {
                  const svgObs = this.iconReg.getSvgByName(this.name);
                  if (svgObs) {
                    this.helper.icnSub = svgObs.subscribe(svg => this.initSvg(svg));
                  }
                } else if (this.src) {
                  const svgObs = this.iconReg.loadSvg(this.src);
                  if (svgObs) {
                    this.helper.icnSub = svgObs.subscribe(svg => this.initSvg(svg));
                  }
                } else {
                  const elem = this.element.nativeElement;
                  elem.innerHTML = '';
                  this.cdr.markForCheck();
                }
              }
              initSvg(svg) {
                if (!this.helper.loaded && svg) {
                  this.setSvg(svg);
                  this.resetDiffer();
                }
              }
              destroy() {
                if (this.helper.icnSub) {
                  this.helper.icnSub.unsubscribe();
                }
                this.helper = new SvgIconHelper();
              }
              resetDiffer() {
                if (this._svgStyle && !this.helper.differ) {
                  this.helper.differ = this.differs.find(this._svgStyle).create();
                }
              }
              setSvg(svg) {
                if (!this.helper.loaded && svg) {
                  this.helper.svg = svg;
                  const icon = svg.cloneNode(true);
                  const elem = this.element.nativeElement;
                  elem.innerHTML = '';
                  this.renderer.appendChild(elem, icon);
                  this.helper.loaded = true;
                  this.copyNgContentAttribute(elem, icon);
                  if (this.klass && this.applyClass) {
                    this.setClass(elem.firstChild, null, this.klass);
                  }
                  if (this.svgClass) {
                    this.setClass(elem.firstChild, null, this.svgClass);
                  }
                  if (this.viewBox) {
                    if (this.viewBox === 'auto') {
                      // Attempt to convert height & width to a viewBox.
                      const w = icon.getAttribute('width');
                      const h = icon.getAttribute('height');
                      if (h && w) {
                        const vb = `0 0 ${w} ${h}`;
                        this.renderer.setAttribute(icon, 'viewBox', vb);
                        this.renderer.removeAttribute(icon, 'width');
                        this.renderer.removeAttribute(icon, 'height');
                      }
                    } else if (this.viewBox !== '') {
                      this.renderer.setAttribute(icon, 'viewBox', this.viewBox);
                      this.renderer.removeAttribute(icon, 'width');
                      this.renderer.removeAttribute(icon, 'height');
                    }
                  }
                  this.stylize();
                  // If there is not a svgAriaLabel and the SVG has an arial-label, then do not override
                  // the SVG's aria-label.
                  if (!(this.svgAriaLabel === undefined && elem.firstChild.hasAttribute('aria-label'))) {
                    this.doAria(this.svgAriaLabel || '');
                  }
                  this.cdr.markForCheck();
                }
              }
              copyNgContentAttribute(hostElem, icon) {
                const attributes = hostElem.attributes;
                const len = attributes.length;
                for (let i = 0; i < len; i += 1) {
                  const attribute = attributes.item(i);
                  if (attribute && attribute.name.startsWith('_ngcontent')) {
                    this.setNgContentAttribute(icon, attribute.name);
                    break;
                  }
                }
              }
              setNgContentAttribute(parent, attributeName) {
                this.renderer.setAttribute(parent, attributeName, '');
                const len = parent.childNodes.length;
                for (let i = 0; i < len; i += 1) {
                  const child = parent.childNodes[i];
                  if (child instanceof Element) {
                    this.setNgContentAttribute(child, attributeName);
                  }
                }
              }
              stylize() {
                if (this.helper.svg) {
                  const svg = this.element.nativeElement.firstChild;
                  if (this.stretch === true) {
                    this.renderer.setAttribute(svg, 'preserveAspectRatio', 'none');
                  } else if (this.stretch === false) {
                    this.renderer.removeAttribute(svg, 'preserveAspectRatio');
                  }
                }
              }
              applyChanges(changes) {
                changes.forEachRemovedItem(record => this.setStyle(record.key, null));
                changes.forEachAddedItem(record => this.setStyle(record.key, record.currentValue));
                changes.forEachChangedItem(record => this.setStyle(record.key, record.currentValue));
              }
              setStyle(nameAndUnit, value) {
                const [name, unit] = nameAndUnit.split('.');
                value = value !== null && unit ? `${value}${unit}` : value;
                const svg = this.element.nativeElement.firstChild;
                if (value !== null) {
                  this.renderer.setStyle(svg, name, value);
                } else {
                  this.renderer.removeStyle(svg, name);
                }
              }
              setClass(target, previous, current) {
                if (target) {
                  if (previous) {
                    const klasses = (Array.isArray(previous) ? previous : previous.split(' ')).filter(klass => klass);
                    for (const k of klasses) {
                      this.renderer.removeClass(target, k);
                    }
                  }
                  if (current) {
                    const klasses = (Array.isArray(current) ? current : current.split(' ')).filter(klass => klass);
                    for (const k of klasses) {
                      this.renderer.addClass(target, k);
                    }
                  }
                }
              }
              doAria(label) {
                const svg = this.element.nativeElement.firstChild;
                if (svg) {
                  if (label === '') {
                    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
                    this.renderer.removeAttribute(svg, 'aria-label');
                  } else {
                    this.renderer.removeAttribute(svg, 'aria-hidden');
                    this.renderer.setAttribute(svg, 'aria-label', label);
                  }
                }
              }
              static {
                this.ɵfac = function SvgIconComponent_Factory(t) {
                  return new (t || SvgIconComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.KeyValueDiffers), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(SvgIconRegistryService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef));
                };
              }
              static {
                this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
                  type: SvgIconComponent,
                  selectors: [["svg-icon"]],
                  inputs: {
                    src: "src",
                    name: "name",
                    stretch: "stretch",
                    applyClass: "applyClass",
                    applyCss: "applyCss",
                    svgClass: "svgClass",
                    klass: ["class", "klass"],
                    viewBox: "viewBox",
                    svgAriaLabel: "svgAriaLabel",
                    svgStyle: "svgStyle"
                  },
                  standalone: true,
                  features: [i0.ɵɵNgOnChangesFeature, i0.ɵɵStandaloneFeature],
                  ngContentSelectors: _c0,
                  decls: 1,
                  vars: 0,
                  template: function SvgIconComponent_Template(rf, ctx) {
                    if (rf & 1) {
                      i0.ɵɵprojectionDef();
                      i0.ɵɵprojection(0);
                    }
                  },
                  dependencies: [CommonModule],
                  encapsulation: 2
                });
              }
            } exports("SvgIconComponent", SvgIconComponent);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SvgIconComponent, [{
                type: Component,
                args: [{
                  standalone: true,
                  imports: [CommonModule],
                  selector: 'svg-icon',
                  template: '<ng-content></ng-content>'
                }]
              }], function () {
                return [{
                  type: i0.ElementRef
                }, {
                  type: i0.KeyValueDiffers
                }, {
                  type: i0.Renderer2
                }, {
                  type: SvgIconRegistryService
                }, {
                  type: i0.ChangeDetectorRef
                }];
              }, {
                src: [{
                  type: Input
                }],
                name: [{
                  type: Input
                }],
                stretch: [{
                  type: Input
                }],
                applyClass: [{
                  type: Input
                }],
                applyCss: [{
                  type: Input
                }],
                svgClass: [{
                  type: Input
                }],
                klass: [{
                  type: Input,
                  args: ['class']
                }],
                viewBox: [{
                  type: Input
                }],
                svgAriaLabel: [{
                  type: Input
                }],
                svgStyle: [{
                  type: Input
                }]
              });
            })();
            function provideAngularSvgIcon(config = {}) {
              return makeEnvironmentProviders([SVG_ICON_REGISTRY_PROVIDER, config.loader || {
                provide: SvgLoader,
                useClass: SvgHttpLoader
              }]);
            }
            class AngularSvgIconModule {
              static forRoot(config = {}) {
                return {
                  ngModule: AngularSvgIconModule,
                  providers: [SVG_ICON_REGISTRY_PROVIDER, config.loader || {
                    provide: SvgLoader,
                    useClass: SvgHttpLoader
                  }]
                };
              }
              static {
                this.ɵfac = function AngularSvgIconModule_Factory(t) {
                  return new (t || AngularSvgIconModule)();
                };
              }
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: AngularSvgIconModule
                });
              }
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
                  imports: [SvgIconComponent]
                });
              }
            } exports("AngularSvgIconModule", AngularSvgIconModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AngularSvgIconModule, [{
                type: NgModule,
                args: [{
                  imports: [SvgIconComponent],
                  exports: [SvgIconComponent]
                }]
              }], null, null);
            })();

        })
    };
}));
//# sourceMappingURL=angular-svg-icon.js.map
