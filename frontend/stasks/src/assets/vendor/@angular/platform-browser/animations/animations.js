/* esm-bundle - @angular/platform-browser/animations - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core', '@angular/platform-browser', '@angular/animations', '@angular/animations/browser', '@angular/common'], (function (exports) {
    'use strict';
    var ViewEncapsulation, i0, Injectable, Inject, NgModule, ANIMATION_MODULE_TYPE, RendererFactory2, NgZone, BrowserModule, _DomRendererFactory2, AnimationBuilder, sequence, AnimationFactory, i1, _AnimationEngine, AnimationDriver, _WebAnimationsDriver, _NoopAnimationDriver, _AnimationStyleNormalizer, _WebAnimationsStyleNormalizer, DOCUMENT;
    return {
        setters: [function (module) {
            ViewEncapsulation = module.ViewEncapsulation;
            i0 = module;
            Injectable = module.Injectable;
            Inject = module.Inject;
            NgModule = module.NgModule;
            ANIMATION_MODULE_TYPE = module.ANIMATION_MODULE_TYPE;
            RendererFactory2 = module.RendererFactory2;
            NgZone = module.NgZone;
            exports("ANIMATION_MODULE_TYPE", module.ANIMATION_MODULE_TYPE);
        }, function (module) {
            BrowserModule = module.BrowserModule;
            _DomRendererFactory2 = module.ɵDomRendererFactory2;
        }, function (module) {
            AnimationBuilder = module.AnimationBuilder;
            sequence = module.sequence;
            AnimationFactory = module.AnimationFactory;
        }, function (module) {
            i1 = module;
            _AnimationEngine = module.ɵAnimationEngine;
            AnimationDriver = module.AnimationDriver;
            _WebAnimationsDriver = module.ɵWebAnimationsDriver;
            _NoopAnimationDriver = module.ɵNoopAnimationDriver;
            _AnimationStyleNormalizer = module.ɵAnimationStyleNormalizer;
            _WebAnimationsStyleNormalizer = module.ɵWebAnimationsStyleNormalizer;
        }, function (module) {
            DOCUMENT = module.DOCUMENT;
        }],
        execute: (function () {

            exports({
                provideAnimations: provideAnimations,
                provideNoopAnimations: provideNoopAnimations
            });

            /**
             * @license Angular v16.2.12
             * (c) 2010-2022 Google LLC. https://angular.io/
             * License: MIT
             */

            class BrowserAnimationBuilder extends AnimationBuilder {
              constructor(rootRenderer, doc) {
                super();
                this._nextAnimationId = 0;
                const typeData = {
                  id: '0',
                  encapsulation: ViewEncapsulation.None,
                  styles: [],
                  data: {
                    animation: []
                  }
                };
                this._renderer = rootRenderer.createRenderer(doc.body, typeData);
              }
              build(animation) {
                const id = this._nextAnimationId.toString();
                this._nextAnimationId++;
                const entry = Array.isArray(animation) ? sequence(animation) : animation;
                issueAnimationCommand(this._renderer, null, id, 'register', [entry]);
                return new BrowserAnimationFactory(id, this._renderer);
              }
              static {
                this.ɵfac = function BrowserAnimationBuilder_Factory(t) {
                  return new (t || BrowserAnimationBuilder)(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(DOCUMENT));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: BrowserAnimationBuilder,
                  factory: BrowserAnimationBuilder.ɵfac
                });
              }
            } exports("ɵBrowserAnimationBuilder", BrowserAnimationBuilder);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BrowserAnimationBuilder, [{
                type: Injectable
              }], function () {
                return [{
                  type: i0.RendererFactory2
                }, {
                  type: undefined,
                  decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                  }]
                }];
              }, null);
            })();
            class BrowserAnimationFactory extends AnimationFactory {
              constructor(_id, _renderer) {
                super();
                this._id = _id;
                this._renderer = _renderer;
              }
              create(element, options) {
                return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
              }
            } exports("ɵBrowserAnimationFactory", BrowserAnimationFactory);
            class RendererAnimationPlayer {
              constructor(id, element, options, _renderer) {
                this.id = id;
                this.element = element;
                this._renderer = _renderer;
                this.parentPlayer = null;
                this._started = false;
                this.totalTime = 0;
                this._command('create', options);
              }
              _listen(eventName, callback) {
                return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
              }
              _command(command, ...args) {
                return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
              }
              onDone(fn) {
                this._listen('done', fn);
              }
              onStart(fn) {
                this._listen('start', fn);
              }
              onDestroy(fn) {
                this._listen('destroy', fn);
              }
              init() {
                this._command('init');
              }
              hasStarted() {
                return this._started;
              }
              play() {
                this._command('play');
                this._started = true;
              }
              pause() {
                this._command('pause');
              }
              restart() {
                this._command('restart');
              }
              finish() {
                this._command('finish');
              }
              destroy() {
                this._command('destroy');
              }
              reset() {
                this._command('reset');
                this._started = false;
              }
              setPosition(p) {
                this._command('setPosition', p);
              }
              getPosition() {
                return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
              }
            }
            function issueAnimationCommand(renderer, element, id, command, args) {
              return renderer.setProperty(element, `@@${id}:${command}`, args);
            }
            const ANIMATION_PREFIX = '@';
            const DISABLE_ANIMATIONS_FLAG = '@.disabled';
            class AnimationRendererFactory {
              constructor(delegate, engine, _zone) {
                this.delegate = delegate;
                this.engine = engine;
                this._zone = _zone;
                this._currentId = 0;
                this._microtaskId = 1;
                this._animationCallbacksBuffer = [];
                this._rendererCache = new Map();
                this._cdRecurDepth = 0;
                engine.onRemovalComplete = (element, delegate) => {
                  // Note: if a component element has a leave animation, and a host leave animation,
                  // the view engine will call `removeChild` for the parent
                  // component renderer as well as for the child component renderer.
                  // Therefore, we need to check if we already removed the element.
                  const parentNode = delegate?.parentNode(element);
                  if (parentNode) {
                    delegate.removeChild(parentNode, element);
                  }
                };
              }
              createRenderer(hostElement, type) {
                const EMPTY_NAMESPACE_ID = '';
                // cache the delegates to find out which cached delegate can
                // be used by which cached renderer
                const delegate = this.delegate.createRenderer(hostElement, type);
                if (!hostElement || !type || !type.data || !type.data['animation']) {
                  let renderer = this._rendererCache.get(delegate);
                  if (!renderer) {
                    // Ensure that the renderer is removed from the cache on destroy
                    // since it may contain references to detached DOM nodes.
                    const onRendererDestroy = () => this._rendererCache.delete(delegate);
                    renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine, onRendererDestroy);
                    // only cache this result when the base renderer is used
                    this._rendererCache.set(delegate, renderer);
                  }
                  return renderer;
                }
                const componentId = type.id;
                const namespaceId = type.id + '-' + this._currentId;
                this._currentId++;
                this.engine.register(namespaceId, hostElement);
                const registerTrigger = trigger => {
                  if (Array.isArray(trigger)) {
                    trigger.forEach(registerTrigger);
                  } else {
                    this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
                  }
                };
                const animationTriggers = type.data['animation'];
                animationTriggers.forEach(registerTrigger);
                return new AnimationRenderer(this, namespaceId, delegate, this.engine);
              }
              begin() {
                this._cdRecurDepth++;
                if (this.delegate.begin) {
                  this.delegate.begin();
                }
              }
              _scheduleCountTask() {
                queueMicrotask(() => {
                  this._microtaskId++;
                });
              }
              /** @internal */
              scheduleListenerCallback(count, fn, data) {
                if (count >= 0 && count < this._microtaskId) {
                  this._zone.run(() => fn(data));
                  return;
                }
                if (this._animationCallbacksBuffer.length == 0) {
                  queueMicrotask(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach(tuple => {
                        const [fn, data] = tuple;
                        fn(data);
                      });
                      this._animationCallbacksBuffer = [];
                    });
                  });
                }
                this._animationCallbacksBuffer.push([fn, data]);
              }
              end() {
                this._cdRecurDepth--;
                // this is to prevent animations from running twice when an inner
                // component does CD when a parent component instead has inserted it
                if (this._cdRecurDepth == 0) {
                  this._zone.runOutsideAngular(() => {
                    this._scheduleCountTask();
                    this.engine.flush(this._microtaskId);
                  });
                }
                if (this.delegate.end) {
                  this.delegate.end();
                }
              }
              whenRenderingDone() {
                return this.engine.whenRenderingDone();
              }
              static {
                this.ɵfac = function AnimationRendererFactory_Factory(t) {
                  return new (t || AnimationRendererFactory)(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i1.ɵAnimationEngine), i0.ɵɵinject(i0.NgZone));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: AnimationRendererFactory,
                  factory: AnimationRendererFactory.ɵfac
                });
              }
            } exports("ɵAnimationRendererFactory", AnimationRendererFactory);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AnimationRendererFactory, [{
                type: Injectable
              }], function () {
                return [{
                  type: i0.RendererFactory2
                }, {
                  type: i1.ɵAnimationEngine
                }, {
                  type: i0.NgZone
                }];
              }, null);
            })();
            class BaseAnimationRenderer {
              constructor(namespaceId, delegate, engine, _onDestroy) {
                this.namespaceId = namespaceId;
                this.delegate = delegate;
                this.engine = engine;
                this._onDestroy = _onDestroy;
              }
              get data() {
                return this.delegate.data;
              }
              destroyNode(node) {
                this.delegate.destroyNode?.(node);
              }
              destroy() {
                this.engine.destroy(this.namespaceId, this.delegate);
                this.engine.afterFlushAnimationsDone(() => {
                  // Call the renderer destroy method after the animations has finished as otherwise
                  // styles will be removed too early which will cause an unstyled animation.
                  queueMicrotask(() => {
                    this.delegate.destroy();
                  });
                });
                this._onDestroy?.();
              }
              createElement(name, namespace) {
                return this.delegate.createElement(name, namespace);
              }
              createComment(value) {
                return this.delegate.createComment(value);
              }
              createText(value) {
                return this.delegate.createText(value);
              }
              appendChild(parent, newChild) {
                this.delegate.appendChild(parent, newChild);
                this.engine.onInsert(this.namespaceId, newChild, parent, false);
              }
              insertBefore(parent, newChild, refChild, isMove = true) {
                this.delegate.insertBefore(parent, newChild, refChild);
                // If `isMove` true than we should animate this insert.
                this.engine.onInsert(this.namespaceId, newChild, parent, isMove);
              }
              removeChild(parent, oldChild, isHostElement) {
                this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
              }
              selectRootElement(selectorOrNode, preserveContent) {
                return this.delegate.selectRootElement(selectorOrNode, preserveContent);
              }
              parentNode(node) {
                return this.delegate.parentNode(node);
              }
              nextSibling(node) {
                return this.delegate.nextSibling(node);
              }
              setAttribute(el, name, value, namespace) {
                this.delegate.setAttribute(el, name, value, namespace);
              }
              removeAttribute(el, name, namespace) {
                this.delegate.removeAttribute(el, name, namespace);
              }
              addClass(el, name) {
                this.delegate.addClass(el, name);
              }
              removeClass(el, name) {
                this.delegate.removeClass(el, name);
              }
              setStyle(el, style, value, flags) {
                this.delegate.setStyle(el, style, value, flags);
              }
              removeStyle(el, style, flags) {
                this.delegate.removeStyle(el, style, flags);
              }
              setProperty(el, name, value) {
                if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
                  this.disableAnimations(el, !!value);
                } else {
                  this.delegate.setProperty(el, name, value);
                }
              }
              setValue(node, value) {
                this.delegate.setValue(node, value);
              }
              listen(target, eventName, callback) {
                return this.delegate.listen(target, eventName, callback);
              }
              disableAnimations(element, value) {
                this.engine.disableAnimations(element, value);
              }
            }
            class AnimationRenderer extends BaseAnimationRenderer {
              constructor(factory, namespaceId, delegate, engine, onDestroy) {
                super(namespaceId, delegate, engine, onDestroy);
                this.factory = factory;
                this.namespaceId = namespaceId;
              }
              setProperty(el, name, value) {
                if (name.charAt(0) == ANIMATION_PREFIX) {
                  if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                    value = value === undefined ? true : !!value;
                    this.disableAnimations(el, value);
                  } else {
                    this.engine.process(this.namespaceId, el, name.slice(1), value);
                  }
                } else {
                  this.delegate.setProperty(el, name, value);
                }
              }
              listen(target, eventName, callback) {
                if (eventName.charAt(0) == ANIMATION_PREFIX) {
                  const element = resolveElementFromTarget(target);
                  let name = eventName.slice(1);
                  let phase = '';
                  // @listener.phase is for trigger animation callbacks
                  // @@listener is for animation builder callbacks
                  if (name.charAt(0) != ANIMATION_PREFIX) {
                    [name, phase] = parseTriggerCallbackName(name);
                  }
                  return this.engine.listen(this.namespaceId, element, name, phase, event => {
                    const countId = event['_data'] || -1;
                    this.factory.scheduleListenerCallback(countId, callback, event);
                  });
                }
                return this.delegate.listen(target, eventName, callback);
              }
            } exports("ɵAnimationRenderer", AnimationRenderer);
            function resolveElementFromTarget(target) {
              switch (target) {
                case 'body':
                  return document.body;
                case 'document':
                  return document;
                case 'window':
                  return window;
                default:
                  return target;
              }
            }
            function parseTriggerCallbackName(triggerName) {
              const dotIndex = triggerName.indexOf('.');
              const trigger = triggerName.substring(0, dotIndex);
              const phase = triggerName.slice(dotIndex + 1);
              return [trigger, phase];
            }
            class InjectableAnimationEngine extends _AnimationEngine {
              // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
              // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
              // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
              constructor(doc, driver, normalizer, appRef) {
                super(doc.body, driver, normalizer);
              }
              ngOnDestroy() {
                this.flush();
              }
              static {
                this.ɵfac = function InjectableAnimationEngine_Factory(t) {
                  return new (t || InjectableAnimationEngine)(i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(i1.AnimationDriver), i0.ɵɵinject(i1.ɵAnimationStyleNormalizer), i0.ɵɵinject(i0.ApplicationRef));
                };
              }
              static {
                this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
                  token: InjectableAnimationEngine,
                  factory: InjectableAnimationEngine.ɵfac
                });
              }
            } exports("ɵInjectableAnimationEngine", InjectableAnimationEngine);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InjectableAnimationEngine, [{
                type: Injectable
              }], function () {
                return [{
                  type: undefined,
                  decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                  }]
                }, {
                  type: i1.AnimationDriver
                }, {
                  type: i1.ɵAnimationStyleNormalizer
                }, {
                  type: i0.ApplicationRef
                }];
              }, null);
            })();
            function instantiateDefaultStyleNormalizer() {
              return new _WebAnimationsStyleNormalizer();
            }
            function instantiateRendererFactory(renderer, engine, zone) {
              return new AnimationRendererFactory(renderer, engine, zone);
            }
            const SHARED_ANIMATION_PROVIDERS = [{
              provide: AnimationBuilder,
              useClass: BrowserAnimationBuilder
            }, {
              provide: _AnimationStyleNormalizer,
              useFactory: instantiateDefaultStyleNormalizer
            }, {
              provide: _AnimationEngine,
              useClass: InjectableAnimationEngine
            }, {
              provide: RendererFactory2,
              useFactory: instantiateRendererFactory,
              deps: [_DomRendererFactory2, _AnimationEngine, NgZone]
            }];
            /**
             * Separate providers from the actual module so that we can do a local modification in Google3 to
             * include them in the BrowserModule.
             */
            const BROWSER_ANIMATIONS_PROVIDERS = [{
              provide: AnimationDriver,
              useFactory: () => new _WebAnimationsDriver()
            }, {
              provide: ANIMATION_MODULE_TYPE,
              useValue: 'BrowserAnimations'
            }, ...SHARED_ANIMATION_PROVIDERS];
            /**
             * Separate providers from the actual module so that we can do a local modification in Google3 to
             * include them in the BrowserTestingModule.
             */
            const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{
              provide: AnimationDriver,
              useClass: _NoopAnimationDriver
            }, {
              provide: ANIMATION_MODULE_TYPE,
              useValue: 'NoopAnimations'
            }, ...SHARED_ANIMATION_PROVIDERS];

            /**
             * Exports `BrowserModule` with additional [dependency-injection providers](guide/glossary#provider)
             * for use with animations. See [Animations](guide/animations).
             * @publicApi
             */
            class BrowserAnimationsModule {
              /**
               * Configures the module based on the specified object.
               *
               * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
               * @see {@link BrowserAnimationsModuleConfig}
               *
               * @usageNotes
               * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
               * function as follows:
               * ```
               * @NgModule({
               *   imports: [BrowserAnimationsModule.withConfig(config)]
               * })
               * class MyNgModule {}
               * ```
               */
              static withConfig(config) {
                return {
                  ngModule: BrowserAnimationsModule,
                  providers: config.disableAnimations ? BROWSER_NOOP_ANIMATIONS_PROVIDERS : BROWSER_ANIMATIONS_PROVIDERS
                };
              }
              static {
                this.ɵfac = function BrowserAnimationsModule_Factory(t) {
                  return new (t || BrowserAnimationsModule)();
                };
              }
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: BrowserAnimationsModule
                });
              }
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
                  providers: BROWSER_ANIMATIONS_PROVIDERS,
                  imports: [BrowserModule]
                });
              }
            } exports("BrowserAnimationsModule", BrowserAnimationsModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BrowserAnimationsModule, [{
                type: NgModule,
                args: [{
                  exports: [BrowserModule],
                  providers: BROWSER_ANIMATIONS_PROVIDERS
                }]
              }], null, null);
            })();
            /**
             * Returns the set of [dependency-injection providers](guide/glossary#provider)
             * to enable animations in an application. See [animations guide](guide/animations)
             * to learn more about animations in Angular.
             *
             * @usageNotes
             *
             * The function is useful when you want to enable animations in an application
             * bootstrapped using the `bootstrapApplication` function. In this scenario there
             * is no need to import the `BrowserAnimationsModule` NgModule at all, just add
             * providers returned by this function to the `providers` list as show below.
             *
             * ```typescript
             * bootstrapApplication(RootComponent, {
             *   providers: [
             *     provideAnimations()
             *   ]
             * });
             * ```
             *
             * @publicApi
             */
            function provideAnimations() {
              // Return a copy to prevent changes to the original array in case any in-place
              // alterations are performed to the `provideAnimations` call results in app code.
              return [...BROWSER_ANIMATIONS_PROVIDERS];
            }
            /**
             * A null player that must be imported to allow disabling of animations.
             * @publicApi
             */
            class NoopAnimationsModule {
              static {
                this.ɵfac = function NoopAnimationsModule_Factory(t) {
                  return new (t || NoopAnimationsModule)();
                };
              }
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: NoopAnimationsModule
                });
              }
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
                  providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
                  imports: [BrowserModule]
                });
              }
            } exports("NoopAnimationsModule", NoopAnimationsModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoopAnimationsModule, [{
                type: NgModule,
                args: [{
                  exports: [BrowserModule],
                  providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS
                }]
              }], null, null);
            })();
            /**
             * Returns the set of [dependency-injection providers](guide/glossary#provider)
             * to disable animations in an application. See [animations guide](guide/animations)
             * to learn more about animations in Angular.
             *
             * @usageNotes
             *
             * The function is useful when you want to bootstrap an application using
             * the `bootstrapApplication` function, but you need to disable animations
             * (for example, when running tests).
             *
             * ```typescript
             * bootstrapApplication(RootComponent, {
             *   providers: [
             *     provideNoopAnimations()
             *   ]
             * });
             * ```
             *
             * @publicApi
             */
            function provideNoopAnimations() {
              // Return a copy to prevent changes to the original array in case any in-place
              // alterations are performed to the `provideNoopAnimations` call results in app code.
              return [...BROWSER_NOOP_ANIMATIONS_PROVIDERS];
            }

        })
    };
}));
//# sourceMappingURL=animations.js.map
