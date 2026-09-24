/* esm-bundle - @angular/cdk/stepper - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/keycodes', '@angular/core', '@angular/cdk/platform', 'rxjs', 'rxjs/operators'], (function (exports) {
    'use strict';
    var FocusKeyManager, i1, BidiModule, coerceBooleanProperty, coerceNumberProperty, hasModifierKey, SPACE, ENTER, i0, Directive, InjectionToken, EventEmitter, forwardRef, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, Optional, ContentChild, ViewChild, Input, Output, QueryList, ContentChildren, NgModule, _getFocusedElementPierceShadowDom, Subject, of, startWith, takeUntil;
    return {
        setters: [function (module) {
            FocusKeyManager = module.FocusKeyManager;
        }, function (module) {
            i1 = module;
            BidiModule = module.BidiModule;
        }, function (module) {
            coerceBooleanProperty = module.coerceBooleanProperty;
            coerceNumberProperty = module.coerceNumberProperty;
        }, function (module) {
            hasModifierKey = module.hasModifierKey;
            SPACE = module.SPACE;
            ENTER = module.ENTER;
        }, function (module) {
            i0 = module;
            Directive = module.Directive;
            InjectionToken = module.InjectionToken;
            EventEmitter = module.EventEmitter;
            forwardRef = module.forwardRef;
            TemplateRef = module.TemplateRef;
            Component = module.Component;
            ViewEncapsulation = module.ViewEncapsulation;
            ChangeDetectionStrategy = module.ChangeDetectionStrategy;
            Inject = module.Inject;
            Optional = module.Optional;
            ContentChild = module.ContentChild;
            ViewChild = module.ViewChild;
            Input = module.Input;
            Output = module.Output;
            QueryList = module.QueryList;
            ContentChildren = module.ContentChildren;
            NgModule = module.NgModule;
        }, function (module) {
            _getFocusedElementPierceShadowDom = module._getFocusedElementPierceShadowDom;
        }, function (module) {
            Subject = module.Subject;
            of = module.of;
        }, function (module) {
            startWith = module.startWith;
            takeUntil = module.takeUntil;
        }],
        execute: (function () {

            function CdkStep_ng_template_0_Template(rf, ctx) {
              if (rf & 1) {
                i0.ɵɵprojection(0);
              }
            }
            const _c0 = ["*"];
            class CdkStepHeader {
              constructor(_elementRef) {
                this._elementRef = _elementRef;
              }
              /** Focuses the step header. */
              focus() {
                this._elementRef.nativeElement.focus();
              }
              static {
                this.ɵfac = function CdkStepHeader_Factory(t) {
                  return new (t || CdkStepHeader)(i0.ɵɵdirectiveInject(i0.ElementRef));
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: CdkStepHeader,
                  selectors: [["", "cdkStepHeader", ""]],
                  hostAttrs: ["role", "tab"]
                });
              }
            } exports("CdkStepHeader", CdkStepHeader);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkStepHeader, [{
                type: Directive,
                args: [{
                  selector: '[cdkStepHeader]',
                  host: {
                    'role': 'tab'
                  }
                }]
              }], function () {
                return [{
                  type: i0.ElementRef
                }];
              }, null);
            })();
            class CdkStepLabel {
              constructor( /** @docs-private */template) {
                this.template = template;
              }
              static {
                this.ɵfac = function CdkStepLabel_Factory(t) {
                  return new (t || CdkStepLabel)(i0.ɵɵdirectiveInject(i0.TemplateRef));
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: CdkStepLabel,
                  selectors: [["", "cdkStepLabel", ""]]
                });
              }
            } exports("CdkStepLabel", CdkStepLabel);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkStepLabel, [{
                type: Directive,
                args: [{
                  selector: '[cdkStepLabel]'
                }]
              }], function () {
                return [{
                  type: i0.TemplateRef
                }];
              }, null);
            })();

            /** Used to generate unique ID for each stepper component. */
            let nextId = 0;
            /** Change event emitted on selection changes. */
            class StepperSelectionEvent {} exports("StepperSelectionEvent", StepperSelectionEvent);
            /** Enum to represent the different states of the steps. */
            const STEP_STATE = exports("STEP_STATE", {
              NUMBER: 'number',
              EDIT: 'edit',
              DONE: 'done',
              ERROR: 'error'
            });
            /** InjectionToken that can be used to specify the global stepper options. */
            const STEPPER_GLOBAL_OPTIONS = exports("STEPPER_GLOBAL_OPTIONS", new InjectionToken('STEPPER_GLOBAL_OPTIONS'));
            class CdkStep {
              /** Whether the user can return to this step once it has been marked as completed. */
              get editable() {
                return this._editable;
              }
              set editable(value) {
                this._editable = coerceBooleanProperty(value);
              }
              /** Whether the completion of step is optional. */
              get optional() {
                return this._optional;
              }
              set optional(value) {
                this._optional = coerceBooleanProperty(value);
              }
              /** Whether step is marked as completed. */
              get completed() {
                return this._completedOverride == null ? this._getDefaultCompleted() : this._completedOverride;
              }
              set completed(value) {
                this._completedOverride = coerceBooleanProperty(value);
              }
              _getDefaultCompleted() {
                return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
              }
              /** Whether step has an error. */
              get hasError() {
                return this._customError == null ? this._getDefaultError() : this._customError;
              }
              set hasError(value) {
                this._customError = coerceBooleanProperty(value);
              }
              _getDefaultError() {
                return this.stepControl && this.stepControl.invalid && this.interacted;
              }
              constructor(_stepper, stepperOptions) {
                this._stepper = _stepper;
                /** Whether user has attempted to move away from the step. */
                this.interacted = false;
                /** Emits when the user has attempted to move away from the step. */
                this.interactedStream = new EventEmitter();
                this._editable = true;
                this._optional = false;
                this._completedOverride = null;
                this._customError = null;
                this._stepperOptions = stepperOptions ? stepperOptions : {};
                this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
              }
              /** Selects this step component. */
              select() {
                this._stepper.selected = this;
              }
              /** Resets the step to its initial state. Note that this includes resetting form data. */
              reset() {
                this.interacted = false;
                if (this._completedOverride != null) {
                  this._completedOverride = false;
                }
                if (this._customError != null) {
                  this._customError = false;
                }
                if (this.stepControl) {
                  this.stepControl.reset();
                }
              }
              ngOnChanges() {
                // Since basically all inputs of the MatStep get proxied through the view down to the
                // underlying MatStepHeader, we have to make sure that change detection runs correctly.
                this._stepper._stateChanged();
              }
              _markAsInteracted() {
                if (!this.interacted) {
                  this.interacted = true;
                  this.interactedStream.emit(this);
                }
              }
              /** Determines whether the error state can be shown. */
              _showError() {
                // We want to show the error state either if the user opted into/out of it using the
                // global options, or if they've explicitly set it through the `hasError` input.
                return this._stepperOptions.showError ?? this._customError != null;
              }
              static {
                this.ɵfac = function CdkStep_Factory(t) {
                  return new (t || CdkStep)(i0.ɵɵdirectiveInject(forwardRef(() => CdkStepper)), i0.ɵɵdirectiveInject(STEPPER_GLOBAL_OPTIONS, 8));
                };
              }
              static {
                this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
                  type: CdkStep,
                  selectors: [["cdk-step"]],
                  contentQueries: function CdkStep_ContentQueries(rf, ctx, dirIndex) {
                    if (rf & 1) {
                      i0.ɵɵcontentQuery(dirIndex, CdkStepLabel, 5);
                    }
                    if (rf & 2) {
                      let _t;
                      i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.stepLabel = _t.first);
                    }
                  },
                  viewQuery: function CdkStep_Query(rf, ctx) {
                    if (rf & 1) {
                      i0.ɵɵviewQuery(TemplateRef, 7);
                    }
                    if (rf & 2) {
                      let _t;
                      i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.content = _t.first);
                    }
                  },
                  inputs: {
                    stepControl: "stepControl",
                    label: "label",
                    errorMessage: "errorMessage",
                    ariaLabel: ["aria-label", "ariaLabel"],
                    ariaLabelledby: ["aria-labelledby", "ariaLabelledby"],
                    state: "state",
                    editable: "editable",
                    optional: "optional",
                    completed: "completed",
                    hasError: "hasError"
                  },
                  outputs: {
                    interactedStream: "interacted"
                  },
                  exportAs: ["cdkStep"],
                  features: [i0.ɵɵNgOnChangesFeature],
                  ngContentSelectors: _c0,
                  decls: 1,
                  vars: 0,
                  template: function CdkStep_Template(rf, ctx) {
                    if (rf & 1) {
                      i0.ɵɵprojectionDef();
                      i0.ɵɵtemplate(0, CdkStep_ng_template_0_Template, 1, 0, "ng-template");
                    }
                  },
                  encapsulation: 2,
                  changeDetection: 0
                });
              }
            } exports("CdkStep", CdkStep);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkStep, [{
                type: Component,
                args: [{
                  selector: 'cdk-step',
                  exportAs: 'cdkStep',
                  template: '<ng-template><ng-content></ng-content></ng-template>',
                  encapsulation: ViewEncapsulation.None,
                  changeDetection: ChangeDetectionStrategy.OnPush
                }]
              }], function () {
                return [{
                  type: CdkStepper,
                  decorators: [{
                    type: Inject,
                    args: [forwardRef(() => CdkStepper)]
                  }]
                }, {
                  type: undefined,
                  decorators: [{
                    type: Optional
                  }, {
                    type: Inject,
                    args: [STEPPER_GLOBAL_OPTIONS]
                  }]
                }];
              }, {
                stepLabel: [{
                  type: ContentChild,
                  args: [CdkStepLabel]
                }],
                content: [{
                  type: ViewChild,
                  args: [TemplateRef, {
                    static: true
                  }]
                }],
                stepControl: [{
                  type: Input
                }],
                interactedStream: [{
                  type: Output,
                  args: ['interacted']
                }],
                label: [{
                  type: Input
                }],
                errorMessage: [{
                  type: Input
                }],
                ariaLabel: [{
                  type: Input,
                  args: ['aria-label']
                }],
                ariaLabelledby: [{
                  type: Input,
                  args: ['aria-labelledby']
                }],
                state: [{
                  type: Input
                }],
                editable: [{
                  type: Input
                }],
                optional: [{
                  type: Input
                }],
                completed: [{
                  type: Input
                }],
                hasError: [{
                  type: Input
                }]
              });
            })();
            class CdkStepper {
              /** Whether the validity of previous steps should be checked or not. */
              get linear() {
                return this._linear;
              }
              set linear(value) {
                this._linear = coerceBooleanProperty(value);
              }
              /** The index of the selected step. */
              get selectedIndex() {
                return this._selectedIndex;
              }
              set selectedIndex(index) {
                const newIndex = coerceNumberProperty(index);
                if (this.steps && this._steps) {
                  // Ensure that the index can't be out of bounds.
                  if (!this._isValidIndex(newIndex) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                    throw Error('cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.');
                  }
                  this.selected?._markAsInteracted();
                  if (this._selectedIndex !== newIndex && !this._anyControlsInvalidOrPending(newIndex) && (newIndex >= this._selectedIndex || this.steps.toArray()[newIndex].editable)) {
                    this._updateSelectedItemIndex(newIndex);
                  }
                } else {
                  this._selectedIndex = newIndex;
                }
              }
              /** The step that is selected. */
              get selected() {
                return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
              }
              set selected(step) {
                this.selectedIndex = step && this.steps ? this.steps.toArray().indexOf(step) : -1;
              }
              /** Orientation of the stepper. */
              get orientation() {
                return this._orientation;
              }
              set orientation(value) {
                // This is a protected method so that `MatStepper` can hook into it.
                this._orientation = value;
                if (this._keyManager) {
                  this._keyManager.withVerticalOrientation(value === 'vertical');
                }
              }
              constructor(_dir, _changeDetectorRef, _elementRef) {
                this._dir = _dir;
                this._changeDetectorRef = _changeDetectorRef;
                this._elementRef = _elementRef;
                /** Emits when the component is destroyed. */
                this._destroyed = new Subject();
                /** Steps that belong to the current stepper, excluding ones from nested steppers. */
                this.steps = new QueryList();
                /** List of step headers sorted based on their DOM order. */
                this._sortedHeaders = new QueryList();
                this._linear = false;
                this._selectedIndex = 0;
                /** Event emitted when the selected step has changed. */
                this.selectionChange = new EventEmitter();
                /** Output to support two-way binding on `[(selectedIndex)]` */
                this.selectedIndexChange = new EventEmitter();
                this._orientation = 'horizontal';
                this._groupId = nextId++;
              }
              ngAfterContentInit() {
                this._steps.changes.pipe(startWith(this._steps), takeUntil(this._destroyed)).subscribe(steps => {
                  this.steps.reset(steps.filter(step => step._stepper === this));
                  this.steps.notifyOnChanges();
                });
              }
              ngAfterViewInit() {
                // If the step headers are defined outside of the `ngFor` that renders the steps, like in the
                // Material stepper, they won't appear in the `QueryList` in the same order as they're
                // rendered in the DOM which will lead to incorrect keyboard navigation. We need to sort
                // them manually to ensure that they're correct. Alternatively, we can change the Material
                // template to inline the headers in the `ngFor`, but that'll result in a lot of
                // code duplication. See #23539.
                this._stepHeader.changes.pipe(startWith(this._stepHeader), takeUntil(this._destroyed)).subscribe(headers => {
                  this._sortedHeaders.reset(headers.toArray().sort((a, b) => {
                    const documentPosition = a._elementRef.nativeElement.compareDocumentPosition(b._elementRef.nativeElement);
                    // `compareDocumentPosition` returns a bitmask so we have to use a bitwise operator.
                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
                    // tslint:disable-next-line:no-bitwise
                    return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
                  }));
                  this._sortedHeaders.notifyOnChanges();
                });
                // Note that while the step headers are content children by default, any components that
                // extend this one might have them as view children. We initialize the keyboard handling in
                // AfterViewInit so we're guaranteed for both view and content children to be defined.
                this._keyManager = new FocusKeyManager(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation === 'vertical');
                (this._dir ? this._dir.change : of()).pipe(startWith(this._layoutDirection()), takeUntil(this._destroyed)).subscribe(direction => this._keyManager.withHorizontalOrientation(direction));
                this._keyManager.updateActiveItem(this._selectedIndex);
                // No need to `takeUntil` here, because we're the ones destroying `steps`.
                this.steps.changes.subscribe(() => {
                  if (!this.selected) {
                    this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
                  }
                });
                // The logic which asserts that the selected index is within bounds doesn't run before the
                // steps are initialized, because we don't how many steps there are yet so we may have an
                // invalid index on init. If that's the case, auto-correct to the default so we don't throw.
                if (!this._isValidIndex(this._selectedIndex)) {
                  this._selectedIndex = 0;
                }
              }
              ngOnDestroy() {
                this._keyManager?.destroy();
                this.steps.destroy();
                this._sortedHeaders.destroy();
                this._destroyed.next();
                this._destroyed.complete();
              }
              /** Selects and focuses the next step in list. */
              next() {
                this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
              }
              /** Selects and focuses the previous step in list. */
              previous() {
                this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
              }
              /** Resets the stepper to its initial state. Note that this includes clearing form data. */
              reset() {
                this._updateSelectedItemIndex(0);
                this.steps.forEach(step => step.reset());
                this._stateChanged();
              }
              /** Returns a unique id for each step label element. */
              _getStepLabelId(i) {
                return `cdk-step-label-${this._groupId}-${i}`;
              }
              /** Returns unique id for each step content element. */
              _getStepContentId(i) {
                return `cdk-step-content-${this._groupId}-${i}`;
              }
              /** Marks the component to be change detected. */
              _stateChanged() {
                this._changeDetectorRef.markForCheck();
              }
              /** Returns position state of the step with the given index. */
              _getAnimationDirection(index) {
                const position = index - this._selectedIndex;
                if (position < 0) {
                  return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
                } else if (position > 0) {
                  return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
                }
                return 'current';
              }
              /** Returns the type of icon to be displayed. */
              _getIndicatorType(index, state = STEP_STATE.NUMBER) {
                const step = this.steps.toArray()[index];
                const isCurrentStep = this._isCurrentStep(index);
                return step._displayDefaultIndicatorType ? this._getDefaultIndicatorLogic(step, isCurrentStep) : this._getGuidelineLogic(step, isCurrentStep, state);
              }
              _getDefaultIndicatorLogic(step, isCurrentStep) {
                if (step._showError() && step.hasError && !isCurrentStep) {
                  return STEP_STATE.ERROR;
                } else if (!step.completed || isCurrentStep) {
                  return STEP_STATE.NUMBER;
                } else {
                  return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
                }
              }
              _getGuidelineLogic(step, isCurrentStep, state = STEP_STATE.NUMBER) {
                if (step._showError() && step.hasError && !isCurrentStep) {
                  return STEP_STATE.ERROR;
                } else if (step.completed && !isCurrentStep) {
                  return STEP_STATE.DONE;
                } else if (step.completed && isCurrentStep) {
                  return state;
                } else if (step.editable && isCurrentStep) {
                  return STEP_STATE.EDIT;
                } else {
                  return state;
                }
              }
              _isCurrentStep(index) {
                return this._selectedIndex === index;
              }
              /** Returns the index of the currently-focused step header. */
              _getFocusIndex() {
                return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
              }
              _updateSelectedItemIndex(newIndex) {
                const stepsArray = this.steps.toArray();
                this.selectionChange.emit({
                  selectedIndex: newIndex,
                  previouslySelectedIndex: this._selectedIndex,
                  selectedStep: stepsArray[newIndex],
                  previouslySelectedStep: stepsArray[this._selectedIndex]
                });
                // If focus is inside the stepper, move it to the next header, otherwise it may become
                // lost when the active step content is hidden. We can't be more granular with the check
                // (e.g. checking whether focus is inside the active step), because we don't have a
                // reference to the elements that are rendering out the content.
                this._containsFocus() ? this._keyManager.setActiveItem(newIndex) : this._keyManager.updateActiveItem(newIndex);
                this._selectedIndex = newIndex;
                this.selectedIndexChange.emit(this._selectedIndex);
                this._stateChanged();
              }
              _onKeydown(event) {
                const hasModifier = hasModifierKey(event);
                const keyCode = event.keyCode;
                const manager = this._keyManager;
                if (manager.activeItemIndex != null && !hasModifier && (keyCode === SPACE || keyCode === ENTER)) {
                  this.selectedIndex = manager.activeItemIndex;
                  event.preventDefault();
                } else {
                  manager.setFocusOrigin('keyboard').onKeydown(event);
                }
              }
              _anyControlsInvalidOrPending(index) {
                if (this._linear && index >= 0) {
                  return this.steps.toArray().slice(0, index).some(step => {
                    const control = step.stepControl;
                    const isIncomplete = control ? control.invalid || control.pending || !step.interacted : !step.completed;
                    return isIncomplete && !step.optional && !step._completedOverride;
                  });
                }
                return false;
              }
              _layoutDirection() {
                return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
              }
              /** Checks whether the stepper contains the focused element. */
              _containsFocus() {
                const stepperElement = this._elementRef.nativeElement;
                const focusedElement = _getFocusedElementPierceShadowDom();
                return stepperElement === focusedElement || stepperElement.contains(focusedElement);
              }
              /** Checks whether the passed-in index is a valid step index. */
              _isValidIndex(index) {
                return index > -1 && (!this.steps || index < this.steps.length);
              }
              static {
                this.ɵfac = function CdkStepper_Factory(t) {
                  return new (t || CdkStepper)(i0.ɵɵdirectiveInject(i1.Directionality, 8), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef));
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: CdkStepper,
                  selectors: [["", "cdkStepper", ""]],
                  contentQueries: function CdkStepper_ContentQueries(rf, ctx, dirIndex) {
                    if (rf & 1) {
                      i0.ɵɵcontentQuery(dirIndex, CdkStep, 5);
                      i0.ɵɵcontentQuery(dirIndex, CdkStepHeader, 5);
                    }
                    if (rf & 2) {
                      let _t;
                      i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._steps = _t);
                      i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._stepHeader = _t);
                    }
                  },
                  inputs: {
                    linear: "linear",
                    selectedIndex: "selectedIndex",
                    selected: "selected",
                    orientation: "orientation"
                  },
                  outputs: {
                    selectionChange: "selectionChange",
                    selectedIndexChange: "selectedIndexChange"
                  },
                  exportAs: ["cdkStepper"]
                });
              }
            } exports("CdkStepper", CdkStepper);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkStepper, [{
                type: Directive,
                args: [{
                  selector: '[cdkStepper]',
                  exportAs: 'cdkStepper'
                }]
              }], function () {
                return [{
                  type: i1.Directionality,
                  decorators: [{
                    type: Optional
                  }]
                }, {
                  type: i0.ChangeDetectorRef
                }, {
                  type: i0.ElementRef
                }];
              }, {
                _steps: [{
                  type: ContentChildren,
                  args: [CdkStep, {
                    descendants: true
                  }]
                }],
                _stepHeader: [{
                  type: ContentChildren,
                  args: [CdkStepHeader, {
                    descendants: true
                  }]
                }],
                linear: [{
                  type: Input
                }],
                selectedIndex: [{
                  type: Input
                }],
                selected: [{
                  type: Input
                }],
                selectionChange: [{
                  type: Output
                }],
                selectedIndexChange: [{
                  type: Output
                }],
                orientation: [{
                  type: Input
                }]
              });
            })();

            /** Button that moves to the next step in a stepper workflow. */
            class CdkStepperNext {
              constructor(_stepper) {
                this._stepper = _stepper;
                /** Type of the next button. Defaults to "submit" if not specified. */
                this.type = 'submit';
              }
              static {
                this.ɵfac = function CdkStepperNext_Factory(t) {
                  return new (t || CdkStepperNext)(i0.ɵɵdirectiveInject(CdkStepper));
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: CdkStepperNext,
                  selectors: [["button", "cdkStepperNext", ""]],
                  hostVars: 1,
                  hostBindings: function CdkStepperNext_HostBindings(rf, ctx) {
                    if (rf & 1) {
                      i0.ɵɵlistener("click", function CdkStepperNext_click_HostBindingHandler() {
                        return ctx._stepper.next();
                      });
                    }
                    if (rf & 2) {
                      i0.ɵɵhostProperty("type", ctx.type);
                    }
                  },
                  inputs: {
                    type: "type"
                  }
                });
              }
            } exports("CdkStepperNext", CdkStepperNext);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkStepperNext, [{
                type: Directive,
                args: [{
                  selector: 'button[cdkStepperNext]',
                  host: {
                    '[type]': 'type',
                    '(click)': '_stepper.next()'
                  }
                }]
              }], function () {
                return [{
                  type: CdkStepper
                }];
              }, {
                type: [{
                  type: Input
                }]
              });
            })();
            /** Button that moves to the previous step in a stepper workflow. */
            class CdkStepperPrevious {
              constructor(_stepper) {
                this._stepper = _stepper;
                /** Type of the previous button. Defaults to "button" if not specified. */
                this.type = 'button';
              }
              static {
                this.ɵfac = function CdkStepperPrevious_Factory(t) {
                  return new (t || CdkStepperPrevious)(i0.ɵɵdirectiveInject(CdkStepper));
                };
              }
              static {
                this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
                  type: CdkStepperPrevious,
                  selectors: [["button", "cdkStepperPrevious", ""]],
                  hostVars: 1,
                  hostBindings: function CdkStepperPrevious_HostBindings(rf, ctx) {
                    if (rf & 1) {
                      i0.ɵɵlistener("click", function CdkStepperPrevious_click_HostBindingHandler() {
                        return ctx._stepper.previous();
                      });
                    }
                    if (rf & 2) {
                      i0.ɵɵhostProperty("type", ctx.type);
                    }
                  },
                  inputs: {
                    type: "type"
                  }
                });
              }
            } exports("CdkStepperPrevious", CdkStepperPrevious);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkStepperPrevious, [{
                type: Directive,
                args: [{
                  selector: 'button[cdkStepperPrevious]',
                  host: {
                    '[type]': 'type',
                    '(click)': '_stepper.previous()'
                  }
                }]
              }], function () {
                return [{
                  type: CdkStepper
                }];
              }, {
                type: [{
                  type: Input
                }]
              });
            })();
            class CdkStepperModule {
              static {
                this.ɵfac = function CdkStepperModule_Factory(t) {
                  return new (t || CdkStepperModule)();
                };
              }
              static {
                this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
                  type: CdkStepperModule
                });
              }
              static {
                this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
                  imports: [BidiModule]
                });
              }
            } exports("CdkStepperModule", CdkStepperModule);
            (function () {
              (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CdkStepperModule, [{
                type: NgModule,
                args: [{
                  imports: [BidiModule],
                  exports: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
                  declarations: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
                }]
              }], null, null);
            })();

        })
    };
}));
//# sourceMappingURL=stepper.js.map
