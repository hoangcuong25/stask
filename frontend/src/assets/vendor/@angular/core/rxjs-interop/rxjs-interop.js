/* esm-bundle - @angular/core/rxjs-interop - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core', 'rxjs', 'rxjs/operators'], (function (exports) {
    'use strict';
    var assertInInjectionContext, inject, DestroyRef, Injector, effect, untracked$1, signal, computed, Observable, ReplaySubject, takeUntil;
    return {
        setters: [function (module) {
            assertInInjectionContext = module.assertInInjectionContext;
            inject = module.inject;
            DestroyRef = module.DestroyRef;
            Injector = module.Injector;
            effect = module.effect;
            untracked$1 = module.untracked;
            signal = module.signal;
            computed = module.computed;
        }, function (module) {
            Observable = module.Observable;
            ReplaySubject = module.ReplaySubject;
        }, function (module) {
            takeUntil = module.takeUntil;
        }],
        execute: (function () {

            exports({
                takeUntilDestroyed: takeUntilDestroyed,
                toObservable: toObservable,
                toSignal: toSignal
            });

            /**
             * @license Angular v16.2.12
             * (c) 2010-2022 Google LLC. https://angular.io/
             * License: MIT
             */


            /**
             * Operator which completes the Observable when the calling context (component, directive, service,
             * etc) is destroyed.
             *
             * @param destroyRef optionally, the `DestroyRef` representing the current context. This can be
             *     passed explicitly to use `takeUntilDestroyed` outside of an [injection
             * context](guide/dependency-injection-context). Otherwise, the current `DestroyRef` is injected.
             *
             * @developerPreview
             */
            function takeUntilDestroyed(destroyRef) {
              if (!destroyRef) {
                assertInInjectionContext(takeUntilDestroyed);
                destroyRef = inject(DestroyRef);
              }
              const destroyed$ = new Observable(observer => {
                const unregisterFn = destroyRef.onDestroy(observer.next.bind(observer));
                return unregisterFn;
              });
              return source => {
                return source.pipe(takeUntil(destroyed$));
              };
            }

            /**
             * Exposes the value of an Angular `Signal` as an RxJS `Observable`.
             *
             * The signal's value will be propagated into the `Observable`'s subscribers using an `effect`.
             *
             * `toObservable` must be called in an injection context unless an injector is provided via options.
             *
             * @developerPreview
             */
            function toObservable(source, options) {
              !options?.injector && assertInInjectionContext(toObservable);
              const injector = options?.injector ?? inject(Injector);
              const subject = new ReplaySubject(1);
              const watcher = effect(() => {
                let value;
                try {
                  value = source();
                } catch (err) {
                  untracked$1(() => subject.error(err));
                  return;
                }
                untracked$1(() => subject.next(value));
              }, {
                injector,
                manualCleanup: true
              });
              injector.get(DestroyRef).onDestroy(() => {
                watcher.destroy();
                subject.complete();
              });
              return subject.asObservable();
            }

            /**
             * Base URL for the error details page.
             *
             * Keep this constant in sync across:
             *  - packages/compiler-cli/src/ngtsc/diagnostics/src/error_details_base_url.ts
             *  - packages/core/src/error_details_base_url.ts
             */
            const ERROR_DETAILS_PAGE_BASE_URL = 'https://angular.io/errors';

            /**
             * Class that represents a runtime error.
             * Formats and outputs the error message in a consistent way.
             *
             * Example:
             * ```
             *  throw new RuntimeError(
             *    RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED,
             *    ngDevMode && 'Injector has already been destroyed.');
             * ```
             *
             * Note: the `message` argument contains a descriptive error message as a string in development
             * mode (when the `ngDevMode` is defined). In production mode (after tree-shaking pass), the
             * `message` argument becomes `false`, thus we account for it in the typings and the runtime
             * logic.
             */
            class RuntimeError extends Error {
              constructor(code, message) {
                super(formatRuntimeError(code, message));
                this.code = code;
              }
            }
            /**
             * Called to format a runtime error.
             * See additional info on the `message` argument type in the `RuntimeError` class description.
             */
            function formatRuntimeError(code, message) {
              // Error code might be a negative number, which is a special marker that instructs the logic to
              // generate a link to the error details page on angular.io.
              // We also prepend `0` to non-compile-time errors.
              const fullCode = `NG0${Math.abs(code)}`;
              let errorMessage = `${fullCode}${message ? ': ' + message : ''}`;
              if (ngDevMode && code < 0) {
                const addPeriodSeparator = !errorMessage.match(/[.,;!?\n]$/);
                const separator = addPeriodSeparator ? '.' : '';
                errorMessage = `${errorMessage}${separator} Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/${fullCode}`;
              }
              return errorMessage;
            }

            /**
             * Execute an arbitrary function in a non-reactive (non-tracking) context. The executed function
             * can, optionally, return a value.
             *
             * @developerPreview
             */
            function untracked(nonReactiveReadsFn) {
              // We are not trying to catch any particular errors here, just making sure that the consumers
              // stack is restored in case of errors.
              try {
                return nonReactiveReadsFn();
              } finally {
              }
            }
            function toSignal(source, options) {
              const requiresCleanup = !options?.manualCleanup;
              requiresCleanup && !options?.injector && assertInInjectionContext(toSignal);
              const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
              // Note: T is the Observable value type, and U is the initial value type. They don't have to be
              // the same - the returned signal gives values of type `T`.
              let state;
              if (options?.requireSync) {
                // Initially the signal is in a `NoValue` state.
                state = signal({
                  kind: 0 /* StateKind.NoValue */
                });
              } else {
                // If an initial value was passed, use it. Otherwise, use `undefined` as the initial value.
                state = signal({
                  kind: 1 /* StateKind.Value */,
                  value: options?.initialValue
                });
              }
              untracked(() => {
                const sub = source.subscribe({
                  next: value => state.set({
                    kind: 1 /* StateKind.Value */,
                    value
                  }),
                  error: error => state.set({
                    kind: 2 /* StateKind.Error */,
                    error
                  })
                  // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
                  // "complete".
                });
                if (ngDevMode && options?.requireSync && state().kind === 0 /* StateKind.NoValue */) {
                  throw new RuntimeError(601 /* RuntimeErrorCode.REQUIRE_SYNC_WITHOUT_SYNC_EMIT */, '`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.');
                }
                // Unsubscribe when the current context is destroyed, if requested.
                cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
              });
              // The actual returned signal is a `computed` of the `State` signal, which maps the various states
              // to either values or errors.
              return computed(() => {
                const current = state();
                switch (current.kind) {
                  case 1 /* StateKind.Value */:
                    return current.value;
                  case 2 /* StateKind.Error */:
                    throw current.error;
                  case 0 /* StateKind.NoValue */:
                    // This shouldn't really happen because the error is thrown on creation.
                    // TODO(alxhub): use a RuntimeError when we finalize the error semantics
                    throw new RuntimeError(601 /* RuntimeErrorCode.REQUIRE_SYNC_WITHOUT_SYNC_EMIT */, '`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.');
                }
              });
            }

        })
    };
}));
//# sourceMappingURL=rxjs-interop.js.map
