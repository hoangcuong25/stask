/* esm-bundle - ang-jsoneditor - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core', '@angular/common', 'jsoneditor', '@angular/forms'], (function (exports) {
  'use strict';
  var EventEmitter, i0, forwardRef, Component, ChangeDetectionStrategy, ViewChild, Input, Output, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, CommonModule, JSONEditor, NG_VALUE_ACCESSOR, FormsModule;
  return {
    setters: [function (module) {
      EventEmitter = module.EventEmitter;
      i0 = module;
      forwardRef = module.forwardRef;
      Component = module.Component;
      ChangeDetectionStrategy = module.ChangeDetectionStrategy;
      ViewChild = module.ViewChild;
      Input = module.Input;
      Output = module.Output;
      NgModule = module.NgModule;
      CUSTOM_ELEMENTS_SCHEMA = module.CUSTOM_ELEMENTS_SCHEMA;
      NO_ERRORS_SCHEMA = module.NO_ERRORS_SCHEMA;
    }, function (module) {
      CommonModule = module.CommonModule;
    }, function (module) {
      JSONEditor = module.default;
    }, function (module) {
      NG_VALUE_ACCESSOR = module.NG_VALUE_ACCESSOR;
      FormsModule = module.FormsModule;
    }],
    execute: (function () {

      /* eslint-disable @typescript-eslint/ban-types */
      const _c0 = ["jsonEditorContainer"];
      class JsonEditorOptions {
        ace;
        ajv;
        /**
         *   {function} onChange  Callback method, triggered
        on change of contents.
        Does not pass the contents itself.
        See also `onChangeJSON` and
        `onChangeText`.
         */
        onChange;
        /**
         *   // {function} onChangeJSON  Callback method, triggered
        //     in modes on change of contents,
        //     passing the changed contents
        //     as JSON.
        //     Only applicable for modes
        //     'tree', 'view', and 'form'.
         */
        onChangeJSON;
        onNodeName;
        onCreateMenu;
        onColorPicker;
        /**
        // {function} onChangeText  Callback method, triggered
        //     in modes on change of contents,
        //     passing the changed contents
        //     as stringified JSON.
         */
        onChangeText;
        /**
         *   {function} onSelectionChange Callback method,
        triggered on node selection change
        Only applicable for modes
        'tree', 'view', and 'form'
         */
        onSelectionChange;
        /**
         *     {function} onTextSelectionChange Callback method,
        triggered on text selection change
        Only applicable for modes
         */
        onTextSelectionChange;
        /**
         *   // {function} onEvent Callback method, triggered
          // when an event occurs in
          // a JSON field or value.
          // Only applicable for
          // modes 'form', 'tree' and
          // 'view'
         */
        onEvent;
        /**
         * // *   {function} onFocus  Callback method, triggered
        //  when the editor comes into focus,
        //  passing an object {type, target},
        //  Applicable for all modes
         */
        onFocus;
        // *   {function} onBlur   Callback method, triggered
        //  when the editor goes out of focus,
        //  passing an object {type, target},
        //  Applicable for all modes
        onBlur;
        /**
         *  // *   {function} onClassName Callback method, triggered
        // when a Node DOM is rendered. Function returns
        // a css class name to be set on a node.
        // Only applicable for
        // modes 'form', 'tree' and
        // 'view'
         */
        onClassName;
        onEditable;
        /**
         *   {function} onError   Callback method, triggered
        when an error occurs
         */
        onError;
        onModeChange;
        onValidate;
        onValidationError;
        enableSort;
        enableTransform;
        escapeUnicode;
        expandAll;
        sortObjectKeys;
        history;
        mode;
        modes;
        name;
        schema;
        search;
        indentation;
        templates;
        theme;
        language;
        languages;
        /**
         * Adds main menu bar - Contains format, sort, transform, search etc. functionality. True
         * by default. Applicable in all types of mode.
         */
        mainMenuBar;
        /**
         * Adds navigation bar to the menu - the navigation bar visualize the current position on
         * the tree structure as well as allows breadcrumbs navigation.
         * True by default.
         * Only applicable when mode is 'tree', 'form' or 'view'.
         */
        navigationBar;
        /**
         * Adds status bar to the bottom of the editor - the status bar shows the cursor position
         * and a count of the selected characters.
         * True by default.
         * Only applicable when mode is 'code' or 'text'.
         */
        statusBar;
        constructor() {
          this.enableSort = true;
          this.enableTransform = true;
          this.escapeUnicode = false;
          this.expandAll = false;
          this.sortObjectKeys = false;
          this.history = true;
          this.mode = 'tree';
          this.search = true;
          this.indentation = 2;
        }
      } exports("JsonEditorOptions", JsonEditorOptions);

      /* eslint-disable @typescript-eslint/ban-types */
      /* eslint-disable @angular-eslint/no-input-rename */
      /* eslint-disable @angular-eslint/no-output-native */
      class JsonEditorComponent {
        jsonEditorContainer;
        options = new JsonEditorOptions();
        change = new EventEmitter();
        jsonChange = new EventEmitter();
        debug = false;
        optionsChanged = false;
        disabled = false;
        isFocused = false;
        id = 'angjsoneditor' + Math.floor(Math.random() * 1000000);
        _data = {};
        editor;
        constructor() {}
        set data(value) {
          this._data = value;
          if (this.editor) {
            this.editor.destroy();
            this.ngOnInit();
          }
        }
        ngOnInit() {
          let optionsBefore = this.options;
          if (!this.optionsChanged && this.editor) {
            optionsBefore = this.editor.options;
          }
          if (!this.options.onChangeJSON && this.jsonChange) {
            this.options.onChangeJSON = this.onChangeJSON.bind(this);
          }
          if (!this.options.onChange && this.change) {
            this.options.onChange = this.onChange.bind(this);
          }
          const optionsCopy = Object.assign({}, optionsBefore);
          // expandAll is an option only supported by ang-jsoneditor and not by the the original jsoneditor.
          delete optionsCopy.expandAll;
          if (this.debug) {
            console.log(optionsCopy, this._data);
          }
          if (!this.jsonEditorContainer.nativeElement) {
            console.error(`Can't find the ElementRef reference for jsoneditor)`);
          }
          if (optionsCopy.mode === 'text' || optionsCopy.mode === 'code' || optionsCopy.modes && (optionsCopy.modes.indexOf('text') !== -1 || optionsCopy.modes.indexOf('code') !== -1)) {
            optionsCopy.onChangeJSON = null;
          }
          this.editor = new JSONEditor(this.jsonEditorContainer.nativeElement, optionsCopy, this._data);
          if (this.options.expandAll) {
            this.editor.expandAll();
          }
        }
        ngOnDestroy() {
          this.destroy();
        }
        /**
         * ngModel
         * ControlValueAccessor
         */
        // ControlValueAccessor implementation
        writeValue(value) {
          this.data = value;
        }
        // Implemented as part of ControlValueAccessor
        registerOnChange(fn) {
          this.onChangeModel = fn;
        }
        // Implemented as part of ControlValueAccessor.
        registerOnTouched(fn) {
          this.onTouched = fn;
        }
        // Implemented as part of ControlValueAccessor.
        setDisabledState(isDisabled) {
          this.disabled = isDisabled;
        }
        onChange(e) {
          if (this.editor) {
            try {
              const json = this.editor.get();
              this.onChangeModel(json);
              this.change.emit(json);
            } catch (error) {
              if (this.debug) {
                console.log(error);
              }
            }
          }
        }
        onChangeJSON(e) {
          if (this.editor) {
            try {
              this.jsonChange.emit(this.editor.get());
            } catch (error) {
              if (this.debug) {
                console.log(error);
              }
            }
          }
        }
        /**
         * JSON EDITOR FUNCTIONS
         */
        collapseAll() {
          this.editor.collapseAll();
        }
        expandAll() {
          this.editor.expandAll();
        }
        focus() {
          this.editor.focus();
        }
        get() {
          return this.editor.get();
        }
        getMode() {
          return this.editor.getMode();
        }
        getName() {
          return this.editor.getName();
        }
        getText() {
          return this.editor.getText();
        }
        set(json) {
          this.editor.set(json);
        }
        setMode(mode) {
          this.editor.setMode(mode);
        }
        setName(name) {
          this.editor.setName(name);
        }
        setSelection(start, end) {
          this.editor.setSelection(start, end);
        }
        getSelection() {
          return this.editor.getSelection();
        }
        getValidateSchema() {
          return this.editor.validateSchema;
        }
        setSchema(schema, schemaRefs) {
          this.editor.setSchema(schema, schemaRefs);
        }
        search(query) {
          this.editor.search(query);
        }
        setOptions(newOptions) {
          if (this.editor) {
            this.editor.destroy();
          }
          this.optionsChanged = true;
          this.options = newOptions;
          this.ngOnInit();
        }
        update(json) {
          this.editor.update(json);
        }
        destroy() {
          this.editor.destroy();
        }
        getEditor() {
          return this.editor;
        }
        isValidJson() {
          try {
            JSON.parse(this.getText());
            return true;
          } catch (e) {
            return false;
          }
        }
        // Implemented as part of ControlValueAccessor.
        onTouched = () => {};
        // Implemented as part of ControlValueAccessor.
        onChangeModel = e => {};
        static ɵfac = function JsonEditorComponent_Factory(t) {
          return new (t || JsonEditorComponent)();
        };
        static ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
          type: JsonEditorComponent,
          selectors: [["json-editor"]],
          viewQuery: function JsonEditorComponent_Query(rf, ctx) {
            if (rf & 1) {
              i0.ɵɵviewQuery(_c0, 7);
            }
            if (rf & 2) {
              let _t;
              i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.jsonEditorContainer = _t.first);
            }
          },
          inputs: {
            options: "options",
            debug: "debug",
            data: "data"
          },
          outputs: {
            change: "change",
            jsonChange: "jsonChange"
          },
          features: [i0.ɵɵProvidersFeature([{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JsonEditorComponent),
            multi: true
          }])],
          decls: 2,
          vars: 1,
          consts: [[3, "id"], ["jsonEditorContainer", ""]],
          template: function JsonEditorComponent_Template(rf, ctx) {
            if (rf & 1) {
              i0.ɵɵelement(0, "div", 0, 1);
            }
            if (rf & 2) {
              i0.ɵɵproperty("id", ctx.id);
            }
          },
          encapsulation: 2,
          changeDetection: 0
        });
      } exports("JsonEditorComponent", JsonEditorComponent);
      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JsonEditorComponent, [{
          type: Component,
          args: [{
            // eslint-disable-next-line @angular-eslint/component-selector
            selector: 'json-editor',
            template: `<div [id]="id" #jsonEditorContainer></div>`,
            providers: [{
              provide: NG_VALUE_ACCESSOR,
              useExisting: forwardRef(() => JsonEditorComponent),
              multi: true
            }],
            preserveWhitespaces: false,
            changeDetection: ChangeDetectionStrategy.OnPush
          }]
        }], function () {
          return [];
        }, {
          jsonEditorContainer: [{
            type: ViewChild,
            args: ['jsonEditorContainer', {
              static: true
            }]
          }],
          options: [{
            type: Input
          }],
          change: [{
            type: Output
          }],
          jsonChange: [{
            type: Output
          }],
          debug: [{
            type: Input
          }],
          data: [{
            type: Input,
            args: ['data']
          }]
        });
      })();
      class NgJsonEditorModule {
        static forRoot() {
          return {
            ngModule: NgJsonEditorModule,
            providers: []
          };
        }
        static ɵfac = function NgJsonEditorModule_Factory(t) {
          return new (t || NgJsonEditorModule)();
        };
        static ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
          type: NgJsonEditorModule
        });
        static ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
          imports: [CommonModule, FormsModule]
        });
      } exports("NgJsonEditorModule", NgJsonEditorModule);
      (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgJsonEditorModule, [{
          type: NgModule,
          args: [{
            imports: [CommonModule, FormsModule],
            declarations: [JsonEditorComponent],
            exports: [JsonEditorComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
          }]
        }], null, null);
      })();

    })
  };
}));
//# sourceMappingURL=ang-jsoneditor.js.map
