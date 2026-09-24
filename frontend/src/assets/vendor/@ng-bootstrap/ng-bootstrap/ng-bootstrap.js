/* esm-bundle - @ng-bootstrap/ng-bootstrap - Ivy - system format - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */
System.register(['@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/core/rxjs-interop', '@angular/forms', '@popperjs/core'], (function (exports) {
    'use strict';
    var i0, Injectable, Directive, EventEmitter, Input, Output, ContentChildren, forwardRef, Inject, Optional, Host, Component, ViewEncapsulation, inject, ApplicationRef, ElementRef, TemplateRef, ContentChild, ChangeDetectorRef, DestroyRef, NgModule, ChangeDetectionStrategy, PLATFORM_ID, LOCALE_ID, ViewChild, Injector, EnvironmentInjector, createComponent, Attribute, ViewChildren, HostBinding, NgZone, InjectionToken, Subject, BehaviorSubject, combineLatest, timer, NEVER, zip, fromEvent, merge, of, EMPTY, race, Observable, take, map, startWith, distinctUntilChanged, switchMap, takeUntil, filter, tap, skip, finalize, endWith, withLatestFrom, mergeMap, delay, NgFor, NgTemplateOutlet, NgIf, isPlatformBrowser, getLocaleMonthNames, FormStyle, TranslationWidth, getLocaleDayNames, formatDate, DOCUMENT, PercentPipe, getLocaleDayPeriods, takeUntilDestroyed, NG_VALUE_ACCESSOR, NG_VALIDATORS, createPopperLite, offset, flip, preventOverflow, arrow;
    return {
        setters: [function (module) {
            i0 = module;
            Injectable = module.Injectable;
            Directive = module.Directive;
            EventEmitter = module.EventEmitter;
            Input = module.Input;
            Output = module.Output;
            ContentChildren = module.ContentChildren;
            forwardRef = module.forwardRef;
            Inject = module.Inject;
            Optional = module.Optional;
            Host = module.Host;
            Component = module.Component;
            ViewEncapsulation = module.ViewEncapsulation;
            inject = module.inject;
            ApplicationRef = module.ApplicationRef;
            ElementRef = module.ElementRef;
            TemplateRef = module.TemplateRef;
            ContentChild = module.ContentChild;
            ChangeDetectorRef = module.ChangeDetectorRef;
            DestroyRef = module.DestroyRef;
            NgModule = module.NgModule;
            ChangeDetectionStrategy = module.ChangeDetectionStrategy;
            PLATFORM_ID = module.PLATFORM_ID;
            LOCALE_ID = module.LOCALE_ID;
            ViewChild = module.ViewChild;
            Injector = module.Injector;
            EnvironmentInjector = module.EnvironmentInjector;
            createComponent = module.createComponent;
            Attribute = module.Attribute;
            ViewChildren = module.ViewChildren;
            HostBinding = module.HostBinding;
            NgZone = module.NgZone;
            InjectionToken = module.InjectionToken;
        }, function (module) {
            Subject = module.Subject;
            BehaviorSubject = module.BehaviorSubject;
            combineLatest = module.combineLatest;
            timer = module.timer;
            NEVER = module.NEVER;
            zip = module.zip;
            fromEvent = module.fromEvent;
            merge = module.merge;
            of = module.of;
            EMPTY = module.EMPTY;
            race = module.race;
            Observable = module.Observable;
        }, function (module) {
            take = module.take;
            map = module.map;
            startWith = module.startWith;
            distinctUntilChanged = module.distinctUntilChanged;
            switchMap = module.switchMap;
            takeUntil = module.takeUntil;
            filter = module.filter;
            tap = module.tap;
            skip = module.skip;
            finalize = module.finalize;
            endWith = module.endWith;
            withLatestFrom = module.withLatestFrom;
            mergeMap = module.mergeMap;
            delay = module.delay;
        }, function (module) {
            NgFor = module.NgFor;
            NgTemplateOutlet = module.NgTemplateOutlet;
            NgIf = module.NgIf;
            isPlatformBrowser = module.isPlatformBrowser;
            getLocaleMonthNames = module.getLocaleMonthNames;
            FormStyle = module.FormStyle;
            TranslationWidth = module.TranslationWidth;
            getLocaleDayNames = module.getLocaleDayNames;
            formatDate = module.formatDate;
            DOCUMENT = module.DOCUMENT;
            PercentPipe = module.PercentPipe;
            getLocaleDayPeriods = module.getLocaleDayPeriods;
        }, function (module) {
            takeUntilDestroyed = module.takeUntilDestroyed;
        }, function (module) {
            NG_VALUE_ACCESSOR = module.NG_VALUE_ACCESSOR;
            NG_VALIDATORS = module.NG_VALIDATORS;
        }, function (module) {
            createPopperLite = module.createPopperLite;
            offset = module.offset;
            flip = module.flip;
            preventOverflow = module.preventOverflow;
            arrow = module.arrow;
        }],
        execute: (function () {

            function NgbAccordion_ng_template_0_ng_template_2_Template(rf,ctx){}function NgbAccordion_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"button",3);i0.ɵɵtext(1);i0.ɵɵtemplate(2,NgbAccordion_ng_template_0_ng_template_2_Template,0,0,"ng-template",4);i0.ɵɵelementEnd();}if(rf&2){const panel_r3=ctx.$implicit;i0.ɵɵproperty("ngbPanelToggle",panel_r3);i0.ɵɵadvance(1);i0.ɵɵtextInterpolate1(" ",panel_r3.title," ");i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",panel_r3.titleTpl==null?null:panel_r3.titleTpl.templateRef);}}function NgbAccordion_ng_template_2_ng_template_2_Template(rf,ctx){}function NgbAccordion_ng_template_2_div_3_ng_template_2_Template(rf,ctx){}function NgbAccordion_ng_template_2_div_3_Template(rf,ctx){if(rf&1){const _r11=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"div",8);i0.ɵɵlistener("ngbRef",function NgbAccordion_ng_template_2_div_3_Template_div_ngbRef_0_listener($event){i0.ɵɵrestoreView(_r11);const panel_r5=i0.ɵɵnextContext().$implicit;return i0.ɵɵresetView(panel_r5.panelDiv=$event);});i0.ɵɵelementStart(1,"div",9);i0.ɵɵtemplate(2,NgbAccordion_ng_template_2_div_3_ng_template_2_Template,0,0,"ng-template",4);i0.ɵɵelementEnd()();}if(rf&2){const panel_r5=i0.ɵɵnextContext().$implicit;i0.ɵɵpropertyInterpolate("id",panel_r5.id);i0.ɵɵattribute("aria-labelledby",panel_r5.id+"-header");i0.ɵɵadvance(2);i0.ɵɵproperty("ngTemplateOutlet",(panel_r5.contentTpl==null?null:panel_r5.contentTpl.templateRef)||null);}}const _c0=function(a0,a1){return {$implicit:a0,opened:a1};};function NgbAccordion_ng_template_2_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div")(1,"div",5);i0.ɵɵtemplate(2,NgbAccordion_ng_template_2_ng_template_2_Template,0,0,"ng-template",6);i0.ɵɵelementEnd();i0.ɵɵtemplate(3,NgbAccordion_ng_template_2_div_3_Template,3,3,"div",7);i0.ɵɵelementEnd();}if(rf&2){const panel_r5=ctx.$implicit;const ctx_r2=i0.ɵɵnextContext();const _r0=i0.ɵɵreference(1);i0.ɵɵclassMap("accordion-item "+(panel_r5.cardClass||""));i0.ɵɵadvance(1);i0.ɵɵclassMap("accordion-header "+(panel_r5.type?"bg-"+panel_r5.type:ctx_r2.type?"bg-"+ctx_r2.type:""));i0.ɵɵpropertyInterpolate1("id","",panel_r5.id,"-header");i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(panel_r5.headerTpl==null?null:panel_r5.headerTpl.templateRef)||_r0)("ngTemplateOutletContext",i0.ɵɵpureFunction2(8,_c0,panel_r5,panel_r5.isOpen));i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",!ctx_r2.destroyOnHide||panel_r5.isOpen||panel_r5.transitionRunning);}}function NgbAlert_button_1_Template(rf,ctx){if(rf&1){const _r2=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",1);i0.ɵɵlistener("click",function NgbAlert_button_1_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r2);const ctx_r1=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r1.close());});i0.ɵɵelementEnd();}}const _c3=["*"];function NgbCarousel_button_1_Template(rf,ctx){if(rf&1){const _r6=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",6);i0.ɵɵlistener("click",function NgbCarousel_button_1_Template_button_click_0_listener(){const restoredCtx=i0.ɵɵrestoreView(_r6);const slide_r4=restoredCtx.$implicit;const ctx_r5=i0.ɵɵnextContext();ctx_r5.focus();return i0.ɵɵresetView(ctx_r5.select(slide_r4.id,ctx_r5.NgbSlideEventSource.INDICATOR));});i0.ɵɵelementEnd();}if(rf&2){const slide_r4=ctx.$implicit;const ctx_r0=i0.ɵɵnextContext();i0.ɵɵclassProp("active",slide_r4.id===ctx_r0.activeId);i0.ɵɵattribute("aria-labelledby","slide-"+slide_r4.id)("aria-controls","slide-"+slide_r4.id)("aria-selected",slide_r4.id===ctx_r0.activeId);}}function NgbCarousel_div_3_ng_template_3_Template(rf,ctx){}function NgbCarousel_div_3_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",7)(1,"span",8);i0.ɵɵi18n(2,9);i0.ɵɵelementEnd();i0.ɵɵtemplate(3,NgbCarousel_div_3_ng_template_3_Template,0,0,"ng-template",10);i0.ɵɵelementEnd();}if(rf&2){const slide_r7=ctx.$implicit;const i_r8=ctx.index;const c_r9=ctx.count;i0.ɵɵproperty("id","slide-"+slide_r7.id);i0.ɵɵadvance(2);i0.ɵɵi18nExp(i_r8+1)(c_r9);i0.ɵɵi18nApply(2);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",slide_r7.tplRef);}}function NgbCarousel_button_4_Template(rf,ctx){if(rf&1){const _r12=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",11);i0.ɵɵlistener("click",function NgbCarousel_button_4_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r12);const ctx_r11=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r11.arrowLeft());});i0.ɵɵelement(1,"span",12);i0.ɵɵelementStart(2,"span",8);i0.ɵɵi18n(3,13);i0.ɵɵelementEnd()();}}function NgbCarousel_button_5_Template(rf,ctx){if(rf&1){const _r14=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",14);i0.ɵɵlistener("click",function NgbCarousel_button_5_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r14);const ctx_r13=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r13.arrowRight());});i0.ɵɵelement(1,"span",15);i0.ɵɵelementStart(2,"span",8);i0.ɵɵi18n(3,16);i0.ɵɵelementEnd()();}}const _c10=["ngbDatepickerDayView",""];const _c11=["month"];const _c12=["year"];function NgbDatepickerNavigationSelect_option_2_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"option",5);i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const m_r4=ctx.$implicit;const ctx_r1=i0.ɵɵnextContext();i0.ɵɵproperty("value",m_r4);i0.ɵɵattribute("aria-label",ctx_r1.i18n.getMonthFullName(m_r4,ctx_r1.date.year));i0.ɵɵadvance(1);i0.ɵɵtextInterpolate(ctx_r1.i18n.getMonthShortName(m_r4,ctx_r1.date.year));}}function NgbDatepickerNavigationSelect_option_5_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"option",5);i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const y_r5=ctx.$implicit;const ctx_r3=i0.ɵɵnextContext();i0.ɵɵproperty("value",y_r5);i0.ɵɵadvance(1);i0.ɵɵtextInterpolate(ctx_r3.i18n.getYearNumerals(y_r5));}}function NgbDatepickerNavigation_ngb_datepicker_navigation_select_3_Template(rf,ctx){if(rf&1){const _r3=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"ngb-datepicker-navigation-select",7);i0.ɵɵlistener("select",function NgbDatepickerNavigation_ngb_datepicker_navigation_select_3_Template_ngb_datepicker_navigation_select_select_0_listener($event){i0.ɵɵrestoreView(_r3);const ctx_r2=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r2.select.emit($event));});i0.ɵɵelementEnd();}if(rf&2){const ctx_r0=i0.ɵɵnextContext();i0.ɵɵproperty("date",ctx_r0.date)("disabled",ctx_r0.disabled)("months",ctx_r0.selectBoxes.months)("years",ctx_r0.selectBoxes.years);}}function NgbDatepickerNavigation_4_ng_template_0_div_0_Template(rf,ctx){if(rf&1){i0.ɵɵelement(0,"div",11);}}function NgbDatepickerNavigation_4_ng_template_0_div_3_Template(rf,ctx){if(rf&1){i0.ɵɵelement(0,"div",11);}}function NgbDatepickerNavigation_4_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbDatepickerNavigation_4_ng_template_0_div_0_Template,1,0,"div",9);i0.ɵɵelementStart(1,"div",10);i0.ɵɵtext(2);i0.ɵɵelementEnd();i0.ɵɵtemplate(3,NgbDatepickerNavigation_4_ng_template_0_div_3_Template,1,0,"div",9);}if(rf&2){const month_r5=ctx.$implicit;const i_r6=ctx.index;const ctx_r4=i0.ɵɵnextContext(2);i0.ɵɵproperty("ngIf",i_r6>0);i0.ɵɵadvance(2);i0.ɵɵtextInterpolate1(" ",ctx_r4.i18n.getMonthLabel(month_r5.firstDate)," ");i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",i_r6!==ctx_r4.months.length-1);}}function NgbDatepickerNavigation_4_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbDatepickerNavigation_4_ng_template_0_Template,4,3,"ng-template",8);}if(rf&2){const ctx_r1=i0.ɵɵnextContext();i0.ɵɵproperty("ngForOf",ctx_r1.months);}}function NgbDatepickerMonth_div_0_div_1_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",5);i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const ctx_r2=i0.ɵɵnextContext(2);i0.ɵɵadvance(1);i0.ɵɵtextInterpolate(ctx_r2.i18n.getWeekLabel());}}function NgbDatepickerMonth_div_0_div_2_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",6);i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const weekday_r4=ctx.$implicit;i0.ɵɵadvance(1);i0.ɵɵtextInterpolate(weekday_r4);}}function NgbDatepickerMonth_div_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",2);i0.ɵɵtemplate(1,NgbDatepickerMonth_div_0_div_1_Template,2,1,"div",3);i0.ɵɵtemplate(2,NgbDatepickerMonth_div_0_div_2_Template,2,1,"div",4);i0.ɵɵelementEnd();}if(rf&2){const ctx_r0=i0.ɵɵnextContext();i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx_r0.datepicker.showWeekNumbers);i0.ɵɵadvance(1);i0.ɵɵproperty("ngForOf",ctx_r0.viewModel.weekdays);}}function NgbDatepickerMonth_ng_template_1_div_0_div_1_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",11);i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const week_r5=i0.ɵɵnextContext(2).$implicit;const ctx_r7=i0.ɵɵnextContext();i0.ɵɵadvance(1);i0.ɵɵtextInterpolate(ctx_r7.i18n.getWeekNumerals(week_r5.number));}}function NgbDatepickerMonth_ng_template_1_div_0_div_2_ng_template_1_ng_template_0_Template(rf,ctx){}function NgbDatepickerMonth_ng_template_1_div_0_div_2_ng_template_1_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbDatepickerMonth_ng_template_1_div_0_div_2_ng_template_1_ng_template_0_Template,0,0,"ng-template",14);}if(rf&2){const day_r10=i0.ɵɵnextContext().$implicit;const ctx_r11=i0.ɵɵnextContext(3);i0.ɵɵproperty("ngTemplateOutlet",ctx_r11.datepicker.dayTemplate)("ngTemplateOutletContext",day_r10.context);}}function NgbDatepickerMonth_ng_template_1_div_0_div_2_Template(rf,ctx){if(rf&1){const _r15=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"div",12);i0.ɵɵlistener("click",function NgbDatepickerMonth_ng_template_1_div_0_div_2_Template_div_click_0_listener($event){const restoredCtx=i0.ɵɵrestoreView(_r15);const day_r10=restoredCtx.$implicit;const ctx_r14=i0.ɵɵnextContext(3);ctx_r14.doSelect(day_r10);return i0.ɵɵresetView($event.preventDefault());});i0.ɵɵtemplate(1,NgbDatepickerMonth_ng_template_1_div_0_div_2_ng_template_1_Template,1,2,"ng-template",13);i0.ɵɵelementEnd();}if(rf&2){const day_r10=ctx.$implicit;i0.ɵɵclassProp("disabled",day_r10.context.disabled)("hidden",day_r10.hidden)("ngb-dp-today",day_r10.context.today);i0.ɵɵproperty("tabindex",day_r10.tabindex);i0.ɵɵattribute("aria-label",day_r10.ariaLabel);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",!day_r10.hidden);}}function NgbDatepickerMonth_ng_template_1_div_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",8);i0.ɵɵtemplate(1,NgbDatepickerMonth_ng_template_1_div_0_div_1_Template,2,1,"div",9);i0.ɵɵtemplate(2,NgbDatepickerMonth_ng_template_1_div_0_div_2_Template,2,9,"div",10);i0.ɵɵelementEnd();}if(rf&2){const week_r5=i0.ɵɵnextContext().$implicit;const ctx_r6=i0.ɵɵnextContext();i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx_r6.datepicker.showWeekNumbers);i0.ɵɵadvance(1);i0.ɵɵproperty("ngForOf",week_r5.days);}}function NgbDatepickerMonth_ng_template_1_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbDatepickerMonth_ng_template_1_div_0_Template,3,2,"div",7);}if(rf&2){const week_r5=ctx.$implicit;i0.ɵɵproperty("ngIf",!week_r5.collapsed);}}const _c29=["defaultDayTemplate"];const _c30=["content"];function NgbDatepicker_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵelement(0,"div",8);}if(rf&2){const date_r8=ctx.date;const currentMonth_r9=ctx.currentMonth;const selected_r10=ctx.selected;const disabled_r11=ctx.disabled;const focused_r12=ctx.focused;i0.ɵɵproperty("date",date_r8)("currentMonth",currentMonth_r9)("selected",selected_r10)("disabled",disabled_r11)("focused",focused_r12);}}function NgbDatepicker_ng_template_2_div_0_div_1_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",13);i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const month_r14=i0.ɵɵnextContext().$implicit;const ctx_r16=i0.ɵɵnextContext(2);i0.ɵɵadvance(1);i0.ɵɵtextInterpolate1(" ",ctx_r16.i18n.getMonthLabel(month_r14.firstDate)," ");}}function NgbDatepicker_ng_template_2_div_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",10);i0.ɵɵtemplate(1,NgbDatepicker_ng_template_2_div_0_div_1_Template,2,1,"div",11);i0.ɵɵelement(2,"ngb-datepicker-month",12);i0.ɵɵelementEnd();}if(rf&2){const month_r14=ctx.$implicit;const ctx_r13=i0.ɵɵnextContext(2);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx_r13.navigation==="none"||ctx_r13.displayMonths>1&&ctx_r13.navigation==="select");i0.ɵɵadvance(1);i0.ɵɵproperty("month",month_r14.firstDate);}}function NgbDatepicker_ng_template_2_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbDatepicker_ng_template_2_div_0_Template,3,2,"div",9);}if(rf&2){const ctx_r3=i0.ɵɵnextContext();i0.ɵɵproperty("ngForOf",ctx_r3.model.months);}}function NgbDatepicker_ngb_datepicker_navigation_5_Template(rf,ctx){if(rf&1){const _r19=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"ngb-datepicker-navigation",14);i0.ɵɵlistener("navigate",function NgbDatepicker_ngb_datepicker_navigation_5_Template_ngb_datepicker_navigation_navigate_0_listener($event){i0.ɵɵrestoreView(_r19);const ctx_r18=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r18.onNavigateEvent($event));})("select",function NgbDatepicker_ngb_datepicker_navigation_5_Template_ngb_datepicker_navigation_select_0_listener($event){i0.ɵɵrestoreView(_r19);const ctx_r20=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r20.onNavigateDateSelect($event));});i0.ɵɵelementEnd();}if(rf&2){const ctx_r4=i0.ɵɵnextContext();i0.ɵɵproperty("date",ctx_r4.model.firstDate)("months",ctx_r4.model.months)("disabled",ctx_r4.model.disabled)("showSelect",ctx_r4.model.navigation==="select")("prevDisabled",ctx_r4.model.prevDisabled)("nextDisabled",ctx_r4.model.nextDisabled)("selectBoxes",ctx_r4.model.selectBoxes);}}function NgbDatepicker_ng_template_8_Template(rf,ctx){}function NgbDatepicker_ng_template_9_Template(rf,ctx){}const _c31=function(a0){return {$implicit:a0};};const _c32=["dialog"];const _c33=["ngbNavOutlet",""];function NgbNavOutlet_ng_template_0_div_0_ng_template_1_Template(rf,ctx){}function NgbNavOutlet_ng_template_0_div_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",2);i0.ɵɵtemplate(1,NgbNavOutlet_ng_template_0_div_0_ng_template_1_Template,0,0,"ng-template",3);i0.ɵɵelementEnd();}if(rf&2){const item_r1=i0.ɵɵnextContext().$implicit;const ctx_r2=i0.ɵɵnextContext();i0.ɵɵproperty("item",item_r1)("nav",ctx_r2.nav)("role",ctx_r2.paneRole);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(item_r1.contentTpl==null?null:item_r1.contentTpl.templateRef)||null)("ngTemplateOutletContext",i0.ɵɵpureFunction1(5,_c31,item_r1.active||ctx_r2.isPanelTransitioning(item_r1)));}}function NgbNavOutlet_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbNavOutlet_ng_template_0_div_0_Template,2,7,"div",1);}if(rf&2){const item_r1=ctx.$implicit;const ctx_r0=i0.ɵɵnextContext();i0.ɵɵproperty("ngIf",item_r1.isPanelInDom()||ctx_r0.isPanelTransitioning(item_r1));}}function NgbPagination_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"span",9);i0.ɵɵi18n(1,10);i0.ɵɵelementEnd();}}function NgbPagination_ng_template_2_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"span",9);i0.ɵɵi18n(1,11);i0.ɵɵelementEnd();}}function NgbPagination_ng_template_4_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"span",9);i0.ɵɵi18n(1,12);i0.ɵɵelementEnd();}}function NgbPagination_ng_template_6_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"span",9);i0.ɵɵi18n(1,13);i0.ɵɵelementEnd();}}function NgbPagination_ng_template_8_Template(rf,ctx){if(rf&1){i0.ɵɵtext(0,"...");}}function NgbPagination_ng_template_10_Template(rf,ctx){if(rf&1){i0.ɵɵtext(0);}if(rf&2){const page_r19=ctx.$implicit;i0.ɵɵtextInterpolate(page_r19);}}function NgbPagination_ng_template_12_li_0_a_1_ng_template_1_Template(rf,ctx){}const _c42=function(a1){return {disabled:true,currentPage:a1};};function NgbPagination_ng_template_12_li_0_a_1_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"a",18);i0.ɵɵtemplate(1,NgbPagination_ng_template_12_li_0_a_1_ng_template_1_Template,0,0,"ng-template",8);i0.ɵɵelementEnd();}if(rf&2){const page_r21=i0.ɵɵnextContext(2).$implicit;const ctx_r26=i0.ɵɵnextContext();const _r8=i0.ɵɵreference(9);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(ctx_r26.tplEllipsis==null?null:ctx_r26.tplEllipsis.templateRef)||_r8)("ngTemplateOutletContext",i0.ɵɵpureFunction1(2,_c42,page_r21));}}function NgbPagination_ng_template_12_li_0_a_2_ng_template_1_Template(rf,ctx){}const _c43=function(a0,a1,a2){return {disabled:a0,$implicit:a1,currentPage:a2};};function NgbPagination_ng_template_12_li_0_a_2_Template(rf,ctx){if(rf&1){const _r33=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"a",19);i0.ɵɵlistener("click",function NgbPagination_ng_template_12_li_0_a_2_Template_a_click_0_listener($event){i0.ɵɵrestoreView(_r33);const pageNumber_r25=i0.ɵɵnextContext().$implicit;const ctx_r31=i0.ɵɵnextContext(2);ctx_r31.selectPage(pageNumber_r25);return i0.ɵɵresetView($event.preventDefault());});i0.ɵɵtemplate(1,NgbPagination_ng_template_12_li_0_a_2_ng_template_1_Template,0,0,"ng-template",8);i0.ɵɵelementEnd();}if(rf&2){const pageNumber_r25=i0.ɵɵnextContext().$implicit;const ctx_r34=i0.ɵɵnextContext();const disabled_r23=ctx_r34.disabled;const page_r21=ctx_r34.$implicit;const ctx_r27=i0.ɵɵnextContext();const _r10=i0.ɵɵreference(11);i0.ɵɵattribute("tabindex",disabled_r23?"-1":null)("aria-disabled",disabled_r23?"true":null);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(ctx_r27.tplNumber==null?null:ctx_r27.tplNumber.templateRef)||_r10)("ngTemplateOutletContext",i0.ɵɵpureFunction3(4,_c43,disabled_r23,pageNumber_r25,page_r21));}}function NgbPagination_ng_template_12_li_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"li",15);i0.ɵɵtemplate(1,NgbPagination_ng_template_12_li_0_a_1_Template,2,4,"a",16);i0.ɵɵtemplate(2,NgbPagination_ng_template_12_li_0_a_2_Template,2,8,"a",17);i0.ɵɵelementEnd();}if(rf&2){const pageNumber_r25=ctx.$implicit;const ctx_r36=i0.ɵɵnextContext();const page_r21=ctx_r36.$implicit;const disabled_r23=ctx_r36.disabled;const ctx_r24=i0.ɵɵnextContext();i0.ɵɵclassProp("active",pageNumber_r25===page_r21)("disabled",ctx_r24.isEllipsis(pageNumber_r25)||disabled_r23);i0.ɵɵattribute("aria-current",pageNumber_r25===page_r21?"page":null);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx_r24.isEllipsis(pageNumber_r25));i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",!ctx_r24.isEllipsis(pageNumber_r25));}}function NgbPagination_ng_template_12_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbPagination_ng_template_12_li_0_Template,3,7,"li",14);}if(rf&2){const pages_r22=ctx.pages;i0.ɵɵproperty("ngForOf",pages_r22);}}function NgbPagination_li_15_ng_template_2_Template(rf,ctx){}const _c46=function(a0,a1){return {disabled:a0,currentPage:a1};};function NgbPagination_li_15_Template(rf,ctx){if(rf&1){const _r39=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"li",15)(1,"a",20);i0.ɵɵlistener("click",function NgbPagination_li_15_Template_a_click_1_listener($event){i0.ɵɵrestoreView(_r39);const ctx_r38=i0.ɵɵnextContext();ctx_r38.selectPage(1);return i0.ɵɵresetView($event.preventDefault());});i0.ɵɵtemplate(2,NgbPagination_li_15_ng_template_2_Template,0,0,"ng-template",8);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r14=i0.ɵɵnextContext();const _r0=i0.ɵɵreference(1);i0.ɵɵclassProp("disabled",ctx_r14.previousDisabled());i0.ɵɵadvance(1);i0.ɵɵattribute("tabindex",ctx_r14.previousDisabled()?"-1":null)("aria-disabled",ctx_r14.previousDisabled()?"true":null);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(ctx_r14.tplFirst==null?null:ctx_r14.tplFirst.templateRef)||_r0)("ngTemplateOutletContext",i0.ɵɵpureFunction2(6,_c46,ctx_r14.previousDisabled(),ctx_r14.page));}}function NgbPagination_li_16_ng_template_2_Template(rf,ctx){}const _c49=function(a0){return {disabled:a0};};function NgbPagination_li_16_Template(rf,ctx){if(rf&1){const _r42=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"li",15)(1,"a",21);i0.ɵɵlistener("click",function NgbPagination_li_16_Template_a_click_1_listener($event){i0.ɵɵrestoreView(_r42);const ctx_r41=i0.ɵɵnextContext();ctx_r41.selectPage(ctx_r41.page-1);return i0.ɵɵresetView($event.preventDefault());});i0.ɵɵtemplate(2,NgbPagination_li_16_ng_template_2_Template,0,0,"ng-template",8);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r15=i0.ɵɵnextContext();const _r2=i0.ɵɵreference(3);i0.ɵɵclassProp("disabled",ctx_r15.previousDisabled());i0.ɵɵadvance(1);i0.ɵɵattribute("tabindex",ctx_r15.previousDisabled()?"-1":null)("aria-disabled",ctx_r15.previousDisabled()?"true":null);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(ctx_r15.tplPrevious==null?null:ctx_r15.tplPrevious.templateRef)||_r2)("ngTemplateOutletContext",i0.ɵɵpureFunction1(6,_c49,ctx_r15.previousDisabled()));}}function NgbPagination_ng_template_17_Template(rf,ctx){}function NgbPagination_li_18_ng_template_2_Template(rf,ctx){}function NgbPagination_li_18_Template(rf,ctx){if(rf&1){const _r45=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"li",15)(1,"a",22);i0.ɵɵlistener("click",function NgbPagination_li_18_Template_a_click_1_listener($event){i0.ɵɵrestoreView(_r45);const ctx_r44=i0.ɵɵnextContext();ctx_r44.selectPage(ctx_r44.page+1);return i0.ɵɵresetView($event.preventDefault());});i0.ɵɵtemplate(2,NgbPagination_li_18_ng_template_2_Template,0,0,"ng-template",8);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r17=i0.ɵɵnextContext();const _r4=i0.ɵɵreference(5);i0.ɵɵclassProp("disabled",ctx_r17.nextDisabled());i0.ɵɵadvance(1);i0.ɵɵattribute("tabindex",ctx_r17.nextDisabled()?"-1":null)("aria-disabled",ctx_r17.nextDisabled()?"true":null);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(ctx_r17.tplNext==null?null:ctx_r17.tplNext.templateRef)||_r4)("ngTemplateOutletContext",i0.ɵɵpureFunction2(6,_c46,ctx_r17.nextDisabled(),ctx_r17.page));}}function NgbPagination_li_19_ng_template_2_Template(rf,ctx){}function NgbPagination_li_19_Template(rf,ctx){if(rf&1){const _r48=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"li",15)(1,"a",23);i0.ɵɵlistener("click",function NgbPagination_li_19_Template_a_click_1_listener($event){i0.ɵɵrestoreView(_r48);const ctx_r47=i0.ɵɵnextContext();ctx_r47.selectPage(ctx_r47.pageCount);return i0.ɵɵresetView($event.preventDefault());});i0.ɵɵtemplate(2,NgbPagination_li_19_ng_template_2_Template,0,0,"ng-template",8);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r18=i0.ɵɵnextContext();const _r6=i0.ɵɵreference(7);i0.ɵɵclassProp("disabled",ctx_r18.nextDisabled());i0.ɵɵadvance(1);i0.ɵɵattribute("tabindex",ctx_r18.nextDisabled()?"-1":null)("aria-disabled",ctx_r18.nextDisabled()?"true":null);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(ctx_r18.tplLast==null?null:ctx_r18.tplLast.templateRef)||_r6)("ngTemplateOutletContext",i0.ɵɵpureFunction2(6,_c46,ctx_r18.nextDisabled(),ctx_r18.page));}}const _c54=function(a0,a1,a2){return {$implicit:a0,pages:a1,disabled:a2};};function NgbPopoverWindow_h3_1_ng_template_1_Template(rf,ctx){if(rf&1){i0.ɵɵtext(0);}if(rf&2){const ctx_r2=i0.ɵɵnextContext(2);i0.ɵɵtextInterpolate(ctx_r2.title);}}function NgbPopoverWindow_h3_1_ng_template_3_Template(rf,ctx){}function NgbPopoverWindow_h3_1_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"h3",3);i0.ɵɵtemplate(1,NgbPopoverWindow_h3_1_ng_template_1_Template,1,1,"ng-template",null,4,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(3,NgbPopoverWindow_h3_1_ng_template_3_Template,0,0,"ng-template",5);i0.ɵɵelementEnd();}if(rf&2){const _r1=i0.ɵɵreference(2);const ctx_r0=i0.ɵɵnextContext();i0.ɵɵadvance(3);i0.ɵɵproperty("ngTemplateOutlet",ctx_r0.isTitleTemplate()?ctx_r0.title:_r1)("ngTemplateOutletContext",ctx_r0.context);}}function NgbProgressbar_span_1_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"span");i0.ɵɵi18n(1,1);i0.ɵɵpipe(2,"percent");i0.ɵɵelementEnd();}if(rf&2){const ctx_r0=i0.ɵɵnextContext();i0.ɵɵadvance(2);i0.ɵɵi18nExp(i0.ɵɵpipeBind1(2,1,ctx_r0.getValue()/ctx_r0.max));i0.ɵɵi18nApply(1);}}function NgbRating_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵtext(0);}if(rf&2){const fill_r3=ctx.fill;i0.ɵɵtextInterpolate(fill_r3===100?"\u2605":"\u2606");}}function NgbRating_ng_template_2_ng_template_3_Template(rf,ctx){}function NgbRating_ng_template_2_Template(rf,ctx){if(rf&1){const _r7=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"span",2);i0.ɵɵtext(1);i0.ɵɵelementEnd();i0.ɵɵelementStart(2,"span",3);i0.ɵɵlistener("mouseenter",function NgbRating_ng_template_2_Template_span_mouseenter_2_listener(){const restoredCtx=i0.ɵɵrestoreView(_r7);const index_r4=restoredCtx.index;const ctx_r6=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r6.enter(index_r4+1));})("click",function NgbRating_ng_template_2_Template_span_click_2_listener(){const restoredCtx=i0.ɵɵrestoreView(_r7);const index_r4=restoredCtx.index;const ctx_r8=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r8.handleClick(index_r4+1));});i0.ɵɵtemplate(3,NgbRating_ng_template_2_ng_template_3_Template,0,0,"ng-template",4);i0.ɵɵelementEnd();}if(rf&2){const index_r4=ctx.index;const ctx_r2=i0.ɵɵnextContext();const _r0=i0.ɵɵreference(1);i0.ɵɵadvance(1);i0.ɵɵtextInterpolate1("(",index_r4<ctx_r2.nextRate?"*":" ",")");i0.ɵɵadvance(1);i0.ɵɵstyleProp("cursor",ctx_r2.isInteractive()?"pointer":"default");i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",ctx_r2.starTemplate||ctx_r2.starTemplateFromContent||_r0)("ngTemplateOutletContext",ctx_r2.contexts[index_r4]);}}function NgbTimepicker_button_3_Template(rf,ctx){if(rf&1){const _r9=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",11);i0.ɵɵlistener("click",function NgbTimepicker_button_3_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r9);const ctx_r8=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r8.changeHour(ctx_r8.hourStep));});i0.ɵɵelement(1,"span",12);i0.ɵɵelementStart(2,"span",13);i0.ɵɵi18n(3,14);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r0=i0.ɵɵnextContext();i0.ɵɵclassProp("btn-sm",ctx_r0.isSmallSize)("btn-lg",ctx_r0.isLargeSize)("disabled",ctx_r0.disabled);i0.ɵɵproperty("disabled",ctx_r0.disabled);}}function NgbTimepicker_button_5_Template(rf,ctx){if(rf&1){const _r11=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",11);i0.ɵɵlistener("click",function NgbTimepicker_button_5_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r11);const ctx_r10=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r10.changeHour(-ctx_r10.hourStep));});i0.ɵɵelement(1,"span",15);i0.ɵɵelementStart(2,"span",13);i0.ɵɵi18n(3,16);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r1=i0.ɵɵnextContext();i0.ɵɵclassProp("btn-sm",ctx_r1.isSmallSize)("btn-lg",ctx_r1.isLargeSize)("disabled",ctx_r1.disabled);i0.ɵɵproperty("disabled",ctx_r1.disabled);}}function NgbTimepicker_button_9_Template(rf,ctx){if(rf&1){const _r13=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",11);i0.ɵɵlistener("click",function NgbTimepicker_button_9_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r13);const ctx_r12=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r12.changeMinute(ctx_r12.minuteStep));});i0.ɵɵelement(1,"span",12);i0.ɵɵelementStart(2,"span",13);i0.ɵɵi18n(3,17);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r2=i0.ɵɵnextContext();i0.ɵɵclassProp("btn-sm",ctx_r2.isSmallSize)("btn-lg",ctx_r2.isLargeSize)("disabled",ctx_r2.disabled);i0.ɵɵproperty("disabled",ctx_r2.disabled);}}function NgbTimepicker_button_11_Template(rf,ctx){if(rf&1){const _r15=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",11);i0.ɵɵlistener("click",function NgbTimepicker_button_11_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r15);const ctx_r14=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r14.changeMinute(-ctx_r14.minuteStep));});i0.ɵɵelement(1,"span",15);i0.ɵɵelementStart(2,"span",13);i0.ɵɵi18n(3,18);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r3=i0.ɵɵnextContext();i0.ɵɵclassProp("btn-sm",ctx_r3.isSmallSize)("btn-lg",ctx_r3.isLargeSize)("disabled",ctx_r3.disabled);i0.ɵɵproperty("disabled",ctx_r3.disabled);}}function NgbTimepicker_div_12_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",5);i0.ɵɵtext(1,":");i0.ɵɵelementEnd();}}function NgbTimepicker_div_13_button_1_Template(rf,ctx){if(rf&1){const _r19=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",11);i0.ɵɵlistener("click",function NgbTimepicker_div_13_button_1_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r19);const ctx_r18=i0.ɵɵnextContext(2);return i0.ɵɵresetView(ctx_r18.changeSecond(ctx_r18.secondStep));});i0.ɵɵelement(1,"span",12);i0.ɵɵelementStart(2,"span",13);i0.ɵɵi18n(3,21);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r16=i0.ɵɵnextContext(2);i0.ɵɵclassProp("btn-sm",ctx_r16.isSmallSize)("btn-lg",ctx_r16.isLargeSize)("disabled",ctx_r16.disabled);i0.ɵɵproperty("disabled",ctx_r16.disabled);}}function NgbTimepicker_div_13_button_3_Template(rf,ctx){if(rf&1){const _r21=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",11);i0.ɵɵlistener("click",function NgbTimepicker_div_13_button_3_Template_button_click_0_listener(){i0.ɵɵrestoreView(_r21);const ctx_r20=i0.ɵɵnextContext(2);return i0.ɵɵresetView(ctx_r20.changeSecond(-ctx_r20.secondStep));});i0.ɵɵelement(1,"span",15);i0.ɵɵelementStart(2,"span",13);i0.ɵɵi18n(3,22);i0.ɵɵelementEnd()();}if(rf&2){const ctx_r17=i0.ɵɵnextContext(2);i0.ɵɵclassProp("btn-sm",ctx_r17.isSmallSize)("btn-lg",ctx_r17.isLargeSize)("disabled",ctx_r17.disabled);i0.ɵɵproperty("disabled",ctx_r17.disabled);}}function NgbTimepicker_div_13_Template(rf,ctx){if(rf&1){const _r23=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"div",19);i0.ɵɵtemplate(1,NgbTimepicker_div_13_button_1_Template,4,7,"button",3);i0.ɵɵelementStart(2,"input",20);i0.ɵɵlistener("change",function NgbTimepicker_div_13_Template_input_change_2_listener($event){i0.ɵɵrestoreView(_r23);const ctx_r22=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r22.updateSecond($event.target.value));})("blur",function NgbTimepicker_div_13_Template_input_blur_2_listener(){i0.ɵɵrestoreView(_r23);const ctx_r24=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r24.handleBlur());})("input",function NgbTimepicker_div_13_Template_input_input_2_listener($event){i0.ɵɵrestoreView(_r23);const ctx_r25=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r25.formatInput($event.target));})("keydown.ArrowUp",function NgbTimepicker_div_13_Template_input_keydown_ArrowUp_2_listener($event){i0.ɵɵrestoreView(_r23);const ctx_r26=i0.ɵɵnextContext();ctx_r26.changeSecond(ctx_r26.secondStep);return i0.ɵɵresetView($event.preventDefault());})("keydown.ArrowDown",function NgbTimepicker_div_13_Template_input_keydown_ArrowDown_2_listener($event){i0.ɵɵrestoreView(_r23);const ctx_r27=i0.ɵɵnextContext();ctx_r27.changeSecond(-ctx_r27.secondStep);return i0.ɵɵresetView($event.preventDefault());});i0.ɵɵelementEnd();i0.ɵɵtemplate(3,NgbTimepicker_div_13_button_3_Template,4,7,"button",3);i0.ɵɵelementEnd();}if(rf&2){const ctx_r5=i0.ɵɵnextContext();i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx_r5.spinners);i0.ɵɵadvance(1);i0.ɵɵclassProp("form-control-sm",ctx_r5.isSmallSize)("form-control-lg",ctx_r5.isLargeSize);i0.ɵɵproperty("value",ctx_r5.formatMinSec(ctx_r5.model==null?null:ctx_r5.model.second))("readOnly",ctx_r5.readonlyInputs)("disabled",ctx_r5.disabled);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx_r5.spinners);}}function NgbTimepicker_div_14_Template(rf,ctx){if(rf&1){i0.ɵɵelement(0,"div",5);}}function NgbTimepicker_div_15_ng_container_2_Template(rf,ctx){if(rf&1){i0.ɵɵelementContainerStart(0);i0.ɵɵi18n(1,27);i0.ɵɵelementContainerEnd();}if(rf&2){const ctx_r28=i0.ɵɵnextContext(2);i0.ɵɵadvance(1);i0.ɵɵi18nExp(ctx_r28.i18n.getAfternoonPeriod());i0.ɵɵi18nApply(1);}}function NgbTimepicker_div_15_ng_template_3_Template(rf,ctx){if(rf&1){i0.ɵɵi18n(0,28);}if(rf&2){const ctx_r30=i0.ɵɵnextContext(2);i0.ɵɵi18nExp(ctx_r30.i18n.getMorningPeriod());i0.ɵɵi18nApply(0);}}function NgbTimepicker_div_15_Template(rf,ctx){if(rf&1){const _r32=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"div",23)(1,"button",24);i0.ɵɵlistener("click",function NgbTimepicker_div_15_Template_button_click_1_listener(){i0.ɵɵrestoreView(_r32);const ctx_r31=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r31.toggleMeridian());});i0.ɵɵtemplate(2,NgbTimepicker_div_15_ng_container_2_Template,2,1,"ng-container",25);i0.ɵɵtemplate(3,NgbTimepicker_div_15_ng_template_3_Template,1,1,"ng-template",null,26,i0.ɵɵtemplateRefExtractor);i0.ɵɵelementEnd()();}if(rf&2){const _r29=i0.ɵɵreference(4);const ctx_r7=i0.ɵɵnextContext();i0.ɵɵadvance(1);i0.ɵɵclassProp("btn-sm",ctx_r7.isSmallSize)("btn-lg",ctx_r7.isLargeSize)("disabled",ctx_r7.disabled);i0.ɵɵproperty("disabled",ctx_r7.disabled);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx_r7.model&&ctx_r7.model.hour>=12)("ngIfElse",_r29);}}function NgbToast_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"strong",3);i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const ctx_r1=i0.ɵɵnextContext();i0.ɵɵadvance(1);i0.ɵɵtextInterpolate(ctx_r1.header);}}function NgbToast_ng_template_2_ng_template_1_Template(rf,ctx){}function NgbToast_ng_template_2_Template(rf,ctx){if(rf&1){const _r5=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"div",4);i0.ɵɵtemplate(1,NgbToast_ng_template_2_ng_template_1_Template,0,0,"ng-template",5);i0.ɵɵelementStart(2,"button",6);i0.ɵɵlistener("click",function NgbToast_ng_template_2_Template_button_click_2_listener(){i0.ɵɵrestoreView(_r5);const ctx_r4=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r4.hide());});i0.ɵɵelementEnd()();}if(rf&2){const ctx_r2=i0.ɵɵnextContext();const _r0=i0.ɵɵreference(1);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",ctx_r2.contentHeaderTpl||_r0);}}function NgbHighlight_ng_template_0_span_0_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"span");i0.ɵɵtext(1);i0.ɵɵelementEnd();}if(rf&2){const part_r1=i0.ɵɵnextContext().$implicit;const ctx_r3=i0.ɵɵnextContext();i0.ɵɵclassMap(ctx_r3.highlightClass);i0.ɵɵadvance(1);i0.ɵɵtextInterpolate(part_r1);}}function NgbHighlight_ng_template_0_ng_template_1_Template(rf,ctx){if(rf&1){i0.ɵɵtext(0);}if(rf&2){const part_r1=i0.ɵɵnextContext().$implicit;i0.ɵɵtextInterpolate(part_r1);}}function NgbHighlight_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbHighlight_ng_template_0_span_0_Template,2,3,"span",1);i0.ɵɵtemplate(1,NgbHighlight_ng_template_0_ng_template_1_Template,1,1,"ng-template",null,2,i0.ɵɵtemplateRefExtractor);}if(rf&2){const isOdd_r2=ctx.odd;const _r4=i0.ɵɵreference(2);i0.ɵɵproperty("ngIf",isOdd_r2)("ngIfElse",_r4);}}function NgbTypeaheadWindow_ng_template_0_Template(rf,ctx){if(rf&1){i0.ɵɵelement(0,"ngb-highlight",2);}if(rf&2){const result_r3=ctx.result;const term_r4=ctx.term;const formatter_r5=ctx.formatter;i0.ɵɵproperty("result",formatter_r5(result_r3))("term",term_r4);}}function NgbTypeaheadWindow_ng_template_2_ng_template_1_Template(rf,ctx){}const _c87=function(a0,a1,a2){return {result:a0,term:a1,formatter:a2};};function NgbTypeaheadWindow_ng_template_2_Template(rf,ctx){if(rf&1){const _r10=i0.ɵɵgetCurrentView();i0.ɵɵelementStart(0,"button",3);i0.ɵɵlistener("mouseenter",function NgbTypeaheadWindow_ng_template_2_Template_button_mouseenter_0_listener(){const restoredCtx=i0.ɵɵrestoreView(_r10);const idx_r7=restoredCtx.index;const ctx_r9=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r9.markActive(idx_r7));})("click",function NgbTypeaheadWindow_ng_template_2_Template_button_click_0_listener(){const restoredCtx=i0.ɵɵrestoreView(_r10);const result_r6=restoredCtx.$implicit;const ctx_r11=i0.ɵɵnextContext();return i0.ɵɵresetView(ctx_r11.select(result_r6));});i0.ɵɵtemplate(1,NgbTypeaheadWindow_ng_template_2_ng_template_1_Template,0,0,"ng-template",4);i0.ɵɵelementEnd();}if(rf&2){const result_r6=ctx.$implicit;const idx_r7=ctx.index;const ctx_r2=i0.ɵɵnextContext();const _r0=i0.ɵɵreference(1);i0.ɵɵclassProp("active",idx_r7===ctx_r2.activeIdx);i0.ɵɵproperty("id",ctx_r2.id+"-"+idx_r7);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",ctx_r2.resultTemplate||_r0)("ngTemplateOutletContext",i0.ɵɵpureFunction3(5,_c87,result_r6,ctx_r2.term,ctx_r2.formatter));}}function toInteger(value){return parseInt(`${value}`,10);}function toString(value){return value!==undefined&&value!==null?`${value}`:'';}function getValueInRange(value,max,min=0){return Math.max(Math.min(value,max),min);}function isString(value){return typeof value==='string';}function isNumber(value){return !isNaN(toInteger(value));}function isInteger(value){return typeof value==='number'&&isFinite(value)&&Math.floor(value)===value;}function isDefined(value){return value!==undefined&&value!==null;}function isPromise(v){return v&&v.then;}function padNumber(value){if(isNumber(value)){return `0${value}`.slice(-2);}else {return '';}}function regExpEscape(text){return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,'\\$&');}function closest(element,selector){if(!selector){return null;}/*
                 * In certain browsers (e.g. Edge 44.18362.449.0) HTMLDocument does
                 * not support `Element.prototype.closest`. To emulate the correct behaviour
                 * we return null when the method is missing.
                 *
                 * Note that in evergreen browsers `closest(document.documentElement, 'html')`
                 * will return the document element whilst in Edge null will be returned. This
                 * compromise was deemed good enough.
                 */if(typeof element.closest==='undefined'){return null;}return element.closest(selector);}/**
             * Force a browser reflow
             * @param element element where to apply the reflow
             */function reflow(element){return (element||document.body).getBoundingClientRect();}/**
             * Creates an observable where all callbacks are executed inside a given zone
             *
             * @param zone
             */function runInZone(zone){return source=>{return new Observable(observer=>{const next=value=>zone.run(()=>observer.next(value));const error=e=>zone.run(()=>observer.error(e));const complete=()=>zone.run(()=>observer.complete());return source.subscribe({next,error,complete});});};}function removeAccents(str){return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}/**
             * Returns the active element in the given root.
             * If the active element is inside a shadow root, it is searched recursively.
             */function getActiveElement(root=document){const activeEl=root?.activeElement;if(!activeEl){return null;}return activeEl.shadowRoot?getActiveElement(activeEl.shadowRoot):activeEl;}function getTransitionDurationMs(element){const{transitionDelay,transitionDuration}=window.getComputedStyle(element);const transitionDelaySec=parseFloat(transitionDelay);const transitionDurationSec=parseFloat(transitionDuration);return (transitionDelaySec+transitionDurationSec)*1000;}const environment={animation:true,transitionTimerDelayMs:5};const noopFn=()=>{};const{transitionTimerDelayMs}=environment;const runningTransitions=new Map();const ngbRunTransition=(zone,element,startFn,options)=>{// Getting initial context from options
            let context=options.context||{};// Checking if there are already running transitions on the given element.
            const running=runningTransitions.get(element);if(running){switch(options.runningTransition){// If there is one running and we want for it to 'continue' to run, we have to cancel the new one.
            // We're not emitting any values, but simply completing the observable (EMPTY).
            case'continue':return EMPTY;// If there is one running and we want for it to 'stop', we have to complete the running one.
            // We're simply completing the running one and not emitting any values and merging newly provided context
            // with the one coming from currently running transition.
            case'stop':zone.run(()=>running.transition$.complete());context=Object.assign(running.context,context);runningTransitions.delete(element);}}// Running the start function
            const endFn=startFn(element,options.animation,context)||noopFn;// If 'prefer-reduced-motion' is enabled, the 'transition' will be set to 'none'.
            // If animations are disabled, we have to emit a value and complete the observable
            // In this case we have to call the end function, but can finish immediately by emitting a value,
            // completing the observable and executing end functions synchronously.
            if(!options.animation||window.getComputedStyle(element).transitionProperty==='none'){zone.run(()=>endFn());return of(undefined).pipe(runInZone(zone));}// Starting a new transition
            const transition$=new Subject();const finishTransition$=new Subject();const stop$=transition$.pipe(endWith(true));runningTransitions.set(element,{transition$,complete:()=>{finishTransition$.next();finishTransition$.complete();},context});const transitionDurationMs=getTransitionDurationMs(element);// 1. We have to both listen for the 'transitionend' event and have a 'just-in-case' timer,
            // because 'transitionend' event might not be fired in some browsers, if the transitioning
            // element becomes invisible (ex. when scrolling, making browser tab inactive, etc.). The timer
            // guarantees, that we'll release the DOM element and complete 'ngbRunTransition'.
            // 2. We need to filter transition end events, because they might bubble from shorter transitions
            // on inner DOM elements. We're only interested in the transition on the 'element' itself.
            zone.runOutsideAngular(()=>{const transitionEnd$=fromEvent(element,'transitionend').pipe(takeUntil(stop$),filter(({target})=>target===element));const timer$=timer(transitionDurationMs+transitionTimerDelayMs).pipe(takeUntil(stop$));race(timer$,transitionEnd$,finishTransition$).pipe(takeUntil(stop$)).subscribe(()=>{runningTransitions.delete(element);zone.run(()=>{endFn();transition$.next();transition$.complete();});});});return transition$.asObservable();};const ngbCompleteTransition=element=>{runningTransitions.get(element)?.complete();};function measureCollapsingElementDimensionPx(element,dimension){// SSR fix for without injecting the PlatformId
            if(typeof navigator==='undefined'){return '0px';}const{classList}=element;const hasShownClass=classList.contains('show');if(!hasShownClass){classList.add('show');}element.style[dimension]='';const dimensionSize=element.getBoundingClientRect()[dimension]+'px';if(!hasShownClass){classList.remove('show');}return dimensionSize;}const ngbCollapsingTransition=(element,animation,context)=>{let{direction,maxSize,dimension}=context;const{classList}=element;function setInitialClasses(){classList.add('collapse');if(direction==='show'){classList.add('show');}else {classList.remove('show');}}// without animations we just need to set initial classes
            if(!animation){setInitialClasses();return;}// No maxHeight -> running the transition for the first time
            if(!maxSize){maxSize=measureCollapsingElementDimensionPx(element,dimension);context.maxSize=maxSize;// Fix the height before starting the animation
            element.style[dimension]=direction!=='show'?maxSize:'0px';classList.remove('collapse');classList.remove('collapsing');classList.remove('show');reflow(element);// Start the animation
            classList.add('collapsing');}// Start or revert the animation
            element.style[dimension]=direction==='show'?maxSize:'0px';return ()=>{setInitialClasses();classList.remove('collapsing');element.style[dimension]='';};};/**
             * Global ng-bootstrap config
             *
             * @since 8.0.0
             */class NgbConfig{constructor(){this.animation=environment.animation;}static{this.ɵfac=function NgbConfig_Factory(t){return new(t||NgbConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbConfig,factory:NgbConfig.ɵfac,providedIn:'root'});}} exports("NgbConfig", NgbConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();/**
             * A configuration service for the [`NgbAccordionDirective`](#/components/accordion/api#NgbAccordionDirective).
             *
             * You can inject this service, typically in your root component, and customize its properties
             * to provide default values for all accordions used in the application.
             */class NgbAccordionConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.closeOthers=false;this.destroyOnHide=true;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbAccordionConfig_Factory(t){return new(t||NgbAccordionConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbAccordionConfig,factory:NgbAccordionConfig.ɵfac,providedIn:'root'});}} exports("NgbAccordionConfig", NgbAccordionConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();/* eslint-disable deprecation/deprecation */let nextId$4=0;/**
             * A directive that wraps an accordion panel header with any HTML markup and a toggling button
             * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
             * See the [header customization demo](#/components/accordion/examples#header) for more details.
             *
             * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
             *
             * @since 4.1.0
             * @deprecated 14.1.0
             */class NgbPanelHeader{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPanelHeader_Factory(t){return new(t||NgbPanelHeader)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPanelHeader,selectors:[["ng-template","ngbPanelHeader",""]],standalone:true});}} exports("NgbPanelHeader", NgbPanelHeader);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPanelHeader,[{type:Directive,args:[{selector:'ng-template[ngbPanelHeader]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive that wraps only the panel title with HTML markup inside.
             *
             * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
             *
             * @deprecated 14.1.0
             */class NgbPanelTitle{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPanelTitle_Factory(t){return new(t||NgbPanelTitle)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPanelTitle,selectors:[["ng-template","ngbPanelTitle",""]],standalone:true});}} exports("NgbPanelTitle", NgbPanelTitle);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPanelTitle,[{type:Directive,args:[{selector:'ng-template[ngbPanelTitle]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive that wraps the accordion panel content.
             *
             * @deprecated 14.1.0
             */class NgbPanelContent{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPanelContent_Factory(t){return new(t||NgbPanelContent)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPanelContent,selectors:[["ng-template","ngbPanelContent",""]],standalone:true});}} exports("NgbPanelContent", NgbPanelContent);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPanelContent,[{type:Directive,args:[{selector:'ng-template[ngbPanelContent]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive that wraps an individual accordion panel with title and collapsible content.
             *
             * @deprecated 14.1.0
             */class NgbPanel{constructor(){/**
                     *  If `true`, the panel is disabled an can't be toggled.
                     */this.disabled=false;/**
                     *  An optional id for the panel that must be unique on the page.
                     *
                     *  If not provided, it will be auto-generated in the `ngb-panel-xxx` format.
                     */this.id=`ngb-panel-${nextId$4++}`;this.isOpen=false;/* A flag to specified that the transition panel classes have been initialized */this.initClassDone=false;/* A flag to specified if the panel is currently being animated, to ensure its presence in the dom */this.transitionRunning=false;/**
                     * An event emitted when the panel is shown, after the transition. It has no payload.
                     *
                     * @since 8.0.0
                     */this.shown=new EventEmitter();/**
                     * An event emitted when the panel is hidden, after the transition. It has no payload.
                     *
                     * @since 8.0.0
                     */this.hidden=new EventEmitter();}ngAfterContentChecked(){// We are using @ContentChildren instead of @ContentChild as in the Angular version being used
            // only @ContentChildren allows us to specify the {descendants: false} option.
            // Without {descendants: false} we are hitting bugs described in:
            // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
            this.titleTpl=this.titleTpls.first;this.headerTpl=this.headerTpls.first;this.contentTpl=this.contentTpls.first;}static{this.ɵfac=function NgbPanel_Factory(t){return new(t||NgbPanel)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPanel,selectors:[["ngb-panel"]],contentQueries:function NgbPanel_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbPanelTitle,4);i0.ɵɵcontentQuery(dirIndex,NgbPanelHeader,4);i0.ɵɵcontentQuery(dirIndex,NgbPanelContent,4);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.titleTpls=_t);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.headerTpls=_t);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.contentTpls=_t);}},inputs:{disabled:"disabled",id:"id",title:"title",type:"type",cardClass:"cardClass"},outputs:{shown:"shown",hidden:"hidden"},standalone:true});}} exports("NgbPanel", NgbPanel);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPanel,[{type:Directive,args:[{selector:'ngb-panel',standalone:true}]}],null,{disabled:[{type:Input}],id:[{type:Input}],title:[{type:Input}],type:[{type:Input}],cardClass:[{type:Input}],shown:[{type:Output}],hidden:[{type:Output}],titleTpls:[{type:ContentChildren,args:[NgbPanelTitle,{descendants:false}]}],headerTpls:[{type:ContentChildren,args:[NgbPanelHeader,{descendants:false}]}],contentTpls:[{type:ContentChildren,args:[NgbPanelContent,{descendants:false}]}]});})();class NgbRefDirective{constructor(_El){this._El=_El;this.ngbRef=new EventEmitter();}ngOnInit(){this.ngbRef.emit(this._El.nativeElement);}ngOnDestroy(){this.ngbRef.emit(null);}static{this.ɵfac=function NgbRefDirective_Factory(t){return new(t||NgbRefDirective)(i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbRefDirective,selectors:[["","ngbRef",""]],outputs:{ngbRef:"ngbRef"},standalone:true});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbRefDirective,[{type:Directive,args:[{selector:'[ngbRef]',standalone:true}]}],function(){return [{type:i0.ElementRef}];},{ngbRef:[{type:Output}]});})();/**
             * A directive to put on a button that toggles panel opening and closing.
             *
             * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
             *
             * @since 4.1.0
             * @deprecated 14.1.0
             */class NgbPanelToggle{set ngbPanelToggle(panel){if(panel){this.panel=panel;}}constructor(accordion,panel){this.accordion=accordion;this.panel=panel;}static{this.ɵfac=function NgbPanelToggle_Factory(t){return new(t||NgbPanelToggle)(i0.ɵɵdirectiveInject(forwardRef(()=>NgbAccordion)),i0.ɵɵdirectiveInject(NgbPanel,9));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPanelToggle,selectors:[["button","ngbPanelToggle",""]],hostAttrs:["type","button"],hostVars:5,hostBindings:function NgbPanelToggle_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("click",function NgbPanelToggle_click_HostBindingHandler(){return ctx.accordion.toggle(ctx.panel.id);});}if(rf&2){i0.ɵɵhostProperty("disabled",ctx.panel.disabled);i0.ɵɵattribute("aria-expanded",ctx.panel.isOpen)("aria-controls",ctx.panel.id);i0.ɵɵclassProp("collapsed",!ctx.panel.isOpen);}},inputs:{ngbPanelToggle:"ngbPanelToggle"},standalone:true});}} exports("NgbPanelToggle", NgbPanelToggle);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPanelToggle,[{type:Directive,args:[{selector:'button[ngbPanelToggle]',standalone:true,host:{type:'button','[disabled]':'panel.disabled','[class.collapsed]':'!panel.isOpen','[attr.aria-expanded]':'panel.isOpen','[attr.aria-controls]':'panel.id','(click)':'accordion.toggle(panel.id)'}}]}],function(){return [{type:NgbAccordion,decorators:[{type:Inject,args:[forwardRef(()=>NgbAccordion)]}]},{type:NgbPanel,decorators:[{type:Optional},{type:Host}]}];},{ngbPanelToggle:[{type:Input}]});})();/**
             * Accordion is a collection of collapsible panels (bootstrap cards).
             *
             * It can ensure only one panel is opened at a time and allows to customize panel
             * headers.
             *
             * @deprecated 14.1.0
             */class NgbAccordion{constructor(config,_ngZone,_changeDetector){this._ngZone=_ngZone;this._changeDetector=_changeDetector;/**
                     * An array or comma separated strings of panel ids that should be opened **initially**.
                     *
                     * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
                     * the `(panelChange)` event.
                     */this.activeIds=[];/**
                     * If `true`, panel content will be detached from DOM and not simply hidden when the panel is collapsed.
                     */this.destroyOnHide=true;/**
                     * Event emitted right before the panel toggle happens.
                     *
                     * See [NgbPanelChangeEvent](#/components/accordion/api#NgbPanelChangeEvent) for payload details.
                     */this.panelChange=new EventEmitter();/**
                     * An event emitted when the expanding animation is finished on the panel. The payload is the panel id.
                     *
                     * @since 8.0.0
                     */this.shown=new EventEmitter();/**
                     * An event emitted when the collapsing animation is finished on the panel, and before the panel element is removed.
                     * The payload is the panel id.
                     *
                     * @since 8.0.0
                     */this.hidden=new EventEmitter();this.animation=config.animation;this.type=config.type;this.closeOtherPanels=config.closeOthers;}/**
                 * Checks if a panel with a given id is expanded.
                 */isExpanded(panelId){return this.activeIds.indexOf(panelId)>-1;}/**
                 * Expands a panel with a given id.
                 *
                 * Has no effect if the panel is already expanded or disabled.
                 */expand(panelId){this._changeOpenState(this._findPanelById(panelId),true);}/**
                 * Expands all panels, if `[closeOthers]` is `false`.
                 *
                 * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
                 */expandAll(){if(this.closeOtherPanels){if(this.activeIds.length===0&&this.panels.length){this._changeOpenState(this.panels.first,true);}}else {this.panels.forEach(panel=>this._changeOpenState(panel,true));}}/**
                 * Collapses a panel with the given id.
                 *
                 * Has no effect if the panel is already collapsed or disabled.
                 */collapse(panelId){this._changeOpenState(this._findPanelById(panelId),false);}/**
                 * Collapses all opened panels.
                 */collapseAll(){this.panels.forEach(panel=>{this._changeOpenState(panel,false);});}/**
                 * Toggles a panel with the given id.
                 *
                 * Has no effect if the panel is disabled.
                 */toggle(panelId){const panel=this._findPanelById(panelId);if(panel){this._changeOpenState(panel,!panel.isOpen);}}ngAfterContentChecked(){// active id updates
            if(isString(this.activeIds)){this.activeIds=this.activeIds.split(/\s*,\s*/);}// update panels open states
            this.panels.forEach(panel=>{panel.isOpen=!panel.disabled&&this.activeIds.indexOf(panel.id)>-1;});// closeOthers updates
            if(this.activeIds.length>1&&this.closeOtherPanels){this._closeOthers(this.activeIds[0],false);this._updateActiveIds();}// Setup the initial classes here
            this._ngZone.onStable.pipe(take(1)).subscribe(()=>{this.panels.forEach(panel=>{const panelElement=panel.panelDiv;if(panelElement){if(!panel.initClassDone){panel.initClassDone=true;ngbRunTransition(this._ngZone,panelElement,ngbCollapsingTransition,{animation:false,runningTransition:'continue',context:{direction:panel.isOpen?'show':'hide',dimension:'height'}});}}else {// Classes must be initialized next time it will be in the dom
            panel.initClassDone=false;}});});}_changeOpenState(panel,nextState){if(panel!=null&&!panel.disabled&&panel.isOpen!==nextState){let defaultPrevented=false;this.panelChange.emit({panelId:panel.id,nextState:nextState,preventDefault:()=>{defaultPrevented=true;}});if(!defaultPrevented){panel.isOpen=nextState;panel.transitionRunning=true;if(nextState&&this.closeOtherPanels){this._closeOthers(panel.id);}this._updateActiveIds();this._runTransitions(this.animation);}}}_closeOthers(panelId,enableTransition=true){this.panels.forEach(panel=>{if(panel.id!==panelId&&panel.isOpen){panel.isOpen=false;panel.transitionRunning=enableTransition;}});}_findPanelById(panelId){return this.panels.find(p=>p.id===panelId)||null;}_updateActiveIds(){this.activeIds=this.panels.filter(panel=>panel.isOpen&&!panel.disabled).map(panel=>panel.id);}_runTransitions(animation){// detectChanges is performed to ensure that all panels are in the dom (via transitionRunning = true)
            // before starting the animation
            this._changeDetector.detectChanges();this.panels.forEach(panel=>{// When panel.transitionRunning is true, the transition needs to be started OR reversed,
            // The direction (show or hide) is choosen by each panel.isOpen state
            if(panel.transitionRunning){const panelElement=panel.panelDiv;ngbRunTransition(this._ngZone,panelElement,ngbCollapsingTransition,{animation,runningTransition:'stop',context:{direction:panel.isOpen?'show':'hide',dimension:'height'}}).subscribe(()=>{panel.transitionRunning=false;const{id}=panel;if(panel.isOpen){panel.shown.emit();this.shown.emit(id);}else {panel.hidden.emit();this.hidden.emit(id);}});}});}static{this.ɵfac=function NgbAccordion_Factory(t){return new(t||NgbAccordion)(i0.ɵɵdirectiveInject(NgbAccordionConfig),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbAccordion,selectors:[["ngb-accordion"]],contentQueries:function NgbAccordion_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbPanel,4);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.panels=_t);}},hostAttrs:["role","tablist",1,"accordion"],hostVars:1,hostBindings:function NgbAccordion_HostBindings(rf,ctx){if(rf&2){i0.ɵɵattribute("aria-multiselectable",!ctx.closeOtherPanels);}},inputs:{animation:"animation",activeIds:"activeIds",closeOtherPanels:["closeOthers","closeOtherPanels"],destroyOnHide:"destroyOnHide",type:"type"},outputs:{panelChange:"panelChange",shown:"shown",hidden:"hidden"},exportAs:["ngbAccordion"],standalone:true,features:[i0.ɵɵStandaloneFeature],decls:3,vars:1,consts:[["ngbPanelHeader",""],["t",""],["ngFor","",3,"ngForOf"],[1,"accordion-button",3,"ngbPanelToggle"],[3,"ngTemplateOutlet"],["role","tab",3,"id"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["role","tabpanel",3,"id","ngbRef",4,"ngIf"],["role","tabpanel",3,"id","ngbRef"],[1,"accordion-body"]],template:function NgbAccordion_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbAccordion_ng_template_0_Template,3,3,"ng-template",0,1,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(2,NgbAccordion_ng_template_2_Template,4,11,"ng-template",2);}if(rf&2){i0.ɵɵadvance(2);i0.ɵɵproperty("ngForOf",ctx.panels);}},dependencies:[NgFor,NgTemplateOutlet,NgbPanelToggle,NgbRefDirective,NgbPanelHeader,NgIf],encapsulation:2});}} exports("NgbAccordion", NgbAccordion);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordion,[{type:Component,args:[{selector:'ngb-accordion',exportAs:'ngbAccordion',standalone:true,imports:[NgFor,NgTemplateOutlet,NgbPanelToggle,NgbRefDirective,NgbPanelHeader,NgIf],encapsulation:ViewEncapsulation.None,host:{class:'accordion',role:'tablist','[attr.aria-multiselectable]':'!closeOtherPanels'},template:`
		<ng-template #t ngbPanelHeader let-panel>
			<button class="accordion-button" [ngbPanelToggle]="panel">
				{{ panel.title }}
				<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
			</button>
		</ng-template>
		<ng-template ngFor let-panel [ngForOf]="panels">
			<div [class]="'accordion-item ' + (panel.cardClass || '')">
				<div
					role="tab"
					id="{{ panel.id }}-header"
					[class]="'accordion-header ' + (panel.type ? 'bg-' + panel.type : type ? 'bg-' + type : '')"
				>
					<ng-template
						[ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
						[ngTemplateOutletContext]="{ $implicit: panel, opened: panel.isOpen }"
					></ng-template>
				</div>
				<div
					id="{{ panel.id }}"
					(ngbRef)="panel.panelDiv = $event"
					role="tabpanel"
					[attr.aria-labelledby]="panel.id + '-header'"
					*ngIf="!destroyOnHide || panel.isOpen || panel.transitionRunning"
				>
					<div class="accordion-body">
						<ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef || null"></ng-template>
					</div>
				</div>
			</div>
		</ng-template>
	`}]}],function(){return [{type:NgbAccordionConfig},{type:i0.NgZone},{type:i0.ChangeDetectorRef}];},{panels:[{type:ContentChildren,args:[NgbPanel]}],animation:[{type:Input}],activeIds:[{type:Input}],closeOtherPanels:[{type:Input,args:['closeOthers']}],destroyOnHide:[{type:Input}],type:[{type:Input}],panelChange:[{type:Output}],shown:[{type:Output}],hidden:[{type:Output}]});})();/**
             * A configuration service for the [NgbCollapse](#/components/collapse/api#NgbCollapse) component.
             *
             * You can inject this service, typically in your root component, and customize its properties
             * to provide default values for all collapses used in the application.
             */class NgbCollapseConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.horizontal=false;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbCollapseConfig_Factory(t){return new(t||NgbCollapseConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCollapseConfig,factory:NgbCollapseConfig.ɵfac,providedIn:'root'});}} exports("NgbCollapseConfig", NgbCollapseConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCollapseConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();/**
             * A directive to provide a simple way of hiding and showing elements on the
             * page.
             */class NgbCollapse{/**
                 * If `true`, will collapse the element or show it otherwise.
                 */set collapsed(isCollapsed){if(this._isCollapsed!==isCollapsed){this._isCollapsed=isCollapsed;if(this._afterInit){this._runTransitionWithEvents(isCollapsed,this.animation);}}}constructor(_element,config,_zone){this._element=_element;this._zone=_zone;/**
                     * Flag used to track if the collapse setter is invoked during initialization
                     * or not. This distinction is made in order to avoid running the transition during initialization.
                     */this._afterInit=false;this._isCollapsed=false;this.ngbCollapseChange=new EventEmitter();/**
                     * An event emitted when the collapse element is shown, after the transition.
                     * It has no payload.
                     *
                     * @since 8.0.0
                     */this.shown=new EventEmitter();/**
                     * An event emitted when the collapse element is hidden, after the transition.
                     * It has no payload.
                     *
                     * @since 8.0.0
                     */this.hidden=new EventEmitter();this.animation=config.animation;this.horizontal=config.horizontal;}ngOnInit(){this._runTransition(this._isCollapsed,false);this._afterInit=true;}/**
                 * Triggers collapsing programmatically.
                 *
                 * If there is a collapsing transition running already, it will be reversed.
                 * If the animations are turned off this happens synchronously.
                 *
                 * @since 8.0.0
                 */toggle(open=this._isCollapsed){this.collapsed=!open;this.ngbCollapseChange.next(this._isCollapsed);}_runTransition(collapsed,animation){return ngbRunTransition(this._zone,this._element.nativeElement,ngbCollapsingTransition,{animation,runningTransition:'stop',context:{direction:collapsed?'hide':'show',dimension:this.horizontal?'width':'height'}});}_runTransitionWithEvents(collapsed,animation){this._runTransition(collapsed,animation).subscribe(()=>{if(collapsed){this.hidden.emit();}else {this.shown.emit();}});}static{this.ɵfac=function NgbCollapse_Factory(t){return new(t||NgbCollapse)(i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(NgbCollapseConfig),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbCollapse,selectors:[["","ngbCollapse",""]],hostVars:2,hostBindings:function NgbCollapse_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("collapse-horizontal",ctx.horizontal);}},inputs:{animation:"animation",collapsed:["ngbCollapse","collapsed"],horizontal:"horizontal"},outputs:{ngbCollapseChange:"ngbCollapseChange",shown:"shown",hidden:"hidden"},exportAs:["ngbCollapse"],standalone:true});}} exports("NgbCollapse", NgbCollapse);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCollapse,[{type:Directive,args:[{selector:'[ngbCollapse]',exportAs:'ngbCollapse',standalone:true,host:{'[class.collapse-horizontal]':'horizontal'}}]}],function(){return [{type:i0.ElementRef},{type:NgbCollapseConfig},{type:i0.NgZone}];},{animation:[{type:Input}],collapsed:[{type:Input,args:['ngbCollapse']}],ngbCollapseChange:[{type:Output}],horizontal:[{type:Input}],shown:[{type:Output}],hidden:[{type:Output}]});})();let nextId$3=0;/**
             * A directive that wraps the content of an accordion item's collapsible body.
             *
             * The actual content is provided in a child `ng-template` element.
             * Depending on the state of the accordion, the template will be either inserted or removed from the DOM.
             *
             * @since 14.1.0
             */class NgbAccordionBody{constructor(){this._appRef=inject(ApplicationRef);this._element=inject(ElementRef).nativeElement;this._item=inject(NgbAccordionItem);this._viewRef=null;}ngAfterContentChecked(){if(this._bodyTpl){if(this._item._shouldBeInDOM){this._createViewIfNotExists();}else {this._destroyViewIfExists();}}}ngOnDestroy(){this._destroyViewIfExists();}_destroyViewIfExists(){if(this._viewRef){this._appRef.detachView(this._viewRef);this._viewRef.destroy();this._viewRef=null;}}_createViewIfNotExists(){if(!this._viewRef){this._viewRef=this._bodyTpl.createEmbeddedView(null);this._viewRef.detectChanges();this._appRef.attachView(this._viewRef);for(const node of this._viewRef.rootNodes){this._element.appendChild(node);}}}static{this.ɵfac=function NgbAccordionBody_Factory(t){return new(t||NgbAccordionBody)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbAccordionBody,selectors:[["","ngbAccordionBody",""]],contentQueries:function NgbAccordionBody_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,TemplateRef,7);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._bodyTpl=_t.first);}},hostVars:2,hostBindings:function NgbAccordionBody_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("accordion-body",true);}},standalone:true});}} exports("NgbAccordionBody", NgbAccordionBody);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionBody,[{type:Directive,args:[{selector:'[ngbAccordionBody]',standalone:true,host:{'[class.accordion-body]':'true'}}]}],null,{_bodyTpl:[{type:ContentChild,args:[TemplateRef,{static:true}]}]});})();/**
             * A directive that wraps the collapsible item's content of the accordion.
             *
             * Internally it reuses the [`NgbCollapse` directive](#/components/collapse)
             *
             * @since 14.1.0
             */class NgbAccordionCollapse{constructor(){this.item=inject(NgbAccordionItem);this.ngbCollapse=inject(NgbCollapse);}static{this.ɵfac=function NgbAccordionCollapse_Factory(t){return new(t||NgbAccordionCollapse)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbAccordionCollapse,selectors:[["","ngbAccordionCollapse",""]],hostAttrs:["role","region"],hostVars:4,hostBindings:function NgbAccordionCollapse_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("id",ctx.item.collapseId);i0.ɵɵattribute("aria-labelledby",ctx.item.toggleId);i0.ɵɵclassProp("accordion-collapse",true);}},exportAs:["ngbAccordionCollapse"],standalone:true,features:[i0.ɵɵHostDirectivesFeature([NgbCollapse])]});}} exports("NgbAccordionCollapse", NgbAccordionCollapse);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionCollapse,[{type:Directive,args:[{exportAs:'ngbAccordionCollapse',standalone:true,selector:'[ngbAccordionCollapse]',host:{role:'region','[class.accordion-collapse]':'true','[id]':'item.collapseId','[attr.aria-labelledby]':'item.toggleId'},hostDirectives:[NgbCollapse]}]}],null,null);})();/**
             * A directive to put on a toggling element inside the accordion item's header.
             * It will register click handlers that toggle the associated panel and will handle accessibility attributes.
             *
             * This directive is used internally by the [`NgbAccordionButton` directive](#/components/accordion/api#NgbAccordionButton).
             *
             * @since 14.1.0
             */class NgbAccordionToggle{constructor(){this.item=inject(NgbAccordionItem);this.accordion=inject(NgbAccordionDirective);}static{this.ɵfac=function NgbAccordionToggle_Factory(t){return new(t||NgbAccordionToggle)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbAccordionToggle,selectors:[["","ngbAccordionToggle",""]],hostVars:5,hostBindings:function NgbAccordionToggle_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("click",function NgbAccordionToggle_click_HostBindingHandler(){return !ctx.item.disabled&&ctx.accordion.toggle(ctx.item.id);});}if(rf&2){i0.ɵɵhostProperty("id",ctx.item.toggleId);i0.ɵɵattribute("aria-controls",ctx.item.collapseId)("aria-expanded",!ctx.item.collapsed);i0.ɵɵclassProp("collapsed",ctx.item.collapsed);}},standalone:true});}} exports("NgbAccordionToggle", NgbAccordionToggle);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionToggle,[{type:Directive,args:[{selector:'[ngbAccordionToggle]',standalone:true,host:{'[id]':'item.toggleId','[class.collapsed]':'item.collapsed','[attr.aria-controls]':'item.collapseId','[attr.aria-expanded]':'!item.collapsed','(click)':'!item.disabled && accordion.toggle(item.id)'}}]}],null,null);})();/**
             * A directive to put on a button element inside an accordion item's header.
             *
             * If you want a custom markup for the header, you can also use the [`NgbAccordionToggle` directive](#/components/accordion/api#NgbAccordionToggle).
             *
             * @since 14.1.0
             */class NgbAccordionButton{constructor(){this.item=inject(NgbAccordionItem);}static{this.ɵfac=function NgbAccordionButton_Factory(t){return new(t||NgbAccordionButton)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbAccordionButton,selectors:[["button","ngbAccordionButton",""]],hostAttrs:["type","button"],hostVars:3,hostBindings:function NgbAccordionButton_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("disabled",ctx.item.disabled);i0.ɵɵclassProp("accordion-button",true);}},standalone:true,features:[i0.ɵɵHostDirectivesFeature([NgbAccordionToggle])]});}} exports("NgbAccordionButton", NgbAccordionButton);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionButton,[{type:Directive,args:[{selector:'button[ngbAccordionButton]',standalone:true,host:{'[disabled]':'item.disabled','[class.accordion-button]':'true',type:'button'},hostDirectives:[NgbAccordionToggle]}]}],null,null);})();/**
             * A directive that wraps an accordion item's header.
             *
             * @since 14.1.0
             */class NgbAccordionHeader{constructor(){this.item=inject(NgbAccordionItem);}static{this.ɵfac=function NgbAccordionHeader_Factory(t){return new(t||NgbAccordionHeader)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbAccordionHeader,selectors:[["","ngbAccordionHeader",""]],hostAttrs:["role","heading"],hostVars:4,hostBindings:function NgbAccordionHeader_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("accordion-header",true)("collapsed",ctx.item.collapsed);}},standalone:true});}} exports("NgbAccordionHeader", NgbAccordionHeader);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionHeader,[{type:Directive,args:[{selector:'[ngbAccordionHeader]',standalone:true,host:{role:'heading','[class.accordion-header]':'true','[class.collapsed]':'item.collapsed'}}]}],null,null);})();/**
             * A directive that wraps an accordion item: a toggleable header + body that collapses.
             *
             * You can get hold of the `NgbAccordionItem` instance in the template with `#item="ngbAccordionItem"`.
             * It allows to check if the item is collapsed or not, toggle the collapse state, etc.
             *
             * Every accordion item has a string ID that is automatically generated in the `ngb-accordion-item-XX` format, unless provided explicitly.
             *
             * @since 14.1.0
             */class NgbAccordionItem{constructor(){this._accordion=inject(NgbAccordionDirective);this._cd=inject(ChangeDetectorRef);this._destroyRef=inject(DestroyRef);this._collapsed=true;this._id=`ngb-accordion-item-${nextId$3++}`;this._collapseAnimationRunning=false;/**
                     * If `true`, the accordion item will be disabled.
                     * It won't react to user's clicks, but still will be toggelable programmatically.
                     */this.disabled=false;/**
                     * Event emitted before the expanding animation starts. It has no payload.
                     *
                     * @since 15.1.0
                     */this.show=new EventEmitter();/**
                     * Event emitted when the expanding animation is finished. It has no payload.
                     */this.shown=new EventEmitter();/**
                     * Event emitted before the collapsing animation starts. It has no payload.
                     *
                     * @since 15.1.0
                     */this.hide=new EventEmitter();/**
                     * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
                     * It has no payload.
                     */this.hidden=new EventEmitter();}/**
                 * Sets the custom ID of the accordion item. It must be unique for the document.
                 *
                 * @param id The ID of the accordion item, must be a non-empty string
                 */set id(id){if(isString(id)&&id!==''){this._id=id;}}/**
                 * If `true`, the content of the accordion item's body will be removed from the DOM. It will be just hidden otherwise.
                 *
                 * This property can also be set up on the parent [`NgbAccordion` directive](#/components/accordion/api#NgbAccordionDirective).
                 */set destroyOnHide(destroyOnHide){this._destroyOnHide=destroyOnHide;}get destroyOnHide(){return this._destroyOnHide===undefined?this._accordion.destroyOnHide:this._destroyOnHide;}/**
                 *	If `true`, the accordion item will be collapsed. Otherwise, it will be expanded.
                 *
                 * @param collapsed New state of the accordion item.
                 */set collapsed(collapsed){if(collapsed){this.collapse();}else {this.expand();}}get collapsed(){return this._collapsed;}get id(){return `${this._id}`;}get toggleId(){return `${this.id}-toggle`;}get collapseId(){return `${this.id}-collapse`;}get _shouldBeInDOM(){return !this.collapsed||this._collapseAnimationRunning||!this.destroyOnHide;}ngAfterContentInit(){const{ngbCollapse}=this._collapse;// we need to disable the animation for the first init
            ngbCollapse.animation=false;ngbCollapse.collapsed=this.collapsed;// we set the animation to the default of the accordion
            ngbCollapse.animation=this._accordion.animation;// event forwarding from 'ngbCollapse' to 'ngbAccordion'
            ngbCollapse.hidden.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(()=>{// when the animation finishes we can remove the template from DOM
            this._collapseAnimationRunning=false;this.hidden.emit();this._accordion.hidden.emit(this.id);});ngbCollapse.shown.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(()=>{this.shown.emit();this._accordion.shown.emit(this.id);});}/**
                 * Toggles an accordion item.
                 */toggle(){this.collapsed=!this.collapsed;}/**
                 * Expands an accordion item.
                 */expand(){if(this.collapsed){// checking if accordion allows to expand the panel in respect to 'closeOthers' flag
            if(!this._accordion._ensureCanExpand(this)){return;}this._collapsed=false;// need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();// we need force CD to get template into DOM before starting animation to calculate its height correctly
            // this will synchronously put the item body into DOM, because `this._collapsed` was flipped to `false`
            this._cd.detectChanges();// firing events before starting animations
            this.show.emit();this._accordion.show.emit(this.id);// we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation=this._accordion.animation;this._collapse.ngbCollapse.collapsed=false;}}/**
                 * Collapses an accordion item.
                 */collapse(){if(!this.collapsed){this._collapsed=true;this._collapseAnimationRunning=true;// need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();// firing events before starting animations
            this.hide.emit();this._accordion.hide.emit(this.id);// we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation=this._accordion.animation;this._collapse.ngbCollapse.collapsed=true;}}static{this.ɵfac=function NgbAccordionItem_Factory(t){return new(t||NgbAccordionItem)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbAccordionItem,selectors:[["","ngbAccordionItem",""]],contentQueries:function NgbAccordionItem_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbAccordionCollapse,7);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._collapse=_t.first);}},hostVars:3,hostBindings:function NgbAccordionItem_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("id",ctx.id);i0.ɵɵclassProp("accordion-item",true);}},inputs:{id:["ngbAccordionItem","id"],destroyOnHide:"destroyOnHide",disabled:"disabled",collapsed:"collapsed"},outputs:{show:"show",shown:"shown",hide:"hide",hidden:"hidden"},exportAs:["ngbAccordionItem"],standalone:true});}} exports("NgbAccordionItem", NgbAccordionItem);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionItem,[{type:Directive,args:[{selector:'[ngbAccordionItem]',exportAs:'ngbAccordionItem',standalone:true,host:{'[class.accordion-item]':'true','[id]':'id'}}]}],null,{_collapse:[{type:ContentChild,args:[NgbAccordionCollapse,{static:true}]}],id:[{type:Input,args:['ngbAccordionItem']}],destroyOnHide:[{type:Input}],disabled:[{type:Input}],collapsed:[{type:Input}],show:[{type:Output}],shown:[{type:Output}],hide:[{type:Output}],hidden:[{type:Output}]});})();/**
             * Accordion is a stack of cards that have a header and collapsible body.
             *
             * This directive is a container for these items and provides an API to handle them.
             *
             * @since 14.1.0
             */class NgbAccordionDirective{constructor(config){/**
                     * Event emitted before expanding animation starts. The payload is the id of shown accordion item.
                     *
                     * @since 15.1.0
                     */this.show=new EventEmitter();/**
                     * Event emitted when the expanding animation is finished. The payload is the id of shown accordion item.
                     */this.shown=new EventEmitter();/**
                     * Event emitted before the collapsing animation starts. The payload is the id of hidden accordion item.
                     *
                     * @since 15.1.0
                     */this.hide=new EventEmitter();/**
                     * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
                     * The payload is the id of hidden accordion item.
                     */this.hidden=new EventEmitter();this._anItemWasAlreadyExpandedDuringInitialisation=false;this.animation=config.animation;this.closeOthers=config.closeOthers;this.destroyOnHide=config.destroyOnHide;}/**
                 * Toggles an item with the given id.
                 *
                 * It will toggle an item, even if it is disabled.
                 *
                 * @param itemId The id of the item to toggle.
                 */toggle(itemId){this._getItem(itemId)?.toggle();}/**
                 * Expands an item with the given id.
                 *
                 * If `closeOthers` is `true`, it will collapse other panels.
                 *
                 * @param itemId The id of the item to expand.
                 */expand(itemId){this._getItem(itemId)?.expand();}/**
                 * Expands all items.
                 *
                 * If `closeOthers` is `true` and all items are closed, it will open the first one. Otherwise, it will keep the opened one.
                 */expandAll(){if(this._items){if(this.closeOthers){// we check if there is an item open and if it is not we can expand the first item
            // (otherwise we toggle nothing)
            if(!this._items.find(item=>!item.collapsed)){this._items.first.expand();}}else {this._items.forEach(item=>item.expand());}}}/**
                 * Collapses an item with the given id.
                 *
                 * Has no effect if the `itemId` does not correspond to any item.
                 *
                 * @param itemId The id of the item to collapse.
                 */collapse(itemId){this._getItem(itemId)?.collapse();}/**
                 * Collapses all items.
                 */collapseAll(){this._items?.forEach(item=>item.collapse());}/**
                 * Checks if an item with the given id is expanded.
                 *
                 * If the `itemId` does not correspond to any item, it returns `false`.
                 *
                 * @param itemId The id of the item to check.
                 */isExpanded(itemId){const item=this._getItem(itemId);return item?!item.collapsed:false;}/**
                 * It checks, if the item can be expanded in the current state of the accordion.
                 * With `closeOthers` there can be only one expanded item at a time.
                 *
                 * @internal
                 */_ensureCanExpand(toExpand){if(!this.closeOthers){return true;}// special case during the initialization of the [collapse]="false" inputs
            // `this._items` QueryList is not yet initialized, but we need to ensure only one item can be expanded at a time
            if(!this._items){if(!this._anItemWasAlreadyExpandedDuringInitialisation){this._anItemWasAlreadyExpandedDuringInitialisation=true;return true;}return false;}// if there is an expanded item, we need to collapse it first
            this._items.find(item=>!item.collapsed&&toExpand!==item)?.collapse();return true;}_getItem(itemId){return this._items?.find(item=>item.id===itemId);}static{this.ɵfac=function NgbAccordionDirective_Factory(t){return new(t||NgbAccordionDirective)(i0.ɵɵdirectiveInject(NgbAccordionConfig));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbAccordionDirective,selectors:[["","ngbAccordion",""]],contentQueries:function NgbAccordionDirective_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbAccordionItem,4);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._items=_t);}},hostVars:2,hostBindings:function NgbAccordionDirective_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("accordion",true);}},inputs:{animation:"animation",closeOthers:"closeOthers",destroyOnHide:"destroyOnHide"},outputs:{show:"show",shown:"shown",hide:"hide",hidden:"hidden"},exportAs:["ngbAccordion"],standalone:true});}} exports("NgbAccordionDirective", NgbAccordionDirective);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionDirective,[{type:Directive,args:[{selector:'[ngbAccordion]',standalone:true,exportAs:'ngbAccordion',host:{'[class.accordion]':'true'}}]}],function(){return [{type:NgbAccordionConfig}];},{_items:[{type:ContentChildren,args:[NgbAccordionItem,{descendants:false}]}],animation:[{type:Input}],closeOthers:[{type:Input}],destroyOnHide:[{type:Input}],show:[{type:Output}],shown:[{type:Output}],hide:[{type:Output}],hidden:[{type:Output}]});})();/* eslint-disable deprecation/deprecation */const NGB_ACCORDION_DIRECTIVES=[NgbAccordion,NgbPanel,NgbPanelTitle,NgbPanelContent,NgbPanelHeader,NgbPanelToggle,NgbAccordionButton,NgbAccordionDirective,NgbAccordionItem,NgbAccordionHeader,NgbAccordionToggle,NgbAccordionBody,NgbAccordionCollapse];class NgbAccordionModule{static{this.ɵfac=function NgbAccordionModule_Factory(t){return new(t||NgbAccordionModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbAccordionModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbAccordionModule", NgbAccordionModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAccordionModule,[{type:NgModule,args:[{imports:NGB_ACCORDION_DIRECTIVES,exports:NGB_ACCORDION_DIRECTIVES}]}],null,null);})();const ngbAlertFadingTransition=({classList})=>{classList.remove('show');};/**
             * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
             *
             * You can inject this service, typically in your root component, and customize its properties
             * to provide default values for all alerts used in the application.
             */class NgbAlertConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.dismissible=true;this.type='warning';}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbAlertConfig_Factory(t){return new(t||NgbAlertConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbAlertConfig,factory:NgbAlertConfig.ɵfac,providedIn:'root'});}} exports("NgbAlertConfig", NgbAlertConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAlertConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();/**
             * Alert is a component to provide contextual feedback messages for user.
             *
             * It supports several alert types and can be dismissed.
             */class NgbAlert{constructor(config,_element,_zone){this._element=_element;this._zone=_zone;/**
                     * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
                     *
                     * @since 8.0.0
                     */this.closed=new EventEmitter();this.dismissible=config.dismissible;this.type=config.type;this.animation=config.animation;}/**
                 * Triggers alert closing programmatically (same as clicking on the close button (×)).
                 *
                 * The returned observable will emit and be completed once the closing transition has finished.
                 * If the animations are turned off this happens synchronously.
                 *
                 * Alternatively you could listen or subscribe to the `(closed)` output
                 *
                 * @since 8.0.0
                 */close(){const transition=ngbRunTransition(this._zone,this._element.nativeElement,ngbAlertFadingTransition,{animation:this.animation,runningTransition:'continue'});transition.subscribe(()=>this.closed.emit());return transition;}static{this.ɵfac=function NgbAlert_Factory(t){return new(t||NgbAlert)(i0.ɵɵdirectiveInject(NgbAlertConfig),i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbAlert,selectors:[["ngb-alert"]],hostAttrs:["role","alert"],hostVars:6,hostBindings:function NgbAlert_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassMap("alert show"+(ctx.type?" alert-"+ctx.type:""));i0.ɵɵclassProp("fade",ctx.animation)("alert-dismissible",ctx.dismissible);}},inputs:{animation:"animation",dismissible:"dismissible",type:"type"},outputs:{closed:"closed"},exportAs:["ngbAlert"],standalone:true,features:[i0.ɵɵStandaloneFeature],ngContentSelectors:_c3,decls:2,vars:1,consts:function(){let i18n_1;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_2=goog.getMsg("Close");i18n_1=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_2;}else {i18n_1=$localize`:@@ngb.alert.close:Close`;}return [["type","button","class","btn-close","aria-label",i18n_1,3,"click",4,"ngIf"],["type","button","aria-label",i18n_1,1,"btn-close",3,"click"]];},template:function NgbAlert_Template(rf,ctx){if(rf&1){i0.ɵɵprojectionDef();i0.ɵɵprojection(0);i0.ɵɵtemplate(1,NgbAlert_button_1_Template,1,0,"button",0);}if(rf&2){i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.dismissible);}},dependencies:[NgIf],styles:["ngb-alert{display:block}\n"],encapsulation:2,changeDetection:0});}} exports("NgbAlert", NgbAlert);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAlert,[{type:Component,args:[{selector:'ngb-alert',exportAs:'ngbAlert',standalone:true,imports:[NgIf],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{role:'alert','[class]':'"alert show" + (type ? " alert-" + type : "")','[class.fade]':'animation','[class.alert-dismissible]':'dismissible'},template:`
		<ng-content></ng-content>
		<button
			*ngIf="dismissible"
			type="button"
			class="btn-close"
			aria-label="Close"
			i18n-aria-label="@@ngb.alert.close"
			(click)="close()"
		>
		</button>
	`,styles:["ngb-alert{display:block}\n"]}]}],function(){return [{type:NgbAlertConfig},{type:i0.ElementRef},{type:i0.NgZone}];},{animation:[{type:Input}],dismissible:[{type:Input}],type:[{type:Input}],closed:[{type:Output}]});})();class NgbAlertModule{static{this.ɵfac=function NgbAlertModule_Factory(t){return new(t||NgbAlertModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbAlertModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbAlertModule", NgbAlertModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbAlertModule,[{type:NgModule,args:[{imports:[NgbAlert],exports:[NgbAlert]}]}],null,null);})();/**
             * Defines the carousel slide transition direction.
             */var NgbSlideEventDirection; exports("NgbSlideEventDirection", NgbSlideEventDirection);(function(NgbSlideEventDirection){NgbSlideEventDirection["START"]="start";NgbSlideEventDirection["END"]="end";})(NgbSlideEventDirection||(exports("NgbSlideEventDirection", NgbSlideEventDirection={})));const isBeingAnimated=({classList})=>{return classList.contains('carousel-item-start')||classList.contains('carousel-item-end');};const removeDirectionClasses=classList=>{classList.remove('carousel-item-start');classList.remove('carousel-item-end');};const removeClasses=classList=>{removeDirectionClasses(classList);classList.remove('carousel-item-prev');classList.remove('carousel-item-next');};const ngbCarouselTransitionIn=(element,animation,{direction})=>{const{classList}=element;if(!animation){removeDirectionClasses(classList);removeClasses(classList);classList.add('active');return;}if(isBeingAnimated(element)){// Revert the transition
            removeDirectionClasses(classList);}else {// For the 'in' transition, a 'pre-class' is applied to the element to ensure its visibility
            classList.add('carousel-item-'+(direction===NgbSlideEventDirection.START?'next':'prev'));reflow(element);classList.add('carousel-item-'+direction);}return ()=>{removeClasses(classList);classList.add('active');};};const ngbCarouselTransitionOut=(element,animation,{direction})=>{const{classList}=element;if(!animation){removeDirectionClasses(classList);removeClasses(classList);classList.remove('active');return;}//  direction is left or right, depending on the way the slide goes out.
            if(isBeingAnimated(element)){// Revert the transition
            removeDirectionClasses(classList);}else {classList.add('carousel-item-'+direction);}return ()=>{removeClasses(classList);classList.remove('active');};};/**
             * A configuration service for the [NgbCarousel](#/components/carousel/api#NgbCarousel) component.
             *
             * You can inject this service, typically in your root component, and customize its properties
             * to provide default values for all carousels used in the application.
             */class NgbCarouselConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.interval=5000;this.wrap=true;this.keyboard=true;this.pauseOnHover=true;this.pauseOnFocus=true;this.showNavigationArrows=true;this.showNavigationIndicators=true;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbCarouselConfig_Factory(t){return new(t||NgbCarouselConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCarouselConfig,factory:NgbCarouselConfig.ɵfac,providedIn:'root'});}} exports("NgbCarouselConfig", NgbCarouselConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCarouselConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();let nextId$2=0;/**
             * A directive that wraps the individual carousel slide.
             */class NgbSlide{constructor(tplRef){this.tplRef=tplRef;/**
                     * Slide id that must be unique for the entire document.
                     *
                     * If not provided, will be generated in the `ngb-slide-xx` format.
                     */this.id=`ngb-slide-${nextId$2++}`;/**
                     * An event emitted when the slide transition is finished
                     *
                     * @since 8.0.0
                     */this.slid=new EventEmitter();}static{this.ɵfac=function NgbSlide_Factory(t){return new(t||NgbSlide)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbSlide,selectors:[["ng-template","ngbSlide",""]],inputs:{id:"id"},outputs:{slid:"slid"},standalone:true});}} exports("NgbSlide", NgbSlide);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbSlide,[{type:Directive,args:[{selector:'ng-template[ngbSlide]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},{id:[{type:Input}],slid:[{type:Output}]});})();/**
             * Carousel is a component to easily create and control slideshows.
             *
             * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
             */class NgbCarousel{/**
                 * Time in milliseconds before the next slide is shown.
                 */set interval(value){this._interval$.next(value);}get interval(){return this._interval$.value;}/**
                 * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
                 */set wrap(value){this._wrap$.next(value);}get wrap(){return this._wrap$.value;}/**
                 * If `true`, will pause slide switching when mouse cursor hovers the slide.
                 *
                 * @since 2.2.0
                 */set pauseOnHover(value){this._pauseOnHover$.next(value);}get pauseOnHover(){return this._pauseOnHover$.value;}/**
                 * If `true`, will pause slide switching when the focus is inside the carousel.
                 */set pauseOnFocus(value){this._pauseOnFocus$.next(value);}get pauseOnFocus(){return this._pauseOnFocus$.value;}set mouseHover(value){this._mouseHover$.next(value);}get mouseHover(){return this._mouseHover$.value;}set focused(value){this._focused$.next(value);}get focused(){return this._focused$.value;}constructor(config,_platformId,_ngZone,_cd,_container){this._platformId=_platformId;this._ngZone=_ngZone;this._cd=_cd;this._container=_container;this.NgbSlideEventSource=NgbSlideEventSource;this._destroy$=new Subject();this._interval$=new BehaviorSubject(0);this._mouseHover$=new BehaviorSubject(false);this._focused$=new BehaviorSubject(false);this._pauseOnHover$=new BehaviorSubject(false);this._pauseOnFocus$=new BehaviorSubject(false);this._pause$=new BehaviorSubject(false);this._wrap$=new BehaviorSubject(false);/**
                     * An event emitted just before the slide transition starts.
                     *
                     * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
                     */this.slide=new EventEmitter();/**
                     * An event emitted right after the slide transition is completed.
                     *
                     * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
                     *
                     * @since 8.0.0
                     */this.slid=new EventEmitter();/*
                     * Keep the ids of the panels currently transitionning
                     * in order to allow only the transition revertion
                     */this._transitionIds=null;this.animation=config.animation;this.interval=config.interval;this.wrap=config.wrap;this.keyboard=config.keyboard;this.pauseOnHover=config.pauseOnHover;this.pauseOnFocus=config.pauseOnFocus;this.showNavigationArrows=config.showNavigationArrows;this.showNavigationIndicators=config.showNavigationIndicators;}arrowLeft(){this.focus();this.prev(NgbSlideEventSource.ARROW_LEFT);}arrowRight(){this.focus();this.next(NgbSlideEventSource.ARROW_RIGHT);}ngAfterContentInit(){// setInterval() doesn't play well with SSR and protractor,
            // so we should run it in the browser and outside Angular
            if(isPlatformBrowser(this._platformId)){this._ngZone.runOutsideAngular(()=>{const hasNextSlide$=combineLatest([this.slide.pipe(map(slideEvent=>slideEvent.current),startWith(this.activeId)),this._wrap$,this.slides.changes.pipe(startWith(null))]).pipe(map(([currentSlideId,wrap])=>{const slideArr=this.slides.toArray();const currentSlideIdx=this._getSlideIdxById(currentSlideId);return wrap?slideArr.length>1:currentSlideIdx<slideArr.length-1;}),distinctUntilChanged());combineLatest([this._pause$,this._pauseOnHover$,this._mouseHover$,this._pauseOnFocus$,this._focused$,this._interval$,hasNextSlide$]).pipe(map(([pause,pauseOnHover,mouseHover,pauseOnFocus,focused,interval,hasNextSlide])=>pause||pauseOnHover&&mouseHover||pauseOnFocus&&focused||!hasNextSlide?0:interval),distinctUntilChanged(),switchMap(interval=>interval>0?timer(interval,interval):NEVER),takeUntil(this._destroy$)).subscribe(()=>this._ngZone.run(()=>this.next(NgbSlideEventSource.TIMER)));});}this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(()=>{this._transitionIds?.forEach(id=>ngbCompleteTransition(this._getSlideElement(id)));this._transitionIds=null;this._cd.markForCheck();// The following code need to be done asynchronously, after the dom becomes stable,
            // otherwise all changes will be undone.
            this._ngZone.onStable.pipe(take(1)).subscribe(()=>{for(const{id}of this.slides){const element=this._getSlideElement(id);if(id===this.activeId){element.classList.add('active');}else {element.classList.remove('active');}}});});}ngAfterContentChecked(){let activeSlide=this._getSlideById(this.activeId);this.activeId=activeSlide?activeSlide.id:this.slides.length?this.slides.first.id:'';}ngAfterViewInit(){// Initialize the 'active' class (not managed by the template)
            if(this.activeId){const element=this._getSlideElement(this.activeId);if(element){element.classList.add('active');}}}ngOnDestroy(){this._destroy$.next();}/**
                 * Navigates to a slide with the specified identifier.
                 */select(slideId,source){this._cycleToSelected(slideId,this._getSlideEventDirection(this.activeId,slideId),source);}/**
                 * Navigates to the previous slide.
                 */prev(source){this._cycleToSelected(this._getPrevSlide(this.activeId),NgbSlideEventDirection.END,source);}/**
                 * Navigates to the next slide.
                 */next(source){this._cycleToSelected(this._getNextSlide(this.activeId),NgbSlideEventDirection.START,source);}/**
                 * Pauses cycling through the slides.
                 */pause(){this._pause$.next(true);}/**
                 * Restarts cycling through the slides from start to end.
                 */cycle(){this._pause$.next(false);}/**
                 * Set the focus on the carousel.
                 */focus(){this._container.nativeElement.focus();}_cycleToSelected(slideIdx,direction,source){const transitionIds=this._transitionIds;if(transitionIds&&(transitionIds[0]!==slideIdx||transitionIds[1]!==this.activeId)){// Revert prevented
            return;}let selectedSlide=this._getSlideById(slideIdx);if(selectedSlide&&selectedSlide.id!==this.activeId){this._transitionIds=[this.activeId,slideIdx];this.slide.emit({prev:this.activeId,current:selectedSlide.id,direction:direction,paused:this._pause$.value,source});const options={animation:this.animation,runningTransition:'stop',context:{direction}};const transitions=[];const activeSlide=this._getSlideById(this.activeId);if(activeSlide){const activeSlideTransition=ngbRunTransition(this._ngZone,this._getSlideElement(activeSlide.id),ngbCarouselTransitionOut,options);activeSlideTransition.subscribe(()=>{activeSlide.slid.emit({isShown:false,direction,source});});transitions.push(activeSlideTransition);}const previousId=this.activeId;this.activeId=selectedSlide.id;const nextSlide=this._getSlideById(this.activeId);const transition=ngbRunTransition(this._ngZone,this._getSlideElement(selectedSlide.id),ngbCarouselTransitionIn,options);transition.subscribe(()=>{nextSlide?.slid.emit({isShown:true,direction,source});});transitions.push(transition);zip(...transitions).pipe(take(1)).subscribe(()=>{this._transitionIds=null;this.slid.emit({prev:previousId,current:selectedSlide.id,direction:direction,paused:this._pause$.value,source});});}// we get here after the interval fires or any external API call like next(), prev() or select()
            this._cd.markForCheck();}_getSlideEventDirection(currentActiveSlideId,nextActiveSlideId){const currentActiveSlideIdx=this._getSlideIdxById(currentActiveSlideId);const nextActiveSlideIdx=this._getSlideIdxById(nextActiveSlideId);return currentActiveSlideIdx>nextActiveSlideIdx?NgbSlideEventDirection.END:NgbSlideEventDirection.START;}_getSlideById(slideId){return this.slides.find(slide=>slide.id===slideId)||null;}_getSlideIdxById(slideId){const slide=this._getSlideById(slideId);return slide!=null?this.slides.toArray().indexOf(slide):-1;}_getNextSlide(currentSlideId){const slideArr=this.slides.toArray();const currentSlideIdx=this._getSlideIdxById(currentSlideId);const isLastSlide=currentSlideIdx===slideArr.length-1;return isLastSlide?this.wrap?slideArr[0].id:slideArr[slideArr.length-1].id:slideArr[currentSlideIdx+1].id;}_getPrevSlide(currentSlideId){const slideArr=this.slides.toArray();const currentSlideIdx=this._getSlideIdxById(currentSlideId);const isFirstSlide=currentSlideIdx===0;return isFirstSlide?this.wrap?slideArr[slideArr.length-1].id:slideArr[0].id:slideArr[currentSlideIdx-1].id;}_getSlideElement(slideId){return this._container.nativeElement.querySelector(`#slide-${slideId}`);}static{this.ɵfac=function NgbCarousel_Factory(t){return new(t||NgbCarousel)(i0.ɵɵdirectiveInject(NgbCarouselConfig),i0.ɵɵdirectiveInject(PLATFORM_ID),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbCarousel,selectors:[["ngb-carousel"]],contentQueries:function NgbCarousel_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbSlide,4);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.slides=_t);}},hostAttrs:["tabIndex","0",1,"carousel","slide"],hostVars:3,hostBindings:function NgbCarousel_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("keydown.arrowLeft",function NgbCarousel_keydown_arrowLeft_HostBindingHandler(){return ctx.keyboard&&ctx.arrowLeft();})("keydown.arrowRight",function NgbCarousel_keydown_arrowRight_HostBindingHandler(){return ctx.keyboard&&ctx.arrowRight();})("mouseenter",function NgbCarousel_mouseenter_HostBindingHandler(){return ctx.mouseHover=true;})("mouseleave",function NgbCarousel_mouseleave_HostBindingHandler(){return ctx.mouseHover=false;})("focusin",function NgbCarousel_focusin_HostBindingHandler(){return ctx.focused=true;})("focusout",function NgbCarousel_focusout_HostBindingHandler(){return ctx.focused=false;});}if(rf&2){i0.ɵɵattribute("aria-activedescendant","slide-"+ctx.activeId);i0.ɵɵstyleProp("display","block");}},inputs:{animation:"animation",activeId:"activeId",interval:"interval",wrap:"wrap",keyboard:"keyboard",pauseOnHover:"pauseOnHover",pauseOnFocus:"pauseOnFocus",showNavigationArrows:"showNavigationArrows",showNavigationIndicators:"showNavigationIndicators"},outputs:{slide:"slide",slid:"slid"},exportAs:["ngbCarousel"],standalone:true,features:[i0.ɵɵStandaloneFeature],decls:6,vars:6,consts:function(){let i18n_4;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @desc Currently selected slide number read by screen reader
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__5=goog.getMsg(" Slide {$interpolation} of {$interpolation_1} ",{"interpolation":"\uFFFD0\uFFFD","interpolation_1":"\uFFFD1\uFFFD"},{original_code:{"interpolation":"{{ i + 1 }}","interpolation_1":"{{ c }}"}});i18n_4=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__5;}else {i18n_4=$localize`:Currently selected slide number read by screen reader@@ngb.carousel.slide-number: Slide ${"\uFFFD0\uFFFD"}:INTERPOLATION: of ${"\uFFFD1\uFFFD"}:INTERPOLATION_1: `;}let i18n_6;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__7=goog.getMsg("Previous");i18n_6=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__7;}else {i18n_6=$localize`:@@ngb.carousel.previous:Previous`;}let i18n_8;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__9=goog.getMsg("Next");i18n_8=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__9;}else {i18n_8=$localize`:@@ngb.carousel.next:Next`;}return [["role","tablist",1,"carousel-indicators"],["type","button","data-bs-target","","role","tab",3,"active","click",4,"ngFor","ngForOf"],[1,"carousel-inner"],["class","carousel-item","role","tabpanel",3,"id",4,"ngFor","ngForOf"],["class","carousel-control-prev","type","button",3,"click",4,"ngIf"],["class","carousel-control-next","type","button",3,"click",4,"ngIf"],["type","button","data-bs-target","","role","tab",3,"click"],["role","tabpanel",1,"carousel-item",3,"id"],[1,"visually-hidden"],i18n_4,[3,"ngTemplateOutlet"],["type","button",1,"carousel-control-prev",3,"click"],["aria-hidden","true",1,"carousel-control-prev-icon"],i18n_6,["type","button",1,"carousel-control-next",3,"click"],["aria-hidden","true",1,"carousel-control-next-icon"],i18n_8];},template:function NgbCarousel_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",0);i0.ɵɵtemplate(1,NgbCarousel_button_1_Template,1,5,"button",1);i0.ɵɵelementEnd();i0.ɵɵelementStart(2,"div",2);i0.ɵɵtemplate(3,NgbCarousel_div_3_Template,4,4,"div",3);i0.ɵɵelementEnd();i0.ɵɵtemplate(4,NgbCarousel_button_4_Template,4,0,"button",4);i0.ɵɵtemplate(5,NgbCarousel_button_5_Template,4,0,"button",5);}if(rf&2){i0.ɵɵclassProp("visually-hidden",!ctx.showNavigationIndicators);i0.ɵɵadvance(1);i0.ɵɵproperty("ngForOf",ctx.slides);i0.ɵɵadvance(2);i0.ɵɵproperty("ngForOf",ctx.slides);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.showNavigationArrows);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.showNavigationArrows);}},dependencies:[NgFor,NgTemplateOutlet,NgIf],encapsulation:2,changeDetection:0});}} exports("NgbCarousel", NgbCarousel);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCarousel,[{type:Component,args:[{selector:'ngb-carousel',exportAs:'ngbCarousel',standalone:true,imports:[NgFor,NgTemplateOutlet,NgIf],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{class:'carousel slide','[style.display]':'"block"',tabIndex:'0','(keydown.arrowLeft)':'keyboard && arrowLeft()','(keydown.arrowRight)':'keyboard && arrowRight()','(mouseenter)':'mouseHover = true','(mouseleave)':'mouseHover = false','(focusin)':'focused = true','(focusout)':'focused = false','[attr.aria-activedescendant]':`'slide-' + activeId`},template:`
		<div class="carousel-indicators" [class.visually-hidden]="!showNavigationIndicators" role="tablist">
			<button
				type="button"
				data-bs-target
				*ngFor="let slide of slides"
				[class.active]="slide.id === activeId"
				role="tab"
				[attr.aria-labelledby]="'slide-' + slide.id"
				[attr.aria-controls]="'slide-' + slide.id"
				[attr.aria-selected]="slide.id === activeId"
				(click)="focus(); select(slide.id, NgbSlideEventSource.INDICATOR)"
			></button>
		</div>
		<div class="carousel-inner">
			<div
				*ngFor="let slide of slides; index as i; count as c"
				class="carousel-item"
				[id]="'slide-' + slide.id"
				role="tabpanel"
			>
				<span
					class="visually-hidden"
					i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number"
				>
					Slide {{ i + 1 }} of {{ c }}
				</span>
				<ng-template [ngTemplateOutlet]="slide.tplRef"></ng-template>
			</div>
		</div>
		<button class="carousel-control-prev" type="button" (click)="arrowLeft()" *ngIf="showNavigationArrows">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden" i18n="@@ngb.carousel.previous">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" (click)="arrowRight()" *ngIf="showNavigationArrows">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden" i18n="@@ngb.carousel.next">Next</span>
		</button>
	`}]}],function(){return [{type:NgbCarouselConfig},{type:undefined,decorators:[{type:Inject,args:[PLATFORM_ID]}]},{type:i0.NgZone},{type:i0.ChangeDetectorRef},{type:i0.ElementRef}];},{slides:[{type:ContentChildren,args:[NgbSlide]}],animation:[{type:Input}],activeId:[{type:Input}],interval:[{type:Input}],wrap:[{type:Input}],keyboard:[{type:Input}],pauseOnHover:[{type:Input}],pauseOnFocus:[{type:Input}],showNavigationArrows:[{type:Input}],showNavigationIndicators:[{type:Input}],slide:[{type:Output}],slid:[{type:Output}]});})();var NgbSlideEventSource; exports("NgbSlideEventSource", NgbSlideEventSource);(function(NgbSlideEventSource){NgbSlideEventSource["TIMER"]="timer";NgbSlideEventSource["ARROW_LEFT"]="arrowLeft";NgbSlideEventSource["ARROW_RIGHT"]="arrowRight";NgbSlideEventSource["INDICATOR"]="indicator";})(NgbSlideEventSource||(exports("NgbSlideEventSource", NgbSlideEventSource={})));class NgbCarouselModule{static{this.ɵfac=function NgbCarouselModule_Factory(t){return new(t||NgbCarouselModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbCarouselModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbCarouselModule", NgbCarouselModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCarouselModule,[{type:NgModule,args:[{imports:[NgbCarousel,NgbSlide],exports:[NgbCarousel,NgbSlide]}]}],null,null);})();class NgbCollapseModule{static{this.ɵfac=function NgbCollapseModule_Factory(t){return new(t||NgbCollapseModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbCollapseModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbCollapseModule", NgbCollapseModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCollapseModule,[{type:NgModule,args:[{imports:[NgbCollapse],exports:[NgbCollapse]}]}],null,null);})();/**
             * A simple class that represents a date that datepicker also uses internally.
             *
             * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
             * like `.equals()`, `.before()`, etc.
             *
             * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
             *
             * In many cases it is simpler to manipulate these objects together with
             * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
             *
             * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
             *
             * @since 3.0.0
             */class NgbDate{/**
                 * A **static method** that creates a new date object from the `NgbDateStruct`,
                 *
                 * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
                 *
                 * If the `date` is already of `NgbDate` type, the method will return the same object.
                 */static from(date){if(date instanceof NgbDate){return date;}return date?new NgbDate(date.year,date.month,date.day):null;}constructor(year,month,day){this.year=isInteger(year)?year:null;this.month=isInteger(month)?month:null;this.day=isInteger(day)?day:null;}/**
                 * Checks if the current date is equal to another date.
                 */equals(other){return other!=null&&this.year===other.year&&this.month===other.month&&this.day===other.day;}/**
                 * Checks if the current date is before another date.
                 */before(other){if(!other){return false;}if(this.year===other.year){if(this.month===other.month){return this.day===other.day?false:this.day<other.day;}else {return this.month<other.month;}}else {return this.year<other.year;}}/**
                 * Checks if the current date is after another date.
                 */after(other){if(!other){return false;}if(this.year===other.year){if(this.month===other.month){return this.day===other.day?false:this.day>other.day;}else {return this.month>other.month;}}else {return this.year>other.year;}}} exports("NgbDate", NgbDate);function isChangedDate(prev,next){return !dateComparator(prev,next);}function isChangedMonth(prev,next){return !prev&&!next?false:!prev||!next?true:prev.year!==next.year||prev.month!==next.month;}function dateComparator(prev,next){return !prev&&!next||!!prev&&!!next&&prev.equals(next);}function checkMinBeforeMax(minDate,maxDate){if(maxDate&&minDate&&maxDate.before(minDate)){throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);}}function checkDateInRange(date,minDate,maxDate){if(date&&minDate&&date.before(minDate)){return minDate;}if(date&&maxDate&&date.after(maxDate)){return maxDate;}return date||null;}function isDateSelectable(date,state){const{minDate,maxDate,disabled,markDisabled}=state;return !(date===null||date===undefined||disabled||markDisabled&&markDisabled(date,{year:date.year,month:date.month})||minDate&&date.before(minDate)||maxDate&&date.after(maxDate));}function generateSelectBoxMonths(calendar,date,minDate,maxDate){if(!date){return [];}let months=calendar.getMonths(date.year);if(minDate&&date.year===minDate.year){const index=months.findIndex(month=>month===minDate.month);months=months.slice(index);}if(maxDate&&date.year===maxDate.year){const index=months.findIndex(month=>month===maxDate.month);months=months.slice(0,index+1);}return months;}function generateSelectBoxYears(date,minDate,maxDate){if(!date){return [];}const start=minDate?Math.max(minDate.year,date.year-500):date.year-10;const end=maxDate?Math.min(maxDate.year,date.year+500):date.year+10;const length=end-start+1;const numbers=Array(length);for(let i=0;i<length;i++){numbers[i]=start+i;}return numbers;}function nextMonthDisabled(calendar,date,maxDate){const nextDate=Object.assign(calendar.getNext(date,'m'),{day:1});return maxDate!=null&&nextDate.after(maxDate);}function prevMonthDisabled(calendar,date,minDate){const prevDate=Object.assign(calendar.getPrev(date,'m'),{day:1});return minDate!=null&&(prevDate.year===minDate.year&&prevDate.month<minDate.month||prevDate.year<minDate.year&&minDate.month===1);}function buildMonths(calendar,date,state,i18n,force){const{displayMonths,months}=state;// move old months to a temporary array
            const monthsToReuse=months.splice(0,months.length);// generate new first dates, nullify or reuse months
            const firstDates=Array.from({length:displayMonths},(_,i)=>{const firstDate=Object.assign(calendar.getNext(date,'m',i),{day:1});months[i]=null;if(!force){const reusedIndex=monthsToReuse.findIndex(month=>month.firstDate.equals(firstDate));// move reused month back to months
            if(reusedIndex!==-1){months[i]=monthsToReuse.splice(reusedIndex,1)[0];}}return firstDate;});// rebuild nullified months
            firstDates.forEach((firstDate,i)=>{if(months[i]===null){months[i]=buildMonth(calendar,firstDate,state,i18n,monthsToReuse.shift()||{});}});return months;}function buildMonth(calendar,date,state,i18n,month={}){const{dayTemplateData,minDate,maxDate,firstDayOfWeek,markDisabled,outsideDays,weekdayWidth,weekdaysVisible}=state;const calendarToday=calendar.getToday();month.firstDate=null;month.lastDate=null;month.number=date.month;month.year=date.year;month.weeks=month.weeks||[];month.weekdays=month.weekdays||[];date=getFirstViewDate(calendar,date,firstDayOfWeek);// clearing weekdays, if not visible
            if(!weekdaysVisible){month.weekdays.length=0;}// month has weeks
            for(let week=0;week<calendar.getWeeksPerMonth();week++){let weekObject=month.weeks[week];if(!weekObject){weekObject=month.weeks[week]={number:0,days:[],collapsed:true};}const days=weekObject.days;// week has days
            for(let day=0;day<calendar.getDaysPerWeek();day++){if(week===0&&weekdaysVisible){month.weekdays[day]=i18n.getWeekdayLabel(calendar.getWeekday(date),weekdayWidth);}const newDate=new NgbDate(date.year,date.month,date.day);const nextDate=calendar.getNext(newDate);const ariaLabel=i18n.getDayAriaLabel(newDate);// marking date as disabled
            let disabled=!!(minDate&&newDate.before(minDate)||maxDate&&newDate.after(maxDate));if(!disabled&&markDisabled){disabled=markDisabled(newDate,{month:month.number,year:month.year});}// today
            let today=newDate.equals(calendarToday);// adding user-provided data to the context
            let contextUserData=dayTemplateData?dayTemplateData(newDate,{month:month.number,year:month.year}):undefined;// saving first date of the month
            if(month.firstDate===null&&newDate.month===month.number){month.firstDate=newDate;}// saving last date of the month
            if(newDate.month===month.number&&nextDate.month!==month.number){month.lastDate=newDate;}let dayObject=days[day];if(!dayObject){dayObject=days[day]={};}dayObject.date=newDate;dayObject.context=Object.assign(dayObject.context||{},{$implicit:newDate,date:newDate,data:contextUserData,currentMonth:month.number,currentYear:month.year,disabled,focused:false,selected:false,today});dayObject.tabindex=-1;dayObject.ariaLabel=ariaLabel;dayObject.hidden=false;date=nextDate;}weekObject.number=calendar.getWeekNumber(days.map(day=>day.date),firstDayOfWeek);// marking week as collapsed
            weekObject.collapsed=outsideDays==='collapsed'&&days[0].date.month!==month.number&&days[days.length-1].date.month!==month.number;}return month;}function getFirstViewDate(calendar,date,firstDayOfWeek){const daysPerWeek=calendar.getDaysPerWeek();const firstMonthDate=new NgbDate(date.year,date.month,1);const dayOfWeek=calendar.getWeekday(firstMonthDate)%daysPerWeek;return calendar.getPrev(firstMonthDate,'d',(daysPerWeek+dayOfWeek-firstDayOfWeek)%daysPerWeek);}function fromJSDate(jsDate){return new NgbDate(jsDate.getFullYear(),jsDate.getMonth()+1,jsDate.getDate());}function toJSDate(date){const jsDate=new Date(date.year,date.month-1,date.day,12);// this is done avoid 30 -> 1930 conversion
            if(!isNaN(jsDate.getTime())){jsDate.setFullYear(date.year);}return jsDate;}function NGB_DATEPICKER_CALENDAR_FACTORY(){return new NgbCalendarGregorian();}/**
             * A service that represents the calendar used by the datepicker.
             *
             * The default implementation uses the Gregorian calendar. You can inject it in your own
             * implementations if necessary to simplify `NgbDate` calculations.
             */class NgbCalendar{static{this.ɵfac=function NgbCalendar_Factory(t){return new(t||NgbCalendar)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendar,factory:function(){return NGB_DATEPICKER_CALENDAR_FACTORY();},providedIn:'root'});}} exports("NgbCalendar", NgbCalendar);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendar,[{type:Injectable,args:[{providedIn:'root',useFactory:NGB_DATEPICKER_CALENDAR_FACTORY}]}],null,null);})();class NgbCalendarGregorian extends NgbCalendar{getDaysPerWeek(){return 7;}getMonths(){return [1,2,3,4,5,6,7,8,9,10,11,12];}getWeeksPerMonth(){return 6;}getNext(date,period='d',number=1){let jsDate=toJSDate(date);let checkMonth=true;let expectedMonth=jsDate.getMonth();switch(period){case'y':jsDate.setFullYear(jsDate.getFullYear()+number);break;case'm':expectedMonth+=number;jsDate.setMonth(expectedMonth);expectedMonth=expectedMonth%12;if(expectedMonth<0){expectedMonth=expectedMonth+12;}break;case'd':jsDate.setDate(jsDate.getDate()+number);checkMonth=false;break;default:return date;}if(checkMonth&&jsDate.getMonth()!==expectedMonth){// this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);}return fromJSDate(jsDate);}getPrev(date,period='d',number=1){return this.getNext(date,period,-number);}getWeekday(date){let jsDate=toJSDate(date);let day=jsDate.getDay();// in JS Date Sun=0, in ISO 8601 Sun=7
            return day===0?7:day;}getWeekNumber(week,firstDayOfWeek){// in JS Date Sun=0, in ISO 8601 Sun=7
            if(firstDayOfWeek===7){firstDayOfWeek=0;}const thursdayIndex=(4+7-firstDayOfWeek)%7;let date=week[thursdayIndex];const jsDate=toJSDate(date);jsDate.setDate(jsDate.getDate()+4-(jsDate.getDay()||7));// Thursday
            const time=jsDate.getTime();jsDate.setMonth(0);// Compare with Jan 1
            jsDate.setDate(1);return Math.floor(Math.round((time-jsDate.getTime())/86400000)/7)+1;}getToday(){return fromJSDate(new Date());}isValid(date){if(!date||!isInteger(date.year)||!isInteger(date.month)||!isInteger(date.day)){return false;}// year 0 doesn't exist in Gregorian calendar
            if(date.year===0){return false;}const jsDate=toJSDate(date);return !isNaN(jsDate.getTime())&&jsDate.getFullYear()===date.year&&jsDate.getMonth()+1===date.month&&jsDate.getDate()===date.day;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbCalendarGregorian_BaseFactory;return function NgbCalendarGregorian_Factory(t){return (ɵNgbCalendarGregorian_BaseFactory||(ɵNgbCalendarGregorian_BaseFactory=i0.ɵɵgetInheritedFactory(NgbCalendarGregorian)))(t||NgbCalendarGregorian);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendarGregorian,factory:NgbCalendarGregorian.ɵfac});}} exports("NgbCalendarGregorian", NgbCalendarGregorian);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendarGregorian,[{type:Injectable}],null,null);})();function NGB_DATEPICKER_18N_FACTORY(locale){return new NgbDatepickerI18nDefault(locale);}/**
             * A service supplying i18n data to the datepicker component.
             *
             * The default implementation of this service uses the Angular locale and registered locale data for
             * weekdays and month names (as explained in the Angular i18n guide).
             *
             * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
             * numerals. For other static labels the datepicker uses the default Angular i18n.
             *
             * See the [i18n demo](#/components/datepicker/examples#i18n) and
             * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
             * a custom provider for i18n.
             */class NgbDatepickerI18n{/**
                 * Returns the text label to display above the day view.
                 *
                 * @since 9.1.0
                 */getMonthLabel(date){return `${this.getMonthFullName(date.month,date.year)} ${this.getYearNumerals(date.year)}`;}/**
                 * Returns the textual representation of a day that is rendered in a day cell.
                 *
                 * @since 3.0.0
                 */getDayNumerals(date){return `${date.day}`;}/**
                 * Returns the textual representation of a week number rendered by datepicker.
                 *
                 * @since 3.0.0
                 */getWeekNumerals(weekNumber){return `${weekNumber}`;}/**
                 * Returns the textual representation of a year that is rendered in the datepicker year select box.
                 *
                 * @since 3.0.0
                 */getYearNumerals(year){return `${year}`;}/**
                 * Returns the week label to display in the heading of the month view.
                 *
                 * @since 9.1.0
                 */getWeekLabel(){return '';}static{this.ɵfac=function NgbDatepickerI18n_Factory(t){return new(t||NgbDatepickerI18n)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDatepickerI18n,factory:function NgbDatepickerI18n_Factory(t){let r=null;if(t){r=new t();}else {r=NGB_DATEPICKER_18N_FACTORY(i0.ɵɵinject(LOCALE_ID));}return r;},providedIn:'root'});}} exports("NgbDatepickerI18n", NgbDatepickerI18n);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerI18n,[{type:Injectable,args:[{providedIn:'root',useFactory:NGB_DATEPICKER_18N_FACTORY,deps:[LOCALE_ID]}]}],null,null);})();/**
             * A service providing default implementation for the datepicker i18n.
             * It can be used as a base implementation if necessary.
             *
             * @since 9.1.0
             */class NgbDatepickerI18nDefault extends NgbDatepickerI18n{constructor(_locale){super();this._locale=_locale;this._monthsShort=getLocaleMonthNames(_locale,FormStyle.Standalone,TranslationWidth.Abbreviated);this._monthsFull=getLocaleMonthNames(_locale,FormStyle.Standalone,TranslationWidth.Wide);}getWeekdayLabel(weekday,width){const weekdaysStartingOnSunday=getLocaleDayNames(this._locale,FormStyle.Standalone,width===undefined?TranslationWidth.Short:width);const weekdays=weekdaysStartingOnSunday.map((day,index)=>weekdaysStartingOnSunday[(index+1)%7]);return weekdays[weekday-1]||'';}getMonthShortName(month){return this._monthsShort[month-1]||'';}getMonthFullName(month){return this._monthsFull[month-1]||'';}getDayAriaLabel(date){const jsDate=new Date(date.year,date.month-1,date.day);return formatDate(jsDate,'fullDate',this._locale);}static{this.ɵfac=function NgbDatepickerI18nDefault_Factory(t){return new(t||NgbDatepickerI18nDefault)(i0.ɵɵinject(LOCALE_ID));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDatepickerI18nDefault,factory:NgbDatepickerI18nDefault.ɵfac});}} exports("NgbDatepickerI18nDefault", NgbDatepickerI18nDefault);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerI18nDefault,[{type:Injectable}],function(){return [{type:undefined,decorators:[{type:Inject,args:[LOCALE_ID]}]}];},null);})();class NgbDatepickerService{get model$(){return this._model$.pipe(filter(model=>model.months.length>0));}get dateSelect$(){return this._dateSelect$.pipe(filter(date=>date!==null));}set(options){let patch=Object.keys(options).map(key=>this._VALIDATORS[key](options[key])).reduce((obj,part)=>({...obj,...part}),{});if(Object.keys(patch).length>0){this._nextState(patch);}}constructor(_calendar,_i18n){this._calendar=_calendar;this._i18n=_i18n;this._VALIDATORS={dayTemplateData:dayTemplateData=>{if(this._state.dayTemplateData!==dayTemplateData){return {dayTemplateData};}},displayMonths:displayMonths=>{displayMonths=toInteger(displayMonths);if(isInteger(displayMonths)&&displayMonths>0&&this._state.displayMonths!==displayMonths){return {displayMonths};}},disabled:disabled=>{if(this._state.disabled!==disabled){return {disabled};}},firstDayOfWeek:firstDayOfWeek=>{firstDayOfWeek=toInteger(firstDayOfWeek);if(isInteger(firstDayOfWeek)&&firstDayOfWeek>=0&&this._state.firstDayOfWeek!==firstDayOfWeek){return {firstDayOfWeek};}},focusVisible:focusVisible=>{if(this._state.focusVisible!==focusVisible&&!this._state.disabled){return {focusVisible};}},markDisabled:markDisabled=>{if(this._state.markDisabled!==markDisabled){return {markDisabled};}},maxDate:date=>{const maxDate=this.toValidDate(date,null);if(isChangedDate(this._state.maxDate,maxDate)){return {maxDate};}},minDate:date=>{const minDate=this.toValidDate(date,null);if(isChangedDate(this._state.minDate,minDate)){return {minDate};}},navigation:navigation=>{if(this._state.navigation!==navigation){return {navigation};}},outsideDays:outsideDays=>{if(this._state.outsideDays!==outsideDays){return {outsideDays};}},weekdays:weekdays=>{const weekdayWidth=weekdays===true||weekdays===false?TranslationWidth.Short:weekdays;const weekdaysVisible=weekdays===true||weekdays===false?weekdays:true;if(this._state.weekdayWidth!==weekdayWidth||this._state.weekdaysVisible!==weekdaysVisible){return {weekdayWidth,weekdaysVisible};}}};this._model$=new Subject();this._dateSelect$=new Subject();this._state={dayTemplateData:null,markDisabled:null,maxDate:null,minDate:null,disabled:false,displayMonths:1,firstDate:null,firstDayOfWeek:1,lastDate:null,focusDate:null,focusVisible:false,months:[],navigation:'select',outsideDays:'visible',prevDisabled:false,nextDisabled:false,selectedDate:null,selectBoxes:{years:[],months:[]},weekdayWidth:TranslationWidth.Short,weekdaysVisible:true};}focus(date){const focusedDate=this.toValidDate(date,null);if(focusedDate!=null&&!this._state.disabled&&isChangedDate(this._state.focusDate,focusedDate)){this._nextState({focusDate:date});}}focusSelect(){if(isDateSelectable(this._state.focusDate,this._state)){this.select(this._state.focusDate,{emitEvent:true});}}open(date){const firstDate=this.toValidDate(date,this._calendar.getToday());if(firstDate!=null&&!this._state.disabled&&(!this._state.firstDate||isChangedMonth(this._state.firstDate,firstDate))){this._nextState({firstDate});}}select(date,options={}){const selectedDate=this.toValidDate(date,null);if(selectedDate!=null&&!this._state.disabled){if(isChangedDate(this._state.selectedDate,selectedDate)){this._nextState({selectedDate});}if(options.emitEvent&&isDateSelectable(selectedDate,this._state)){this._dateSelect$.next(selectedDate);}}}toValidDate(date,defaultValue){const ngbDate=NgbDate.from(date);if(defaultValue===undefined){defaultValue=this._calendar.getToday();}return this._calendar.isValid(ngbDate)?ngbDate:defaultValue;}getMonth(struct){for(let month of this._state.months){if(struct.month===month.number&&struct.year===month.year){return month;}}throw new Error(`month ${struct.month} of year ${struct.year} not found`);}_nextState(patch){const newState=this._updateState(patch);this._patchContexts(newState);this._state=newState;this._model$.next(this._state);}_patchContexts(state){const{months,displayMonths,selectedDate,focusDate,focusVisible,disabled,outsideDays}=state;state.months.forEach(month=>{month.weeks.forEach(week=>{week.days.forEach(day=>{// patch focus flag
            if(focusDate){day.context.focused=focusDate.equals(day.date)&&focusVisible;}// calculating tabindex
            day.tabindex=!disabled&&focusDate&&day.date.equals(focusDate)&&focusDate.month===month.number?0:-1;// override context disabled
            if(disabled===true){day.context.disabled=true;}// patch selection flag
            if(selectedDate!==undefined){day.context.selected=selectedDate!==null&&selectedDate.equals(day.date);}// visibility
            if(month.number!==day.date.month){day.hidden=outsideDays==='hidden'||outsideDays==='collapsed'||displayMonths>1&&day.date.after(months[0].firstDate)&&day.date.before(months[displayMonths-1].lastDate);}});});});}_updateState(patch){// patching fields
            const state=Object.assign({},this._state,patch);let startDate=state.firstDate;// min/max dates changed
            if('minDate'in patch||'maxDate'in patch){checkMinBeforeMax(state.minDate,state.maxDate);state.focusDate=checkDateInRange(state.focusDate,state.minDate,state.maxDate);state.firstDate=checkDateInRange(state.firstDate,state.minDate,state.maxDate);startDate=state.focusDate;}// disabled
            if('disabled'in patch){state.focusVisible=false;}// initial rebuild via 'select()'
            if('selectedDate'in patch&&this._state.months.length===0){startDate=state.selectedDate;}// terminate early if only focus visibility was changed
            if('focusVisible'in patch){return state;}// focus date changed
            if('focusDate'in patch){state.focusDate=checkDateInRange(state.focusDate,state.minDate,state.maxDate);startDate=state.focusDate;// nothing to rebuild if only focus changed and it is still visible
            if(state.months.length!==0&&state.focusDate&&!state.focusDate.before(state.firstDate)&&!state.focusDate.after(state.lastDate)){return state;}}// first date changed
            if('firstDate'in patch){state.firstDate=checkDateInRange(state.firstDate,state.minDate,state.maxDate);startDate=state.firstDate;}// rebuilding months
            if(startDate){const forceRebuild='dayTemplateData'in patch||'firstDayOfWeek'in patch||'markDisabled'in patch||'minDate'in patch||'maxDate'in patch||'disabled'in patch||'outsideDays'in patch||'weekdaysVisible'in patch;const months=buildMonths(this._calendar,startDate,state,this._i18n,forceRebuild);// updating months and boundary dates
            state.months=months;state.firstDate=months[0].firstDate;state.lastDate=months[months.length-1].lastDate;// reset selected date if 'markDisabled' returns true
            if('selectedDate'in patch&&!isDateSelectable(state.selectedDate,state)){state.selectedDate=null;}// adjusting focus after months were built
            if('firstDate'in patch){if(!state.focusDate||state.focusDate.before(state.firstDate)||state.focusDate.after(state.lastDate)){state.focusDate=startDate;}}// adjusting months/years for the select box navigation
            const yearChanged=!this._state.firstDate||this._state.firstDate.year!==state.firstDate.year;const monthChanged=!this._state.firstDate||this._state.firstDate.month!==state.firstDate.month;if(state.navigation==='select'){// years ->  boundaries (min/max were changed)
            if('minDate'in patch||'maxDate'in patch||state.selectBoxes.years.length===0||yearChanged){state.selectBoxes.years=generateSelectBoxYears(state.firstDate,state.minDate,state.maxDate);}// months -> when current year or boundaries change
            if('minDate'in patch||'maxDate'in patch||state.selectBoxes.months.length===0||yearChanged){state.selectBoxes.months=generateSelectBoxMonths(this._calendar,state.firstDate,state.minDate,state.maxDate);}}else {state.selectBoxes={years:[],months:[]};}// updating navigation arrows -> boundaries change (min/max) or month/year changes
            if((state.navigation==='arrows'||state.navigation==='select')&&(monthChanged||yearChanged||'minDate'in patch||'maxDate'in patch||'disabled'in patch)){state.prevDisabled=state.disabled||prevMonthDisabled(this._calendar,state.firstDate,state.minDate);state.nextDisabled=state.disabled||nextMonthDisabled(this._calendar,state.lastDate,state.maxDate);}}return state;}static{this.ɵfac=function NgbDatepickerService_Factory(t){return new(t||NgbDatepickerService)(i0.ɵɵinject(NgbCalendar),i0.ɵɵinject(NgbDatepickerI18n));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDatepickerService,factory:NgbDatepickerService.ɵfac});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerService,[{type:Injectable}],function(){return [{type:NgbCalendar},{type:NgbDatepickerI18n}];},null);})();var NavigationEvent;(function(NavigationEvent){NavigationEvent[NavigationEvent["PREV"]=0]="PREV";NavigationEvent[NavigationEvent["NEXT"]=1]="NEXT";})(NavigationEvent||(NavigationEvent={}));class NgbDatepickerDayView{constructor(i18n){this.i18n=i18n;}isMuted(){return !this.selected&&(this.date.month!==this.currentMonth||this.disabled);}static{this.ɵfac=function NgbDatepickerDayView_Factory(t){return new(t||NgbDatepickerDayView)(i0.ɵɵdirectiveInject(NgbDatepickerI18n));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbDatepickerDayView,selectors:[["","ngbDatepickerDayView",""]],hostAttrs:[1,"btn-light"],hostVars:10,hostBindings:function NgbDatepickerDayView_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("bg-primary",ctx.selected)("text-white",ctx.selected)("text-muted",ctx.isMuted())("outside",ctx.isMuted())("active",ctx.focused);}},inputs:{currentMonth:"currentMonth",date:"date",disabled:"disabled",focused:"focused",selected:"selected"},standalone:true,features:[i0.ɵɵStandaloneFeature],attrs:_c10,decls:1,vars:1,template:function NgbDatepickerDayView_Template(rf,ctx){if(rf&1){i0.ɵɵtext(0);}if(rf&2){i0.ɵɵtextInterpolate(ctx.i18n.getDayNumerals(ctx.date));}},styles:["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-btn-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"],encapsulation:2,changeDetection:0});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerDayView,[{type:Component,args:[{selector:'[ngbDatepickerDayView]',standalone:true,changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{class:'btn-light','[class.bg-primary]':'selected','[class.text-white]':'selected','[class.text-muted]':'isMuted()','[class.outside]':'isMuted()','[class.active]':'focused'},template:`{{ i18n.getDayNumerals(date) }}`,styles:["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-btn-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"]}]}],function(){return [{type:NgbDatepickerI18n}];},{currentMonth:[{type:Input}],date:[{type:Input}],disabled:[{type:Input}],focused:[{type:Input}],selected:[{type:Input}]});})();class NgbDatepickerNavigationSelect{constructor(i18n,_renderer){this.i18n=i18n;this._renderer=_renderer;this.select=new EventEmitter();this._month=-1;this._year=-1;}changeMonth(month){this.select.emit(new NgbDate(this.date.year,toInteger(month),1));}changeYear(year){this.select.emit(new NgbDate(toInteger(year),this.date.month,1));}ngAfterViewChecked(){if(this.date){if(this.date.month!==this._month){this._month=this.date.month;this._renderer.setProperty(this.monthSelect.nativeElement,'value',this._month);}if(this.date.year!==this._year){this._year=this.date.year;this._renderer.setProperty(this.yearSelect.nativeElement,'value',this._year);}}}static{this.ɵfac=function NgbDatepickerNavigationSelect_Factory(t){return new(t||NgbDatepickerNavigationSelect)(i0.ɵɵdirectiveInject(NgbDatepickerI18n),i0.ɵɵdirectiveInject(i0.Renderer2));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbDatepickerNavigationSelect,selectors:[["ngb-datepicker-navigation-select"]],viewQuery:function NgbDatepickerNavigationSelect_Query(rf,ctx){if(rf&1){i0.ɵɵviewQuery(_c11,7,ElementRef);i0.ɵɵviewQuery(_c12,7,ElementRef);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.monthSelect=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.yearSelect=_t.first);}},inputs:{date:"date",disabled:"disabled",months:"months",years:"years"},outputs:{select:"select"},standalone:true,features:[i0.ɵɵStandaloneFeature],decls:6,vars:4,consts:function(){let i18n_13;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_14=goog.getMsg("Select month");i18n_13=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_14;}else {i18n_13=$localize`:@@ngb.datepicker.select-month:Select month`;}let i18n_15;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_16=goog.getMsg("Select month");i18n_15=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_16;}else {i18n_15=$localize`:@@ngb.datepicker.select-month:Select month`;}let i18n_17;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_18=goog.getMsg("Select year");i18n_17=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_18;}else {i18n_17=$localize`:@@ngb.datepicker.select-year:Select year`;}let i18n_19;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_20=goog.getMsg("Select year");i18n_19=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_20;}else {i18n_19=$localize`:@@ngb.datepicker.select-year:Select year`;}return [["aria-label",i18n_13,"title",i18n_15,1,"form-select",3,"disabled","change"],["month",""],[3,"value",4,"ngFor","ngForOf"],["aria-label",i18n_17,"title",i18n_19,1,"form-select",3,"disabled","change"],["year",""],[3,"value"]];},template:function NgbDatepickerNavigationSelect_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"select",0,1);i0.ɵɵlistener("change",function NgbDatepickerNavigationSelect_Template_select_change_0_listener($event){return ctx.changeMonth($event.target.value);});i0.ɵɵtemplate(2,NgbDatepickerNavigationSelect_option_2_Template,2,3,"option",2);i0.ɵɵelementEnd();i0.ɵɵelementStart(3,"select",3,4);i0.ɵɵlistener("change",function NgbDatepickerNavigationSelect_Template_select_change_3_listener($event){return ctx.changeYear($event.target.value);});i0.ɵɵtemplate(5,NgbDatepickerNavigationSelect_option_5_Template,2,2,"option",2);i0.ɵɵelementEnd();}if(rf&2){i0.ɵɵproperty("disabled",ctx.disabled);i0.ɵɵadvance(2);i0.ɵɵproperty("ngForOf",ctx.months);i0.ɵɵadvance(1);i0.ɵɵproperty("disabled",ctx.disabled);i0.ɵɵadvance(2);i0.ɵɵproperty("ngForOf",ctx.years);}},dependencies:[NgFor],styles:["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"],encapsulation:2,changeDetection:0});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerNavigationSelect,[{type:Component,args:[{selector:'ngb-datepicker-navigation-select',standalone:true,imports:[NgFor],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,template:`
		<select
			#month
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-month"
			aria-label="Select month"
			i18n-title="@@ngb.datepicker.select-month"
			title="Select month"
			(change)="changeMonth($any($event).target.value)"
		>
			<option *ngFor="let m of months" [attr.aria-label]="i18n.getMonthFullName(m, date.year)" [value]="m">{{
				i18n.getMonthShortName(m, date.year)
			}}</option> </select
		><select
			#year
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-year"
			aria-label="Select year"
			i18n-title="@@ngb.datepicker.select-year"
			title="Select year"
			(change)="changeYear($any($event).target.value)"
		>
			<option *ngFor="let y of years" [value]="y">{{ i18n.getYearNumerals(y) }}</option>
		</select>
	`,styles:["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"]}]}],function(){return [{type:NgbDatepickerI18n},{type:i0.Renderer2}];},{date:[{type:Input}],disabled:[{type:Input}],months:[{type:Input}],years:[{type:Input}],select:[{type:Output}],monthSelect:[{type:ViewChild,args:['month',{static:true,read:ElementRef}]}],yearSelect:[{type:ViewChild,args:['year',{static:true,read:ElementRef}]}]});})();class NgbDatepickerNavigation{constructor(i18n){this.i18n=i18n;this.navigation=NavigationEvent;this.months=[];this.navigate=new EventEmitter();this.select=new EventEmitter();}onClickPrev(event){event.currentTarget.focus();this.navigate.emit(this.navigation.PREV);}onClickNext(event){event.currentTarget.focus();this.navigate.emit(this.navigation.NEXT);}static{this.ɵfac=function NgbDatepickerNavigation_Factory(t){return new(t||NgbDatepickerNavigation)(i0.ɵɵdirectiveInject(NgbDatepickerI18n));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbDatepickerNavigation,selectors:[["ngb-datepicker-navigation"]],inputs:{date:"date",disabled:"disabled",months:"months",showSelect:"showSelect",prevDisabled:"prevDisabled",nextDisabled:"nextDisabled",selectBoxes:"selectBoxes"},outputs:{navigate:"navigate",select:"select"},standalone:true,features:[i0.ɵɵStandaloneFeature],decls:8,vars:4,consts:function(){let i18n_21;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_22=goog.getMsg("Previous month");i18n_21=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_22;}else {i18n_21=$localize`:@@ngb.datepicker.previous-month:Previous month`;}let i18n_23;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_24=goog.getMsg("Previous month");i18n_23=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_24;}else {i18n_23=$localize`:@@ngb.datepicker.previous-month:Previous month`;}let i18n_25;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_26=goog.getMsg("Next month");i18n_25=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_26;}else {i18n_25=$localize`:@@ngb.datepicker.next-month:Next month`;}let i18n_27;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_28=goog.getMsg("Next month");i18n_27=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_28;}else {i18n_27=$localize`:@@ngb.datepicker.next-month:Next month`;}return [[1,"ngb-dp-arrow","ngb-dp-arrow-prev"],["type","button","aria-label",i18n_21,"title",i18n_23,1,"btn","btn-link","ngb-dp-arrow-btn",3,"disabled","click"],[1,"ngb-dp-navigation-chevron"],["class","ngb-dp-navigation-select",3,"date","disabled","months","years","select",4,"ngIf"],[4,"ngIf"],[1,"ngb-dp-arrow","ngb-dp-arrow-next"],["type","button","aria-label",i18n_25,"title",i18n_27,1,"btn","btn-link","ngb-dp-arrow-btn",3,"disabled","click"],[1,"ngb-dp-navigation-select",3,"date","disabled","months","years","select"],["ngFor","",3,"ngForOf"],["class","ngb-dp-arrow",4,"ngIf"],[1,"ngb-dp-month-name"],[1,"ngb-dp-arrow"]];},template:function NgbDatepickerNavigation_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"div",0)(1,"button",1);i0.ɵɵlistener("click",function NgbDatepickerNavigation_Template_button_click_1_listener($event){return ctx.onClickPrev($event);});i0.ɵɵelement(2,"span",2);i0.ɵɵelementEnd()();i0.ɵɵtemplate(3,NgbDatepickerNavigation_ngb_datepicker_navigation_select_3_Template,1,4,"ngb-datepicker-navigation-select",3);i0.ɵɵtemplate(4,NgbDatepickerNavigation_4_Template,1,1,null,4);i0.ɵɵelementStart(5,"div",5)(6,"button",6);i0.ɵɵlistener("click",function NgbDatepickerNavigation_Template_button_click_6_listener($event){return ctx.onClickNext($event);});i0.ɵɵelement(7,"span",2);i0.ɵɵelementEnd()();}if(rf&2){i0.ɵɵadvance(1);i0.ɵɵproperty("disabled",ctx.prevDisabled);i0.ɵɵadvance(2);i0.ɵɵproperty("ngIf",ctx.showSelect);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",!ctx.showSelect);i0.ɵɵadvance(2);i0.ɵɵproperty("disabled",ctx.nextDisabled);}},dependencies:[NgIf,NgFor,NgbDatepickerNavigationSelect],styles:["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"],encapsulation:2,changeDetection:0});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerNavigation,[{type:Component,args:[{selector:'ngb-datepicker-navigation',standalone:true,imports:[NgIf,NgFor,NgbDatepickerNavigationSelect],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,template:`
		<div class="ngb-dp-arrow ngb-dp-arrow-prev">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickPrev($event)"
				[disabled]="prevDisabled"
				i18n-aria-label="@@ngb.datepicker.previous-month"
				aria-label="Previous month"
				i18n-title="@@ngb.datepicker.previous-month"
				title="Previous month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
		<ngb-datepicker-navigation-select
			*ngIf="showSelect"
			class="ngb-dp-navigation-select"
			[date]="date"
			[disabled]="disabled"
			[months]="selectBoxes.months"
			[years]="selectBoxes.years"
			(select)="select.emit($event)"
		>
		</ngb-datepicker-navigation-select>

		<ng-template *ngIf="!showSelect" ngFor let-month [ngForOf]="months" let-i="index">
			<div class="ngb-dp-arrow" *ngIf="i > 0"></div>
			<div class="ngb-dp-month-name">
				{{ i18n.getMonthLabel(month.firstDate) }}
			</div>
			<div class="ngb-dp-arrow" *ngIf="i !== months.length - 1"></div>
		</ng-template>
		<div class="ngb-dp-arrow ngb-dp-arrow-next">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickNext($event)"
				[disabled]="nextDisabled"
				i18n-aria-label="@@ngb.datepicker.next-month"
				aria-label="Next month"
				i18n-title="@@ngb.datepicker.next-month"
				title="Next month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
	`,styles:["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"]}]}],function(){return [{type:NgbDatepickerI18n}];},{date:[{type:Input}],disabled:[{type:Input}],months:[{type:Input}],showSelect:[{type:Input}],prevDisabled:[{type:Input}],nextDisabled:[{type:Input}],selectBoxes:[{type:Input}],navigate:[{type:Output}],select:[{type:Output}]});})();var Key;(function(Key){Key[Key["Tab"]=9]="Tab";Key[Key["Enter"]=13]="Enter";Key[Key["Escape"]=27]="Escape";Key[Key["Space"]=32]="Space";Key[Key["PageUp"]=33]="PageUp";Key[Key["PageDown"]=34]="PageDown";Key[Key["End"]=35]="End";Key[Key["Home"]=36]="Home";Key[Key["ArrowLeft"]=37]="ArrowLeft";Key[Key["ArrowUp"]=38]="ArrowUp";Key[Key["ArrowRight"]=39]="ArrowRight";Key[Key["ArrowDown"]=40]="ArrowDown";})(Key||(Key={}));/**
             * A service that represents the keyboard navigation.
             *
             * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
             *
             * @since 5.2.0
             */class NgbDatepickerKeyboardService{/**
                 * Processes a keyboard event.
                 */processKey(event,datepicker){const{state,calendar}=datepicker;/* eslint-disable-next-line deprecation/deprecation */switch(event.which){case Key.PageUp:datepicker.focusDate(calendar.getPrev(state.focusedDate,event.shiftKey?'y':'m',1));break;case Key.PageDown:datepicker.focusDate(calendar.getNext(state.focusedDate,event.shiftKey?'y':'m',1));break;case Key.End:datepicker.focusDate(event.shiftKey?state.maxDate:state.lastDate);break;case Key.Home:datepicker.focusDate(event.shiftKey?state.minDate:state.firstDate);break;case Key.ArrowLeft:datepicker.focusDate(calendar.getPrev(state.focusedDate,'d',1));break;case Key.ArrowUp:datepicker.focusDate(calendar.getPrev(state.focusedDate,'d',calendar.getDaysPerWeek()));break;case Key.ArrowRight:datepicker.focusDate(calendar.getNext(state.focusedDate,'d',1));break;case Key.ArrowDown:datepicker.focusDate(calendar.getNext(state.focusedDate,'d',calendar.getDaysPerWeek()));break;case Key.Enter:case Key.Space:datepicker.focusSelect();break;default:return;}event.preventDefault();event.stopPropagation();}static{this.ɵfac=function NgbDatepickerKeyboardService_Factory(t){return new(t||NgbDatepickerKeyboardService)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDatepickerKeyboardService,factory:NgbDatepickerKeyboardService.ɵfac,providedIn:'root'});}} exports("NgbDatepickerKeyboardService", NgbDatepickerKeyboardService);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerKeyboardService,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();/**
             * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the datepickers used in the application.
             */class NgbDatepickerConfig{constructor(){this.displayMonths=1;this.firstDayOfWeek=1;this.navigation='select';this.outsideDays='visible';this.showWeekNumbers=false;this.weekdays=TranslationWidth.Short;}static{this.ɵfac=function NgbDatepickerConfig_Factory(t){return new(t||NgbDatepickerConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDatepickerConfig,factory:NgbDatepickerConfig.ɵfac,providedIn:'root'});}} exports("NgbDatepickerConfig", NgbDatepickerConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();function NGB_DATEPICKER_DATE_ADAPTER_FACTORY(){return new NgbDateStructAdapter();}/**
             * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
             * any provided user date model `D`, ex. a string, a native date, etc.
             *
             * The adapter is used **only** for conversion when binding datepicker to a form control,
             * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
             *
             * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
             *
             * See the [date format overview](#/components/datepicker/overview#date-model) for more details
             * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
             */class NgbDateAdapter{static{this.ɵfac=function NgbDateAdapter_Factory(t){return new(t||NgbDateAdapter)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDateAdapter,factory:function(){return NGB_DATEPICKER_DATE_ADAPTER_FACTORY();},providedIn:'root'});}} exports("NgbDateAdapter", NgbDateAdapter);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDateAdapter,[{type:Injectable,args:[{providedIn:'root',useFactory:NGB_DATEPICKER_DATE_ADAPTER_FACTORY}]}],null,null);})();class NgbDateStructAdapter extends NgbDateAdapter{/**
                 * Converts a NgbDateStruct value into NgbDateStruct value
                 */fromModel(date){return date&&isInteger(date.year)&&isInteger(date.month)&&isInteger(date.day)?{year:date.year,month:date.month,day:date.day}:null;}/**
                 * Converts a NgbDateStruct value into NgbDateStruct value
                 */toModel(date){return date&&isInteger(date.year)&&isInteger(date.month)&&isInteger(date.day)?{year:date.year,month:date.month,day:date.day}:null;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbDateStructAdapter_BaseFactory;return function NgbDateStructAdapter_Factory(t){return (ɵNgbDateStructAdapter_BaseFactory||(ɵNgbDateStructAdapter_BaseFactory=i0.ɵɵgetInheritedFactory(NgbDateStructAdapter)))(t||NgbDateStructAdapter);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDateStructAdapter,factory:NgbDateStructAdapter.ɵfac});}} exports("NgbDateStructAdapter", NgbDateStructAdapter);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDateStructAdapter,[{type:Injectable}],null,null);})();/**
             * A directive that marks the content template that customizes the way datepicker months are displayed
             *
             * @since 5.3.0
             */class NgbDatepickerContent{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbDatepickerContent_Factory(t){return new(t||NgbDatepickerContent)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbDatepickerContent,selectors:[["ng-template","ngbDatepickerContent",""]],standalone:true});}} exports("NgbDatepickerContent", NgbDatepickerContent);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerContent,[{type:Directive,args:[{selector:'ng-template[ngbDatepickerContent]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
             * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
             *
             * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
             *
             * @since 5.3.0
             */class NgbDatepickerMonth{/**
                 * The first date of month to be rendered.
                 *
                 * This month must one of the months present in the
                 * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
                 */set month(month){this.viewModel=this._service.getMonth(month);}constructor(i18n,datepicker,_keyboardService,_service){this.i18n=i18n;this.datepicker=datepicker;this._keyboardService=_keyboardService;this._service=_service;}onKeyDown(event){this._keyboardService.processKey(event,this.datepicker);}doSelect(day){if(!day.context.disabled&&!day.hidden){this.datepicker.onDateSelect(day.date);}}static{this.ɵfac=function NgbDatepickerMonth_Factory(t){return new(t||NgbDatepickerMonth)(i0.ɵɵdirectiveInject(NgbDatepickerI18n),i0.ɵɵdirectiveInject(forwardRef(()=>NgbDatepicker)),i0.ɵɵdirectiveInject(NgbDatepickerKeyboardService),i0.ɵɵdirectiveInject(NgbDatepickerService));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbDatepickerMonth,selectors:[["ngb-datepicker-month"]],hostAttrs:["role","grid"],hostBindings:function NgbDatepickerMonth_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("keydown",function NgbDatepickerMonth_keydown_HostBindingHandler($event){return ctx.onKeyDown($event);});}},inputs:{month:"month"},standalone:true,features:[i0.ɵɵStandaloneFeature],decls:2,vars:2,consts:[["class","ngb-dp-week ngb-dp-weekdays","role","row",4,"ngIf"],["ngFor","",3,"ngForOf"],["role","row",1,"ngb-dp-week","ngb-dp-weekdays"],["class","ngb-dp-weekday ngb-dp-showweek small",4,"ngIf"],["class","ngb-dp-weekday small","role","columnheader",4,"ngFor","ngForOf"],[1,"ngb-dp-weekday","ngb-dp-showweek","small"],["role","columnheader",1,"ngb-dp-weekday","small"],["class","ngb-dp-week","role","row",4,"ngIf"],["role","row",1,"ngb-dp-week"],["class","ngb-dp-week-number small text-muted",4,"ngIf"],["class","ngb-dp-day","role","gridcell",3,"disabled","tabindex","hidden","ngb-dp-today","click",4,"ngFor","ngForOf"],[1,"ngb-dp-week-number","small","text-muted"],["role","gridcell",1,"ngb-dp-day",3,"tabindex","click"],[3,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function NgbDatepickerMonth_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbDatepickerMonth_div_0_Template,3,2,"div",0);i0.ɵɵtemplate(1,NgbDatepickerMonth_ng_template_1_Template,1,1,"ng-template",1);}if(rf&2){i0.ɵɵproperty("ngIf",ctx.viewModel.weekdays.length>0);i0.ɵɵadvance(1);i0.ɵɵproperty("ngForOf",ctx.viewModel.weeks);}},dependencies:[NgIf,NgFor,NgTemplateOutlet],styles:["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-light)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"],encapsulation:2});}} exports("NgbDatepickerMonth", NgbDatepickerMonth);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerMonth,[{type:Component,args:[{selector:'ngb-datepicker-month',standalone:true,imports:[NgIf,NgFor,NgTemplateOutlet],host:{role:'grid','(keydown)':'onKeyDown($event)'},encapsulation:ViewEncapsulation.None,template:`
		<div *ngIf="viewModel.weekdays.length > 0" class="ngb-dp-week ngb-dp-weekdays" role="row">
			<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-weekday ngb-dp-showweek small">{{
				i18n.getWeekLabel()
			}}</div>
			<div *ngFor="let weekday of viewModel.weekdays" class="ngb-dp-weekday small" role="columnheader">{{
				weekday
			}}</div>
		</div>
		<ng-template ngFor let-week [ngForOf]="viewModel.weeks">
			<div *ngIf="!week.collapsed" class="ngb-dp-week" role="row">
				<div *ngIf="datepicker.showWeekNumbers" class="ngb-dp-week-number small text-muted">{{
					i18n.getWeekNumerals(week.number)
				}}</div>
				<div
					*ngFor="let day of week.days"
					(click)="doSelect(day); $event.preventDefault()"
					class="ngb-dp-day"
					role="gridcell"
					[class.disabled]="day.context.disabled"
					[tabindex]="day.tabindex"
					[class.hidden]="day.hidden"
					[class.ngb-dp-today]="day.context.today"
					[attr.aria-label]="day.ariaLabel"
				>
					<ng-template [ngIf]="!day.hidden">
						<ng-template
							[ngTemplateOutlet]="datepicker.dayTemplate"
							[ngTemplateOutletContext]="day.context"
						></ng-template>
					</ng-template>
				</div>
			</div>
		</ng-template>
	`,styles:["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-light)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"]}]}],function(){return [{type:NgbDatepickerI18n},{type:NgbDatepicker,decorators:[{type:Inject,args:[forwardRef(()=>NgbDatepicker)]}]},{type:NgbDatepickerKeyboardService},{type:NgbDatepickerService}];},{month:[{type:Input}]});})();/**
             * A highly configurable component that helps you with selecting calendar dates.
             *
             * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
             */class NgbDatepicker{constructor(_service,_calendar,_i18n,config,cd,_elementRef,_ngbDateAdapter,_ngZone){this._service=_service;this._calendar=_calendar;this._i18n=_i18n;this._elementRef=_elementRef;this._ngbDateAdapter=_ngbDateAdapter;this._ngZone=_ngZone;this.injector=inject(Injector);this._controlValue=null;this._destroyed$=new Subject();this._publicState={};/**
                     * An event emitted right before the navigation happens and displayed month changes.
                     *
                     * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
                     */this.navigate=new EventEmitter();/**
                     * An event emitted when user selects a date using keyboard or mouse.
                     *
                     * The payload of the event is currently selected `NgbDate`.
                     *
                     * @since 5.2.0
                     */this.dateSelect=new EventEmitter();this.onChange=_=>{};this.onTouched=()=>{};['contentTemplate','dayTemplate','dayTemplateData','displayMonths','firstDayOfWeek','footerTemplate','markDisabled','minDate','maxDate','navigation','outsideDays','showWeekNumbers','startDate','weekdays'].forEach(input=>this[input]=config[input]);_service.dateSelect$.pipe(takeUntil(this._destroyed$)).subscribe(date=>{this.dateSelect.emit(date);});_service.model$.pipe(takeUntil(this._destroyed$)).subscribe(model=>{const newDate=model.firstDate;const oldDate=this.model?this.model.firstDate:null;// update public state
            this._publicState={maxDate:model.maxDate,minDate:model.minDate,firstDate:model.firstDate,lastDate:model.lastDate,focusedDate:model.focusDate,months:model.months.map(viewModel=>viewModel.firstDate)};let navigationPrevented=false;// emitting navigation event if the first month changes
            if(!newDate.equals(oldDate)){this.navigate.emit({current:oldDate?{year:oldDate.year,month:oldDate.month}:null,next:{year:newDate.year,month:newDate.month},preventDefault:()=>navigationPrevented=true});// can't prevent the very first navigation
            if(navigationPrevented&&oldDate!==null){this._service.open(oldDate);return;}}const newSelectedDate=model.selectedDate;const newFocusedDate=model.focusDate;const oldFocusedDate=this.model?this.model.focusDate:null;this.model=model;// handling selection change
            if(isChangedDate(newSelectedDate,this._controlValue)){this._controlValue=newSelectedDate;this.onTouched();this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));}// handling focus change
            if(isChangedDate(newFocusedDate,oldFocusedDate)&&oldFocusedDate&&model.focusVisible){this.focus();}cd.markForCheck();});}/**
                 *  Returns the readonly public state of the datepicker
                 *
                 * @since 5.2.0
                 */get state(){return this._publicState;}/**
                 *  Returns the calendar service used in the specific datepicker instance.
                 *
                 *  @since 5.3.0
                 */get calendar(){return this._calendar;}/**
                 * Returns the i18n service used in the specific datepicker instance.
                 *
                 * @since 14.2.0
                 */get i18n(){return this._i18n;}/**
                 *  Focuses on given date.
                 */focusDate(date){this._service.focus(NgbDate.from(date));}/**
                 *  Selects focused date.
                 */focusSelect(){this._service.focusSelect();}focus(){this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(()=>{const elementToFocus=this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');if(elementToFocus){elementToFocus.focus();}});}/**
                 * Navigates to the provided date.
                 *
                 * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
                 * If nothing or invalid date provided calendar will open current month.
                 *
                 * Use the `[startDate]` input as an alternative.
                 */navigateTo(date){this._service.open(NgbDate.from(date?date.day?date:{...date,day:1}:null));}ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{const focusIns$=fromEvent(this._contentEl.nativeElement,'focusin');const focusOuts$=fromEvent(this._contentEl.nativeElement,'focusout');const{nativeElement}=this._elementRef;// we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$,focusOuts$).pipe(filter(focusEvent=>{const target=focusEvent.target;const relatedTarget=focusEvent.relatedTarget;return !(target?.classList.contains('ngb-dp-day')&&relatedTarget?.classList.contains('ngb-dp-day')&&nativeElement.contains(target)&&nativeElement.contains(relatedTarget));}),takeUntil(this._destroyed$)).subscribe(({type})=>this._ngZone.run(()=>this._service.set({focusVisible:type==='focusin'})));});}ngOnDestroy(){this._destroyed$.next();}ngOnInit(){if(this.model===undefined){const inputs={};['dayTemplateData','displayMonths','markDisabled','firstDayOfWeek','navigation','minDate','maxDate','outsideDays','weekdays'].forEach(name=>inputs[name]=this[name]);this._service.set(inputs);this.navigateTo(this.startDate);}if(!this.dayTemplate){this.dayTemplate=this._defaultDayTemplate;}}ngOnChanges(changes){const inputs={};['dayTemplateData','displayMonths','markDisabled','firstDayOfWeek','navigation','minDate','maxDate','outsideDays','weekdays'].filter(name=>name in changes).forEach(name=>inputs[name]=this[name]);this._service.set(inputs);if('startDate'in changes){const{currentValue,previousValue}=changes.startDate;if(isChangedMonth(previousValue,currentValue)){this.navigateTo(this.startDate);}}}onDateSelect(date){this._service.focus(date);this._service.select(date,{emitEvent:true});}onNavigateDateSelect(date){this._service.open(date);}onNavigateEvent(event){switch(event){case NavigationEvent.PREV:this._service.open(this._calendar.getPrev(this.model.firstDate,'m',1));break;case NavigationEvent.NEXT:this._service.open(this._calendar.getNext(this.model.firstDate,'m',1));break;}}registerOnChange(fn){this.onChange=fn;}registerOnTouched(fn){this.onTouched=fn;}setDisabledState(disabled){this._service.set({disabled});}writeValue(value){this._controlValue=NgbDate.from(this._ngbDateAdapter.fromModel(value));this._service.select(this._controlValue);}static{this.ɵfac=function NgbDatepicker_Factory(t){return new(t||NgbDatepicker)(i0.ɵɵdirectiveInject(NgbDatepickerService),i0.ɵɵdirectiveInject(NgbCalendar),i0.ɵɵdirectiveInject(NgbDatepickerI18n),i0.ɵɵdirectiveInject(NgbDatepickerConfig),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(NgbDateAdapter),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbDatepicker,selectors:[["ngb-datepicker"]],contentQueries:function NgbDatepicker_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbDatepickerContent,7);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.contentTemplateFromContent=_t.first);}},viewQuery:function NgbDatepicker_Query(rf,ctx){if(rf&1){i0.ɵɵviewQuery(_c29,7);i0.ɵɵviewQuery(_c30,7);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._defaultDayTemplate=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._contentEl=_t.first);}},hostVars:2,hostBindings:function NgbDatepicker_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("disabled",ctx.model.disabled);}},inputs:{contentTemplate:"contentTemplate",dayTemplate:"dayTemplate",dayTemplateData:"dayTemplateData",displayMonths:"displayMonths",firstDayOfWeek:"firstDayOfWeek",footerTemplate:"footerTemplate",markDisabled:"markDisabled",maxDate:"maxDate",minDate:"minDate",navigation:"navigation",outsideDays:"outsideDays",showWeekNumbers:"showWeekNumbers",startDate:"startDate",weekdays:"weekdays"},outputs:{navigate:"navigate",dateSelect:"dateSelect"},exportAs:["ngbDatepicker"],standalone:true,features:[i0.ɵɵProvidersFeature([{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbDatepicker),multi:true},NgbDatepickerService]),i0.ɵɵNgOnChangesFeature,i0.ɵɵStandaloneFeature],decls:10,vars:9,consts:[["defaultDayTemplate",""],["defaultContentTemplate",""],[1,"ngb-dp-header"],[3,"date","months","disabled","showSelect","prevDisabled","nextDisabled","selectBoxes","navigate","select",4,"ngIf"],[1,"ngb-dp-content"],["content",""],[3,"ngTemplateOutlet","ngTemplateOutletContext","ngTemplateOutletInjector"],[3,"ngTemplateOutlet"],["ngbDatepickerDayView","",3,"date","currentMonth","selected","disabled","focused"],["class","ngb-dp-month",4,"ngFor","ngForOf"],[1,"ngb-dp-month"],["class","ngb-dp-month-name",4,"ngIf"],[3,"month"],[1,"ngb-dp-month-name"],[3,"date","months","disabled","showSelect","prevDisabled","nextDisabled","selectBoxes","navigate","select"]],template:function NgbDatepicker_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbDatepicker_ng_template_0_Template,1,5,"ng-template",null,0,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(2,NgbDatepicker_ng_template_2_Template,1,1,"ng-template",null,1,i0.ɵɵtemplateRefExtractor);i0.ɵɵelementStart(4,"div",2);i0.ɵɵtemplate(5,NgbDatepicker_ngb_datepicker_navigation_5_Template,1,7,"ngb-datepicker-navigation",3);i0.ɵɵelementEnd();i0.ɵɵelementStart(6,"div",4,5);i0.ɵɵtemplate(8,NgbDatepicker_ng_template_8_Template,0,0,"ng-template",6);i0.ɵɵelementEnd();i0.ɵɵtemplate(9,NgbDatepicker_ng_template_9_Template,0,0,"ng-template",7);}if(rf&2){const _r2=i0.ɵɵreference(3);i0.ɵɵadvance(5);i0.ɵɵproperty("ngIf",ctx.navigation!=="none");i0.ɵɵadvance(1);i0.ɵɵclassProp("ngb-dp-months",!ctx.contentTemplate);i0.ɵɵadvance(2);i0.ɵɵproperty("ngTemplateOutlet",ctx.contentTemplate||(ctx.contentTemplateFromContent==null?null:ctx.contentTemplateFromContent.templateRef)||_r2)("ngTemplateOutletContext",i0.ɵɵpureFunction1(7,_c31,ctx))("ngTemplateOutletInjector",ctx.injector);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",ctx.footerTemplate);}},dependencies:[NgIf,NgFor,NgTemplateOutlet,NgbDatepickerDayView,NgbDatepickerMonth,NgbDatepickerNavigation],styles:["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-light)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"],encapsulation:2,changeDetection:0});}} exports("NgbDatepicker", NgbDatepicker);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepicker,[{type:Component,args:[{exportAs:'ngbDatepicker',selector:'ngb-datepicker',standalone:true,imports:[NgIf,NgFor,NgTemplateOutlet,NgbDatepickerDayView,NgbDatepickerMonth,NgbDatepickerNavigation],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{'[class.disabled]':'model.disabled'},template:`
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			<div *ngFor="let month of model.months; let i = index" class="ngb-dp-month">
				<div *ngIf="navigation === 'none' || (displayMonths > 1 && navigation === 'select')" class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				<ngb-datepicker-month [month]="month.firstDate"></ngb-datepicker-month>
			</div>
		</ng-template>

		<div class="ngb-dp-header">
			<ngb-datepicker-navigation
				*ngIf="navigation !== 'none'"
				[date]="model.firstDate!"
				[months]="model.months"
				[disabled]="model.disabled"
				[showSelect]="model.navigation === 'select'"
				[prevDisabled]="model.prevDisabled"
				[nextDisabled]="model.nextDisabled"
				[selectBoxes]="model.selectBoxes"
				(navigate)="onNavigateEvent($event)"
				(select)="onNavigateDateSelect($event)"
			>
			</ngb-datepicker-navigation>
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			></ng-template>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate"></ng-template>
	`,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbDatepicker),multi:true},NgbDatepickerService],styles:["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-light)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-light)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"]}]}],function(){return [{type:NgbDatepickerService},{type:NgbCalendar},{type:NgbDatepickerI18n},{type:NgbDatepickerConfig},{type:i0.ChangeDetectorRef},{type:i0.ElementRef},{type:NgbDateAdapter},{type:i0.NgZone}];},{_defaultDayTemplate:[{type:ViewChild,args:['defaultDayTemplate',{static:true}]}],_contentEl:[{type:ViewChild,args:['content',{static:true}]}],contentTemplate:[{type:Input}],contentTemplateFromContent:[{type:ContentChild,args:[NgbDatepickerContent,{static:true}]}],dayTemplate:[{type:Input}],dayTemplateData:[{type:Input}],displayMonths:[{type:Input}],firstDayOfWeek:[{type:Input}],footerTemplate:[{type:Input}],markDisabled:[{type:Input}],maxDate:[{type:Input}],minDate:[{type:Input}],navigation:[{type:Input}],outsideDays:[{type:Input}],showWeekNumbers:[{type:Input}],startDate:[{type:Input}],weekdays:[{type:Input}],navigate:[{type:Output}],dateSelect:[{type:Output}]});})();const isContainedIn=(element,array)=>array?array.some(item=>item.contains(element)):false;const matchesSelectorIfAny=(element,selector)=>!selector||closest(element,selector)!=null;// we have to add a more significant delay to avoid re-opening when handling (click) on a toggling element
            // TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
            const isMobile=(()=>{const isIOS=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints&&navigator.maxTouchPoints>2;const isAndroid=()=>/Android/.test(navigator.userAgent);return typeof navigator!=='undefined'?!!navigator.userAgent&&(isIOS()||isAndroid()):false;})();// setting 'ngbAutoClose' synchronously on mobile results in immediate popup closing
            // when tapping on the triggering element
            const wrapAsyncForMobile=fn=>isMobile?()=>setTimeout(()=>fn(),100):fn;function ngbAutoClose(zone,document,type,close,closed$,insideElements,ignoreElements,insideSelector){// closing on ESC and outside clicks
            if(type){zone.runOutsideAngular(wrapAsyncForMobile(()=>{const shouldCloseOnClick=event=>{const element=event.target;if(event.button===2||isContainedIn(element,ignoreElements)){return false;}if(type==='inside'){return isContainedIn(element,insideElements)&&matchesSelectorIfAny(element,insideSelector);}else if(type==='outside'){return !isContainedIn(element,insideElements);}/* if (type === true) */else {return matchesSelectorIfAny(element,insideSelector)||!isContainedIn(element,insideElements);}};const escapes$=fromEvent(document,'keydown').pipe(takeUntil(closed$),/* eslint-disable-next-line deprecation/deprecation */filter(e=>e.which===Key.Escape),tap(e=>e.preventDefault()));// we have to pre-calculate 'shouldCloseOnClick' on 'mousedown',
            // because on 'mouseup' DOM nodes might be detached
            const mouseDowns$=fromEvent(document,'mousedown').pipe(map(shouldCloseOnClick),takeUntil(closed$));const closeableClicks$=fromEvent(document,'mouseup').pipe(withLatestFrom(mouseDowns$),filter(([_,shouldClose])=>shouldClose),delay(0),takeUntil(closed$));race([escapes$.pipe(map(_=>0/* SOURCE.ESCAPE */)),closeableClicks$.pipe(map(_=>1/* SOURCE.CLICK */))]).subscribe(source=>zone.run(()=>close(source)));}));}}const FOCUSABLE_ELEMENTS_SELECTOR=['a[href]','button:not([disabled])','input:not([disabled]):not([type="hidden"])','select:not([disabled])','textarea:not([disabled])','[contenteditable]','[tabindex]:not([tabindex="-1"])'].join(', ');/**
             * Returns first and last focusable elements inside of a given element based on specific CSS selector
             */function getFocusableBoundaryElements(element){const list=Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)).filter(el=>el.tabIndex!==-1);return [list[0],list[list.length-1]];}/**
             * Function that enforces browser focus to be trapped inside a DOM element.
             *
             * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
             *
             * @param zone Angular zone
             * @param element The element around which focus will be trapped inside
             * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
             * and free internal resources
             * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
             * false)
             */const ngbFocusTrap=(zone,element,stopFocusTrap$,refocusOnClick=false)=>{zone.runOutsideAngular(()=>{// last focused element
            const lastFocusedElement$=fromEvent(element,'focusin').pipe(takeUntil(stopFocusTrap$),map(e=>e.target));// 'tab' / 'shift+tab' stream
            fromEvent(element,'keydown').pipe(takeUntil(stopFocusTrap$),/* eslint-disable-next-line deprecation/deprecation */filter(e=>e.which===Key.Tab),withLatestFrom(lastFocusedElement$)).subscribe(([tabEvent,focusedElement])=>{const[first,last]=getFocusableBoundaryElements(element);if((focusedElement===first||focusedElement===element)&&tabEvent.shiftKey){last.focus();tabEvent.preventDefault();}if(focusedElement===last&&!tabEvent.shiftKey){first.focus();tabEvent.preventDefault();}});// inside click
            if(refocusOnClick){fromEvent(element,'click').pipe(takeUntil(stopFocusTrap$),withLatestFrom(lastFocusedElement$),map(arr=>arr[1])).subscribe(lastFocusedElement=>lastFocusedElement.focus());}});};class NgbRTL{constructor(document){this._element=document.documentElement;}isRTL(){return (this._element.getAttribute('dir')||'').toLowerCase()==='rtl';}static{this.ɵfac=function NgbRTL_Factory(t){return new(t||NgbRTL)(i0.ɵɵinject(DOCUMENT));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbRTL,factory:NgbRTL.ɵfac,providedIn:'root'});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbRTL,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]}];},null);})();const placementSeparator=/\s+/;const spacesRegExp=/  +/gi;/**
             * Matching classes from the Bootstrap ones to the poppers ones.
             * The first index of each array is used for the left to right direction,
             * the second one is used for the right to left, defaulting to the first index (when LTR and RTL lead to the same class)
             *
             * See [Bootstrap alignments](https://getbootstrap.com/docs/5.1/components/dropdowns/#alignment-options)
             * and [Popper placements](https://popper.js.org/docs/v2/constructors/#options)
             */const bootstrapPopperMatches={top:['top'],bottom:['bottom'],start:['left','right'],left:['left'],end:['right','left'],right:['right'],'top-start':['top-start','top-end'],'top-left':['top-start'],'top-end':['top-end','top-start'],'top-right':['top-end'],'bottom-start':['bottom-start','bottom-end'],'bottom-left':['bottom-start'],'bottom-end':['bottom-end','bottom-start'],'bottom-right':['bottom-end'],'start-top':['left-start','right-start'],'left-top':['left-start'],'start-bottom':['left-end','right-end'],'left-bottom':['left-end'],'end-top':['right-start','left-start'],'right-top':['right-start'],'end-bottom':['right-end','left-end'],'right-bottom':['right-end']};function getPopperClassPlacement(placement,isRTL){const[leftClass,rightClass]=bootstrapPopperMatches[placement];return isRTL?rightClass||leftClass:leftClass;}const popperStartPrimaryPlacement=/^left/;const popperEndPrimaryPlacement=/^right/;const popperStartSecondaryPlacement=/^start/;const popperEndSecondaryPlacement=/^end/;function getBootstrapBaseClassPlacement(baseClass,placement){let[primary,secondary]=placement.split('-');const newPrimary=primary.replace(popperStartPrimaryPlacement,'start').replace(popperEndPrimaryPlacement,'end');let classnames=[newPrimary];if(secondary){let newSecondary=secondary;if(primary==='left'||primary==='right'){newSecondary=newSecondary.replace(popperStartSecondaryPlacement,'top').replace(popperEndSecondaryPlacement,'bottom');}classnames.push(`${newPrimary}-${newSecondary}`);}if(baseClass){classnames=classnames.map(classname=>`${baseClass}-${classname}`);}return classnames.join(' ');}/*
             * Accept the placement array and applies the appropriate placement dependent on the viewport.
             * Returns the applied placement.
             * In case of auto placement, placements are selected in order
             *   'top', 'bottom', 'start', 'end',
             *   'top-start', 'top-end',
             *   'bottom-start', 'bottom-end',
             *   'start-top', 'start-bottom',
             *   'end-top', 'end-bottom'.
             * */function getPopperOptions({placement,baseClass},rtl){let placementVals=Array.isArray(placement)?placement:placement.split(placementSeparator);// No need to consider left and right here, as start and end are enough, and it is used for 'auto' placement only
            const allowedPlacements=['top','bottom','start','end','top-start','top-end','bottom-start','bottom-end','start-top','start-bottom','end-top','end-bottom'];// replace auto placement with other placements
            let hasAuto=placementVals.findIndex(val=>val==='auto');if(hasAuto>=0){allowedPlacements.forEach(function(obj){if(placementVals.find(val=>val.search('^'+obj)!==-1)==null){placementVals.splice(hasAuto++,1,obj);}});}const popperPlacements=placementVals.map(_placement=>{return getPopperClassPlacement(_placement,rtl.isRTL());});let mainPlacement=popperPlacements.shift();const bsModifier={name:'bootstrapClasses',enabled:!!baseClass,phase:'write',fn({state}){const bsClassRegExp=new RegExp(baseClass+'(-[a-z]+)*','gi');const popperElement=state.elements.popper;const popperPlacement=state.placement;let className=popperElement.className;// Remove old bootstrap classes
            className=className.replace(bsClassRegExp,'');// Add current placements
            className+=` ${getBootstrapBaseClassPlacement(baseClass,popperPlacement)}`;// Remove multiple spaces
            className=className.trim().replace(spacesRegExp,' ');// Reassign
            popperElement.className=className;}};return {placement:mainPlacement,modifiers:[bsModifier,flip,preventOverflow,arrow,{enabled:true,name:'flip',options:{fallbackPlacements:popperPlacements}},{enabled:true,name:'preventOverflow',phase:'main',fn:function(){}}]};}function noop(arg){return arg;}function ngbPositioning(){const rtl=inject(NgbRTL);let popperInstance=null;return {createPopper(positioningOption){if(!popperInstance){const updatePopperOptions=positioningOption.updatePopperOptions||noop;let popperOptions=updatePopperOptions(getPopperOptions(positioningOption,rtl));popperInstance=createPopperLite(positioningOption.hostElement,positioningOption.targetElement,popperOptions);}},update(){if(popperInstance){popperInstance.update();}},setOptions(positioningOption){if(popperInstance){const updatePopperOptions=positioningOption.updatePopperOptions||noop;let popperOptions=updatePopperOptions(getPopperOptions(positioningOption,rtl));popperInstance.setOptions(popperOptions);}},destroy(){if(popperInstance){popperInstance.destroy();popperInstance=null;}}};}/**
             * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the datepicker inputs used in the application.
             *
             * @since 5.2.0
             */class NgbInputDatepickerConfig extends NgbDatepickerConfig{constructor(){super(...arguments);this.autoClose=true;this.placement=['bottom-start','bottom-end','top-start','top-end'];this.popperOptions=options=>options;this.restoreFocus=true;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbInputDatepickerConfig_BaseFactory;return function NgbInputDatepickerConfig_Factory(t){return (ɵNgbInputDatepickerConfig_BaseFactory||(ɵNgbInputDatepickerConfig_BaseFactory=i0.ɵɵgetInheritedFactory(NgbInputDatepickerConfig)))(t||NgbInputDatepickerConfig);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbInputDatepickerConfig,factory:NgbInputDatepickerConfig.ɵfac,providedIn:'root'});}} exports("NgbInputDatepickerConfig", NgbInputDatepickerConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbInputDatepickerConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();function addPopperOffset(offset$1){return options=>{options.modifiers.push(offset,{name:'offset',options:{offset:()=>offset$1}});return options;};}function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY(){return new NgbDateISOParserFormatter();}/**
             * An abstract service for parsing and formatting dates for the
             * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
             * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
             * input element.
             *
             * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
             * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
             * in the input.
             *
             * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
             * to use an alternative string format or a custom parsing logic.
             *
             * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
             */class NgbDateParserFormatter{static{this.ɵfac=function NgbDateParserFormatter_Factory(t){return new(t||NgbDateParserFormatter)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDateParserFormatter,factory:function(){return NGB_DATEPICKER_PARSER_FORMATTER_FACTORY();},providedIn:'root'});}} exports("NgbDateParserFormatter", NgbDateParserFormatter);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDateParserFormatter,[{type:Injectable,args:[{providedIn:'root',useFactory:NGB_DATEPICKER_PARSER_FORMATTER_FACTORY}]}],null,null);})();class NgbDateISOParserFormatter extends NgbDateParserFormatter{parse(value){if(value!=null){const dateParts=value.trim().split('-');if(dateParts.length===1&&isNumber(dateParts[0])){return {year:toInteger(dateParts[0]),month:null,day:null};}else if(dateParts.length===2&&isNumber(dateParts[0])&&isNumber(dateParts[1])){return {year:toInteger(dateParts[0]),month:toInteger(dateParts[1]),day:null};}else if(dateParts.length===3&&isNumber(dateParts[0])&&isNumber(dateParts[1])&&isNumber(dateParts[2])){return {year:toInteger(dateParts[0]),month:toInteger(dateParts[1]),day:toInteger(dateParts[2])};}}return null;}format(date){return date?`${date.year}-${isNumber(date.month)?padNumber(date.month):''}-${isNumber(date.day)?padNumber(date.day):''}`:'';}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbDateISOParserFormatter_BaseFactory;return function NgbDateISOParserFormatter_Factory(t){return (ɵNgbDateISOParserFormatter_BaseFactory||(ɵNgbDateISOParserFormatter_BaseFactory=i0.ɵɵgetInheritedFactory(NgbDateISOParserFormatter)))(t||NgbDateISOParserFormatter);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDateISOParserFormatter,factory:NgbDateISOParserFormatter.ɵfac});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDateISOParserFormatter,[{type:Injectable}],null,null);})();/**
             * A directive that allows to stick a datepicker popup to an input field.
             *
             * Manages interaction with the input field itself, does value formatting and provides forms integration.
             */class NgbInputDatepicker{get disabled(){return this._disabled;}set disabled(value){this._disabled=value===''||value&&value!=='false';if(this.isOpen()){this._cRef.instance.setDisabledState(this._disabled);}}constructor(_parserFormatter,_elRef,_vcRef,_renderer,_ngZone,_calendar,_dateAdapter,_document,_changeDetector,config){this._parserFormatter=_parserFormatter;this._elRef=_elRef;this._vcRef=_vcRef;this._renderer=_renderer;this._ngZone=_ngZone;this._calendar=_calendar;this._dateAdapter=_dateAdapter;this._document=_document;this._changeDetector=_changeDetector;this._cRef=null;this._disabled=false;this._elWithFocus=null;this._model=null;this._destroyCloseHandlers$=new Subject();/**
                     * An event emitted when user selects a date using keyboard or mouse.
                     *
                     * The payload of the event is currently selected `NgbDate`.
                     *
                     * @since 1.1.1
                     */this.dateSelect=new EventEmitter();/**
                     * Event emitted right after the navigation happens and displayed month changes.
                     *
                     * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
                     */this.navigate=new EventEmitter();/**
                     * An event fired after closing datepicker window.
                     *
                     * @since 4.2.0
                     */this.closed=new EventEmitter();this._onChange=_=>{};this._onTouched=()=>{};this._validatorChange=()=>{};['autoClose','container','positionTarget','placement','popperOptions'].forEach(input=>this[input]=config[input]);this._positioning=ngbPositioning();}registerOnChange(fn){this._onChange=fn;}registerOnTouched(fn){this._onTouched=fn;}registerOnValidatorChange(fn){this._validatorChange=fn;}setDisabledState(isDisabled){this.disabled=isDisabled;}validate(c){const{value}=c;if(value!=null){const ngbDate=this._fromDateStruct(this._dateAdapter.fromModel(value));if(!ngbDate){return {ngbDate:{invalid:value}};}if(this.minDate&&ngbDate.before(NgbDate.from(this.minDate))){return {ngbDate:{minDate:{minDate:this.minDate,actual:value}}};}if(this.maxDate&&ngbDate.after(NgbDate.from(this.maxDate))){return {ngbDate:{maxDate:{maxDate:this.maxDate,actual:value}}};}}return null;}writeValue(value){this._model=this._fromDateStruct(this._dateAdapter.fromModel(value));this._writeModelValue(this._model);}manualDateChange(value,updateView=false){const inputValueChanged=value!==this._inputValue;if(inputValueChanged){this._inputValue=value;this._model=this._fromDateStruct(this._parserFormatter.parse(value));}if(inputValueChanged||!updateView){this._onChange(this._model?this._dateAdapter.toModel(this._model):value===''?null:value);}if(updateView&&this._model){this._writeModelValue(this._model);}}isOpen(){return !!this._cRef;}/**
                 * Opens the datepicker popup.
                 *
                 * If the related form control contains a valid date, the corresponding month will be opened.
                 */open(){if(!this.isOpen()){this._cRef=this._vcRef.createComponent(NgbDatepicker);this._applyPopupStyling(this._cRef.location.nativeElement);this._applyDatepickerInputs(this._cRef);this._subscribeForDatepickerOutputs(this._cRef.instance);this._cRef.instance.ngOnInit();this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));// date selection event handling
            this._cRef.instance.registerOnChange(selectedDate=>{this.writeValue(selectedDate);this._onChange(selectedDate);this._onTouched();});this._cRef.changeDetectorRef.detectChanges();this._cRef.instance.setDisabledState(this.disabled);if(this.container==='body'){this._document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);}// focus handling
            this._elWithFocus=this._document.activeElement;ngbFocusTrap(this._ngZone,this._cRef.location.nativeElement,this.closed,true);setTimeout(()=>this._cRef?.instance.focus());let hostElement;if(isString(this.positionTarget)){hostElement=this._document.querySelector(this.positionTarget);}else if(this.positionTarget instanceof HTMLElement){hostElement=this.positionTarget;}else {hostElement=this._elRef.nativeElement;}// Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(()=>{if(this._cRef){this._positioning.createPopper({hostElement,targetElement:this._cRef.location.nativeElement,placement:this.placement,appendToBody:this.container==='body',updatePopperOptions:options=>this.popperOptions(addPopperOffset([0,2])(options))});this._zoneSubscription=this._ngZone.onStable.subscribe(()=>this._positioning.update());}});if(this.positionTarget&&!hostElement){throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');}this._setCloseHandlers();}}/**
                 * Closes the datepicker popup.
                 */close(){if(this.isOpen()){this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));this._cRef=null;this._positioning.destroy();this._zoneSubscription?.unsubscribe();this._destroyCloseHandlers$.next();this.closed.emit();this._changeDetector.markForCheck();// restore focus
            let elementToFocus=this._elWithFocus;if(isString(this.restoreFocus)){elementToFocus=this._document.querySelector(this.restoreFocus);}else if(this.restoreFocus!==undefined){elementToFocus=this.restoreFocus;}// in IE document.activeElement can contain an object without 'focus()' sometimes
            if(elementToFocus&&elementToFocus['focus']){elementToFocus.focus();}else {this._document.body.focus();}}}/**
                 * Toggles the datepicker popup.
                 */toggle(){if(this.isOpen()){this.close();}else {this.open();}}/**
                 * Navigates to the provided date.
                 *
                 * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
                 * If nothing or invalid date provided calendar will open current month.
                 *
                 * Use the `[startDate]` input as an alternative.
                 */navigateTo(date){if(this.isOpen()){this._cRef.instance.navigateTo(date);}}onBlur(){this._onTouched();}onFocus(){this._elWithFocus=this._elRef.nativeElement;}ngOnChanges(changes){if(changes['minDate']||changes['maxDate']){this._validatorChange();if(this.isOpen()){if(changes['minDate']){this._cRef.instance.minDate=this.minDate;}if(changes['maxDate']){this._cRef.instance.maxDate=this.maxDate;}this._cRef.instance.ngOnChanges(changes);}}if(changes['datepickerClass']){const{currentValue,previousValue}=changes['datepickerClass'];this._applyPopupClass(currentValue,previousValue);}if(changes['autoClose']&&this.isOpen()){this._setCloseHandlers();}}ngOnDestroy(){this.close();}_applyDatepickerInputs(datepickerComponentRef){['contentTemplate','dayTemplate','dayTemplateData','displayMonths','firstDayOfWeek','footerTemplate','markDisabled','minDate','maxDate','navigation','outsideDays','showNavigation','showWeekNumbers','weekdays'].forEach(inputName=>{if(this[inputName]!==undefined){datepickerComponentRef.setInput(inputName,this[inputName]);}});datepickerComponentRef.setInput('startDate',this.startDate||this._model);}_applyPopupClass(newClass,oldClass){const popupEl=this._cRef?.location.nativeElement;if(popupEl){if(newClass){this._renderer.addClass(popupEl,newClass);}if(oldClass){this._renderer.removeClass(popupEl,oldClass);}}}_applyPopupStyling(nativeElement){this._renderer.addClass(nativeElement,'dropdown-menu');this._renderer.addClass(nativeElement,'show');if(this.container==='body'){this._renderer.addClass(nativeElement,'ngb-dp-body');}this._applyPopupClass(this.datepickerClass);}_subscribeForDatepickerOutputs(datepickerInstance){datepickerInstance.navigate.subscribe(navigateEvent=>this.navigate.emit(navigateEvent));datepickerInstance.dateSelect.subscribe(date=>{this.dateSelect.emit(date);if(this.autoClose===true||this.autoClose==='inside'){this.close();}});}_writeModelValue(model){const value=this._parserFormatter.format(model);this._inputValue=value;this._renderer.setProperty(this._elRef.nativeElement,'value',value);if(this.isOpen()){this._cRef.instance.writeValue(this._dateAdapter.toModel(model));this._onTouched();}}_fromDateStruct(date){const ngbDate=date?new NgbDate(date.year,date.month,date.day):null;return this._calendar.isValid(ngbDate)?ngbDate:null;}_setCloseHandlers(){this._destroyCloseHandlers$.next();ngbAutoClose(this._ngZone,this._document,this.autoClose,()=>this.close(),this._destroyCloseHandlers$,[],[this._elRef.nativeElement,this._cRef.location.nativeElement]);}static{this.ɵfac=function NgbInputDatepicker_Factory(t){return new(t||NgbInputDatepicker)(i0.ɵɵdirectiveInject(NgbDateParserFormatter),i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.ViewContainerRef),i0.ɵɵdirectiveInject(i0.Renderer2),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(NgbCalendar),i0.ɵɵdirectiveInject(NgbDateAdapter),i0.ɵɵdirectiveInject(DOCUMENT),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(NgbInputDatepickerConfig));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbInputDatepicker,selectors:[["input","ngbDatepicker",""]],hostVars:1,hostBindings:function NgbInputDatepicker_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("input",function NgbInputDatepicker_input_HostBindingHandler($event){return ctx.manualDateChange($event.target.value);})("change",function NgbInputDatepicker_change_HostBindingHandler($event){return ctx.manualDateChange($event.target.value,true);})("focus",function NgbInputDatepicker_focus_HostBindingHandler(){return ctx.onFocus();})("blur",function NgbInputDatepicker_blur_HostBindingHandler(){return ctx.onBlur();});}if(rf&2){i0.ɵɵhostProperty("disabled",ctx.disabled);}},inputs:{autoClose:"autoClose",contentTemplate:"contentTemplate",datepickerClass:"datepickerClass",dayTemplate:"dayTemplate",dayTemplateData:"dayTemplateData",displayMonths:"displayMonths",firstDayOfWeek:"firstDayOfWeek",footerTemplate:"footerTemplate",markDisabled:"markDisabled",minDate:"minDate",maxDate:"maxDate",navigation:"navigation",outsideDays:"outsideDays",placement:"placement",popperOptions:"popperOptions",restoreFocus:"restoreFocus",showWeekNumbers:"showWeekNumbers",startDate:"startDate",container:"container",positionTarget:"positionTarget",weekdays:"weekdays",disabled:"disabled"},outputs:{dateSelect:"dateSelect",navigate:"navigate",closed:"closed"},exportAs:["ngbDatepicker"],standalone:true,features:[i0.ɵɵProvidersFeature([{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbInputDatepicker),multi:true},{provide:NG_VALIDATORS,useExisting:forwardRef(()=>NgbInputDatepicker),multi:true},{provide:NgbDatepickerConfig,useExisting:NgbInputDatepickerConfig}]),i0.ɵɵNgOnChangesFeature]});}} exports("NgbInputDatepicker", NgbInputDatepicker);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbInputDatepicker,[{type:Directive,args:[{selector:'input[ngbDatepicker]',exportAs:'ngbDatepicker',standalone:true,host:{'(input)':'manualDateChange($event.target.value)','(change)':'manualDateChange($event.target.value, true)','(focus)':'onFocus()','(blur)':'onBlur()','[disabled]':'disabled'},providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbInputDatepicker),multi:true},{provide:NG_VALIDATORS,useExisting:forwardRef(()=>NgbInputDatepicker),multi:true},{provide:NgbDatepickerConfig,useExisting:NgbInputDatepickerConfig}]}]}],function(){return [{type:NgbDateParserFormatter},{type:i0.ElementRef},{type:i0.ViewContainerRef},{type:i0.Renderer2},{type:i0.NgZone},{type:NgbCalendar},{type:NgbDateAdapter},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:i0.ChangeDetectorRef},{type:NgbInputDatepickerConfig}];},{autoClose:[{type:Input}],contentTemplate:[{type:Input}],datepickerClass:[{type:Input}],dayTemplate:[{type:Input}],dayTemplateData:[{type:Input}],displayMonths:[{type:Input}],firstDayOfWeek:[{type:Input}],footerTemplate:[{type:Input}],markDisabled:[{type:Input}],minDate:[{type:Input}],maxDate:[{type:Input}],navigation:[{type:Input}],outsideDays:[{type:Input}],placement:[{type:Input}],popperOptions:[{type:Input}],restoreFocus:[{type:Input}],showWeekNumbers:[{type:Input}],startDate:[{type:Input}],container:[{type:Input}],positionTarget:[{type:Input}],weekdays:[{type:Input}],dateSelect:[{type:Output}],navigate:[{type:Output}],closed:[{type:Output}],disabled:[{type:Input}]});})();class NgbCalendarHijri extends NgbCalendar{getDaysPerWeek(){return 7;}getMonths(){return [1,2,3,4,5,6,7,8,9,10,11,12];}getWeeksPerMonth(){return 6;}getNext(date,period='d',number=1){date=new NgbDate(date.year,date.month,date.day);switch(period){case'y':date=this._setYear(date,date.year+number);date.month=1;date.day=1;return date;case'm':date=this._setMonth(date,date.month+number);date.day=1;return date;case'd':return this._setDay(date,date.day+number);default:return date;}}getPrev(date,period='d',number=1){return this.getNext(date,period,-number);}getWeekday(date){const day=this.toGregorian(date).getDay();// in JS Date Sun=0, in ISO 8601 Sun=7
            return day===0?7:day;}getWeekNumber(week,firstDayOfWeek){// in JS Date Sun=0, in ISO 8601 Sun=7
            if(firstDayOfWeek===7){firstDayOfWeek=0;}const thursdayIndex=(4+7-firstDayOfWeek)%7;const date=week[thursdayIndex];const jsDate=this.toGregorian(date);jsDate.setDate(jsDate.getDate()+4-(jsDate.getDay()||7));// Thursday
            const time=jsDate.getTime();const MuhDate=this.toGregorian(new NgbDate(date.year,1,1));// Compare with Muharram 1
            return Math.floor(Math.round((time-MuhDate.getTime())/86400000)/7)+1;}getToday(){return this.fromGregorian(new Date());}isValid(date){return date!=null&&isNumber(date.year)&&isNumber(date.month)&&isNumber(date.day)&&!isNaN(this.toGregorian(date).getTime());}_setDay(date,day){day=+day;let mDays=this.getDaysPerMonth(date.month,date.year);if(day<=0){while(day<=0){date=this._setMonth(date,date.month-1);mDays=this.getDaysPerMonth(date.month,date.year);day+=mDays;}}else if(day>mDays){while(day>mDays){day-=mDays;date=this._setMonth(date,date.month+1);mDays=this.getDaysPerMonth(date.month,date.year);}}date.day=day;return date;}_setMonth(date,month){month=+month;date.year=date.year+Math.floor((month-1)/12);date.month=Math.floor(((month-1)%12+12)%12)+1;return date;}_setYear(date,year){date.year=+year;return date;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbCalendarHijri_BaseFactory;return function NgbCalendarHijri_Factory(t){return (ɵNgbCalendarHijri_BaseFactory||(ɵNgbCalendarHijri_BaseFactory=i0.ɵɵgetInheritedFactory(NgbCalendarHijri)))(t||NgbCalendarHijri);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendarHijri,factory:NgbCalendarHijri.ɵfac});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendarHijri,[{type:Injectable}],null,null);})();/**
             * Checks if islamic year is a leap year
             */function isIslamicLeapYear(hYear){return (14+11*hYear)%30<11;}/**
             * Checks if gregorian years is a leap year
             */function isGregorianLeapYear$1(gDate){const year=gDate.getFullYear();return year%4===0&&year%100!==0||year%400===0;}/**
             * Returns the start of Hijri Month.
             * `hMonth` is 0 for Muharram, 1 for Safar, etc.
             * `hYear` is any Hijri hYear.
             */function getIslamicMonthStart(hYear,hMonth){return Math.ceil(29.5*hMonth)+(hYear-1)*354+Math.floor((3+11*hYear)/30.0);}/**
             * Returns the start of Hijri year.
             * `year` is any Hijri year.
             */function getIslamicYearStart(year){return (year-1)*354+Math.floor((3+11*year)/30.0);}function mod$1(a,b){return a-b*Math.floor(a/b);}/**
             * The civil calendar is one type of Hijri calendars used in islamic countries.
             * Uses a fixed cycle of alternating 29- and 30-day months,
             * with a leap day added to the last month of 11 out of every 30 years.
             * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
             * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
             * Dershowitz.
             */const GREGORIAN_EPOCH$1=1721425.5;const ISLAMIC_EPOCH=1948439.5;class NgbCalendarIslamicCivil extends NgbCalendarHijri{/**
                 * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
                 * `gDate` is a JS Date to be converted to Hijri.
                 */fromGregorian(gDate){const gYear=gDate.getFullYear(),gMonth=gDate.getMonth(),gDay=gDate.getDate();let julianDay=GREGORIAN_EPOCH$1-1+365*(gYear-1)+Math.floor((gYear-1)/4)+-Math.floor((gYear-1)/100)+Math.floor((gYear-1)/400)+Math.floor((367*(gMonth+1)-362)/12+(gMonth+1<=2?0:isGregorianLeapYear$1(gDate)?-1:-2)+gDay);julianDay=Math.floor(julianDay)+0.5;const days=julianDay-ISLAMIC_EPOCH;const hYear=Math.floor((30*days+10646)/10631.0);let hMonth=Math.ceil((days-29-getIslamicYearStart(hYear))/29.5);hMonth=Math.min(hMonth,11);const hDay=Math.ceil(days-getIslamicMonthStart(hYear,hMonth))+1;return new NgbDate(hYear,hMonth+1,hDay);}/**
                 * Returns the equivalent JS date value for a give input islamic(civil) date.
                 * `hDate` is an islamic(civil) date to be converted to Gregorian.
                 */toGregorian(hDate){const hYear=hDate.year;const hMonth=hDate.month-1;const hDay=hDate.day;const julianDay=hDay+Math.ceil(29.5*hMonth)+(hYear-1)*354+Math.floor((3+11*hYear)/30)+ISLAMIC_EPOCH-1;const wjd=Math.floor(julianDay-0.5)+0.5,depoch=wjd-GREGORIAN_EPOCH$1,quadricent=Math.floor(depoch/146097),dqc=mod$1(depoch,146097),cent=Math.floor(dqc/36524),dcent=mod$1(dqc,36524),quad=Math.floor(dcent/1461),dquad=mod$1(dcent,1461),yindex=Math.floor(dquad/365);let year=quadricent*400+cent*100+quad*4+yindex;if(!(cent===4||yindex===4)){year++;}const gYearStart=GREGORIAN_EPOCH$1+365*(year-1)+Math.floor((year-1)/4)-Math.floor((year-1)/100)+Math.floor((year-1)/400);const yearday=wjd-gYearStart;const tjd=GREGORIAN_EPOCH$1-1+365*(year-1)+Math.floor((year-1)/4)-Math.floor((year-1)/100)+Math.floor((year-1)/400)+Math.floor(739/12+(isGregorianLeapYear$1(new Date(year,3,1))?-1:-2)+1);const leapadj=wjd<tjd?0:isGregorianLeapYear$1(new Date(year,3,1))?1:2;const month=Math.floor(((yearday+leapadj)*12+373)/367);const tjd2=GREGORIAN_EPOCH$1-1+365*(year-1)+Math.floor((year-1)/4)-Math.floor((year-1)/100)+Math.floor((year-1)/400)+Math.floor((367*month-362)/12+(month<=2?0:isGregorianLeapYear$1(new Date(year,month-1,1))?-1:-2)+1);const day=wjd-tjd2+1;return new Date(year,month-1,day);}/**
                 * Returns the number of days in a specific Hijri month.
                 * `month` is 1 for Muharram, 2 for Safar, etc.
                 * `year` is any Hijri year.
                 */getDaysPerMonth(month,year){year=year+Math.floor(month/13);month=(month-1)%12+1;let length=29+month%2;if(month===12&&isIslamicLeapYear(year)){length++;}return length;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbCalendarIslamicCivil_BaseFactory;return function NgbCalendarIslamicCivil_Factory(t){return (ɵNgbCalendarIslamicCivil_BaseFactory||(ɵNgbCalendarIslamicCivil_BaseFactory=i0.ɵɵgetInheritedFactory(NgbCalendarIslamicCivil)))(t||NgbCalendarIslamicCivil);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendarIslamicCivil,factory:NgbCalendarIslamicCivil.ɵfac});}} exports("NgbCalendarIslamicCivil", NgbCalendarIslamicCivil);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendarIslamicCivil,[{type:Injectable}],null,null);})();/**
             * Umalqura calendar is one type of Hijri calendars used in islamic countries.
             * This Calendar is used by Saudi Arabia for administrative purpose.
             * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
             * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
             */const GREGORIAN_FIRST_DATE=new Date(1882,10,12);const GREGORIAN_LAST_DATE=new Date(2174,10,25);const HIJRI_BEGIN=1300;const HIJRI_END=1600;const ONE_DAY=1000*60*60*24;const MONTH_LENGTH=[// 1300-1304
            '101010101010','110101010100','111011001001','011011010100','011011101010',// 1305-1309
            '001101101100','101010101101','010101010101','011010101001','011110010010',// 1310-1314
            '101110101001','010111010100','101011011010','010101011100','110100101101',// 1315-1319
            '011010010101','011101001010','101101010100','101101101010','010110101101',// 1320-1324
            '010010101110','101001001111','010100010111','011010001011','011010100101',// 1325-1329
            '101011010101','001011010110','100101011011','010010011101','101001001101',// 1330-1334
            '110100100110','110110010101','010110101100','100110110110','001010111010',// 1335-1339
            '101001011011','010100101011','101010010101','011011001010','101011101001',// 1340-1344
            '001011110100','100101110110','001010110110','100101010110','101011001010',// 1345-1349
            '101110100100','101111010010','010111011001','001011011100','100101101101',// 1350-1354
            '010101001101','101010100101','101101010010','101110100101','010110110100',// 1355-1359
            '100110110110','010101010111','001010010111','010101001011','011010100011',// 1360-1364
            '011101010010','101101100101','010101101010','101010101011','010100101011',// 1365-1369
            '110010010101','110101001010','110110100101','010111001010','101011010110',// 1370-1374
            '100101010111','010010101011','100101001011','101010100101','101101010010',// 1375-1379
            '101101101010','010101110101','001001110110','100010110111','010001011011',// 1380-1384
            '010101010101','010110101001','010110110100','100111011010','010011011101',// 1385-1389
            '001001101110','100100110110','101010101010','110101010100','110110110010',// 1390-1394
            '010111010101','001011011010','100101011011','010010101011','101001010101',// 1395-1399
            '101101001001','101101100100','101101110001','010110110100','101010110101',// 1400-1404
            '101001010101','110100100101','111010010010','111011001001','011011010100',// 1405-1409
            '101011101001','100101101011','010010101011','101010010011','110101001001',// 1410-1414
            '110110100100','110110110010','101010111001','010010111010','101001011011',// 1415-1419
            '010100101011','101010010101','101100101010','101101010101','010101011100',// 1420-1424
            '010010111101','001000111101','100100011101','101010010101','101101001010',// 1425-1429
            '101101011010','010101101101','001010110110','100100111011','010010011011',// 1430-1434
            '011001010101','011010101001','011101010100','101101101010','010101101100',// 1435-1439
            '101010101101','010101010101','101100101001','101110010010','101110101001',// 1440-1444
            '010111010100','101011011010','010101011010','101010101011','010110010101',// 1445-1449
            '011101001001','011101100100','101110101010','010110110101','001010110110',// 1450-1454
            '101001010110','111001001101','101100100101','101101010010','101101101010',// 1455-1459
            '010110101101','001010101110','100100101111','010010010111','011001001011',// 1460-1464
            '011010100101','011010101100','101011010110','010101011101','010010011101',// 1465-1469
            '101001001101','110100010110','110110010101','010110101010','010110110101',// 1470-1474
            '001011011010','100101011011','010010101101','010110010101','011011001010',// 1475-1479
            '011011100100','101011101010','010011110101','001010110110','100101010110',// 1480-1484
            '101010101010','101101010100','101111010010','010111011001','001011101010',// 1485-1489
            '100101101101','010010101101','101010010101','101101001010','101110100101',// 1490-1494
            '010110110010','100110110101','010011010110','101010010111','010101000111',// 1495-1499
            '011010010011','011101001001','101101010101','010101101010','101001101011',// 1500-1504
            '010100101011','101010001011','110101000110','110110100011','010111001010',// 1505-1509
            '101011010110','010011011011','001001101011','100101001011','101010100101',// 1510-1514
            '101101010010','101101101001','010101110101','000101110110','100010110111',// 1515-1519
            '001001011011','010100101011','010101100101','010110110100','100111011010',// 1520-1524
            '010011101101','000101101101','100010110110','101010100110','110101010010',// 1525-1529
            '110110101001','010111010100','101011011010','100101011011','010010101011',// 1530-1534
            '011001010011','011100101001','011101100010','101110101001','010110110010',// 1535-1539
            '101010110101','010101010101','101100100101','110110010010','111011001001',// 1540-1544
            '011011010010','101011101001','010101101011','010010101011','101001010101',// 1545-1549
            '110100101001','110101010100','110110101010','100110110101','010010111010',// 1550-1554
            '101000111011','010010011011','101001001101','101010101010','101011010101',// 1555-1559
            '001011011010','100101011101','010001011110','101000101110','110010011010',// 1560-1564
            '110101010101','011010110010','011010111001','010010111010','101001011101',// 1565-1569
            '010100101101','101010010101','101101010010','101110101000','101110110100',// 1570-1574
            '010110111001','001011011010','100101011010','101101001010','110110100100',// 1575-1579
            '111011010001','011011101000','101101101010','010101101101','010100110101',// 1580-1584
            '011010010101','110101001010','110110101000','110111010100','011011011010',// 1585-1589
            '010101011011','001010011101','011000101011','101100010101','101101001010',// 1590-1594
            '101110010101','010110101010','101010101110','100100101110','110010001111',// 1595-1599
            '010100100111','011010010101','011010101010','101011010110','010101011101',// 1600
            '001010011101'];function getDaysDiff(date1,date2){// Ignores the time part in date1 and date2:
            const time1=Date.UTC(date1.getFullYear(),date1.getMonth(),date1.getDate());const time2=Date.UTC(date2.getFullYear(),date2.getMonth(),date2.getDate());const diff=Math.abs(time1-time2);return Math.round(diff/ONE_DAY);}class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil{/**
                 * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
                 * `gdate` is s JS Date to be converted to Hijri.
                 */fromGregorian(gDate){let hDay=1,hMonth=0,hYear=1300;let daysDiff=getDaysDiff(gDate,GREGORIAN_FIRST_DATE);if(gDate.getTime()-GREGORIAN_FIRST_DATE.getTime()>=0&&gDate.getTime()-GREGORIAN_LAST_DATE.getTime()<=0){let year=1300;for(let i=0;i<MONTH_LENGTH.length;i++,year++){for(let j=0;j<12;j++){let numOfDays=+MONTH_LENGTH[i][j]+29;if(daysDiff<=numOfDays){hDay=daysDiff+1;if(hDay>numOfDays){hDay=1;j++;}if(j>11){j=0;year++;}hMonth=j;hYear=year;return new NgbDate(hYear,hMonth+1,hDay);}daysDiff=daysDiff-numOfDays;}}return null;}else {return super.fromGregorian(gDate);}}/**
                 * Converts the current Hijri date to Gregorian.
                 */toGregorian(hDate){const hYear=hDate.year;const hMonth=hDate.month-1;const hDay=hDate.day;let gDate=new Date(GREGORIAN_FIRST_DATE);let dayDiff=hDay-1;if(hYear>=HIJRI_BEGIN&&hYear<=HIJRI_END){for(let y=0;y<hYear-HIJRI_BEGIN;y++){for(let m=0;m<12;m++){dayDiff+=+MONTH_LENGTH[y][m]+29;}}for(let m=0;m<hMonth;m++){dayDiff+=+MONTH_LENGTH[hYear-HIJRI_BEGIN][m]+29;}gDate.setDate(GREGORIAN_FIRST_DATE.getDate()+dayDiff);}else {gDate=super.toGregorian(hDate);}return gDate;}/**
                 * Returns the number of days in a specific Hijri hMonth.
                 * `hMonth` is 1 for Muharram, 2 for Safar, etc.
                 * `hYear` is any Hijri hYear.
                 */getDaysPerMonth(hMonth,hYear){if(hYear>=HIJRI_BEGIN&&hYear<=HIJRI_END){const pos=hYear-HIJRI_BEGIN;return +MONTH_LENGTH[pos][hMonth-1]+29;}return super.getDaysPerMonth(hMonth,hYear);}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbCalendarIslamicUmalqura_BaseFactory;return function NgbCalendarIslamicUmalqura_Factory(t){return (ɵNgbCalendarIslamicUmalqura_BaseFactory||(ɵNgbCalendarIslamicUmalqura_BaseFactory=i0.ɵɵgetInheritedFactory(NgbCalendarIslamicUmalqura)))(t||NgbCalendarIslamicUmalqura);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendarIslamicUmalqura,factory:NgbCalendarIslamicUmalqura.ɵfac});}} exports("NgbCalendarIslamicUmalqura", NgbCalendarIslamicUmalqura);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendarIslamicUmalqura,[{type:Injectable}],null,null);})();/**
             * Returns the equivalent JS date value for a give input Jalali date.
             * `jalaliDate` is an Jalali date to be converted to Gregorian.
             */function toGregorian$2(jalaliDate){let jdn=jalaliToJulian(jalaliDate.year,jalaliDate.month,jalaliDate.day);let date=julianToGregorian(jdn);date.setHours(6,30,3,200);return date;}/**
             * Returns the equivalent jalali date value for a give input Gregorian date.
             * `gdate` is a JS Date to be converted to jalali.
             * utc to local
             */function fromGregorian$2(gdate){let g2d=gregorianToJulian(gdate.getFullYear(),gdate.getMonth()+1,gdate.getDate());return julianToJalali(g2d);}function setJalaliYear(date,yearValue){date.year=+yearValue;return date;}function setJalaliMonth(date,month){month=+month;date.year=date.year+Math.floor((month-1)/12);date.month=Math.floor(((month-1)%12+12)%12)+1;return date;}function setJalaliDay(date,day){let mDays=getDaysPerMonth(date.month,date.year);if(day<=0){while(day<=0){date=setJalaliMonth(date,date.month-1);mDays=getDaysPerMonth(date.month,date.year);day+=mDays;}}else if(day>mDays){while(day>mDays){day-=mDays;date=setJalaliMonth(date,date.month+1);mDays=getDaysPerMonth(date.month,date.year);}}date.day=day;return date;}function mod(a,b){return a-b*Math.floor(a/b);}function div(a,b){return Math.trunc(a/b);}/*
             This function determines if the Jalali (Persian) year is
             leap (366-day long) or is the common year (365 days), and
             finds the day in March (Gregorian calendar) of the first
             day of the Jalali year (jalaliYear).
             @param jalaliYear Jalali calendar year (-61 to 3177)
             @return
             leap: number of years since the last leap year (0 to 4)
             gYear: Gregorian year of the beginning of Jalali year
             march: the March day of Farvardin the 1st (1st day of jalaliYear)
             @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
             @see: http://www.fourmilab.ch/documents/calendar/
             */function jalCal(jalaliYear){// Jalali years starting the 33-year rule.
            let breaks=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];const breaksLength=breaks.length;const gYear=jalaliYear+621;let leapJ=-14;let jp=breaks[0];if(jalaliYear<jp||jalaliYear>=breaks[breaksLength-1]){throw new Error('Invalid Jalali year '+jalaliYear);}// Find the limiting years for the Jalali year jalaliYear.
            let jump;for(let i=1;i<breaksLength;i+=1){const jm=breaks[i];jump=jm-jp;if(jalaliYear<jm){break;}leapJ=leapJ+div(jump,33)*8+div(mod(jump,33),4);jp=jm;}let n=jalaliYear-jp;// Find the number of leap years from AD 621 to the beginning
            // of the current Jalali year in the Persian calendar.
            leapJ=leapJ+div(n,33)*8+div(mod(n,33)+3,4);if(mod(jump,33)===4&&jump-n===4){leapJ+=1;}// And the same in the Gregorian calendar (until the year gYear).
            const leapG=div(gYear,4)-div((div(gYear,100)+1)*3,4)-150;// Determine the Gregorian date of Farvardin the 1st.
            const march=20+leapJ-leapG;// Find how many years have passed since the last leap year.
            if(jump-n<6){n=n-jump+div(jump+4,33)*33;}let leap=mod(mod(n+1,33)-1,4);if(leap===-1){leap=4;}return {leap:leap,gy:gYear,march:march};}/*
             Calculates Gregorian and Julian calendar dates from the Julian Day number
             (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
             calendars) to some millions years ahead of the present.
             @param jdn Julian Day number
             @return
             gYear: Calendar year (years BC numbered 0, -1, -2, ...)
             gMonth: Calendar month (1 to 12)
             gDay: Calendar day of the month M (1 to 28/29/30/31)
             */function julianToGregorian(julianDayNumber){let j=4*julianDayNumber+139361631;j=j+div(div(4*julianDayNumber+183187720,146097)*3,4)*4-3908;const i=div(mod(j,1461),4)*5+308;const gDay=div(mod(i,153),5)+1;const gMonth=mod(div(i,153),12)+1;const gYear=div(j,1461)-100100+div(8-gMonth,6);return new Date(gYear,gMonth-1,gDay);}/*
             Converts a date of the Jalali calendar to the Julian Day number.
             @param jy Jalali year (1 to 3100)
             @param jm Jalali month (1 to 12)
             @param jd Jalali day (1 to 29/31)
             @return Julian Day number
             */function gregorianToJulian(gy,gm,gd){let d=div((gy+div(gm-8,6)+100100)*1461,4)+div(153*mod(gm+9,12)+2,5)+gd-34840408;d=d-div(div(gy+100100+div(gm-8,6),100)*3,4)+752;return d;}/*
             Converts the Julian Day number to a date in the Jalali calendar.
             @param julianDayNumber Julian Day number
             @return
             jalaliYear: Jalali year (1 to 3100)
             jalaliMonth: Jalali month (1 to 12)
             jalaliDay: Jalali day (1 to 29/31)
             */function julianToJalali(julianDayNumber){let gy=julianToGregorian(julianDayNumber).getFullYear(),// Calculate Gregorian year (gy).
            jalaliYear=gy-621,r=jalCal(jalaliYear),gregorianDay=gregorianToJulian(gy,3,r.march),jalaliDay,jalaliMonth,numberOfDays;// Find number of days that passed since 1 Farvardin.
            numberOfDays=julianDayNumber-gregorianDay;if(numberOfDays>=0){if(numberOfDays<=185){// The first 6 months.
            jalaliMonth=1+div(numberOfDays,31);jalaliDay=mod(numberOfDays,31)+1;return new NgbDate(jalaliYear,jalaliMonth,jalaliDay);}else {// The remaining months.
            numberOfDays-=186;}}else {// Previous Jalali year.
            jalaliYear-=1;numberOfDays+=179;if(r.leap===1){numberOfDays+=1;}}jalaliMonth=7+div(numberOfDays,30);jalaliDay=mod(numberOfDays,30)+1;return new NgbDate(jalaliYear,jalaliMonth,jalaliDay);}/*
             Converts a date of the Jalali calendar to the Julian Day number.
             @param jYear Jalali year (1 to 3100)
             @param jMonth Jalali month (1 to 12)
             @param jDay Jalali day (1 to 29/31)
             @return Julian Day number
             */function jalaliToJulian(jYear,jMonth,jDay){let r=jalCal(jYear);return gregorianToJulian(r.gy,3,r.march)+(jMonth-1)*31-div(jMonth,7)*(jMonth-7)+jDay-1;}/**
             * Returns the number of days in a specific jalali month.
             */function getDaysPerMonth(month,year){if(month<=6){return 31;}if(month<=11){return 30;}if(jalCal(year).leap===0){return 30;}return 29;}class NgbCalendarPersian extends NgbCalendar{getDaysPerWeek(){return 7;}getMonths(){return [1,2,3,4,5,6,7,8,9,10,11,12];}getWeeksPerMonth(){return 6;}getNext(date,period='d',number=1){date=new NgbDate(date.year,date.month,date.day);switch(period){case'y':date=setJalaliYear(date,date.year+number);date.month=1;date.day=1;return date;case'm':date=setJalaliMonth(date,date.month+number);date.day=1;return date;case'd':return setJalaliDay(date,date.day+number);default:return date;}}getPrev(date,period='d',number=1){return this.getNext(date,period,-number);}getWeekday(date){const day=toGregorian$2(date).getDay();// in JS Date Sun=0, in ISO 8601 Sun=7
            return day===0?7:day;}getWeekNumber(week,firstDayOfWeek){// in JS Date Sun=0, in ISO 8601 Sun=7
            if(firstDayOfWeek===7){firstDayOfWeek=0;}const thursdayIndex=(4+7-firstDayOfWeek)%7;const date=week[thursdayIndex];const jsDate=toGregorian$2(date);jsDate.setDate(jsDate.getDate()+4-(jsDate.getDay()||7));// Thursday
            const time=jsDate.getTime();const startDate=toGregorian$2(new NgbDate(date.year,1,1));return Math.floor(Math.round((time-startDate.getTime())/86400000)/7)+1;}getToday(){return fromGregorian$2(new Date());}isValid(date){return date!=null&&isInteger(date.year)&&isInteger(date.month)&&isInteger(date.day)&&!isNaN(toGregorian$2(date).getTime());}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbCalendarPersian_BaseFactory;return function NgbCalendarPersian_Factory(t){return (ɵNgbCalendarPersian_BaseFactory||(ɵNgbCalendarPersian_BaseFactory=i0.ɵɵgetInheritedFactory(NgbCalendarPersian)))(t||NgbCalendarPersian);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendarPersian,factory:NgbCalendarPersian.ɵfac});}} exports("NgbCalendarPersian", NgbCalendarPersian);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendarPersian,[{type:Injectable}],null,null);})();const PARTS_PER_HOUR=1080;const PARTS_PER_DAY=24*PARTS_PER_HOUR;const PARTS_FRACTIONAL_MONTH=12*PARTS_PER_HOUR+793;const PARTS_PER_MONTH=29*PARTS_PER_DAY+PARTS_FRACTIONAL_MONTH;const BAHARAD=11*PARTS_PER_HOUR+204;const HEBREW_DAY_ON_JAN_1_1970=2092591;const GREGORIAN_EPOCH=1721425.5;function isGregorianLeapYear(year){return year%4===0&&year%100!==0||year%400===0;}function numberOfFirstDayInYear(year){let monthsBeforeYear=Math.floor((235*year-234)/19);let fractionalMonthsBeforeYear=monthsBeforeYear*PARTS_FRACTIONAL_MONTH+BAHARAD;let dayNumber=monthsBeforeYear*29+Math.floor(fractionalMonthsBeforeYear/PARTS_PER_DAY);let timeOfDay=fractionalMonthsBeforeYear%PARTS_PER_DAY;let dayOfWeek=dayNumber%7;// 0 == Monday
            if(dayOfWeek===2||dayOfWeek===4||dayOfWeek===6){dayNumber++;dayOfWeek=dayNumber%7;}if(dayOfWeek===1&&timeOfDay>15*PARTS_PER_HOUR+204&&!isHebrewLeapYear(year)){dayNumber+=2;}else if(dayOfWeek===0&&timeOfDay>21*PARTS_PER_HOUR+589&&isHebrewLeapYear(year-1)){dayNumber++;}return dayNumber;}function getDaysInGregorianMonth(month,year){let days=[31,28,31,30,31,30,31,31,30,31,30,31];if(isGregorianLeapYear(year)){days[1]++;}return days[month-1];}function getHebrewMonths(year){return isHebrewLeapYear(year)?13:12;}/**
             * Returns the number of days in a specific Hebrew year.
             * `year` is any Hebrew year.
             */function getDaysInHebrewYear(year){return numberOfFirstDayInYear(year+1)-numberOfFirstDayInYear(year);}function isHebrewLeapYear(year){if(year!=null){let b=(year*12+17)%19;return b>=(b<0?-7:12);}return false;}/**
             * Returns the number of days in a specific Hebrew month.
             * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
             * `year` is any Hebrew year.
             */function getDaysInHebrewMonth(month,year){let yearLength=numberOfFirstDayInYear(year+1)-numberOfFirstDayInYear(year);let yearType=(yearLength<=380?yearLength:yearLength-30)-353;let leapYear=isHebrewLeapYear(year);let daysInMonth=leapYear?[30,29,29,29,30,30,29,30,29,30,29,30,29]:[30,29,29,29,30,29,30,29,30,29,30,29];if(yearType>0){daysInMonth[2]++;// Kislev gets an extra day in normal or complete years.
            }if(yearType>1){daysInMonth[1]++;// Heshvan gets an extra day in complete years only.
            }return daysInMonth[month-1];}function getDayNumberInHebrewYear(date){let numberOfDay=0;for(let i=1;i<date.month;i++){numberOfDay+=getDaysInHebrewMonth(i,date.year);}return numberOfDay+date.day;}function setHebrewMonth(date,val){let after=val>=0;if(!after){val=-val;}while(val>0){if(after){if(val>getHebrewMonths(date.year)-date.month){val-=getHebrewMonths(date.year)-date.month+1;date.year++;date.month=1;}else {date.month+=val;val=0;}}else {if(val>=date.month){date.year--;val-=date.month;date.month=getHebrewMonths(date.year);}else {date.month-=val;val=0;}}}return date;}function setHebrewDay(date,val){let after=val>=0;if(!after){val=-val;}while(val>0){if(after){if(val>getDaysInHebrewYear(date.year)-getDayNumberInHebrewYear(date)){val-=getDaysInHebrewYear(date.year)-getDayNumberInHebrewYear(date)+1;date.year++;date.month=1;date.day=1;}else if(val>getDaysInHebrewMonth(date.month,date.year)-date.day){val-=getDaysInHebrewMonth(date.month,date.year)-date.day+1;date.month++;date.day=1;}else {date.day+=val;val=0;}}else {if(val>=date.day){val-=date.day;date.month--;if(date.month===0){date.year--;date.month=getHebrewMonths(date.year);}date.day=getDaysInHebrewMonth(date.month,date.year);}else {date.day-=val;val=0;}}}return date;}/**
             * Returns the equivalent Hebrew date value for a give input Gregorian date.
             * `gdate` is a JS Date to be converted to Hebrew date.
             */function fromGregorian$1(gdate){const date=new Date(gdate);const gYear=date.getFullYear(),gMonth=date.getMonth(),gDay=date.getDate();let julianDay=GREGORIAN_EPOCH-1+365*(gYear-1)+Math.floor((gYear-1)/4)-Math.floor((gYear-1)/100)+Math.floor((gYear-1)/400)+Math.floor((367*(gMonth+1)-362)/12+(gMonth+1<=2?0:isGregorianLeapYear(gYear)?-1:-2)+gDay);julianDay=Math.floor(julianDay+0.5);let daysSinceHebEpoch=julianDay-347997;let monthsSinceHebEpoch=Math.floor(daysSinceHebEpoch*PARTS_PER_DAY/PARTS_PER_MONTH);let hYear=Math.floor((monthsSinceHebEpoch*19+234)/235)+1;let firstDayOfThisYear=numberOfFirstDayInYear(hYear);let dayOfYear=daysSinceHebEpoch-firstDayOfThisYear;while(dayOfYear<1){hYear--;firstDayOfThisYear=numberOfFirstDayInYear(hYear);dayOfYear=daysSinceHebEpoch-firstDayOfThisYear;}let hMonth=1;let hDay=dayOfYear;while(hDay>getDaysInHebrewMonth(hMonth,hYear)){hDay-=getDaysInHebrewMonth(hMonth,hYear);hMonth++;}return new NgbDate(hYear,hMonth,hDay);}/**
             * Returns the equivalent JS date value for a given Hebrew date.
             * `hebrewDate` is an Hebrew date to be converted to Gregorian.
             */function toGregorian$1(hebrewDate){const hYear=hebrewDate.year;const hMonth=hebrewDate.month;const hDay=hebrewDate.day;let days=numberOfFirstDayInYear(hYear);for(let i=1;i<hMonth;i++){days+=getDaysInHebrewMonth(i,hYear);}days+=hDay;let diffDays=days-HEBREW_DAY_ON_JAN_1_1970;let after=diffDays>=0;if(!after){diffDays=-diffDays;}let gYear=1970;let gMonth=1;let gDay=1;while(diffDays>0){if(after){if(diffDays>=(isGregorianLeapYear(gYear)?366:365)){diffDays-=isGregorianLeapYear(gYear)?366:365;gYear++;}else if(diffDays>=getDaysInGregorianMonth(gMonth,gYear)){diffDays-=getDaysInGregorianMonth(gMonth,gYear);gMonth++;}else {gDay+=diffDays;diffDays=0;}}else {if(diffDays>=(isGregorianLeapYear(gYear-1)?366:365)){diffDays-=isGregorianLeapYear(gYear-1)?366:365;gYear--;}else {if(gMonth>1){gMonth--;}else {gMonth=12;gYear--;}if(diffDays>=getDaysInGregorianMonth(gMonth,gYear)){diffDays-=getDaysInGregorianMonth(gMonth,gYear);}else {gDay=getDaysInGregorianMonth(gMonth,gYear)-diffDays+1;diffDays=0;}}}}return new Date(gYear,gMonth-1,gDay);}function hebrewNumerals(numerals){if(!numerals){return '';}const hArray0_9=['','\u05d0','\u05d1','\u05d2','\u05d3','\u05d4','\u05d5','\u05d6','\u05d7','\u05d8'];const hArray10_19=['\u05d9','\u05d9\u05d0','\u05d9\u05d1','\u05d9\u05d2','\u05d9\u05d3','\u05d8\u05d5','\u05d8\u05d6','\u05d9\u05d6','\u05d9\u05d7','\u05d9\u05d8'];const hArray20_90=['','','\u05db','\u05dc','\u05de','\u05e0','\u05e1','\u05e2','\u05e4','\u05e6'];const hArray100_900=['','\u05e7','\u05e8','\u05e9','\u05ea','\u05ea\u05e7','\u05ea\u05e8','\u05ea\u05e9','\u05ea\u05ea','\u05ea\u05ea\u05e7'];const hArray1000_9000=['','\u05d0','\u05d1','\u05d1\u05d0','\u05d1\u05d1','\u05d4','\u05d4\u05d0','\u05d4\u05d1','\u05d4\u05d1\u05d0','\u05d4\u05d1\u05d1'];const geresh='\u05f3',gershaim='\u05f4';let mem=0;let result=[];let step=0;while(numerals>0){let m=numerals%10;if(step===0){mem=m;}else if(step===1){if(m!==1){result.unshift(hArray20_90[m],hArray0_9[mem]);}else {result.unshift(hArray10_19[mem]);}}else if(step===2){result.unshift(hArray100_900[m]);}else {if(m!==5){result.unshift(hArray1000_9000[m],geresh,' ');}break;}numerals=Math.floor(numerals/10);if(step===0&&numerals===0){result.unshift(hArray0_9[m]);}step++;}result=result.join('').split('');if(result.length===1){result.push(geresh);}else if(result.length>1){result.splice(result.length-1,0,gershaim);}return result.join('');}/**
             * @since 3.2.0
             */class NgbCalendarHebrew extends NgbCalendar{getDaysPerWeek(){return 7;}getMonths(year){if(year&&isHebrewLeapYear(year)){return [1,2,3,4,5,6,7,8,9,10,11,12,13];}else {return [1,2,3,4,5,6,7,8,9,10,11,12];}}getWeeksPerMonth(){return 6;}isValid(date){if(date!=null){let b=isNumber(date.year)&&isNumber(date.month)&&isNumber(date.day);b=b&&date.month>0&&date.month<=(isHebrewLeapYear(date.year)?13:12);b=b&&date.day>0&&date.day<=getDaysInHebrewMonth(date.month,date.year);return b&&!isNaN(toGregorian$1(date).getTime());}return false;}getNext(date,period='d',number=1){date=new NgbDate(date.year,date.month,date.day);switch(period){case'y':date.year+=number;date.month=1;date.day=1;return date;case'm':date=setHebrewMonth(date,number);date.day=1;return date;case'd':return setHebrewDay(date,number);default:return date;}}getPrev(date,period='d',number=1){return this.getNext(date,period,-number);}getWeekday(date){const day=toGregorian$1(date).getDay();// in JS Date Sun=0, in ISO 8601 Sun=7
            return day===0?7:day;}getWeekNumber(week,firstDayOfWeek){const date=week[week.length-1];return Math.ceil(getDayNumberInHebrewYear(date)/7);}getToday(){return fromGregorian$1(new Date());}/**
                 * @since 3.4.0
                 */toGregorian(date){return fromJSDate(toGregorian$1(date));}/**
                 * @since 3.4.0
                 */fromGregorian(date){return fromGregorian$1(toJSDate(date));}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbCalendarHebrew_BaseFactory;return function NgbCalendarHebrew_Factory(t){return (ɵNgbCalendarHebrew_BaseFactory||(ɵNgbCalendarHebrew_BaseFactory=i0.ɵɵgetInheritedFactory(NgbCalendarHebrew)))(t||NgbCalendarHebrew);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendarHebrew,factory:NgbCalendarHebrew.ɵfac});}} exports("NgbCalendarHebrew", NgbCalendarHebrew);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendarHebrew,[{type:Injectable}],null,null);})();const WEEKDAYS=['שני','שלישי','רביעי','חמישי','שישי','שבת','ראשון'];const MONTHS=['תשרי','חשון','כסלו','טבת','שבט','אדר','ניסן','אייר','סיון','תמוז','אב','אלול'];const MONTHS_LEAP=['תשרי','חשון','כסלו','טבת','שבט','אדר א׳','אדר ב׳','ניסן','אייר','סיון','תמוז','אב','אלול'];/**
             * @since 3.2.0
             */class NgbDatepickerI18nHebrew extends NgbDatepickerI18n{getMonthShortName(month,year){return this.getMonthFullName(month,year);}getMonthFullName(month,year){return isHebrewLeapYear(year)?MONTHS_LEAP[month-1]||'':MONTHS[month-1]||'';}getWeekdayLabel(weekday,width){return WEEKDAYS[weekday-1]||'';}getDayAriaLabel(date){return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month,date.year)} ${hebrewNumerals(date.year)}`;}getDayNumerals(date){return hebrewNumerals(date.day);}getWeekNumerals(weekNumber){return hebrewNumerals(weekNumber);}getYearNumerals(year){return hebrewNumerals(year);}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbDatepickerI18nHebrew_BaseFactory;return function NgbDatepickerI18nHebrew_Factory(t){return (ɵNgbDatepickerI18nHebrew_BaseFactory||(ɵNgbDatepickerI18nHebrew_BaseFactory=i0.ɵɵgetInheritedFactory(NgbDatepickerI18nHebrew)))(t||NgbDatepickerI18nHebrew);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDatepickerI18nHebrew,factory:NgbDatepickerI18nHebrew.ɵfac});}} exports("NgbDatepickerI18nHebrew", NgbDatepickerI18nHebrew);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerI18nHebrew,[{type:Injectable}],null,null);})();/**
             * Returns the equivalent JS date value for a give input Buddhist date.
             * `date` is an Buddhist date to be converted to Gregorian.
             */function toGregorian(date){return new Date(date.year-543,date.month-1,date.day);}/**
             * Returns the equivalent Buddhist date value for a give input Gregorian date.
             * `gdate` is a JS Date to be converted to Buddhist.
             * utc to local
             */function fromGregorian(gdate){return new NgbDate(gdate.getFullYear()+543,gdate.getMonth()+1,gdate.getDate());}/**
             * @since 9.1.0
             */class NgbCalendarBuddhist extends NgbCalendarGregorian{getToday(){return fromGregorian(new Date());}getNext(date,period='d',number=1){let jsDate=toGregorian(date);let checkMonth=true;let expectedMonth=jsDate.getMonth();switch(period){case'y':jsDate.setFullYear(jsDate.getFullYear()+number);break;case'm':expectedMonth+=number;jsDate.setMonth(expectedMonth);expectedMonth=expectedMonth%12;if(expectedMonth<0){expectedMonth=expectedMonth+12;}break;case'd':jsDate.setDate(jsDate.getDate()+number);checkMonth=false;break;default:return date;}if(checkMonth&&jsDate.getMonth()!==expectedMonth){// this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);}return fromGregorian(jsDate);}getPrev(date,period='d',number=1){return this.getNext(date,period,-number);}getWeekday(date){let jsDate=toGregorian(date);let day=jsDate.getDay();// in JS Date Sun=0, in ISO 8601 Sun=7
            return day===0?7:day;}getWeekNumber(week,firstDayOfWeek){// in JS Date Sun=0, in ISO 8601 Sun=7
            if(firstDayOfWeek===7){firstDayOfWeek=0;}const thursdayIndex=(4+7-firstDayOfWeek)%7;let date=week[thursdayIndex];const jsDate=toGregorian(date);jsDate.setDate(jsDate.getDate()+4-(jsDate.getDay()||7));// Thursday
            const time=jsDate.getTime();jsDate.setMonth(0);// Compare with Jan 1
            jsDate.setDate(1);return Math.floor(Math.round((time-jsDate.getTime())/86400000)/7)+1;}isValid(date){if(!date||!isInteger(date.year)||!isInteger(date.month)||!isInteger(date.day)){return false;}// year 0 doesn't exist in Gregorian calendar
            if(date.year===0){return false;}const jsDate=toGregorian(date);return !isNaN(jsDate.getTime())&&jsDate.getFullYear()===date.year-543&&jsDate.getMonth()+1===date.month&&jsDate.getDate()===date.day;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbCalendarBuddhist_BaseFactory;return function NgbCalendarBuddhist_Factory(t){return (ɵNgbCalendarBuddhist_BaseFactory||(ɵNgbCalendarBuddhist_BaseFactory=i0.ɵɵgetInheritedFactory(NgbCalendarBuddhist)))(t||NgbCalendarBuddhist);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbCalendarBuddhist,factory:NgbCalendarBuddhist.ɵfac});}} exports("NgbCalendarBuddhist", NgbCalendarBuddhist);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbCalendarBuddhist,[{type:Injectable}],null,null);})();/**
             * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
             * native javascript dates as a user date model.
             */class NgbDateNativeAdapter extends NgbDateAdapter{/**
                 * Converts a native `Date` to a `NgbDateStruct`.
                 */fromModel(date){return date instanceof Date&&!isNaN(date.getTime())?this._fromNativeDate(date):null;}/**
                 * Converts a `NgbDateStruct` to a native `Date`.
                 */toModel(date){return date&&isInteger(date.year)&&isInteger(date.month)&&isInteger(date.day)?this._toNativeDate(date):null;}_fromNativeDate(date){return {year:date.getFullYear(),month:date.getMonth()+1,day:date.getDate()};}_toNativeDate(date){const jsDate=new Date(date.year,date.month-1,date.day,12);// avoid 30 -> 1930 conversion
            jsDate.setFullYear(date.year);return jsDate;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbDateNativeAdapter_BaseFactory;return function NgbDateNativeAdapter_Factory(t){return (ɵNgbDateNativeAdapter_BaseFactory||(ɵNgbDateNativeAdapter_BaseFactory=i0.ɵɵgetInheritedFactory(NgbDateNativeAdapter)))(t||NgbDateNativeAdapter);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDateNativeAdapter,factory:NgbDateNativeAdapter.ɵfac});}} exports("NgbDateNativeAdapter", NgbDateNativeAdapter);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDateNativeAdapter,[{type:Injectable}],null,null);})();/**
             * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
             *
             * @since 3.2.0
             */class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter{_fromNativeDate(date){return {year:date.getUTCFullYear(),month:date.getUTCMonth()+1,day:date.getUTCDate()};}_toNativeDate(date){const jsDate=new Date(Date.UTC(date.year,date.month-1,date.day));// avoid 30 -> 1930 conversion
            jsDate.setUTCFullYear(date.year);return jsDate;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbDateNativeUTCAdapter_BaseFactory;return function NgbDateNativeUTCAdapter_Factory(t){return (ɵNgbDateNativeUTCAdapter_BaseFactory||(ɵNgbDateNativeUTCAdapter_BaseFactory=i0.ɵɵgetInheritedFactory(NgbDateNativeUTCAdapter)))(t||NgbDateNativeUTCAdapter);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDateNativeUTCAdapter,factory:NgbDateNativeUTCAdapter.ɵfac});}} exports("NgbDateNativeUTCAdapter", NgbDateNativeUTCAdapter);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDateNativeUTCAdapter,[{type:Injectable}],null,null);})();const NGB_DATEPICKER_DIRECTIVES=[NgbDatepicker,NgbDatepickerContent,NgbInputDatepicker,NgbDatepickerMonth];class NgbDatepickerModule{static{this.ɵfac=function NgbDatepickerModule_Factory(t){return new(t||NgbDatepickerModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbDatepickerModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbDatepickerModule", NgbDatepickerModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDatepickerModule,[{type:NgModule,args:[{exports:NGB_DATEPICKER_DIRECTIVES,imports:NGB_DATEPICKER_DIRECTIVES}]}],null,null);})();/**
             * A configuration service for the [`NgbDropdown`](#/components/dropdown/api#NgbDropdown) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the dropdowns used in the application.
             */class NgbDropdownConfig{constructor(){this.autoClose=true;this.placement=['bottom-start','bottom-end','top-start','top-end'];this.popperOptions=options=>options;}static{this.ɵfac=function NgbDropdownConfig_Factory(t){return new(t||NgbDropdownConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbDropdownConfig,factory:NgbDropdownConfig.ɵfac,providedIn:'root'});}} exports("NgbDropdownConfig", NgbDropdownConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDropdownConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();/**
             * @deprecated 14.2.0 this directive isn't useful anymore. You can remove it from your imports
             */class NgbNavbar{static{this.ɵfac=function NgbNavbar_Factory(t){return new(t||NgbNavbar)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavbar,selectors:[["",8,"navbar"]],standalone:true});}} exports("NgbNavbar", NgbNavbar);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavbar,[{type:Directive,args:[{selector:'.navbar',standalone:true}]}],null,null);})();/**
             * A directive you should put on a dropdown item to enable keyboard navigation.
             * Arrow keys will move focus between items marked with this directive.
             *
             * @since 4.1.0
             */class NgbDropdownItem{set disabled(value){this._disabled=value===''||value===true;// accept an empty attribute as true
            // note: we don't use a host binding for disabled because when used on links, it fails because links don't have a
            // disabled property
            // setting the property using the renderer, OTOH, works fine in both cases.
            this._renderer.setProperty(this.elementRef.nativeElement,'disabled',this._disabled);}get disabled(){return this._disabled;}constructor(elementRef,_renderer){this.elementRef=elementRef;this._renderer=_renderer;this._disabled=false;}static{this.ɵfac=function NgbDropdownItem_Factory(t){return new(t||NgbDropdownItem)(i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.Renderer2));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbDropdownItem,selectors:[["","ngbDropdownItem",""]],hostAttrs:[1,"dropdown-item"],hostVars:3,hostBindings:function NgbDropdownItem_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("tabIndex",ctx.disabled?-1:0);i0.ɵɵclassProp("disabled",ctx.disabled);}},inputs:{disabled:"disabled"},standalone:true});}} exports("NgbDropdownItem", NgbDropdownItem);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDropdownItem,[{type:Directive,args:[{selector:'[ngbDropdownItem]',standalone:true,host:{class:'dropdown-item','[class.disabled]':'disabled','[tabIndex]':'disabled ? -1 : 0'}}]}],function(){return [{type:i0.ElementRef},{type:i0.Renderer2}];},{disabled:[{type:Input}]});})();/**
             * A directive that wraps dropdown menu content and dropdown items.
             */class NgbDropdownMenu{constructor(dropdown,_elementRef){this.dropdown=dropdown;this.placement='bottom';this.isOpen=false;this.nativeElement=_elementRef.nativeElement;}static{this.ɵfac=function NgbDropdownMenu_Factory(t){return new(t||NgbDropdownMenu)(i0.ɵɵdirectiveInject(forwardRef(()=>NgbDropdown)),i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbDropdownMenu,selectors:[["","ngbDropdownMenu",""]],contentQueries:function NgbDropdownMenu_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbDropdownItem,4);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.menuItems=_t);}},hostVars:4,hostBindings:function NgbDropdownMenu_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("keydown.ArrowUp",function NgbDropdownMenu_keydown_ArrowUp_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.ArrowDown",function NgbDropdownMenu_keydown_ArrowDown_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Home",function NgbDropdownMenu_keydown_Home_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.End",function NgbDropdownMenu_keydown_End_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Enter",function NgbDropdownMenu_keydown_Enter_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Space",function NgbDropdownMenu_keydown_Space_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Tab",function NgbDropdownMenu_keydown_Tab_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Shift.Tab",function NgbDropdownMenu_keydown_Shift_Tab_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);});}if(rf&2){i0.ɵɵclassProp("dropdown-menu",true)("show",ctx.dropdown.isOpen());}},standalone:true});}} exports("NgbDropdownMenu", NgbDropdownMenu);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDropdownMenu,[{type:Directive,args:[{selector:'[ngbDropdownMenu]',standalone:true,host:{'[class.dropdown-menu]':'true','[class.show]':'dropdown.isOpen()','(keydown.ArrowUp)':'dropdown.onKeyDown($event)','(keydown.ArrowDown)':'dropdown.onKeyDown($event)','(keydown.Home)':'dropdown.onKeyDown($event)','(keydown.End)':'dropdown.onKeyDown($event)','(keydown.Enter)':'dropdown.onKeyDown($event)','(keydown.Space)':'dropdown.onKeyDown($event)','(keydown.Tab)':'dropdown.onKeyDown($event)','(keydown.Shift.Tab)':'dropdown.onKeyDown($event)'}}]}],function(){return [{type:NgbDropdown,decorators:[{type:Inject,args:[forwardRef(()=>NgbDropdown)]}]},{type:i0.ElementRef}];},{menuItems:[{type:ContentChildren,args:[NgbDropdownItem]}]});})();/**
             * A directive to mark an element to which dropdown menu will be anchored.
             *
             * This is a simple version of the `NgbDropdownToggle` directive.
             * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
             * for events other than click.
             *
             * @since 1.1.0
             */class NgbDropdownAnchor{constructor(dropdown,_elementRef){this.dropdown=dropdown;this.nativeElement=_elementRef.nativeElement;}static{this.ɵfac=function NgbDropdownAnchor_Factory(t){return new(t||NgbDropdownAnchor)(i0.ɵɵdirectiveInject(forwardRef(()=>NgbDropdown)),i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbDropdownAnchor,selectors:[["","ngbDropdownAnchor",""]],hostAttrs:[1,"dropdown-toggle"],hostVars:1,hostBindings:function NgbDropdownAnchor_HostBindings(rf,ctx){if(rf&2){i0.ɵɵattribute("aria-expanded",ctx.dropdown.isOpen());}},standalone:true});}} exports("NgbDropdownAnchor", NgbDropdownAnchor);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDropdownAnchor,[{type:Directive,args:[{selector:'[ngbDropdownAnchor]',standalone:true,host:{class:'dropdown-toggle','[attr.aria-expanded]':'dropdown.isOpen()'}}]}],function(){return [{type:NgbDropdown,decorators:[{type:Inject,args:[forwardRef(()=>NgbDropdown)]}]},{type:i0.ElementRef}];},null);})();/**
             * A directive to mark an element that will toggle dropdown via the `click` event.
             *
             * You can also use `NgbDropdownAnchor` as an alternative.
             */class NgbDropdownToggle extends NgbDropdownAnchor{constructor(dropdown,elementRef){super(dropdown,elementRef);}static{this.ɵfac=function NgbDropdownToggle_Factory(t){return new(t||NgbDropdownToggle)(i0.ɵɵdirectiveInject(forwardRef(()=>NgbDropdown)),i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbDropdownToggle,selectors:[["","ngbDropdownToggle",""]],hostAttrs:[1,"dropdown-toggle"],hostVars:1,hostBindings:function NgbDropdownToggle_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("click",function NgbDropdownToggle_click_HostBindingHandler(){return ctx.dropdown.toggle();})("keydown.ArrowUp",function NgbDropdownToggle_keydown_ArrowUp_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.ArrowDown",function NgbDropdownToggle_keydown_ArrowDown_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Home",function NgbDropdownToggle_keydown_Home_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.End",function NgbDropdownToggle_keydown_End_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Tab",function NgbDropdownToggle_keydown_Tab_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);})("keydown.Shift.Tab",function NgbDropdownToggle_keydown_Shift_Tab_HostBindingHandler($event){return ctx.dropdown.onKeyDown($event);});}if(rf&2){i0.ɵɵattribute("aria-expanded",ctx.dropdown.isOpen());}},standalone:true,features:[i0.ɵɵProvidersFeature([{provide:NgbDropdownAnchor,useExisting:forwardRef(()=>NgbDropdownToggle)}]),i0.ɵɵInheritDefinitionFeature]});}} exports("NgbDropdownToggle", NgbDropdownToggle);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDropdownToggle,[{type:Directive,args:[{selector:'[ngbDropdownToggle]',standalone:true,host:{class:'dropdown-toggle','[attr.aria-expanded]':'dropdown.isOpen()','(click)':'dropdown.toggle()','(keydown.ArrowUp)':'dropdown.onKeyDown($event)','(keydown.ArrowDown)':'dropdown.onKeyDown($event)','(keydown.Home)':'dropdown.onKeyDown($event)','(keydown.End)':'dropdown.onKeyDown($event)','(keydown.Tab)':'dropdown.onKeyDown($event)','(keydown.Shift.Tab)':'dropdown.onKeyDown($event)'},providers:[{provide:NgbDropdownAnchor,useExisting:forwardRef(()=>NgbDropdownToggle)}]}]}],function(){return [{type:NgbDropdown,decorators:[{type:Inject,args:[forwardRef(()=>NgbDropdown)]}]},{type:i0.ElementRef}];},null);})();/**
             * A directive that provides contextual overlays for displaying lists of links and more.
             */class NgbDropdown{constructor(_changeDetector,config,_document,_ngZone,_elementRef,_renderer){this._changeDetector=_changeDetector;this._document=_document;this._ngZone=_ngZone;this._elementRef=_elementRef;this._renderer=_renderer;this._destroyCloseHandlers$=new Subject();this._bodyContainer=null;/**
                     * Defines whether or not the dropdown menu is opened initially.
                     */this._open=false;/**
                     * An event fired when the dropdown is opened or closed.
                     *
                     * The event payload is a `boolean`:
                     * * `true` - the dropdown was opened
                     * * `false` - the dropdown was closed
                     */this.openChange=new EventEmitter();this.placement=config.placement;this.popperOptions=config.popperOptions;this.container=config.container;this.autoClose=config.autoClose;this._positioning=ngbPositioning();}ngOnInit(){if(!this.display){this.display=this._elementRef.nativeElement.closest('.navbar')?'static':'dynamic';}}ngAfterContentInit(){this._ngZone.onStable.pipe(take(1)).subscribe(()=>{this._applyPlacementClasses();if(this._open){this._setCloseHandlers();}});}ngOnChanges(changes){if(changes.container&&this._open){this._applyContainer(this.container);}if(changes.placement&&!changes.placement.firstChange){this._positioning.setOptions({hostElement:this._anchor.nativeElement,targetElement:this._bodyContainer||this._menu.nativeElement,placement:this.placement,appendToBody:this.container==='body'});this._applyPlacementClasses();}if(changes.dropdownClass){const{currentValue,previousValue}=changes.dropdownClass;this._applyCustomDropdownClass(currentValue,previousValue);}if(changes.autoClose&&this._open){this.autoClose=changes.autoClose.currentValue;this._setCloseHandlers();}}/**
                 * Checks if the dropdown menu is open.
                 */isOpen(){return this._open;}/**
                 * Opens the dropdown menu.
                 */open(){if(!this._open){this._open=true;this._applyContainer(this.container);this.openChange.emit(true);this._setCloseHandlers();if(this._anchor){this._anchor.nativeElement.focus();if(this.display==='dynamic'){this._ngZone.runOutsideAngular(()=>{this._positioning.createPopper({hostElement:this._anchor.nativeElement,targetElement:this._bodyContainer||this._menu.nativeElement,placement:this.placement,appendToBody:this.container==='body',updatePopperOptions:options=>this.popperOptions(addPopperOffset([0,2])(options))});this._applyPlacementClasses();this._zoneSubscription=this._ngZone.onStable.subscribe(()=>this._positionMenu());});}}}}_setCloseHandlers(){this._destroyCloseHandlers$.next();// destroy any existing close handlers
            ngbAutoClose(this._ngZone,this._document,this.autoClose,source=>{this.close();if(source===0/* SOURCE.ESCAPE */){this._anchor.nativeElement.focus();}},this._destroyCloseHandlers$,this._menu?[this._menu.nativeElement]:[],this._anchor?[this._anchor.nativeElement]:[],'.dropdown-item,.dropdown-divider');}/**
                 * Closes the dropdown menu.
                 */close(){if(this._open){this._open=false;this._resetContainer();this._positioning.destroy();this._zoneSubscription?.unsubscribe();this._destroyCloseHandlers$.next();this.openChange.emit(false);this._changeDetector.markForCheck();}}/**
                 * Toggles the dropdown menu.
                 */toggle(){if(this.isOpen()){this.close();}else {this.open();}}ngOnDestroy(){this.close();}onKeyDown(event){/* eslint-disable-next-line deprecation/deprecation */const key=event.which;const itemElements=this._getMenuElements();let position=-1;let itemElement=null;const isEventFromToggle=this._isEventFromToggle(event);if(!isEventFromToggle&&itemElements.length){itemElements.forEach((item,index)=>{if(item.contains(event.target)){itemElement=item;}if(item===getActiveElement(this._document)){position=index;}});}// closing on Enter / Space
            if(key===Key.Space||key===Key.Enter){if(itemElement&&(this.autoClose===true||this.autoClose==='inside')){// Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
            // So we have to register a one-time click handler that will fire after any user defined click handlers
            // to close the dropdown
            fromEvent(itemElement,'click').pipe(take(1)).subscribe(()=>this.close());}return;}if(key===Key.Tab){if(event.target&&this.isOpen()&&this.autoClose){if(this._anchor.nativeElement===event.target){if(this.container==='body'&&!event.shiftKey){/* This case is special: user is using [Tab] from the anchor/toggle.
                           User expects the next focusable element in the dropdown menu to get focus.
                           But the menu is not a sibling to anchor/toggle, it is at the end of the body.
                           Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
                           so that browser will focus the proper element (first one focusable in the menu) */this._renderer.setAttribute(this._menu.nativeElement,'tabindex','0');this._menu.nativeElement.focus();this._renderer.removeAttribute(this._menu.nativeElement,'tabindex');}else if(event.shiftKey){this.close();}return;}else if(this.container==='body'){const focusableElements=this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);if(event.shiftKey&&event.target===focusableElements[0]){this._anchor.nativeElement.focus();event.preventDefault();}else if(!event.shiftKey&&event.target===focusableElements[focusableElements.length-1]){this._anchor.nativeElement.focus();this.close();}}else {fromEvent(event.target,'focusout').pipe(take(1)).subscribe(({relatedTarget})=>{if(!this._elementRef.nativeElement.contains(relatedTarget)){this.close();}});}}return;}// opening / navigating
            if(isEventFromToggle||itemElement){this.open();if(itemElements.length){switch(key){case Key.ArrowDown:position=Math.min(position+1,itemElements.length-1);break;case Key.ArrowUp:if(this._isDropup()&&position===-1){position=itemElements.length-1;break;}position=Math.max(position-1,0);break;case Key.Home:position=0;break;case Key.End:position=itemElements.length-1;break;}itemElements[position].focus();}event.preventDefault();}}_isDropup(){return this._elementRef.nativeElement.classList.contains('dropup');}_isEventFromToggle(event){return this._anchor.nativeElement.contains(event.target);}_getMenuElements(){const menu=this._menu;if(menu==null){return [];}return menu.menuItems.filter(item=>!item.disabled).map(item=>item.elementRef.nativeElement);}_positionMenu(){const menu=this._menu;if(this.isOpen()&&menu){if(this.display==='dynamic'){this._positioning.update();this._applyPlacementClasses();}else {this._applyPlacementClasses(this._getFirstPlacement(this.placement));}}}_getFirstPlacement(placement){return Array.isArray(placement)?placement[0]:placement.split(' ')[0];}_resetContainer(){const renderer=this._renderer;if(this._menu){const dropdownElement=this._elementRef.nativeElement;const dropdownMenuElement=this._menu.nativeElement;renderer.appendChild(dropdownElement,dropdownMenuElement);}if(this._bodyContainer){renderer.removeChild(this._document.body,this._bodyContainer);this._bodyContainer=null;}}_applyContainer(container=null){this._resetContainer();if(container==='body'){const renderer=this._renderer;const dropdownMenuElement=this._menu.nativeElement;const bodyContainer=this._bodyContainer=this._bodyContainer||renderer.createElement('div');// Override some styles to have the positioning working
            renderer.setStyle(bodyContainer,'position','absolute');renderer.setStyle(dropdownMenuElement,'position','static');renderer.setStyle(bodyContainer,'z-index','1055');renderer.appendChild(bodyContainer,dropdownMenuElement);renderer.appendChild(this._document.body,bodyContainer);}this._applyCustomDropdownClass(this.dropdownClass);}_applyCustomDropdownClass(newClass,oldClass){const targetElement=this.container==='body'?this._bodyContainer:this._elementRef.nativeElement;if(targetElement){if(oldClass){this._renderer.removeClass(targetElement,oldClass);}if(newClass){this._renderer.addClass(targetElement,newClass);}}}_applyPlacementClasses(placement){const menu=this._menu;if(menu){if(!placement){placement=this._getFirstPlacement(this.placement);}const renderer=this._renderer;const dropdownElement=this._elementRef.nativeElement;// remove the current placement classes
            renderer.removeClass(dropdownElement,'dropup');renderer.removeClass(dropdownElement,'dropdown');const{nativeElement}=menu;if(this.display==='static'){menu.placement=null;renderer.setAttribute(nativeElement,'data-bs-popper','static');}else {menu.placement=placement;renderer.removeAttribute(nativeElement,'data-bs-popper');}/*
                         * apply the new placement
                         * in case of top use up-arrow or down-arrow otherwise
                         */const dropdownClass=placement.search('^top')!==-1?'dropup':'dropdown';renderer.addClass(dropdownElement,dropdownClass);const bodyContainer=this._bodyContainer;if(bodyContainer){renderer.removeClass(bodyContainer,'dropup');renderer.removeClass(bodyContainer,'dropdown');renderer.addClass(bodyContainer,dropdownClass);}}}static{this.ɵfac=function NgbDropdown_Factory(t){return new(t||NgbDropdown)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(NgbDropdownConfig),i0.ɵɵdirectiveInject(DOCUMENT),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.Renderer2));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbDropdown,selectors:[["","ngbDropdown",""]],contentQueries:function NgbDropdown_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbDropdownMenu,5);i0.ɵɵcontentQuery(dirIndex,NgbDropdownAnchor,5);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._menu=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._anchor=_t.first);}},hostVars:2,hostBindings:function NgbDropdown_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("show",ctx.isOpen());}},inputs:{autoClose:"autoClose",dropdownClass:"dropdownClass",_open:["open","_open"],placement:"placement",popperOptions:"popperOptions",container:"container",display:"display"},outputs:{openChange:"openChange"},exportAs:["ngbDropdown"],standalone:true,features:[i0.ɵɵNgOnChangesFeature]});}} exports("NgbDropdown", NgbDropdown);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDropdown,[{type:Directive,args:[{selector:'[ngbDropdown]',exportAs:'ngbDropdown',standalone:true,host:{'[class.show]':'isOpen()'}}]}],function(){return [{type:i0.ChangeDetectorRef},{type:NgbDropdownConfig},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:i0.NgZone},{type:i0.ElementRef},{type:i0.Renderer2}];},{_menu:[{type:ContentChild,args:[NgbDropdownMenu,{static:false}]}],_anchor:[{type:ContentChild,args:[NgbDropdownAnchor,{static:false}]}],autoClose:[{type:Input}],dropdownClass:[{type:Input}],_open:[{type:Input,args:['open']}],placement:[{type:Input}],popperOptions:[{type:Input}],container:[{type:Input}],display:[{type:Input}],openChange:[{type:Output}]});})();const NGB_DROPDOWN_DIRECTIVES=[NgbDropdown,NgbDropdownAnchor,NgbDropdownToggle,NgbDropdownMenu,NgbDropdownItem];class NgbDropdownModule{static{this.ɵfac=function NgbDropdownModule_Factory(t){return new(t||NgbDropdownModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbDropdownModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbDropdownModule", NgbDropdownModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbDropdownModule,[{type:NgModule,args:[{imports:NGB_DROPDOWN_DIRECTIVES,exports:NGB_DROPDOWN_DIRECTIVES}]}],null,null);})();class ContentRef{constructor(nodes,viewRef,componentRef){this.nodes=nodes;this.viewRef=viewRef;this.componentRef=componentRef;}}class PopupService{constructor(_componentType,_injector,_viewContainerRef,_renderer,_ngZone,_applicationRef){this._componentType=_componentType;this._injector=_injector;this._viewContainerRef=_viewContainerRef;this._renderer=_renderer;this._ngZone=_ngZone;this._applicationRef=_applicationRef;this._windowRef=null;this._contentRef=null;}open(content,templateContext,animation=false){if(!this._windowRef){this._contentRef=this._getContentRef(content,templateContext);this._windowRef=this._viewContainerRef.createComponent(this._componentType,{injector:this._injector,projectableNodes:this._contentRef.nodes});}const{nativeElement}=this._windowRef.location;const transition$=this._ngZone.onStable.pipe(take(1),mergeMap(()=>ngbRunTransition(this._ngZone,nativeElement,({classList})=>classList.add('show'),{animation,runningTransition:'continue'})));return {windowRef:this._windowRef,transition$};}close(animation=false){if(!this._windowRef){return of(undefined);}return ngbRunTransition(this._ngZone,this._windowRef.location.nativeElement,({classList})=>classList.remove('show'),{animation,runningTransition:'stop'}).pipe(tap(()=>{if(this._windowRef){// this is required because of the container='body' option
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));this._windowRef=null;}if(this._contentRef?.viewRef){this._applicationRef.detachView(this._contentRef.viewRef);this._contentRef.viewRef.destroy();this._contentRef=null;}}));}_getContentRef(content,templateContext){if(!content){return new ContentRef([]);}else if(content instanceof TemplateRef){const viewRef=content.createEmbeddedView(templateContext);this._applicationRef.attachView(viewRef);return new ContentRef([viewRef.rootNodes],viewRef);}else {return new ContentRef([[this._renderer.createText(`${content}`)]]);}}}class NgbModalBackdrop{constructor(_el,_zone){this._el=_el;this._zone=_zone;}ngOnInit(){this._zone.onStable.asObservable().pipe(take(1)).subscribe(()=>{ngbRunTransition(this._zone,this._el.nativeElement,(element,animation)=>{if(animation){reflow(element);}element.classList.add('show');},{animation:this.animation,runningTransition:'continue'});});}hide(){return ngbRunTransition(this._zone,this._el.nativeElement,({classList})=>classList.remove('show'),{animation:this.animation,runningTransition:'stop'});}static{this.ɵfac=function NgbModalBackdrop_Factory(t){return new(t||NgbModalBackdrop)(i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbModalBackdrop,selectors:[["ngb-modal-backdrop"]],hostAttrs:[2,"z-index","1055"],hostVars:6,hostBindings:function NgbModalBackdrop_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassMap("modal-backdrop"+(ctx.backdropClass?" "+ctx.backdropClass:""));i0.ɵɵclassProp("show",!ctx.animation)("fade",ctx.animation);}},inputs:{animation:"animation",backdropClass:"backdropClass"},standalone:true,features:[i0.ɵɵStandaloneFeature],decls:0,vars:0,template:function NgbModalBackdrop_Template(rf,ctx){},encapsulation:2});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbModalBackdrop,[{type:Component,args:[{selector:'ngb-modal-backdrop',standalone:true,encapsulation:ViewEncapsulation.None,template:'',host:{'[class]':'"modal-backdrop" + (backdropClass ? " " + backdropClass : "")','[class.show]':'!animation','[class.fade]':'animation',style:'z-index: 1055'}}]}],function(){return [{type:i0.ElementRef},{type:i0.NgZone}];},{animation:[{type:Input}],backdropClass:[{type:Input}]});})();/**
             * A reference to the currently opened (active) modal.
             *
             * Instances of this class can be injected into your component passed as modal content.
             * So you can `.update()`, `.close()` or `.dismiss()` the modal window from your component.
             */class NgbActiveModal{/**
                 * Updates options of an opened modal.
                 *
                 * @since 14.2.0
                 */update(options){}/**
                 * Closes the modal with an optional `result` value.
                 *
                 * The `NgbModalRef.result` promise will be resolved with the provided value.
                 */close(result){}/**
                 * Dismisses the modal with an optional `reason` value.
                 *
                 * The `NgbModalRef.result` promise will be rejected with the provided value.
                 */dismiss(reason){}} exports("NgbActiveModal", NgbActiveModal);const WINDOW_ATTRIBUTES=['animation','ariaLabelledBy','ariaDescribedBy','backdrop','centered','fullscreen','keyboard','scrollable','size','windowClass','modalDialogClass'];const BACKDROP_ATTRIBUTES=['animation','backdropClass'];/**
             * A reference to the newly opened modal returned by the `NgbModal.open()` method.
             */class NgbModalRef{_applyWindowOptions(windowInstance,options){WINDOW_ATTRIBUTES.forEach(optionName=>{if(isDefined(options[optionName])){windowInstance[optionName]=options[optionName];}});}_applyBackdropOptions(backdropInstance,options){BACKDROP_ATTRIBUTES.forEach(optionName=>{if(isDefined(options[optionName])){backdropInstance[optionName]=options[optionName];}});}/**
                 * Updates options of an opened modal.
                 *
                 * @since 14.2.0
                 */update(options){this._applyWindowOptions(this._windowCmptRef.instance,options);if(this._backdropCmptRef&&this._backdropCmptRef.instance){this._applyBackdropOptions(this._backdropCmptRef.instance,options);}}/**
                 * The instance of a component used for the modal content.
                 *
                 * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
                 */get componentInstance(){if(this._contentRef&&this._contentRef.componentRef){return this._contentRef.componentRef.instance;}}/**
                 * The observable that emits when the modal is closed via the `.close()` method.
                 *
                 * It will emit the result passed to the `.close()` method.
                 *
                 * @since 8.0.0
                 */get closed(){return this._closed.asObservable().pipe(takeUntil(this._hidden));}/**
                 * The observable that emits when the modal is dismissed via the `.dismiss()` method.
                 *
                 * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
                 * reasons like backdrop click or ESC key press.
                 *
                 * @since 8.0.0
                 */get dismissed(){return this._dismissed.asObservable().pipe(takeUntil(this._hidden));}/**
                 * The observable that emits when both modal window and backdrop are closed and animations were finished.
                 * At this point modal and backdrop elements will be removed from the DOM tree.
                 *
                 * This observable will be completed after emitting.
                 *
                 * @since 8.0.0
                 */get hidden(){return this._hidden.asObservable();}/**
                 * The observable that emits when modal is fully visible and animation was finished.
                 * Modal DOM element is always available synchronously after calling 'modal.open()' service.
                 *
                 * This observable will be completed after emitting.
                 * It will not emit, if modal is closed before open animation is finished.
                 *
                 * @since 8.0.0
                 */get shown(){return this._windowCmptRef.instance.shown.asObservable();}constructor(_windowCmptRef,_contentRef,_backdropCmptRef,_beforeDismiss){this._windowCmptRef=_windowCmptRef;this._contentRef=_contentRef;this._backdropCmptRef=_backdropCmptRef;this._beforeDismiss=_beforeDismiss;this._closed=new Subject();this._dismissed=new Subject();this._hidden=new Subject();_windowCmptRef.instance.dismissEvent.subscribe(reason=>{this.dismiss(reason);});this.result=new Promise((resolve,reject)=>{this._resolve=resolve;this._reject=reject;});this.result.then(null,()=>{});}/**
                 * Closes the modal with an optional `result` value.
                 *
                 * The `NgbMobalRef.result` promise will be resolved with the provided value.
                 */close(result){if(this._windowCmptRef){this._closed.next(result);this._resolve(result);this._removeModalElements();}}_dismiss(reason){this._dismissed.next(reason);this._reject(reason);this._removeModalElements();}/**
                 * Dismisses the modal with an optional `reason` value.
                 *
                 * The `NgbModalRef.result` promise will be rejected with the provided value.
                 */dismiss(reason){if(this._windowCmptRef){if(!this._beforeDismiss){this._dismiss(reason);}else {const dismiss=this._beforeDismiss();if(isPromise(dismiss)){dismiss.then(result=>{if(result!==false){this._dismiss(reason);}},()=>{});}else if(dismiss!==false){this._dismiss(reason);}}}}_removeModalElements(){const windowTransition$=this._windowCmptRef.instance.hide();const backdropTransition$=this._backdropCmptRef?this._backdropCmptRef.instance.hide():of(undefined);// hiding window
            windowTransition$.subscribe(()=>{const{nativeElement}=this._windowCmptRef.location;nativeElement.parentNode.removeChild(nativeElement);this._windowCmptRef.destroy();if(this._contentRef&&this._contentRef.viewRef){this._contentRef.viewRef.destroy();}this._windowCmptRef=null;this._contentRef=null;});// hiding backdrop
            backdropTransition$.subscribe(()=>{if(this._backdropCmptRef){const{nativeElement}=this._backdropCmptRef.location;nativeElement.parentNode.removeChild(nativeElement);this._backdropCmptRef.destroy();this._backdropCmptRef=null;}});// all done
            zip(windowTransition$,backdropTransition$).subscribe(()=>{this._hidden.next();this._hidden.complete();});}} exports("NgbModalRef", NgbModalRef);var ModalDismissReasons; exports("ModalDismissReasons", ModalDismissReasons);(function(ModalDismissReasons){ModalDismissReasons[ModalDismissReasons["BACKDROP_CLICK"]=0]="BACKDROP_CLICK";ModalDismissReasons[ModalDismissReasons["ESC"]=1]="ESC";})(ModalDismissReasons||(exports("ModalDismissReasons", ModalDismissReasons={})));class NgbModalWindow{constructor(_document,_elRef,_zone){this._document=_document;this._elRef=_elRef;this._zone=_zone;this._closed$=new Subject();this._elWithFocus=null;// element that is focused prior to modal opening
            this.backdrop=true;this.keyboard=true;this.dismissEvent=new EventEmitter();this.shown=new Subject();this.hidden=new Subject();}get fullscreenClass(){return this.fullscreen===true?' modal-fullscreen':isString(this.fullscreen)?` modal-fullscreen-${this.fullscreen}-down`:'';}dismiss(reason){this.dismissEvent.emit(reason);}ngOnInit(){this._elWithFocus=this._document.activeElement;this._zone.onStable.asObservable().pipe(take(1)).subscribe(()=>{this._show();});}ngOnDestroy(){this._disableEventHandling();}hide(){const{nativeElement}=this._elRef;const context={animation:this.animation,runningTransition:'stop'};const windowTransition$=ngbRunTransition(this._zone,nativeElement,()=>nativeElement.classList.remove('show'),context);const dialogTransition$=ngbRunTransition(this._zone,this._dialogEl.nativeElement,()=>{},context);const transitions$=zip(windowTransition$,dialogTransition$);transitions$.subscribe(()=>{this.hidden.next();this.hidden.complete();});this._disableEventHandling();this._restoreFocus();return transitions$;}_show(){const context={animation:this.animation,runningTransition:'continue'};const windowTransition$=ngbRunTransition(this._zone,this._elRef.nativeElement,(element,animation)=>{if(animation){reflow(element);}element.classList.add('show');},context);const dialogTransition$=ngbRunTransition(this._zone,this._dialogEl.nativeElement,()=>{},context);zip(windowTransition$,dialogTransition$).subscribe(()=>{this.shown.next();this.shown.complete();});this._enableEventHandling();this._setFocus();}_enableEventHandling(){const{nativeElement}=this._elRef;this._zone.runOutsideAngular(()=>{fromEvent(nativeElement,'keydown').pipe(takeUntil(this._closed$),/* eslint-disable-next-line deprecation/deprecation */filter(e=>e.which===Key.Escape)).subscribe(event=>{if(this.keyboard){requestAnimationFrame(()=>{if(!event.defaultPrevented){this._zone.run(()=>this.dismiss(ModalDismissReasons.ESC));}});}else if(this.backdrop==='static'){this._bumpBackdrop();}});// We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            let preventClose=false;fromEvent(this._dialogEl.nativeElement,'mousedown').pipe(takeUntil(this._closed$),tap(()=>preventClose=false),switchMap(()=>fromEvent(nativeElement,'mouseup').pipe(takeUntil(this._closed$),take(1))),filter(({target})=>nativeElement===target)).subscribe(()=>{preventClose=true;});// We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement,'click').pipe(takeUntil(this._closed$)).subscribe(({target})=>{if(nativeElement===target){if(this.backdrop==='static'){this._bumpBackdrop();}else if(this.backdrop===true&&!preventClose){this._zone.run(()=>this.dismiss(ModalDismissReasons.BACKDROP_CLICK));}}preventClose=false;});});}_disableEventHandling(){this._closed$.next();}_setFocus(){const{nativeElement}=this._elRef;if(!nativeElement.contains(document.activeElement)){const autoFocusable=nativeElement.querySelector(`[ngbAutofocus]`);const firstFocusable=getFocusableBoundaryElements(nativeElement)[0];const elementToFocus=autoFocusable||firstFocusable||nativeElement;elementToFocus.focus();}}_restoreFocus(){const body=this._document.body;const elWithFocus=this._elWithFocus;let elementToFocus;if(elWithFocus&&elWithFocus['focus']&&body.contains(elWithFocus)){elementToFocus=elWithFocus;}else {elementToFocus=body;}this._zone.runOutsideAngular(()=>{setTimeout(()=>elementToFocus.focus());this._elWithFocus=null;});}_bumpBackdrop(){if(this.backdrop==='static'){ngbRunTransition(this._zone,this._elRef.nativeElement,({classList})=>{classList.add('modal-static');return ()=>classList.remove('modal-static');},{animation:this.animation,runningTransition:'continue'});}}static{this.ɵfac=function NgbModalWindow_Factory(t){return new(t||NgbModalWindow)(i0.ɵɵdirectiveInject(DOCUMENT),i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbModalWindow,selectors:[["ngb-modal-window"]],viewQuery:function NgbModalWindow_Query(rf,ctx){if(rf&1){i0.ɵɵviewQuery(_c32,7);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._dialogEl=_t.first);}},hostAttrs:["role","dialog","tabindex","-1"],hostVars:7,hostBindings:function NgbModalWindow_HostBindings(rf,ctx){if(rf&2){i0.ɵɵattribute("aria-modal",true)("aria-labelledby",ctx.ariaLabelledBy)("aria-describedby",ctx.ariaDescribedBy);i0.ɵɵclassMap("modal d-block"+(ctx.windowClass?" "+ctx.windowClass:""));i0.ɵɵclassProp("fade",ctx.animation);}},inputs:{animation:"animation",ariaLabelledBy:"ariaLabelledBy",ariaDescribedBy:"ariaDescribedBy",backdrop:"backdrop",centered:"centered",fullscreen:"fullscreen",keyboard:"keyboard",scrollable:"scrollable",size:"size",windowClass:"windowClass",modalDialogClass:"modalDialogClass"},outputs:{dismissEvent:"dismiss"},standalone:true,features:[i0.ɵɵStandaloneFeature],ngContentSelectors:_c3,decls:4,vars:2,consts:[["role","document"],["dialog",""],[1,"modal-content"]],template:function NgbModalWindow_Template(rf,ctx){if(rf&1){i0.ɵɵprojectionDef();i0.ɵɵelementStart(0,"div",0,1)(2,"div",2);i0.ɵɵprojection(3);i0.ɵɵelementEnd()();}if(rf&2){i0.ɵɵclassMap("modal-dialog"+(ctx.size?" modal-"+ctx.size:"")+(ctx.centered?" modal-dialog-centered":"")+ctx.fullscreenClass+(ctx.scrollable?" modal-dialog-scrollable":"")+(ctx.modalDialogClass?" "+ctx.modalDialogClass:""));}},styles:["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"],encapsulation:2});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbModalWindow,[{type:Component,args:[{selector:'ngb-modal-window',standalone:true,host:{'[class]':'"modal d-block" + (windowClass ? " " + windowClass : "")','[class.fade]':'animation',role:'dialog',tabindex:'-1','[attr.aria-modal]':'true','[attr.aria-labelledby]':'ariaLabelledBy','[attr.aria-describedby]':'ariaDescribedBy'},template:`
		<div
			#dialog
			[class]="
				'modal-dialog' +
				(size ? ' modal-' + size : '') +
				(centered ? ' modal-dialog-centered' : '') +
				fullscreenClass +
				(scrollable ? ' modal-dialog-scrollable' : '') +
				(modalDialogClass ? ' ' + modalDialogClass : '')
			"
			role="document"
		>
			<div class="modal-content"><ng-content></ng-content></div>
		</div>
	`,encapsulation:ViewEncapsulation.None,styles:["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"]}]}],function(){return [{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:i0.ElementRef},{type:i0.NgZone}];},{_dialogEl:[{type:ViewChild,args:['dialog',{static:true}]}],animation:[{type:Input}],ariaLabelledBy:[{type:Input}],ariaDescribedBy:[{type:Input}],backdrop:[{type:Input}],centered:[{type:Input}],fullscreen:[{type:Input}],keyboard:[{type:Input}],scrollable:[{type:Input}],size:[{type:Input}],windowClass:[{type:Input}],modalDialogClass:[{type:Input}],dismissEvent:[{type:Output,args:['dismiss']}]});})();/**
             * Utility to handle the scrollbar.
             *
             * It allows to hide the scrollbar and compensate the lack of a vertical scrollbar
             * by adding an equivalent padding on the right of the body, and to revert this change.
             */class ScrollBar{constructor(_document){this._document=_document;}/**
                 * To be called to hide a potential vertical scrollbar:
                 * - if a scrollbar is there and has a width greater than 0, adds some compensation
                 * padding to the body to keep the same layout as when the scrollbar is there
                 * - adds overflow: hidden
                 *
                 * @return a callback used to revert the change
                 */hide(){const scrollbarWidth=Math.abs(window.innerWidth-this._document.documentElement.clientWidth);const body=this._document.body;const bodyStyle=body.style;const{overflow,paddingRight}=bodyStyle;if(scrollbarWidth>0){const actualPadding=parseFloat(window.getComputedStyle(body).paddingRight);bodyStyle.paddingRight=`${actualPadding+scrollbarWidth}px`;}bodyStyle.overflow='hidden';return ()=>{if(scrollbarWidth>0){bodyStyle.paddingRight=paddingRight;}bodyStyle.overflow=overflow;};}static{this.ɵfac=function ScrollBar_Factory(t){return new(t||ScrollBar)(i0.ɵɵinject(DOCUMENT));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:ScrollBar,factory:ScrollBar.ɵfac,providedIn:'root'});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(ScrollBar,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]}];},null);})();class NgbModalStack{constructor(_applicationRef,_injector,_environmentInjector,_document,_scrollBar,_rendererFactory,_ngZone){this._applicationRef=_applicationRef;this._injector=_injector;this._environmentInjector=_environmentInjector;this._document=_document;this._scrollBar=_scrollBar;this._rendererFactory=_rendererFactory;this._ngZone=_ngZone;this._activeWindowCmptHasChanged=new Subject();this._ariaHiddenValues=new Map();this._scrollBarRestoreFn=null;this._modalRefs=[];this._windowCmpts=[];this._activeInstances=new EventEmitter();// Trap focus on active WindowCmpt
            this._activeWindowCmptHasChanged.subscribe(()=>{if(this._windowCmpts.length){const activeWindowCmpt=this._windowCmpts[this._windowCmpts.length-1];ngbFocusTrap(this._ngZone,activeWindowCmpt.location.nativeElement,this._activeWindowCmptHasChanged);this._revertAriaHidden();this._setAriaHidden(activeWindowCmpt.location.nativeElement);}});}_restoreScrollBar(){const scrollBarRestoreFn=this._scrollBarRestoreFn;if(scrollBarRestoreFn){this._scrollBarRestoreFn=null;scrollBarRestoreFn();}}_hideScrollBar(){if(!this._scrollBarRestoreFn){this._scrollBarRestoreFn=this._scrollBar.hide();}}open(contentInjector,content,options){const containerEl=options.container instanceof HTMLElement?options.container:isDefined(options.container)?this._document.querySelector(options.container):this._document.body;const renderer=this._rendererFactory.createRenderer(null,null);if(!containerEl){throw new Error(`The specified modal container "${options.container||'body'}" was not found in the DOM.`);}this._hideScrollBar();const activeModal=new NgbActiveModal();contentInjector=options.injector||contentInjector;const environmentInjector=contentInjector.get(EnvironmentInjector,null)||this._environmentInjector;const contentRef=this._getContentRef(contentInjector,environmentInjector,content,activeModal,options);let backdropCmptRef=options.backdrop!==false?this._attachBackdrop(containerEl):undefined;let windowCmptRef=this._attachWindowComponent(containerEl,contentRef.nodes);let ngbModalRef=new NgbModalRef(windowCmptRef,contentRef,backdropCmptRef,options.beforeDismiss);this._registerModalRef(ngbModalRef);this._registerWindowCmpt(windowCmptRef);// We have to cleanup DOM after the last modal when BOTH 'hidden' was emitted and 'result' promise was resolved:
            // - with animations OFF, 'hidden' emits synchronously, then 'result' is resolved asynchronously
            // - with animations ON, 'result' is resolved asynchronously, then 'hidden' emits asynchronously
            ngbModalRef.hidden.pipe(take(1)).subscribe(()=>Promise.resolve(true).then(()=>{if(!this._modalRefs.length){renderer.removeClass(this._document.body,'modal-open');this._restoreScrollBar();this._revertAriaHidden();}}));activeModal.close=result=>{ngbModalRef.close(result);};activeModal.dismiss=reason=>{ngbModalRef.dismiss(reason);};activeModal.update=options=>{ngbModalRef.update(options);};ngbModalRef.update(options);if(this._modalRefs.length===1){renderer.addClass(this._document.body,'modal-open');}if(backdropCmptRef&&backdropCmptRef.instance){backdropCmptRef.changeDetectorRef.detectChanges();}windowCmptRef.changeDetectorRef.detectChanges();return ngbModalRef;}get activeInstances(){return this._activeInstances;}dismissAll(reason){this._modalRefs.forEach(ngbModalRef=>ngbModalRef.dismiss(reason));}hasOpenModals(){return this._modalRefs.length>0;}_attachBackdrop(containerEl){let backdropCmptRef=createComponent(NgbModalBackdrop,{environmentInjector:this._applicationRef.injector,elementInjector:this._injector});this._applicationRef.attachView(backdropCmptRef.hostView);containerEl.appendChild(backdropCmptRef.location.nativeElement);return backdropCmptRef;}_attachWindowComponent(containerEl,projectableNodes){let windowCmptRef=createComponent(NgbModalWindow,{environmentInjector:this._applicationRef.injector,elementInjector:this._injector,projectableNodes});this._applicationRef.attachView(windowCmptRef.hostView);containerEl.appendChild(windowCmptRef.location.nativeElement);return windowCmptRef;}_getContentRef(contentInjector,environmentInjector,content,activeModal,options){if(!content){return new ContentRef([]);}else if(content instanceof TemplateRef){return this._createFromTemplateRef(content,activeModal);}else if(isString(content)){return this._createFromString(content);}else {return this._createFromComponent(contentInjector,environmentInjector,content,activeModal,options);}}_createFromTemplateRef(templateRef,activeModal){const context={$implicit:activeModal,close(result){activeModal.close(result);},dismiss(reason){activeModal.dismiss(reason);}};const viewRef=templateRef.createEmbeddedView(context);this._applicationRef.attachView(viewRef);return new ContentRef([viewRef.rootNodes],viewRef);}_createFromString(content){const component=this._document.createTextNode(`${content}`);return new ContentRef([[component]]);}_createFromComponent(contentInjector,environmentInjector,componentType,context,options){const elementInjector=Injector.create({providers:[{provide:NgbActiveModal,useValue:context}],parent:contentInjector});const componentRef=createComponent(componentType,{environmentInjector,elementInjector});const componentNativeEl=componentRef.location.nativeElement;if(options.scrollable){componentNativeEl.classList.add('component-host-scrollable');}this._applicationRef.attachView(componentRef.hostView);// FIXME: we should here get rid of the component nativeElement
            // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
            return new ContentRef([[componentNativeEl]],componentRef.hostView,componentRef);}_setAriaHidden(element){const parent=element.parentElement;if(parent&&element!==this._document.body){Array.from(parent.children).forEach(sibling=>{if(sibling!==element&&sibling.nodeName!=='SCRIPT'){this._ariaHiddenValues.set(sibling,sibling.getAttribute('aria-hidden'));sibling.setAttribute('aria-hidden','true');}});this._setAriaHidden(parent);}}_revertAriaHidden(){this._ariaHiddenValues.forEach((value,element)=>{if(value){element.setAttribute('aria-hidden',value);}else {element.removeAttribute('aria-hidden');}});this._ariaHiddenValues.clear();}_registerModalRef(ngbModalRef){const unregisterModalRef=()=>{const index=this._modalRefs.indexOf(ngbModalRef);if(index>-1){this._modalRefs.splice(index,1);this._activeInstances.emit(this._modalRefs);}};this._modalRefs.push(ngbModalRef);this._activeInstances.emit(this._modalRefs);ngbModalRef.result.then(unregisterModalRef,unregisterModalRef);}_registerWindowCmpt(ngbWindowCmpt){this._windowCmpts.push(ngbWindowCmpt);this._activeWindowCmptHasChanged.next();ngbWindowCmpt.onDestroy(()=>{const index=this._windowCmpts.indexOf(ngbWindowCmpt);if(index>-1){this._windowCmpts.splice(index,1);this._activeWindowCmptHasChanged.next();}});}static{this.ɵfac=function NgbModalStack_Factory(t){return new(t||NgbModalStack)(i0.ɵɵinject(i0.ApplicationRef),i0.ɵɵinject(i0.Injector),i0.ɵɵinject(i0.EnvironmentInjector),i0.ɵɵinject(DOCUMENT),i0.ɵɵinject(ScrollBar),i0.ɵɵinject(i0.RendererFactory2),i0.ɵɵinject(i0.NgZone));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbModalStack,factory:NgbModalStack.ɵfac,providedIn:'root'});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbModalStack,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:i0.ApplicationRef},{type:i0.Injector},{type:i0.EnvironmentInjector},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:ScrollBar},{type:i0.RendererFactory2},{type:i0.NgZone}];},null);})();/**
             * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all modals used in the application.
             *
             * @since 3.1.0
             */class NgbModalConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.backdrop=true;this.fullscreen=false;this.keyboard=true;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbModalConfig_Factory(t){return new(t||NgbModalConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbModalConfig,factory:NgbModalConfig.ɵfac,providedIn:'root'});}} exports("NgbModalConfig", NgbModalConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbModalConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();/**
             * A service for opening modal windows.
             *
             * Creating a modal is straightforward: create a component or a template and pass it as an argument to
             * the `.open()` method.
             */class NgbModal{constructor(_injector,_modalStack,_config){this._injector=_injector;this._modalStack=_modalStack;this._config=_config;}/**
                 * Opens a new modal window with the specified content and supplied options.
                 *
                 * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
                 * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
                 * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
                 *
                 * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
                 */open(content,options={}){const combinedOptions={...this._config,animation:this._config.animation,...options};return this._modalStack.open(this._injector,content,combinedOptions);}/**
                 * Returns an observable that holds the active modal instances.
                 */get activeInstances(){return this._modalStack.activeInstances;}/**
                 * Dismisses all currently displayed modal windows with the supplied reason.
                 *
                 * @since 3.1.0
                 */dismissAll(reason){this._modalStack.dismissAll(reason);}/**
                 * Indicates if there are currently any open modal windows in the application.
                 *
                 * @since 3.3.0
                 */hasOpenModals(){return this._modalStack.hasOpenModals();}static{this.ɵfac=function NgbModal_Factory(t){return new(t||NgbModal)(i0.ɵɵinject(i0.Injector),i0.ɵɵinject(NgbModalStack),i0.ɵɵinject(NgbModalConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbModal,factory:NgbModal.ɵfac,providedIn:'root'});}} exports("NgbModal", NgbModal);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbModal,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:i0.Injector},{type:NgbModalStack},{type:NgbModalConfig}];},null);})();class NgbModalModule{static{this.ɵfac=function NgbModalModule_Factory(t){return new(t||NgbModalModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbModalModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({providers:[NgbModal]});}} exports("NgbModalModule", NgbModalModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbModalModule,[{type:NgModule,args:[{providers:[NgbModal]}]}],null,null);})();/**
             * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the navs used in the application.
             *
             * @since 5.2.0
             */class NgbNavConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.destroyOnHide=true;this.orientation='horizontal';this.roles='tablist';this.keyboard=false;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbNavConfig_Factory(t){return new(t||NgbNavConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbNavConfig,factory:NgbNavConfig.ɵfac,providedIn:'root'});}} exports("NgbNavConfig", NgbNavConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();const isValidNavId=id=>isDefined(id)&&id!=='';let navCounter=0;/**
             * This directive must be used to wrap content to be displayed in the nav.
             *
             * @since 5.2.0
             */class NgbNavContent{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbNavContent_Factory(t){return new(t||NgbNavContent)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavContent,selectors:[["ng-template","ngbNavContent",""]],standalone:true});}} exports("NgbNavContent", NgbNavContent);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavContent,[{type:Directive,args:[{selector:'ng-template[ngbNavContent]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * This directive applies a specific role on a non-container based ngbNavItem.
             *
             * @since 14.1.0
             */class NgbNavItemRole{constructor(role,nav){this.role=role;this.nav=nav;}static{this.ɵfac=function NgbNavItemRole_Factory(t){return new(t||NgbNavItemRole)(i0.ɵɵinjectAttribute('role'),i0.ɵɵdirectiveInject(forwardRef(()=>NgbNav)));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavItemRole,selectors:[["","ngbNavItem","",5,"ng-container"]],hostVars:1,hostBindings:function NgbNavItemRole_HostBindings(rf,ctx){if(rf&2){i0.ɵɵattribute("role",ctx.role?ctx.role:ctx.nav.roles?"presentation":undefined);}},standalone:true});}} exports("NgbNavItemRole", NgbNavItemRole);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavItemRole,[{type:Directive,args:[{selector:'[ngbNavItem]:not(ng-container)',standalone:true,host:{'[attr.role]':`role ? role : nav.roles ? 'presentation' : undefined`}}]}],function(){return [{type:undefined,decorators:[{type:Attribute,args:['role']}]},{type:NgbNav,decorators:[{type:Inject,args:[forwardRef(()=>NgbNav)]}]}];},null);})();/**
             * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
             *
             * @since 5.2.0
             */class NgbNavItem{constructor(_nav,elementRef){this._nav=_nav;this.elementRef=elementRef;/**
                     * If `true`, the current nav item is disabled and can't be toggled by user.
                     *
                     * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
                     */this.disabled=false;/**
                     * An event emitted when the fade in transition is finished on the related nav content
                     *
                     * @since 8.0.0
                     */this.shown=new EventEmitter();/**
                     * An event emitted when the fade out transition is finished on the related nav content
                     *
                     * @since 8.0.0
                     */this.hidden=new EventEmitter();}ngAfterContentChecked(){// We are using @ContentChildren instead of @ContentChild as in the Angular version being used
            // only @ContentChildren allows us to specify the {descendants: false} option.
            // Without {descendants: false} we are hitting bugs described in:
            // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
            this.contentTpl=this.contentTpls.first;}ngOnInit(){if(!isDefined(this.domId)){this.domId=`ngb-nav-${navCounter++}`;}}get active(){return this._nav.activeId===this.id;}get id(){return isValidNavId(this._id)?this._id:this.domId;}get panelDomId(){return `${this.domId}-panel`;}isPanelInDom(){return (isDefined(this.destroyOnHide)?!this.destroyOnHide:!this._nav.destroyOnHide)||this.active;}static{this.ɵfac=function NgbNavItem_Factory(t){return new(t||NgbNavItem)(i0.ɵɵdirectiveInject(forwardRef(()=>NgbNav)),i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavItem,selectors:[["","ngbNavItem",""]],contentQueries:function NgbNavItem_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbNavContent,4);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.contentTpls=_t);}},hostVars:2,hostBindings:function NgbNavItem_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("nav-item",true);}},inputs:{destroyOnHide:"destroyOnHide",disabled:"disabled",domId:"domId",_id:["ngbNavItem","_id"]},outputs:{shown:"shown",hidden:"hidden"},exportAs:["ngbNavItem"],standalone:true});}} exports("NgbNavItem", NgbNavItem);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavItem,[{type:Directive,args:[{selector:'[ngbNavItem]',exportAs:'ngbNavItem',standalone:true,host:{'[class.nav-item]':'true'}}]}],function(){return [{type:NgbNav,decorators:[{type:Inject,args:[forwardRef(()=>NgbNav)]}]},{type:i0.ElementRef}];},{destroyOnHide:[{type:Input}],disabled:[{type:Input}],domId:[{type:Input}],_id:[{type:Input,args:['ngbNavItem']}],shown:[{type:Output}],hidden:[{type:Output}],contentTpls:[{type:ContentChildren,args:[NgbNavContent,{descendants:false}]}]});})();/**
             * A nav directive that helps with implementing tabbed navigation components.
             *
             * @since 5.2.0
             */class NgbNav{constructor(role,config,_cd,_document){this.role=role;this._cd=_cd;this._document=_document;/**
                     * The event emitted after the active nav changes
                     * The payload of the event is the newly active nav id
                     *
                     * If you want to prevent nav change, you should use `(navChange)` event
                     */this.activeIdChange=new EventEmitter();/**
                     * An event emitted when the fade in transition is finished for one of the items.
                     *
                     * Payload of the event is the nav id that was just shown.
                     *
                     * @since 8.0.0
                     */this.shown=new EventEmitter();/**
                     * An event emitted when the fade out transition is finished for one of the items.
                     *
                     * Payload of the event is the nav id that was just hidden.
                     *
                     * @since 8.0.0
                     */this.hidden=new EventEmitter();this.destroy$=new Subject();this.navItemChange$=new Subject();/**
                     * The nav change event emitted right before the nav change happens on user click.
                     *
                     * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
                     *
                     * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
                     */this.navChange=new EventEmitter();this.animation=config.animation;this.destroyOnHide=config.destroyOnHide;this.orientation=config.orientation;this.roles=config.roles;this.keyboard=config.keyboard;}click(item){if(!item.disabled){this._updateActiveId(item.id);}}onKeyDown(event){if(this.roles!=='tablist'||!this.keyboard){return;}/* eslint-disable-next-line deprecation/deprecation */const key=event.which;const enabledLinks=this.links.filter(link=>!link.navItem.disabled);const{length}=enabledLinks;let position=-1;enabledLinks.forEach((link,index)=>{if(link.elRef.nativeElement===this._document.activeElement){position=index;}});if(length){switch(key){case Key.ArrowLeft:if(this.orientation==='vertical'){return;}position=(position-1+length)%length;break;case Key.ArrowRight:if(this.orientation==='vertical'){return;}position=(position+1)%length;break;case Key.ArrowDown:if(this.orientation==='horizontal'){return;}position=(position+1)%length;break;case Key.ArrowUp:if(this.orientation==='horizontal'){return;}position=(position-1+length)%length;break;case Key.Home:position=0;break;case Key.End:position=length-1;break;}if(this.keyboard==='changeWithArrows'){this.select(enabledLinks[position].navItem.id);}enabledLinks[position].elRef.nativeElement.focus();event.preventDefault();}}/**
                 * Selects the nav with the given id and shows its associated pane.
                 * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
                 */select(id){this._updateActiveId(id,false);}ngAfterContentInit(){if(!isDefined(this.activeId)){const nextId=this.items.first?this.items.first.id:null;if(isValidNavId(nextId)){this._updateActiveId(nextId,false);this._cd.detectChanges();}}this.items.changes.pipe(takeUntil(this.destroy$)).subscribe(()=>this._notifyItemChanged(this.activeId));}ngOnChanges({activeId}){if(activeId&&!activeId.firstChange){this._notifyItemChanged(activeId.currentValue);}}ngOnDestroy(){this.destroy$.next();}_updateActiveId(nextId,emitNavChange=true){if(this.activeId!==nextId){let defaultPrevented=false;if(emitNavChange){this.navChange.emit({activeId:this.activeId,nextId,preventDefault:()=>{defaultPrevented=true;}});}if(!defaultPrevented){this.activeId=nextId;this.activeIdChange.emit(nextId);this._notifyItemChanged(nextId);}}}_notifyItemChanged(nextItemId){this.navItemChange$.next(this._getItemById(nextItemId));}_getItemById(itemId){return this.items&&this.items.find(item=>item.id===itemId)||null;}static{this.ɵfac=function NgbNav_Factory(t){return new(t||NgbNav)(i0.ɵɵinjectAttribute('role'),i0.ɵɵdirectiveInject(NgbNavConfig),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(DOCUMENT));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNav,selectors:[["","ngbNav",""]],contentQueries:function NgbNav_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbNavItem,4);i0.ɵɵcontentQuery(dirIndex,NgbNavLinkBase,5);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.items=_t);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.links=_t);}},hostVars:6,hostBindings:function NgbNav_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("keydown.arrowLeft",function NgbNav_keydown_arrowLeft_HostBindingHandler($event){return ctx.onKeyDown($event);})("keydown.arrowRight",function NgbNav_keydown_arrowRight_HostBindingHandler($event){return ctx.onKeyDown($event);})("keydown.arrowDown",function NgbNav_keydown_arrowDown_HostBindingHandler($event){return ctx.onKeyDown($event);})("keydown.arrowUp",function NgbNav_keydown_arrowUp_HostBindingHandler($event){return ctx.onKeyDown($event);})("keydown.Home",function NgbNav_keydown_Home_HostBindingHandler($event){return ctx.onKeyDown($event);})("keydown.End",function NgbNav_keydown_End_HostBindingHandler($event){return ctx.onKeyDown($event);});}if(rf&2){i0.ɵɵattribute("aria-orientation",ctx.orientation==="vertical"&&ctx.roles==="tablist"?"vertical":undefined)("role",ctx.role?ctx.role:ctx.roles?"tablist":undefined);i0.ɵɵclassProp("nav",true)("flex-column",ctx.orientation==="vertical");}},inputs:{activeId:"activeId",animation:"animation",destroyOnHide:"destroyOnHide",orientation:"orientation",roles:"roles",keyboard:"keyboard"},outputs:{activeIdChange:"activeIdChange",shown:"shown",hidden:"hidden",navChange:"navChange"},exportAs:["ngbNav"],standalone:true,features:[i0.ɵɵNgOnChangesFeature]});}} exports("NgbNav", NgbNav);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNav,[{type:Directive,args:[{selector:'[ngbNav]',exportAs:'ngbNav',standalone:true,host:{'[class.nav]':'true','[class.flex-column]':`orientation === 'vertical'`,'[attr.aria-orientation]':`orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,'[attr.role]':`role ? role : roles ? 'tablist' : undefined`,'(keydown.arrowLeft)':'onKeyDown($event)','(keydown.arrowRight)':'onKeyDown($event)','(keydown.arrowDown)':'onKeyDown($event)','(keydown.arrowUp)':'onKeyDown($event)','(keydown.Home)':'onKeyDown($event)','(keydown.End)':'onKeyDown($event)'}}]}],function(){return [{type:undefined,decorators:[{type:Attribute,args:['role']}]},{type:NgbNavConfig},{type:i0.ChangeDetectorRef},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]}];},{activeId:[{type:Input}],activeIdChange:[{type:Output}],animation:[{type:Input}],destroyOnHide:[{type:Input}],orientation:[{type:Input}],roles:[{type:Input}],keyboard:[{type:Input}],shown:[{type:Output}],hidden:[{type:Output}],items:[{type:ContentChildren,args:[NgbNavItem]}],links:[{type:ContentChildren,args:[forwardRef(()=>NgbNavLinkBase),{descendants:true}]}],navChange:[{type:Output}]});})();class NgbNavLinkBase{constructor(role,navItem,nav,elRef){this.role=role;this.navItem=navItem;this.nav=nav;this.elRef=elRef;}hasNavItemClass(){// with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
            return this.navItem.elementRef.nativeElement.nodeType===Node.COMMENT_NODE;}static{this.ɵfac=function NgbNavLinkBase_Factory(t){return new(t||NgbNavLinkBase)(i0.ɵɵinjectAttribute('role'),i0.ɵɵdirectiveInject(NgbNavItem),i0.ɵɵdirectiveInject(NgbNav),i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavLinkBase,selectors:[["","ngbNavLink",""]],hostVars:14,hostBindings:function NgbNavLinkBase_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("id",ctx.navItem.domId);i0.ɵɵattribute("role",ctx.role?ctx.role:ctx.nav.roles?"tab":undefined)("tabindex",ctx.navItem.disabled?-1:undefined)("aria-controls",ctx.navItem.isPanelInDom()?ctx.navItem.panelDomId:null)("aria-selected",ctx.navItem.active)("aria-disabled",ctx.navItem.disabled);i0.ɵɵclassProp("nav-link",true)("nav-item",ctx.hasNavItemClass())("active",ctx.navItem.active)("disabled",ctx.navItem.disabled);}},standalone:true});}} exports("NgbNavLinkBase", NgbNavLinkBase);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavLinkBase,[{type:Directive,args:[{selector:'[ngbNavLink]',standalone:true,host:{'[id]':'navItem.domId','[class.nav-link]':'true','[class.nav-item]':'hasNavItemClass()','[attr.role]':`role ? role : nav.roles ? 'tab' : undefined`,'[class.active]':'navItem.active','[class.disabled]':'navItem.disabled','[attr.tabindex]':'navItem.disabled ? -1 : undefined','[attr.aria-controls]':'navItem.isPanelInDom() ? navItem.panelDomId : null','[attr.aria-selected]':'navItem.active','[attr.aria-disabled]':'navItem.disabled'}}]}],function(){return [{type:undefined,decorators:[{type:Attribute,args:['role']}]},{type:NgbNavItem},{type:NgbNav},{type:i0.ElementRef}];},null);})();/**
             * A directive to mark the nav link when used on a button element.
             */class NgbNavLinkButton{constructor(navItem,nav){this.navItem=navItem;this.nav=nav;}static{this.ɵfac=function NgbNavLinkButton_Factory(t){return new(t||NgbNavLinkButton)(i0.ɵɵdirectiveInject(NgbNavItem),i0.ɵɵdirectiveInject(NgbNav));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavLinkButton,selectors:[["button","ngbNavLink",""]],hostAttrs:["type","button"],hostVars:1,hostBindings:function NgbNavLinkButton_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("click",function NgbNavLinkButton_click_HostBindingHandler(){return ctx.nav.click(ctx.navItem);});}if(rf&2){i0.ɵɵhostProperty("disabled",ctx.navItem.disabled);}},standalone:true,features:[i0.ɵɵHostDirectivesFeature([NgbNavLinkBase])]});}} exports("NgbNavLinkButton", NgbNavLinkButton);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavLinkButton,[{type:Directive,args:[{selector:'button[ngbNavLink]',standalone:true,hostDirectives:[NgbNavLinkBase],host:{type:'button','[disabled]':'navItem.disabled','(click)':'nav.click(navItem)'}}]}],function(){return [{type:NgbNavItem},{type:NgbNav}];},null);})();/**
             * A directive to mark the nav link when used on a link element.
             *
             * @since 5.2.0
             */class NgbNavLink{constructor(navItem,nav){this.navItem=navItem;this.nav=nav;}static{this.ɵfac=function NgbNavLink_Factory(t){return new(t||NgbNavLink)(i0.ɵɵdirectiveInject(NgbNavItem),i0.ɵɵdirectiveInject(NgbNav));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavLink,selectors:[["a","ngbNavLink",""]],hostAttrs:["href",""],hostBindings:function NgbNavLink_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("click",function NgbNavLink_click_HostBindingHandler($event){ctx.nav.click(ctx.navItem);return $event.preventDefault();});}},standalone:true,features:[i0.ɵɵHostDirectivesFeature([NgbNavLinkBase])]});}} exports("NgbNavLink", NgbNavLink);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavLink,[{type:Directive,args:[{selector:'a[ngbNavLink]',standalone:true,hostDirectives:[NgbNavLinkBase],host:{href:'','(click)':'nav.click(navItem); $event.preventDefault()'}}]}],function(){return [{type:NgbNavItem},{type:NgbNav}];},null);})();const ngbNavFadeOutTransition=({classList})=>{classList.remove('show');return ()=>classList.remove('active');};const ngbNavFadeInTransition=(element,animation)=>{if(animation){reflow(element);}element.classList.add('show');};class NgbNavPane{constructor(elRef){this.elRef=elRef;}static{this.ɵfac=function NgbNavPane_Factory(t){return new(t||NgbNavPane)(i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbNavPane,selectors:[["","ngbNavPane",""]],hostAttrs:[1,"tab-pane"],hostVars:5,hostBindings:function NgbNavPane_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("id",ctx.item.panelDomId);i0.ɵɵattribute("role",ctx.role?ctx.role:ctx.nav.roles?"tabpanel":undefined)("aria-labelledby",ctx.item.domId);i0.ɵɵclassProp("fade",ctx.nav.animation);}},inputs:{item:"item",nav:"nav",role:"role"},standalone:true});}} exports("NgbNavPane", NgbNavPane);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavPane,[{type:Directive,args:[{selector:'[ngbNavPane]',standalone:true,host:{'[id]':'item.panelDomId',class:'tab-pane','[class.fade]':'nav.animation','[attr.role]':'role ? role : nav.roles ? "tabpanel" : undefined','[attr.aria-labelledby]':'item.domId'}}]}],function(){return [{type:i0.ElementRef}];},{item:[{type:Input}],nav:[{type:Input}],role:[{type:Input}]});})();/**
             * The outlet where currently active nav content will be displayed.
             *
             * @since 5.2.0
             */class NgbNavOutlet{constructor(_cd,_ngZone){this._cd=_cd;this._ngZone=_ngZone;this._activePane=null;}isPanelTransitioning(item){return this._activePane?.item===item;}ngAfterViewInit(){// initial display
            this._updateActivePane();// this will be emitted for all 3 types of nav changes: .select(), [activeId] or (click)
            this.nav.navItemChange$.pipe(takeUntil(this.nav.destroy$),startWith(this._activePane?.item||null),distinctUntilChanged(),skip(1)).subscribe(nextItem=>{const options={animation:this.nav.animation,runningTransition:'stop'};// next panel we're switching to will only appear in DOM after the change detection is done
            // and `this._panes` will be updated
            this._cd.detectChanges();// fading out
            if(this._activePane){ngbRunTransition(this._ngZone,this._activePane.elRef.nativeElement,ngbNavFadeOutTransition,options).subscribe(()=>{const activeItem=this._activePane?.item;this._activePane=this._getPaneForItem(nextItem);// mark for check when transition finishes as outlet or parent containers might be OnPush
            // without this the panes that have "faded out" will stay in DOM
            this._cd.markForCheck();// fading in
            if(this._activePane){// we have to add the '.active' class before running the transition,
            // because it should be in place before `ngbRunTransition` does `reflow()`
            this._activePane.elRef.nativeElement.classList.add('active');ngbRunTransition(this._ngZone,this._activePane.elRef.nativeElement,ngbNavFadeInTransition,options).subscribe(()=>{if(nextItem){nextItem.shown.emit();this.nav.shown.emit(nextItem.id);}});}if(activeItem){activeItem.hidden.emit();this.nav.hidden.emit(activeItem.id);}});}else {this._updateActivePane();}});}_updateActivePane(){this._activePane=this._getActivePane();this._activePane?.elRef.nativeElement.classList.add('show');this._activePane?.elRef.nativeElement.classList.add('active');}_getPaneForItem(item){return this._panes&&this._panes.find(pane=>pane.item===item)||null;}_getActivePane(){return this._panes&&this._panes.find(pane=>pane.item.active)||null;}static{this.ɵfac=function NgbNavOutlet_Factory(t){return new(t||NgbNavOutlet)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbNavOutlet,selectors:[["","ngbNavOutlet",""]],viewQuery:function NgbNavOutlet_Query(rf,ctx){if(rf&1){i0.ɵɵviewQuery(NgbNavPane,5);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._panes=_t);}},hostVars:2,hostBindings:function NgbNavOutlet_HostBindings(rf,ctx){if(rf&2){i0.ɵɵclassProp("tab-content",true);}},inputs:{paneRole:"paneRole",nav:["ngbNavOutlet","nav"]},standalone:true,features:[i0.ɵɵStandaloneFeature],attrs:_c33,decls:1,vars:1,consts:[["ngFor","",3,"ngForOf"],["ngbNavPane","",3,"item","nav","role",4,"ngIf"],["ngbNavPane","",3,"item","nav","role"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function NgbNavOutlet_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbNavOutlet_ng_template_0_Template,1,1,"ng-template",0);}if(rf&2){i0.ɵɵproperty("ngForOf",ctx.nav.items);}},dependencies:[NgbNavPane,NgFor,NgIf,NgTemplateOutlet],encapsulation:2,changeDetection:0});}} exports("NgbNavOutlet", NgbNavOutlet);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavOutlet,[{type:Component,args:[{selector:'[ngbNavOutlet]',standalone:true,imports:[NgbNavPane,NgFor,NgIf,NgTemplateOutlet],host:{'[class.tab-content]':'true'},encapsulation:ViewEncapsulation.None,changeDetection:ChangeDetectionStrategy.OnPush,template:`
		<ng-template ngFor let-item [ngForOf]="nav.items">
			<div
				ngbNavPane
				*ngIf="item.isPanelInDom() || isPanelTransitioning(item)"
				[item]="item"
				[nav]="nav"
				[role]="paneRole"
			>
				<ng-template
					[ngTemplateOutlet]="item.contentTpl?.templateRef || null"
					[ngTemplateOutletContext]="{ $implicit: item.active || isPanelTransitioning(item) }"
				></ng-template>
			</div>
		</ng-template>
	`}]}],function(){return [{type:i0.ChangeDetectorRef},{type:i0.NgZone}];},{_panes:[{type:ViewChildren,args:[NgbNavPane]}],paneRole:[{type:Input}],nav:[{type:Input,args:['ngbNavOutlet']}]});})();const NGB_NAV_DIRECTIVES=[NgbNavContent,NgbNav,NgbNavItem,NgbNavItemRole,NgbNavLink,NgbNavLinkButton,NgbNavLinkBase,NgbNavOutlet,NgbNavPane];class NgbNavModule{static{this.ɵfac=function NgbNavModule_Factory(t){return new(t||NgbNavModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbNavModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbNavModule", NgbNavModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbNavModule,[{type:NgModule,args:[{imports:NGB_NAV_DIRECTIVES,exports:NGB_NAV_DIRECTIVES}]}],null,null);})();/**
             * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the paginations used in the application.
             */class NgbPaginationConfig{constructor(){this.disabled=false;this.boundaryLinks=false;this.directionLinks=true;this.ellipses=true;this.maxSize=0;this.pageSize=10;this.rotate=false;}static{this.ɵfac=function NgbPaginationConfig_Factory(t){return new(t||NgbPaginationConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbPaginationConfig,factory:NgbPaginationConfig.ɵfac,providedIn:'root'});}} exports("NgbPaginationConfig", NgbPaginationConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();/**
             * A directive to match the 'ellipsis' link template
             *
             * @since 4.1.0
             */class NgbPaginationEllipsis{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPaginationEllipsis_Factory(t){return new(t||NgbPaginationEllipsis)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPaginationEllipsis,selectors:[["ng-template","ngbPaginationEllipsis",""]],standalone:true});}} exports("NgbPaginationEllipsis", NgbPaginationEllipsis);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationEllipsis,[{type:Directive,args:[{selector:'ng-template[ngbPaginationEllipsis]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive to match the 'first' link template
             *
             * @since 4.1.0
             */class NgbPaginationFirst{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPaginationFirst_Factory(t){return new(t||NgbPaginationFirst)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPaginationFirst,selectors:[["ng-template","ngbPaginationFirst",""]],standalone:true});}} exports("NgbPaginationFirst", NgbPaginationFirst);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationFirst,[{type:Directive,args:[{selector:'ng-template[ngbPaginationFirst]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive to match the 'last' link template
             *
             * @since 4.1.0
             */class NgbPaginationLast{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPaginationLast_Factory(t){return new(t||NgbPaginationLast)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPaginationLast,selectors:[["ng-template","ngbPaginationLast",""]],standalone:true});}} exports("NgbPaginationLast", NgbPaginationLast);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationLast,[{type:Directive,args:[{selector:'ng-template[ngbPaginationLast]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive to match the 'next' link template
             *
             * @since 4.1.0
             */class NgbPaginationNext{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPaginationNext_Factory(t){return new(t||NgbPaginationNext)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPaginationNext,selectors:[["ng-template","ngbPaginationNext",""]],standalone:true});}} exports("NgbPaginationNext", NgbPaginationNext);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationNext,[{type:Directive,args:[{selector:'ng-template[ngbPaginationNext]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive to match the page 'number' link template
             *
             * @since 4.1.0
             */class NgbPaginationNumber{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPaginationNumber_Factory(t){return new(t||NgbPaginationNumber)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPaginationNumber,selectors:[["ng-template","ngbPaginationNumber",""]],standalone:true});}} exports("NgbPaginationNumber", NgbPaginationNumber);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationNumber,[{type:Directive,args:[{selector:'ng-template[ngbPaginationNumber]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive to match the 'previous' link template
             *
             * @since 4.1.0
             */class NgbPaginationPrevious{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPaginationPrevious_Factory(t){return new(t||NgbPaginationPrevious)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPaginationPrevious,selectors:[["ng-template","ngbPaginationPrevious",""]],standalone:true});}} exports("NgbPaginationPrevious", NgbPaginationPrevious);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationPrevious,[{type:Directive,args:[{selector:'ng-template[ngbPaginationPrevious]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A directive to match the 'pages' whole content
             *
             * @since 9.1.0
             */class NgbPaginationPages{constructor(templateRef){this.templateRef=templateRef;}static{this.ɵfac=function NgbPaginationPages_Factory(t){return new(t||NgbPaginationPages)(i0.ɵɵdirectiveInject(i0.TemplateRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPaginationPages,selectors:[["ng-template","ngbPaginationPages",""]],standalone:true});}} exports("NgbPaginationPages", NgbPaginationPages);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationPages,[{type:Directive,args:[{selector:'ng-template[ngbPaginationPages]',standalone:true}]}],function(){return [{type:i0.TemplateRef}];},null);})();/**
             * A component that displays page numbers and allows to customize them in several ways.
             */class NgbPagination{constructor(config){this.pageCount=0;this.pages=[];/**
                     *  The current page.
                     *
                     *  Page numbers start with `1`.
                     */this.page=1;/**
                     *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
                     *
                     *  Event payload is the number of the newly selected page.
                     *
                     *  Page numbers start with `1`.
                     */this.pageChange=new EventEmitter(true);this.disabled=config.disabled;this.boundaryLinks=config.boundaryLinks;this.directionLinks=config.directionLinks;this.ellipses=config.ellipses;this.maxSize=config.maxSize;this.pageSize=config.pageSize;this.rotate=config.rotate;this.size=config.size;}hasPrevious(){return this.page>1;}hasNext(){return this.page<this.pageCount;}nextDisabled(){return !this.hasNext()||this.disabled;}previousDisabled(){return !this.hasPrevious()||this.disabled;}selectPage(pageNumber){this._updatePages(pageNumber);}ngOnChanges(changes){this._updatePages(this.page);}isEllipsis(pageNumber){return pageNumber===-1;}/**
                 * Appends ellipses and first/last page number to the displayed pages
                 */_applyEllipses(start,end){if(this.ellipses){if(start>0){// The first page will always be included. If the displayed range
            // starts after the third page, then add ellipsis. But if the range
            // starts on the third page, then add the second page instead of
            // an ellipsis, because the ellipsis would only hide a single page.
            if(start>2){this.pages.unshift(-1);}else if(start===2){this.pages.unshift(2);}this.pages.unshift(1);}if(end<this.pageCount){// The last page will always be included. If the displayed range
            // ends before the third-last page, then add ellipsis. But if the range
            // ends on third-last page, then add the second-last page instead of
            // an ellipsis, because the ellipsis would only hide a single page.
            if(end<this.pageCount-2){this.pages.push(-1);}else if(end===this.pageCount-2){this.pages.push(this.pageCount-1);}this.pages.push(this.pageCount);}}}/**
                 * Rotates page numbers based on maxSize items visible.
                 * Currently selected page stays in the middle:
                 *
                 * Ex. for selected page = 6:
                 * [5,*6*,7] for maxSize = 3
                 * [4,5,*6*,7] for maxSize = 4
                 */_applyRotation(){let start=0;let end=this.pageCount;let leftOffset=Math.floor(this.maxSize/2);let rightOffset=this.maxSize%2===0?leftOffset-1:leftOffset;if(this.page<=leftOffset){// very beginning, no rotation -> [0..maxSize]
            end=this.maxSize;}else if(this.pageCount-this.page<leftOffset){// very end, no rotation -> [len-maxSize..len]
            start=this.pageCount-this.maxSize;}else {// rotate
            start=this.page-leftOffset-1;end=this.page+rightOffset;}return [start,end];}/**
                 * Paginates page numbers based on maxSize items per page.
                 */_applyPagination(){let page=Math.ceil(this.page/this.maxSize)-1;let start=page*this.maxSize;let end=start+this.maxSize;return [start,end];}_setPageInRange(newPageNo){const prevPageNo=this.page;this.page=getValueInRange(newPageNo,this.pageCount,1);if(this.page!==prevPageNo&&isNumber(this.collectionSize)){this.pageChange.emit(this.page);}}_updatePages(newPage){this.pageCount=Math.ceil(this.collectionSize/this.pageSize);if(!isNumber(this.pageCount)){this.pageCount=0;}// fill-in model needed to render pages
            this.pages.length=0;for(let i=1;i<=this.pageCount;i++){this.pages.push(i);}// set page within 1..max range
            this._setPageInRange(newPage);// apply maxSize if necessary
            if(this.maxSize>0&&this.pageCount>this.maxSize){let start=0;let end=this.pageCount;// either paginating or rotating page numbers
            if(this.rotate){[start,end]=this._applyRotation();}else {[start,end]=this._applyPagination();}this.pages=this.pages.slice(start,end);// adding ellipses
            this._applyEllipses(start,end);}}static{this.ɵfac=function NgbPagination_Factory(t){return new(t||NgbPagination)(i0.ɵɵdirectiveInject(NgbPaginationConfig));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbPagination,selectors:[["ngb-pagination"]],contentQueries:function NgbPagination_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbPaginationEllipsis,5);i0.ɵɵcontentQuery(dirIndex,NgbPaginationFirst,5);i0.ɵɵcontentQuery(dirIndex,NgbPaginationLast,5);i0.ɵɵcontentQuery(dirIndex,NgbPaginationNext,5);i0.ɵɵcontentQuery(dirIndex,NgbPaginationNumber,5);i0.ɵɵcontentQuery(dirIndex,NgbPaginationPrevious,5);i0.ɵɵcontentQuery(dirIndex,NgbPaginationPages,5);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.tplEllipsis=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.tplFirst=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.tplLast=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.tplNext=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.tplNumber=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.tplPrevious=_t.first);i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.tplPages=_t.first);}},hostAttrs:["role","navigation"],inputs:{disabled:"disabled",boundaryLinks:"boundaryLinks",directionLinks:"directionLinks",ellipses:"ellipses",rotate:"rotate",collectionSize:"collectionSize",maxSize:"maxSize",page:"page",pageSize:"pageSize",size:"size"},outputs:{pageChange:"pageChange"},standalone:true,features:[i0.ɵɵNgOnChangesFeature,i0.ɵɵStandaloneFeature],decls:20,vars:12,consts:function(){let i18n_34;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__35=goog.getMsg("\xAB\xAB");i18n_34=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__35;}else {i18n_34=$localize`:@@ngb.pagination.first:««`;}let i18n_36;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__37=goog.getMsg("\xAB");i18n_36=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__37;}else {i18n_36=$localize`:@@ngb.pagination.previous:«`;}let i18n_38;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__39=goog.getMsg("\xBB");i18n_38=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__39;}else {i18n_38=$localize`:@@ngb.pagination.next:»`;}let i18n_40;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__41=goog.getMsg("\xBB\xBB");i18n_40=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__41;}else {i18n_40=$localize`:@@ngb.pagination.last:»»`;}let i18n_44;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__45=goog.getMsg("First");i18n_44=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__45;}else {i18n_44=$localize`:@@ngb.pagination.first-aria:First`;}let i18n_47;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__48=goog.getMsg("Previous");i18n_47=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__48;}else {i18n_47=$localize`:@@ngb.pagination.previous-aria:Previous`;}let i18n_50;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__51=goog.getMsg("Next");i18n_50=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__51;}else {i18n_50=$localize`:@@ngb.pagination.next-aria:Next`;}let i18n_52;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__53=goog.getMsg("Last");i18n_52=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__53;}else {i18n_52=$localize`:@@ngb.pagination.last-aria:Last`;}return [["first",""],["previous",""],["next",""],["last",""],["ellipsis",""],["defaultNumber",""],["defaultPages",""],["class","page-item",3,"disabled",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["aria-hidden","true"],i18n_34,i18n_36,i18n_38,i18n_40,["class","page-item",3,"active","disabled",4,"ngFor","ngForOf"],[1,"page-item"],["class","page-link","tabindex","-1","aria-disabled","true",4,"ngIf"],["class","page-link","href","",3,"click",4,"ngIf"],["tabindex","-1","aria-disabled","true",1,"page-link"],["href","",1,"page-link",3,"click"],["aria-label",i18n_44,"href","",1,"page-link",3,"click"],["aria-label",i18n_47,"href","",1,"page-link",3,"click"],["aria-label",i18n_50,"href","",1,"page-link",3,"click"],["aria-label",i18n_52,"href","",1,"page-link",3,"click"]];},template:function NgbPagination_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbPagination_ng_template_0_Template,2,0,"ng-template",null,0,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(2,NgbPagination_ng_template_2_Template,2,0,"ng-template",null,1,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(4,NgbPagination_ng_template_4_Template,2,0,"ng-template",null,2,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(6,NgbPagination_ng_template_6_Template,2,0,"ng-template",null,3,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(8,NgbPagination_ng_template_8_Template,1,0,"ng-template",null,4,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(10,NgbPagination_ng_template_10_Template,1,1,"ng-template",null,5,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(12,NgbPagination_ng_template_12_Template,1,1,"ng-template",null,6,i0.ɵɵtemplateRefExtractor);i0.ɵɵelementStart(14,"ul");i0.ɵɵtemplate(15,NgbPagination_li_15_Template,3,9,"li",7);i0.ɵɵtemplate(16,NgbPagination_li_16_Template,3,8,"li",7);i0.ɵɵtemplate(17,NgbPagination_ng_template_17_Template,0,0,"ng-template",8);i0.ɵɵtemplate(18,NgbPagination_li_18_Template,3,9,"li",7);i0.ɵɵtemplate(19,NgbPagination_li_19_Template,3,9,"li",7);i0.ɵɵelementEnd();}if(rf&2){const _r12=i0.ɵɵreference(13);i0.ɵɵadvance(14);i0.ɵɵclassMap("pagination"+(ctx.size?" pagination-"+ctx.size:""));i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.boundaryLinks);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.directionLinks);i0.ɵɵadvance(1);i0.ɵɵproperty("ngTemplateOutlet",(ctx.tplPages==null?null:ctx.tplPages.templateRef)||_r12)("ngTemplateOutletContext",i0.ɵɵpureFunction3(8,_c54,ctx.page,ctx.pages,ctx.disabled));i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.directionLinks);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.boundaryLinks);}},dependencies:[NgIf,NgFor,NgTemplateOutlet],encapsulation:2,changeDetection:0});}} exports("NgbPagination", NgbPagination);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPagination,[{type:Component,args:[{selector:'ngb-pagination',standalone:true,imports:[NgIf,NgFor,NgTemplateOutlet],changeDetection:ChangeDetectionStrategy.OnPush,host:{role:'navigation'},template:`
		<ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
		<ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
		<ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
		<ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
		<ng-template #ellipsis>...</ng-template>
		<ng-template #defaultNumber let-page let-currentPage="currentPage">{{ page }}</ng-template>
		<ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
			<li
				*ngFor="let pageNumber of pages"
				class="page-item"
				[class.active]="pageNumber === page"
				[class.disabled]="isEllipsis(pageNumber) || disabled"
				[attr.aria-current]="pageNumber === page ? 'page' : null"
			>
				<a *ngIf="isEllipsis(pageNumber)" class="page-link" tabindex="-1" aria-disabled="true">
					<ng-template
						[ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
						[ngTemplateOutletContext]="{ disabled: true, currentPage: page }"
					></ng-template>
				</a>
				<a
					*ngIf="!isEllipsis(pageNumber)"
					class="page-link"
					href
					(click)="selectPage(pageNumber); $event.preventDefault()"
					[attr.tabindex]="disabled ? '-1' : null"
					[attr.aria-disabled]="disabled ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
						[ngTemplateOutletContext]="{ disabled: disabled, $implicit: pageNumber, currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ng-template>
		<ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="First"
					i18n-aria-label="@@ngb.pagination.first-aria"
					class="page-link"
					href
					(click)="selectPage(1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplFirst?.templateRef || first"
						[ngTemplateOutletContext]="{ disabled: previousDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="directionLinks" class="page-item" [class.disabled]="previousDisabled()">
				<a
					aria-label="Previous"
					i18n-aria-label="@@ngb.pagination.previous-aria"
					class="page-link"
					href
					(click)="selectPage(page - 1); $event.preventDefault()"
					[attr.tabindex]="previousDisabled() ? '-1' : null"
					[attr.aria-disabled]="previousDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplPrevious?.templateRef || previous"
						[ngTemplateOutletContext]="{ disabled: previousDisabled() }"
					></ng-template>
				</a>
			</li>
			<ng-template
				[ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
				[ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
			>
			</ng-template>
			<li *ngIf="directionLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Next"
					i18n-aria-label="@@ngb.pagination.next-aria"
					class="page-link"
					href
					(click)="selectPage(page + 1); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplNext?.templateRef || next"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>

			<li *ngIf="boundaryLinks" class="page-item" [class.disabled]="nextDisabled()">
				<a
					aria-label="Last"
					i18n-aria-label="@@ngb.pagination.last-aria"
					class="page-link"
					href
					(click)="selectPage(pageCount); $event.preventDefault()"
					[attr.tabindex]="nextDisabled() ? '-1' : null"
					[attr.aria-disabled]="nextDisabled() ? 'true' : null"
				>
					<ng-template
						[ngTemplateOutlet]="tplLast?.templateRef || last"
						[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
					></ng-template>
				</a>
			</li>
		</ul>
	`}]}],function(){return [{type:NgbPaginationConfig}];},{tplEllipsis:[{type:ContentChild,args:[NgbPaginationEllipsis,{static:false}]}],tplFirst:[{type:ContentChild,args:[NgbPaginationFirst,{static:false}]}],tplLast:[{type:ContentChild,args:[NgbPaginationLast,{static:false}]}],tplNext:[{type:ContentChild,args:[NgbPaginationNext,{static:false}]}],tplNumber:[{type:ContentChild,args:[NgbPaginationNumber,{static:false}]}],tplPrevious:[{type:ContentChild,args:[NgbPaginationPrevious,{static:false}]}],tplPages:[{type:ContentChild,args:[NgbPaginationPages,{static:false}]}],disabled:[{type:Input}],boundaryLinks:[{type:Input}],directionLinks:[{type:Input}],ellipses:[{type:Input}],rotate:[{type:Input}],collectionSize:[{type:Input,args:[{required:true}]}],maxSize:[{type:Input}],page:[{type:Input}],pageSize:[{type:Input}],pageChange:[{type:Output}],size:[{type:Input}]});})();const NGB_PAGINATION_DIRECTIVES=[NgbPagination,NgbPaginationEllipsis,NgbPaginationFirst,NgbPaginationLast,NgbPaginationNext,NgbPaginationNumber,NgbPaginationPrevious,NgbPaginationPages];class NgbPaginationModule{static{this.ɵfac=function NgbPaginationModule_Factory(t){return new(t||NgbPaginationModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbPaginationModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbPaginationModule", NgbPaginationModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPaginationModule,[{type:NgModule,args:[{imports:NGB_PAGINATION_DIRECTIVES,exports:NGB_PAGINATION_DIRECTIVES}]}],null,null);})();const ALIASES={hover:['mouseenter','mouseleave'],focus:['focusin','focusout']};function parseTriggers(triggers){const trimmedTriggers=(triggers||'').trim();if(trimmedTriggers.length===0){return [];}const parsedTriggers=trimmedTriggers.split(/\s+/).map(trigger=>trigger.split(':')).map(triggerPair=>ALIASES[triggerPair[0]]||triggerPair);const manualTriggers=parsedTriggers.filter(triggerPair=>triggerPair.includes('manual'));if(manualTriggers.length>1){throw `Triggers parse error: only one manual trigger is allowed`;}if(manualTriggers.length===1&&parsedTriggers.length>1){throw `Triggers parse error: manual trigger can't be mixed with other triggers`;}return manualTriggers.length?[]:parsedTriggers;}function listenToTriggers(element,triggers,isOpenedFn,openFn,closeFn,openDelayMs=0,closeDelayMs=0){const parsedTriggers=parseTriggers(triggers);if(parsedTriggers.length===0){return ()=>{};}const activeOpenTriggers=new Set();const cleanupFns=[];let timeout;function addEventListener(name,listener){element.addEventListener(name,listener);cleanupFns.push(()=>element.removeEventListener(name,listener));}function withDelay(fn,delayMs){clearTimeout(timeout);if(delayMs>0){timeout=setTimeout(fn,delayMs);}else {fn();}}for(const[openTrigger,closeTrigger]of parsedTriggers){if(!closeTrigger){addEventListener(openTrigger,()=>isOpenedFn()?withDelay(closeFn,closeDelayMs):withDelay(openFn,openDelayMs));}else {addEventListener(openTrigger,()=>{activeOpenTriggers.add(openTrigger);withDelay(()=>activeOpenTriggers.size>0&&openFn(),openDelayMs);});addEventListener(closeTrigger,()=>{activeOpenTriggers.delete(openTrigger);withDelay(()=>activeOpenTriggers.size===0&&closeFn(),closeDelayMs);});}}return ()=>cleanupFns.forEach(cleanupFn=>cleanupFn());}/**
             * A configuration service for the [`NgbPopover`](#/components/popover/api#NgbPopover) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the popovers used in the application.
             */class NgbPopoverConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.autoClose=true;this.placement='auto';this.popperOptions=options=>options;this.triggers='click';this.disablePopover=false;this.openDelay=0;this.closeDelay=0;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbPopoverConfig_Factory(t){return new(t||NgbPopoverConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbPopoverConfig,factory:NgbPopoverConfig.ɵfac,providedIn:'root'});}} exports("NgbPopoverConfig", NgbPopoverConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPopoverConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();let nextId$1=0;class NgbPopoverWindow{isTitleTemplate(){return this.title instanceof TemplateRef;}static{this.ɵfac=function NgbPopoverWindow_Factory(t){return new(t||NgbPopoverWindow)();};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbPopoverWindow,selectors:[["ngb-popover-window"]],hostAttrs:["role","tooltip",2,"position","absolute"],hostVars:5,hostBindings:function NgbPopoverWindow_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("id",ctx.id);i0.ɵɵclassMap("popover"+(ctx.popoverClass?" "+ctx.popoverClass:""));i0.ɵɵclassProp("fade",ctx.animation);}},inputs:{animation:"animation",title:"title",id:"id",popoverClass:"popoverClass",context:"context"},standalone:true,features:[i0.ɵɵStandaloneFeature],ngContentSelectors:_c3,decls:4,vars:1,consts:[["data-popper-arrow","",1,"popover-arrow"],["class","popover-header",4,"ngIf"],[1,"popover-body"],[1,"popover-header"],["simpleTitle",""],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function NgbPopoverWindow_Template(rf,ctx){if(rf&1){i0.ɵɵprojectionDef();i0.ɵɵelement(0,"div",0);i0.ɵɵtemplate(1,NgbPopoverWindow_h3_1_Template,4,2,"h3",1);i0.ɵɵelementStart(2,"div",2);i0.ɵɵprojection(3);i0.ɵɵelementEnd();}if(rf&2){i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.title);}},dependencies:[NgTemplateOutlet,NgIf],encapsulation:2,changeDetection:0});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPopoverWindow,[{type:Component,args:[{selector:'ngb-popover-window',standalone:true,imports:[NgTemplateOutlet,NgIf],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{'[class]':'"popover" + (popoverClass ? " " + popoverClass : "")','[class.fade]':'animation',role:'tooltip','[id]':'id',style:'position: absolute;'},template:` <div class="popover-arrow" data-popper-arrow></div>
		<h3 class="popover-header" *ngIf="title">
			<ng-template #simpleTitle>{{ title }}</ng-template>
			<ng-template
				[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
				[ngTemplateOutletContext]="context"
			></ng-template>
		</h3>
		<div class="popover-body"><ng-content></ng-content></div>`}]}],null,{animation:[{type:Input}],title:[{type:Input}],id:[{type:Input}],popoverClass:[{type:Input}],context:[{type:Input}]});})();/**
             * A lightweight and extensible directive for fancy popover creation.
             */class NgbPopover{_isDisabled(){if(this.disablePopover){return true;}if(!this.ngbPopover&&!this.popoverTitle){return true;}return false;}constructor(_elementRef,_renderer,injector,viewContainerRef,config,_ngZone,_document,_changeDetector,applicationRef){this._elementRef=_elementRef;this._renderer=_renderer;this._ngZone=_ngZone;this._document=_document;this._changeDetector=_changeDetector;/**
                     * An event emitted when the popover opening animation has finished. Contains no payload.
                     */this.shown=new EventEmitter();/**
                     * An event emitted when the popover closing animation has finished. Contains no payload.
                     *
                     * At this point popover is not in the DOM anymore.
                     */this.hidden=new EventEmitter();this._ngbPopoverWindowId=`ngb-popover-${nextId$1++}`;this._windowRef=null;this.animation=config.animation;this.autoClose=config.autoClose;this.placement=config.placement;this.popperOptions=config.popperOptions;this.triggers=config.triggers;this.container=config.container;this.disablePopover=config.disablePopover;this.popoverClass=config.popoverClass;this.openDelay=config.openDelay;this.closeDelay=config.closeDelay;this._positioning=ngbPositioning();this._popupService=new PopupService(NgbPopoverWindow,injector,viewContainerRef,_renderer,this._ngZone,applicationRef);}/**
                 * Opens the popover.
                 *
                 * This is considered to be a "manual" triggering.
                 * The `context` is an optional value to be injected into the popover template when it is created.
                 */open(context){if(!this._windowRef&&!this._isDisabled()){// this type assertion is safe because otherwise _isDisabled would return true
            const{windowRef,transition$}=this._popupService.open(this.ngbPopover,context??this.popoverContext,this.animation);this._windowRef=windowRef;this._windowRef.setInput('animation',this.animation);this._windowRef.setInput('title',this.popoverTitle);this._windowRef.setInput('context',context??this.popoverContext);this._windowRef.setInput('popoverClass',this.popoverClass);this._windowRef.setInput('id',this._ngbPopoverWindowId);this._renderer.setAttribute(this._getPositionTargetElement(),'aria-describedby',this._ngbPopoverWindowId);if(this.container==='body'){this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);}// We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();// We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();// Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(()=>{this._positioning.createPopper({hostElement:this._getPositionTargetElement(),targetElement:this._windowRef.location.nativeElement,placement:this.placement,appendToBody:this.container==='body',baseClass:'bs-popover',updatePopperOptions:options=>this.popperOptions(addPopperOffset([0,8])(options))});Promise.resolve().then(()=>{// This update is required for correct arrow placement
            this._positioning.update();this._zoneSubscription=this._ngZone.onStable.subscribe(()=>this._positioning.update());});});ngbAutoClose(this._ngZone,this._document,this.autoClose,()=>this.close(),this.hidden,[this._windowRef.location.nativeElement]);transition$.subscribe(()=>this.shown.emit());}}/**
                 * Closes the popover.
                 *
                 * This is considered to be a "manual" triggering of the popover.
                 */close(animation=this.animation){if(this._windowRef){this._renderer.removeAttribute(this._getPositionTargetElement(),'aria-describedby');this._popupService.close(animation).subscribe(()=>{this._windowRef=null;this._positioning.destroy();this._zoneSubscription?.unsubscribe();this.hidden.emit();this._changeDetector.markForCheck();});}}/**
                 * Toggles the popover.
                 *
                 * This is considered to be a "manual" triggering of the popover.
                 */toggle(){if(this._windowRef){this.close();}else {this.open();}}/**
                 * Returns `true`, if the popover is currently shown.
                 */isOpen(){return this._windowRef!=null;}ngOnInit(){this._unregisterListenersFn=listenToTriggers(this._elementRef.nativeElement,this.triggers,this.isOpen.bind(this),this.open.bind(this),this.close.bind(this),+this.openDelay,+this.closeDelay);}ngOnChanges({ngbPopover,popoverTitle,disablePopover,popoverClass}){if(popoverClass&&this.isOpen()){this._windowRef.instance.popoverClass=popoverClass.currentValue;}// close popover if title and content become empty, or disablePopover set to true
            if((ngbPopover||popoverTitle||disablePopover)&&this._isDisabled()){this.close();}}ngOnDestroy(){this.close(false);// This check is needed as it might happen that ngOnDestroy is called before ngOnInit
            // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
            this._unregisterListenersFn?.();}_getPositionTargetElement(){return (isString(this.positionTarget)?this._document.querySelector(this.positionTarget):this.positionTarget)||this._elementRef.nativeElement;}static{this.ɵfac=function NgbPopover_Factory(t){return new(t||NgbPopover)(i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.Renderer2),i0.ɵɵdirectiveInject(i0.Injector),i0.ɵɵdirectiveInject(i0.ViewContainerRef),i0.ɵɵdirectiveInject(NgbPopoverConfig),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(DOCUMENT),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(i0.ApplicationRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbPopover,selectors:[["","ngbPopover",""]],inputs:{animation:"animation",autoClose:"autoClose",ngbPopover:"ngbPopover",popoverTitle:"popoverTitle",placement:"placement",popperOptions:"popperOptions",triggers:"triggers",positionTarget:"positionTarget",container:"container",disablePopover:"disablePopover",popoverClass:"popoverClass",popoverContext:"popoverContext",openDelay:"openDelay",closeDelay:"closeDelay"},outputs:{shown:"shown",hidden:"hidden"},exportAs:["ngbPopover"],standalone:true,features:[i0.ɵɵNgOnChangesFeature]});}} exports("NgbPopover", NgbPopover);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPopover,[{type:Directive,args:[{selector:'[ngbPopover]',exportAs:'ngbPopover',standalone:true}]}],function(){return [{type:i0.ElementRef},{type:i0.Renderer2},{type:i0.Injector},{type:i0.ViewContainerRef},{type:NgbPopoverConfig},{type:i0.NgZone},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:i0.ChangeDetectorRef},{type:i0.ApplicationRef}];},{animation:[{type:Input}],autoClose:[{type:Input}],ngbPopover:[{type:Input}],popoverTitle:[{type:Input}],placement:[{type:Input}],popperOptions:[{type:Input}],triggers:[{type:Input}],positionTarget:[{type:Input}],container:[{type:Input}],disablePopover:[{type:Input}],popoverClass:[{type:Input}],popoverContext:[{type:Input}],openDelay:[{type:Input}],closeDelay:[{type:Input}],shown:[{type:Output}],hidden:[{type:Output}]});})();class NgbPopoverModule{static{this.ɵfac=function NgbPopoverModule_Factory(t){return new(t||NgbPopoverModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbPopoverModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbPopoverModule", NgbPopoverModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbPopoverModule,[{type:NgModule,args:[{imports:[NgbPopover],exports:[NgbPopover]}]}],null,null);})();/**
             * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the progress bars used in the application.
             */class NgbProgressbarConfig{constructor(){this.max=100;this.animated=false;this.ariaLabel='progress bar';this.striped=false;this.showValue=false;}static{this.ɵfac=function NgbProgressbarConfig_Factory(t){return new(t||NgbProgressbarConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbProgressbarConfig,factory:NgbProgressbarConfig.ɵfac,providedIn:'root'});}} exports("NgbProgressbarConfig", NgbProgressbarConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbProgressbarConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();/**
             * A directive that provides feedback on the progress of a workflow or an action.
             */class NgbProgressbar{/**
                 * The maximal value to be displayed in the progress bar.
                 *
                 * Should be a positive number. Will default to 100 otherwise.
                 */set max(max){this._max=!isNumber(max)||max<=0?100:max;}get max(){return this._max;}constructor(config){/**
                     * The current value for the progress bar.
                     *
                     * Should be in the `[0, max]` range.
                     */this.value=0;this.max=config.max;this.animated=config.animated;this.ariaLabel=config.ariaLabel;this.striped=config.striped;this.textType=config.textType;this.type=config.type;this.showValue=config.showValue;this.height=config.height;}getValue(){return getValueInRange(this.value,this.max);}getPercentValue(){return 100*this.getValue()/this.max;}static{this.ɵfac=function NgbProgressbar_Factory(t){return new(t||NgbProgressbar)(i0.ɵɵdirectiveInject(NgbProgressbarConfig));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbProgressbar,selectors:[["ngb-progressbar"]],hostAttrs:["role","progressbar","aria-valuemin","0",1,"progress"],hostVars:5,hostBindings:function NgbProgressbar_HostBindings(rf,ctx){if(rf&2){i0.ɵɵattribute("aria-valuenow",ctx.getValue())("aria-valuemax",ctx.max)("aria-label",ctx.ariaLabel);i0.ɵɵstyleProp("height",ctx.height);}},inputs:{max:"max",animated:"animated",ariaLabel:"ariaLabel",striped:"striped",showValue:"showValue",textType:"textType",type:"type",value:"value",height:"height"},standalone:true,features:[i0.ɵɵStandaloneFeature],ngContentSelectors:_c3,decls:3,vars:11,consts:function(){let i18n_55;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__56=goog.getMsg("{$interpolation}",{"interpolation":"\uFFFD0\uFFFD"},{original_code:{"interpolation":"{{ getValue() / max | percent }}"}});i18n_55=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__56;}else {i18n_55=$localize`:@@ngb.progressbar.value:${"\uFFFD0\uFFFD"}:INTERPOLATION:`;}return [[4,"ngIf"],i18n_55];},template:function NgbProgressbar_Template(rf,ctx){if(rf&1){i0.ɵɵprojectionDef();i0.ɵɵelementStart(0,"div");i0.ɵɵtemplate(1,NgbProgressbar_span_1_Template,3,3,"span",0);i0.ɵɵprojection(2);i0.ɵɵelementEnd();}if(rf&2){i0.ɵɵclassMapInterpolate2("progress-bar",ctx.type?ctx.textType?" bg-"+ctx.type:" text-bg-"+ctx.type:"","",ctx.textType?" text-"+ctx.textType:"","");i0.ɵɵstyleProp("width",ctx.getPercentValue(),"%");i0.ɵɵclassProp("progress-bar-animated",ctx.animated)("progress-bar-striped",ctx.striped);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.showValue);}},dependencies:[NgIf,PercentPipe],encapsulation:2,changeDetection:0});}} exports("NgbProgressbar", NgbProgressbar);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbProgressbar,[{type:Component,args:[{selector:'ngb-progressbar',standalone:true,imports:[NgIf,PercentPipe],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{class:'progress',role:'progressbar','[attr.aria-valuenow]':'getValue()','aria-valuemin':'0','[attr.aria-valuemax]':'max','[attr.aria-label]':'ariaLabel'},template:`
		<div
			class="progress-bar{{ type ? (textType ? ' bg-' + type : ' text-bg-' + type) : '' }}{{
				textType ? ' text-' + textType : ''
			}}"
			[class.progress-bar-animated]="animated"
			[class.progress-bar-striped]="striped"
			[style.width.%]="getPercentValue()"
		>
			<span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{ getValue() / max | percent }}</span
			><ng-content></ng-content>
		</div>
	`}]}],function(){return [{type:NgbProgressbarConfig}];},{max:[{type:Input}],animated:[{type:Input}],ariaLabel:[{type:Input}],striped:[{type:Input}],showValue:[{type:Input}],textType:[{type:Input}],type:[{type:Input}],value:[{type:Input,args:[{required:true}]}],height:[{type:Input},{type:HostBinding,args:['style.height']}]});})();class NgbProgressbarModule{static{this.ɵfac=function NgbProgressbarModule_Factory(t){return new(t||NgbProgressbarModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbProgressbarModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbProgressbarModule", NgbProgressbarModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbProgressbarModule,[{type:NgModule,args:[{imports:[NgbProgressbar],exports:[NgbProgressbar]}]}],null,null);})();/**
             * A configuration service for the [`NgbRating`](#/components/rating/api#NgbRating) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the ratings used in the application.
             */class NgbRatingConfig{constructor(){this.max=10;this.readonly=false;this.resettable=false;this.tabindex=0;}static{this.ɵfac=function NgbRatingConfig_Factory(t){return new(t||NgbRatingConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbRatingConfig,factory:NgbRatingConfig.ɵfac,providedIn:'root'});}} exports("NgbRatingConfig", NgbRatingConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbRatingConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();/**
             * A directive that helps visualising and interacting with a star rating bar.
             */class NgbRating{/**
                 * Allows to provide a function to set a custom aria-valuetext
                 *
                 * @since 14.1.0
                 */ariaValueText(current,max){return `${current} out of ${max}`;}constructor(config,_changeDetectorRef){this._changeDetectorRef=_changeDetectorRef;this.contexts=[];/**
                     * If `true`, the rating can't be changed or focused.
                     */this.disabled=false;/**
                     * An event emitted when the user is hovering over a given rating.
                     *
                     * Event payload equals to the rating being hovered over.
                     */this.hover=new EventEmitter();/**
                     * An event emitted when the user stops hovering over a given rating.
                     *
                     * Event payload equals to the rating of the last item being hovered over.
                     */this.leave=new EventEmitter();/**
                     * An event emitted when the rating is changed.
                     *
                     * Event payload equals to the newly selected rating.
                     */this.rateChange=new EventEmitter(true);this.onChange=_=>{};this.onTouched=()=>{};this.max=config.max;this.readonly=config.readonly;this.tabindex=config.tabindex;}isInteractive(){return !this.readonly&&!this.disabled;}enter(value){if(this.isInteractive()){this._updateState(value);}this.hover.emit(value);}handleBlur(){this.onTouched();}handleClick(value){if(this.isInteractive()){this.update(this.resettable&&this.rate===value?0:value);}}handleKeyDown(event){/* eslint-disable-next-line deprecation/deprecation */switch(event.which){case Key.ArrowDown:case Key.ArrowLeft:this.update(this.rate-1);break;case Key.ArrowUp:case Key.ArrowRight:this.update(this.rate+1);break;case Key.Home:this.update(0);break;case Key.End:this.update(this.max);break;default:return;}// note 'return' in default case
            event.preventDefault();}ngOnChanges(changes){if(changes['rate']){this.update(this.rate);}if(changes['max']){this._updateMax();}}ngOnInit(){this._setupContexts();this._updateState(this.rate);}registerOnChange(fn){this.onChange=fn;}registerOnTouched(fn){this.onTouched=fn;}reset(){this.leave.emit(this.nextRate);this._updateState(this.rate);}setDisabledState(isDisabled){this.disabled=isDisabled;}update(value,internalChange=true){const newRate=getValueInRange(value,this.max,0);if(this.isInteractive()&&this.rate!==newRate){this.rate=newRate;this.rateChange.emit(this.rate);}if(internalChange){this.onChange(this.rate);this.onTouched();}this._updateState(this.rate);}writeValue(value){this.update(value,false);this._changeDetectorRef.markForCheck();}_updateState(nextValue){this.nextRate=nextValue;this.contexts.forEach((context,index)=>context.fill=Math.round(getValueInRange(nextValue-index,1,0)*100));}_updateMax(){if(this.max>0){this._setupContexts();this.update(this.rate);}}_setupContexts(){this.contexts=Array.from({length:this.max},(v,k)=>({fill:0,index:k}));}static{this.ɵfac=function NgbRating_Factory(t){return new(t||NgbRating)(i0.ɵɵdirectiveInject(NgbRatingConfig),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbRating,selectors:[["ngb-rating"]],contentQueries:function NgbRating_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,TemplateRef,5);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.starTemplateFromContent=_t.first);}},hostAttrs:["role","slider","aria-valuemin","0",1,"d-inline-flex"],hostVars:6,hostBindings:function NgbRating_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("blur",function NgbRating_blur_HostBindingHandler(){return ctx.handleBlur();})("keydown",function NgbRating_keydown_HostBindingHandler($event){return ctx.handleKeyDown($event);})("mouseleave",function NgbRating_mouseleave_HostBindingHandler(){return ctx.reset();});}if(rf&2){i0.ɵɵhostProperty("tabindex",ctx.disabled?-1:ctx.tabindex);i0.ɵɵattribute("aria-valuemax",ctx.max)("aria-valuenow",ctx.nextRate)("aria-valuetext",ctx.ariaValueText(ctx.nextRate,ctx.max))("aria-readonly",ctx.readonly&&!ctx.disabled?true:null)("aria-disabled",ctx.disabled?true:null);}},inputs:{disabled:"disabled",max:"max",rate:"rate",readonly:"readonly",resettable:"resettable",starTemplate:"starTemplate",tabindex:"tabindex",ariaValueText:"ariaValueText"},outputs:{hover:"hover",leave:"leave",rateChange:"rateChange"},standalone:true,features:[i0.ɵɵProvidersFeature([{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbRating),multi:true}]),i0.ɵɵNgOnChangesFeature,i0.ɵɵStandaloneFeature],decls:3,vars:1,consts:[["t",""],["ngFor","",3,"ngForOf"],[1,"visually-hidden"],[3,"mouseenter","click"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function NgbRating_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbRating_ng_template_0_Template,1,1,"ng-template",null,0,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(2,NgbRating_ng_template_2_Template,4,5,"ng-template",1);}if(rf&2){i0.ɵɵadvance(2);i0.ɵɵproperty("ngForOf",ctx.contexts);}},dependencies:[NgFor,NgTemplateOutlet],encapsulation:2,changeDetection:0});}} exports("NgbRating", NgbRating);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbRating,[{type:Component,args:[{selector:'ngb-rating',standalone:true,imports:[NgFor,NgTemplateOutlet],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{class:'d-inline-flex','[tabindex]':'disabled ? -1 : tabindex',role:'slider','aria-valuemin':'0','[attr.aria-valuemax]':'max','[attr.aria-valuenow]':'nextRate','[attr.aria-valuetext]':'ariaValueText(nextRate, max)','[attr.aria-readonly]':'readonly && !disabled ? true : null','[attr.aria-disabled]':'disabled ? true : null','(blur)':'handleBlur()','(keydown)':'handleKeyDown($event)','(mouseleave)':'reset()'},template:`
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		<ng-template ngFor [ngForOf]="contexts" let-index="index">
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				>
				</ng-template>
			</span>
		</ng-template>
	`,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbRating),multi:true}]}]}],function(){return [{type:NgbRatingConfig},{type:i0.ChangeDetectorRef}];},{disabled:[{type:Input}],max:[{type:Input}],rate:[{type:Input}],readonly:[{type:Input}],resettable:[{type:Input}],starTemplate:[{type:Input}],starTemplateFromContent:[{type:ContentChild,args:[TemplateRef,{static:false}]}],tabindex:[{type:Input}],ariaValueText:[{type:Input}],hover:[{type:Output}],leave:[{type:Output}],rateChange:[{type:Output}]});})();class NgbRatingModule{static{this.ɵfac=function NgbRatingModule_Factory(t){return new(t||NgbRatingModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbRatingModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbRatingModule", NgbRatingModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbRatingModule,[{type:NgModule,args:[{imports:[NgbRating],exports:[NgbRating]}]}],null,null);})();function toFragmentElement(container,id){if(!container||id==null){return null;}return isString(id)?container.querySelector(`#${CSS.escape(id)}`):id;}function getOrderedFragments(container,fragments){const selector=[...fragments].map(({id})=>`#${CSS.escape(id)}`).join(',');return Array.from(container.querySelectorAll(selector));}const defaultProcessChanges=(state,changeActive,ctx)=>{const{rootElement,fragments,scrollSpy,options,entries}=state;const orderedFragments=getOrderedFragments(rootElement,fragments);if(!ctx.initialized){ctx.initialized=true;ctx.gapFragment=null;ctx.visibleFragments=new Set();// special case when one of the fragments was pre-selected
            const preSelectedFragment=toFragmentElement(rootElement,options?.initialFragment);if(preSelectedFragment){scrollSpy.scrollTo(preSelectedFragment);return;}}for(const entry of entries){const{isIntersecting,target:fragment}=entry;// 1. an entry became visible
            if(isIntersecting){// if we were in-between two elements, we have to clear it up
            if(ctx.gapFragment){ctx.visibleFragments.delete(ctx.gapFragment);ctx.gapFragment=null;}ctx.visibleFragments.add(fragment);}// 2. an entry became invisible
            else {ctx.visibleFragments.delete(fragment);// nothing is visible anymore, but something just was actually
            if(ctx.visibleFragments.size===0&&scrollSpy.active!==''){// 2.1 scrolling down - keeping the same element
            if(entry.boundingClientRect.top<entry.rootBounds.top){ctx.gapFragment=fragment;ctx.visibleFragments.add(ctx.gapFragment);}// 2.2 scrolling up - getting the previous element
            else {// scrolling up and no more fragments above
            if(fragment===orderedFragments[0]){ctx.gapFragment=null;ctx.visibleFragments.clear();changeActive('');return;}// getting previous fragment
            else {const fragmentIndex=orderedFragments.indexOf(fragment);ctx.gapFragment=orderedFragments[fragmentIndex-1]||null;if(ctx.gapFragment){ctx.visibleFragments.add(ctx.gapFragment);}}}}}}// getting the first visible element in the DOM order of the fragments
            for(const fragment of orderedFragments){if(ctx.visibleFragments.has(fragment)){changeActive(fragment.id);break;}}};/**
             * A configuration service for the [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all scrollspies used in the application.
             *
             * @since 15.1.0
             */class NgbScrollSpyConfig{constructor(){this.scrollBehavior='smooth';this.processChanges=defaultProcessChanges;}static{this.ɵfac=function NgbScrollSpyConfig_Factory(t){return new(t||NgbScrollSpyConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbScrollSpyConfig,factory:NgbScrollSpyConfig.ɵfac,providedIn:'root'});}} exports("NgbScrollSpyConfig", NgbScrollSpyConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbScrollSpyConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();const MATCH_THRESHOLD=3;/**
             * A scrollspy service that allows tracking of elements scrolling in and out of view.
             *
             * It can be instantiated manually, or automatically by the `ngbScrollSpy` directive.
             *
             * @since 15.1.0
             */class NgbScrollSpyService{constructor(){this._observer=null;this._containerElement=null;this._fragments=new Set();this._preRegisteredFragments=new Set();this._active$=new Subject();this._distinctActive$=this._active$.pipe(distinctUntilChanged());this._active='';this._config=inject(NgbScrollSpyConfig);this._document=inject(DOCUMENT);this._platformId=inject(PLATFORM_ID);this._scrollBehavior=this._config.scrollBehavior;this._diChangeDetectorRef=inject(ChangeDetectorRef,{optional:true});this._changeDetectorRef=this._diChangeDetectorRef;this._zone=inject(NgZone);this._distinctActive$.pipe(takeUntilDestroyed()).subscribe(active=>{this._active=active;this._changeDetectorRef?.markForCheck();});}/**
                 * Getter for the currently active fragment id. Returns empty string if none.
                 */get active(){return this._active;}/**
                 * An observable emitting the currently active fragment. Emits empty string if none.
                 */get active$(){return this._distinctActive$;}/**
                 * Starts the scrollspy service and observes specified fragments.
                 *
                 * You can specify a list of options to pass, like the root element, initial fragment, scroll behavior, etc.
                 * See the [`NgbScrollSpyOptions`](#/components/scrollspy/api#NgbScrollSpyOptions) interface for more details.
                 */start(options){if(isPlatformBrowser(this._platformId)){this._cleanup();const{root,rootMargin,scrollBehavior,threshold,fragments,changeDetectorRef,processChanges}={...options};this._containerElement=root??this._document.documentElement;this._changeDetectorRef=changeDetectorRef??this._diChangeDetectorRef;this._scrollBehavior=scrollBehavior??this._config.scrollBehavior;const processChangesFn=processChanges??this._config.processChanges;const context={};this._observer=new IntersectionObserver(entries=>processChangesFn({entries,rootElement:this._containerElement,fragments:this._fragments,scrollSpy:this,options:{...options}},active=>this._active$.next(active),context),{root:root??this._document,...(rootMargin&&{rootMargin}),...(threshold&&{threshold})});// merging fragments added before starting and the ones passed as options
            for(const element of [...this._preRegisteredFragments,...(fragments??[])]){this.observe(element);}this._preRegisteredFragments.clear();}}/**
                 * Stops the service and unobserves all fragments.
                 */stop(){this._cleanup();this._active$.next('');}/**
                 * Scrolls to a fragment, it must be known to the service and contained in the root element.
                 * An id or an element reference can be passed.
                 *
                 * [`NgbScrollToOptions`](#/components/scrollspy/api#NgbScrollToOptions) can be passed.
                 */scrollTo(fragment,options){const{behavior}={behavior:this._scrollBehavior,...options};if(this._containerElement){const fragmentElement=toFragmentElement(this._containerElement,fragment);if(fragmentElement){const heightPx=fragmentElement.offsetTop-this._containerElement.offsetTop;this._containerElement.scrollTo({top:heightPx,behavior});let lastOffset=this._containerElement.scrollTop;let matchCounter=0;// we should update the active section only after scrolling is finished
            // and there is no clean way to do it at the moment
            const containerElement=this._containerElement;this._zone.runOutsideAngular(()=>{const updateActiveWhenScrollingIsFinished=()=>{const sameOffsetAsLastTime=lastOffset===containerElement.scrollTop;if(sameOffsetAsLastTime){matchCounter++;}else {matchCounter=0;}if(!sameOffsetAsLastTime||sameOffsetAsLastTime&&matchCounter<MATCH_THRESHOLD){lastOffset=containerElement.scrollTop;requestAnimationFrame(updateActiveWhenScrollingIsFinished);}else {this._zone.run(()=>this._active$.next(fragmentElement.id));}};requestAnimationFrame(updateActiveWhenScrollingIsFinished);});}}}/**
                 * Adds a fragment to observe. It must be contained in the root element.
                 * An id or an element reference can be passed.
                 */observe(fragment){if(!this._observer){this._preRegisteredFragments.add(fragment);return;}const fragmentElement=toFragmentElement(this._containerElement,fragment);if(fragmentElement&&!this._fragments.has(fragmentElement)){this._fragments.add(fragmentElement);this._observer.observe(fragmentElement);}}/**
                 * Unobserves a fragment.
                 * An id or an element reference can be passed.
                 */unobserve(fragment){if(!this._observer){this._preRegisteredFragments.delete(fragment);return;}const fragmentElement=toFragmentElement(this._containerElement,fragment);if(fragmentElement){this._fragments.delete(fragmentElement);// we're removing and re-adding all current fragments to recompute active one
            this._observer.disconnect();for(const fragment of this._fragments){this._observer.observe(fragment);}}}ngOnDestroy(){this._cleanup();}_cleanup(){this._fragments.clear();this._observer?.disconnect();this._changeDetectorRef=this._diChangeDetectorRef;this._scrollBehavior=this._config.scrollBehavior;this._observer=null;this._containerElement=null;}static{this.ɵfac=function NgbScrollSpyService_Factory(t){return new(t||NgbScrollSpyService)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbScrollSpyService,factory:NgbScrollSpyService.ɵfac,providedIn:'root'});}} exports("NgbScrollSpyService", NgbScrollSpyService);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbScrollSpyService,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [];},null);})();/**
             * A helper directive to that links menu items and fragments together.
             *
             * It will automatically add the `.active` class to the menu item when the associated fragment becomes active.
             *
             * @since 15.1.0
             */class NgbScrollSpyItem{constructor(){this._changeDetector=inject(ChangeDetectorRef);this._scrollSpyMenu=inject(NgbScrollSpyMenu,{optional:true});this._scrollSpyAPI=this._scrollSpyMenu??inject(NgbScrollSpyService);this._destroyRef=inject(DestroyRef);this._isActive=false;}/**
                 * References the scroll spy directive, the id of the associated fragment and the parent menu item.
                 *
                 * Can be used like:
                 *  - `ngbScrollSpyItem="fragmentId"`
                 *  - `[ngbScrollSpyItem]="scrollSpy" fragment="fragmentId"
                 *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId']"` parent="parentId"`
                 *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId', 'parentId']"`
                 *
                 *  As well as together with `[fragment]` and `[parent]` inputs.
                 */set data(data){if(Array.isArray(data)){this._scrollSpyAPI=data[0];this.fragment=data[1];this.parent??=data[2];}else if(data instanceof NgbScrollSpy){this._scrollSpyAPI=data;}else if(isString(data)){this.fragment=data;}}ngOnInit(){// if it is not a part of a bigger menu, it should handle activation itself
            if(!this._scrollSpyMenu){this._scrollSpyAPI.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(active=>{if(active===this.fragment){this._activate();}else {this._deactivate();}this._changeDetector.markForCheck();});}}/**
                 * @internal
                 */_activate(){this._isActive=true;if(this._scrollSpyMenu){this._scrollSpyMenu.getItem(this.parent??'')?._activate();}}/**
                 * @internal
                 */_deactivate(){this._isActive=false;if(this._scrollSpyMenu){this._scrollSpyMenu.getItem(this.parent??'')?._deactivate();}}/**
                 * Returns `true`, if the associated fragment is active.
                 */isActive(){return this._isActive;}/**
                 * Scrolls to the associated fragment.
                 */scrollTo(options){this._scrollSpyAPI.scrollTo(this.fragment,options);}static{this.ɵfac=function NgbScrollSpyItem_Factory(t){return new(t||NgbScrollSpyItem)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbScrollSpyItem,selectors:[["","ngbScrollSpyItem",""]],hostVars:2,hostBindings:function NgbScrollSpyItem_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("click",function NgbScrollSpyItem_click_HostBindingHandler(){return ctx.scrollTo();});}if(rf&2){i0.ɵɵclassProp("active",ctx.isActive());}},inputs:{data:["ngbScrollSpyItem","data"],fragment:"fragment",parent:"parent"},exportAs:["ngbScrollSpyItem"],standalone:true});}} exports("NgbScrollSpyItem", NgbScrollSpyItem);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbScrollSpyItem,[{type:Directive,args:[{selector:'[ngbScrollSpyItem]',standalone:true,exportAs:'ngbScrollSpyItem',host:{'[class.active]':'isActive()','(click)':'scrollTo();'}}]}],null,{data:[{type:Input,args:['ngbScrollSpyItem']}],fragment:[{type:Input}],parent:[{type:Input}]});})();/**
             * An optional scroll spy menu directive to build hierarchical menus
             * and simplify the [`NgbScrollSpyItem`](#/components/scrollspy/api#NgbScrollSpyItem) configuration.
             *
             * @since 15.1.0
             */class NgbScrollSpyMenu{constructor(){this._scrollSpyRef=inject(NgbScrollSpyService);this._destroyRef=inject(DestroyRef);this._map=new Map();this._lastActiveItem=null;}set scrollSpy(scrollSpy){this._scrollSpyRef=scrollSpy;}get active(){return this._scrollSpyRef.active;}get active$(){return this._scrollSpyRef.active$;}scrollTo(fragment,options){this._scrollSpyRef.scrollTo(fragment,options);}getItem(id){return this._map.get(id);}ngAfterViewInit(){this._items.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(()=>this._rebuildMap());this._rebuildMap();this._scrollSpyRef.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(activeId=>{this._lastActiveItem?._deactivate();const item=this._map.get(activeId);if(item){item._activate();this._lastActiveItem=item;}});}_rebuildMap(){this._map.clear();for(let item of this._items){this._map.set(item.fragment,item);}}static{this.ɵfac=function NgbScrollSpyMenu_Factory(t){return new(t||NgbScrollSpyMenu)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbScrollSpyMenu,selectors:[["","ngbScrollSpyMenu",""]],contentQueries:function NgbScrollSpyMenu_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbScrollSpyItem,5);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx._items=_t);}},inputs:{scrollSpy:["ngbScrollSpyMenu","scrollSpy"]},standalone:true});}} exports("NgbScrollSpyMenu", NgbScrollSpyMenu);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbScrollSpyMenu,[{type:Directive,args:[{selector:'[ngbScrollSpyMenu]',standalone:true}]}],null,{_items:[{type:ContentChildren,args:[NgbScrollSpyItem,{descendants:true}]}],scrollSpy:[{type:Input,args:['ngbScrollSpyMenu']}]});})();/**
             * A directive to put on a scrollable container.
             *
             * It will instantiate a [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
             *
             * @since 15.1.0
             */class NgbScrollSpy{constructor(){this._initialFragment=null;this._service=inject(NgbScrollSpyService);this._nativeElement=inject(ElementRef).nativeElement;/**
                     * An event raised when the active section changes.
                     *
                     * Payload is the id of the new active section, empty string if none.
                     */this.activeChange=this._service.active$;}set active(fragment){this._initialFragment=fragment;this.scrollTo(fragment);}/**
                 * Getter/setter for the currently active fragment id.
                 */get active(){return this._service.active;}/**
                 * Returns an observable that emits currently active section id.
                 */get active$(){return this._service.active$;}ngAfterViewInit(){this._service.start({processChanges:this.processChanges,root:this._nativeElement,rootMargin:this.rootMargin,threshold:this.threshold,...(this._initialFragment&&{initialFragment:this._initialFragment})});}/**
                 * @internal
                 */_registerFragment(fragment){this._service.observe(fragment.id);}/**
                 * @internal
                 */_unregisterFragment(fragment){this._service.unobserve(fragment.id);}/**
                 * Scrolls to a fragment that is identified by the `ngbScrollSpyFragment` directive.
                 * An id or an element reference can be passed.
                 */scrollTo(fragment,options){this._service.scrollTo(fragment,{...(this.scrollBehavior&&{behavior:this.scrollBehavior}),...options});}static{this.ɵfac=function NgbScrollSpy_Factory(t){return new(t||NgbScrollSpy)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbScrollSpy,selectors:[["","ngbScrollSpy",""]],hostAttrs:["tabindex","0",2,"overflow-y","auto"],inputs:{processChanges:"processChanges",rootMargin:"rootMargin",scrollBehavior:"scrollBehavior",threshold:"threshold",active:"active"},outputs:{activeChange:"activeChange"},exportAs:["ngbScrollSpy"],standalone:true,features:[i0.ɵɵProvidersFeature([NgbScrollSpyService])]});}} exports("NgbScrollSpy", NgbScrollSpy);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbScrollSpy,[{type:Directive,args:[{selector:'[ngbScrollSpy]',standalone:true,exportAs:'ngbScrollSpy',host:{tabindex:'0',style:'overflow-y: auto'},providers:[NgbScrollSpyService]}]}],null,{processChanges:[{type:Input}],rootMargin:[{type:Input}],scrollBehavior:[{type:Input}],threshold:[{type:Input}],active:[{type:Input}],activeChange:[{type:Output}]});})();/**
             * A directive to put on a fragment observed inside a scrollspy container.
             *
             * @since 15.1.0
             */class NgbScrollSpyFragment{constructor(){this._destroyRef=inject(DestroyRef);this._scrollSpy=inject(NgbScrollSpy);}ngAfterViewInit(){this._scrollSpy._registerFragment(this);this._destroyRef.onDestroy(()=>this._scrollSpy._unregisterFragment(this));}static{this.ɵfac=function NgbScrollSpyFragment_Factory(t){return new(t||NgbScrollSpyFragment)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbScrollSpyFragment,selectors:[["","ngbScrollSpyFragment",""]],hostVars:1,hostBindings:function NgbScrollSpyFragment_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("id",ctx.id);}},inputs:{id:["ngbScrollSpyFragment","id"]},standalone:true});}} exports("NgbScrollSpyFragment", NgbScrollSpyFragment);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbScrollSpyFragment,[{type:Directive,args:[{selector:'[ngbScrollSpyFragment]',standalone:true,host:{'[id]':'id'}}]}],null,{id:[{type:Input,args:['ngbScrollSpyFragment']}]});})();class NgbScrollSpyModule{static{this.ɵfac=function NgbScrollSpyModule_Factory(t){return new(t||NgbScrollSpyModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbScrollSpyModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbScrollSpyModule", NgbScrollSpyModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbScrollSpyModule,[{type:NgModule,args:[{imports:[NgbScrollSpy,NgbScrollSpyItem,NgbScrollSpyFragment,NgbScrollSpyMenu],exports:[NgbScrollSpy,NgbScrollSpyItem,NgbScrollSpyFragment,NgbScrollSpyMenu]}]}],null,null);})();class NgbTime{constructor(hour,minute,second){this.hour=toInteger(hour);this.minute=toInteger(minute);this.second=toInteger(second);}changeHour(step=1){this.updateHour((isNaN(this.hour)?0:this.hour)+step);}updateHour(hour){if(isNumber(hour)){this.hour=(hour<0?24+hour:hour)%24;}else {this.hour=NaN;}}changeMinute(step=1){this.updateMinute((isNaN(this.minute)?0:this.minute)+step);}updateMinute(minute){if(isNumber(minute)){this.minute=minute%60<0?60+minute%60:minute%60;this.changeHour(Math.floor(minute/60));}else {this.minute=NaN;}}changeSecond(step=1){this.updateSecond((isNaN(this.second)?0:this.second)+step);}updateSecond(second){if(isNumber(second)){this.second=second<0?60+second%60:second%60;this.changeMinute(Math.floor(second/60));}else {this.second=NaN;}}isValid(checkSecs=true){return isNumber(this.hour)&&isNumber(this.minute)&&(checkSecs?isNumber(this.second):true);}toString(){return `${this.hour||0}:${this.minute||0}:${this.second||0}`;}}/**
             * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the timepickers used in the application.
             */class NgbTimepickerConfig{constructor(){this.meridian=false;this.spinners=true;this.seconds=false;this.hourStep=1;this.minuteStep=1;this.secondStep=1;this.disabled=false;this.readonlyInputs=false;this.size='medium';}static{this.ɵfac=function NgbTimepickerConfig_Factory(t){return new(t||NgbTimepickerConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbTimepickerConfig,factory:NgbTimepickerConfig.ɵfac,providedIn:'root'});}} exports("NgbTimepickerConfig", NgbTimepickerConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTimepickerConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();function NGB_DATEPICKER_TIME_ADAPTER_FACTORY(){return new NgbTimeStructAdapter();}/**
             * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
             * any provided user time model `T`, ex. a string, a native date, etc.
             *
             * The adapter is used **only** for conversion when binding timepicker to a form control,
             * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
             *
             * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
             *
             * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
             *
             * @since 2.2.0
             */class NgbTimeAdapter{static{this.ɵfac=function NgbTimeAdapter_Factory(t){return new(t||NgbTimeAdapter)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbTimeAdapter,factory:function(){return NGB_DATEPICKER_TIME_ADAPTER_FACTORY();},providedIn:'root'});}} exports("NgbTimeAdapter", NgbTimeAdapter);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTimeAdapter,[{type:Injectable,args:[{providedIn:'root',useFactory:NGB_DATEPICKER_TIME_ADAPTER_FACTORY}]}],null,null);})();class NgbTimeStructAdapter extends NgbTimeAdapter{/**
                 * Converts a NgbTimeStruct value into NgbTimeStruct value
                 */fromModel(time){return time&&isInteger(time.hour)&&isInteger(time.minute)?{hour:time.hour,minute:time.minute,second:isInteger(time.second)?time.second:null}:null;}/**
                 * Converts a NgbTimeStruct value into NgbTimeStruct value
                 */toModel(time){return time&&isInteger(time.hour)&&isInteger(time.minute)?{hour:time.hour,minute:time.minute,second:isInteger(time.second)?time.second:null}:null;}static{this.ɵfac=/* @__PURE__ */function(){let ɵNgbTimeStructAdapter_BaseFactory;return function NgbTimeStructAdapter_Factory(t){return (ɵNgbTimeStructAdapter_BaseFactory||(ɵNgbTimeStructAdapter_BaseFactory=i0.ɵɵgetInheritedFactory(NgbTimeStructAdapter)))(t||NgbTimeStructAdapter);};}();}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbTimeStructAdapter,factory:NgbTimeStructAdapter.ɵfac});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTimeStructAdapter,[{type:Injectable}],null,null);})();function NGB_TIMEPICKER_I18N_FACTORY(locale){return new NgbTimepickerI18nDefault(locale);}/**
             * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
             * The default implementation of this service honors the Angular locale, and uses the registered locale data,
             * as explained in the Angular i18n guide.
             */class NgbTimepickerI18n{static{this.ɵfac=function NgbTimepickerI18n_Factory(t){return new(t||NgbTimepickerI18n)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbTimepickerI18n,factory:function NgbTimepickerI18n_Factory(t){let r=null;if(t){r=new t();}else {r=NGB_TIMEPICKER_I18N_FACTORY(i0.ɵɵinject(LOCALE_ID));}return r;},providedIn:'root'});}} exports("NgbTimepickerI18n", NgbTimepickerI18n);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTimepickerI18n,[{type:Injectable,args:[{providedIn:'root',useFactory:NGB_TIMEPICKER_I18N_FACTORY,deps:[LOCALE_ID]}]}],null,null);})();class NgbTimepickerI18nDefault extends NgbTimepickerI18n{constructor(locale){super();this._periods=getLocaleDayPeriods(locale,FormStyle.Standalone,TranslationWidth.Narrow);}getMorningPeriod(){return this._periods[0];}getAfternoonPeriod(){return this._periods[1];}static{this.ɵfac=function NgbTimepickerI18nDefault_Factory(t){return new(t||NgbTimepickerI18nDefault)(i0.ɵɵinject(LOCALE_ID));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbTimepickerI18nDefault,factory:NgbTimepickerI18nDefault.ɵfac});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTimepickerI18nDefault,[{type:Injectable}],function(){return [{type:undefined,decorators:[{type:Inject,args:[LOCALE_ID]}]}];},null);})();const FILTER_REGEX=/[^0-9]/g;/**
             * A directive that helps with wth picking hours, minutes and seconds.
             */class NgbTimepicker{/**
                 * The number of hours to add/subtract when clicking hour spinners.
                 */set hourStep(step){this._hourStep=isInteger(step)?step:this._config.hourStep;}get hourStep(){return this._hourStep;}/**
                 * The number of minutes to add/subtract when clicking minute spinners.
                 */set minuteStep(step){this._minuteStep=isInteger(step)?step:this._config.minuteStep;}get minuteStep(){return this._minuteStep;}/**
                 * The number of seconds to add/subtract when clicking second spinners.
                 */set secondStep(step){this._secondStep=isInteger(step)?step:this._config.secondStep;}get secondStep(){return this._secondStep;}constructor(_config,_ngbTimeAdapter,_cd,i18n){this._config=_config;this._ngbTimeAdapter=_ngbTimeAdapter;this._cd=_cd;this.i18n=i18n;this.onChange=_=>{};this.onTouched=()=>{};this.meridian=_config.meridian;this.spinners=_config.spinners;this.seconds=_config.seconds;this.hourStep=_config.hourStep;this.minuteStep=_config.minuteStep;this.secondStep=_config.secondStep;this.disabled=_config.disabled;this.readonlyInputs=_config.readonlyInputs;this.size=_config.size;}writeValue(value){const structValue=this._ngbTimeAdapter.fromModel(value);this.model=structValue?new NgbTime(structValue.hour,structValue.minute,structValue.second):new NgbTime();if(!this.seconds&&(!structValue||!isNumber(structValue.second))){this.model.second=0;}this._cd.markForCheck();}registerOnChange(fn){this.onChange=fn;}registerOnTouched(fn){this.onTouched=fn;}setDisabledState(isDisabled){this.disabled=isDisabled;}/**
                 * Increments the hours by the given step.
                 */changeHour(step){this.model?.changeHour(step);this.propagateModelChange();}/**
                 * Increments the minutes by the given step.
                 */changeMinute(step){this.model?.changeMinute(step);this.propagateModelChange();}/**
                 * Increments the seconds by the given step.
                 */changeSecond(step){this.model?.changeSecond(step);this.propagateModelChange();}/**
                 * Update hours with the new value.
                 */updateHour(newVal){const isPM=this.model?this.model.hour>=12:false;const enteredHour=toInteger(newVal);if(this.meridian&&(isPM&&enteredHour<12||!isPM&&enteredHour===12)){this.model?.updateHour(enteredHour+12);}else {this.model?.updateHour(enteredHour);}this.propagateModelChange();}/**
                 * Update minutes with the new value.
                 */updateMinute(newVal){this.model?.updateMinute(toInteger(newVal));this.propagateModelChange();}/**
                 * Update seconds with the new value.
                 */updateSecond(newVal){this.model?.updateSecond(toInteger(newVal));this.propagateModelChange();}toggleMeridian(){if(this.meridian){this.changeHour(12);}}formatInput(input){input.value=input.value.replace(FILTER_REGEX,'');}formatHour(value){if(isNumber(value)){if(this.meridian){return padNumber(value%12===0?12:value%12);}else {return padNumber(value%24);}}else {return padNumber(NaN);}}formatMinSec(value){return padNumber(isNumber(value)?value:NaN);}handleBlur(){this.onTouched();}get isSmallSize(){return this.size==='small';}get isLargeSize(){return this.size==='large';}ngOnChanges(changes){if(changes['seconds']&&!this.seconds&&this.model&&!isNumber(this.model.second)){this.model.second=0;this.propagateModelChange(false);}}propagateModelChange(touched=true){if(touched){this.onTouched();}if(this.model?.isValid(this.seconds)){this.onChange(this._ngbTimeAdapter.toModel({hour:this.model.hour,minute:this.model.minute,second:this.model.second}));}else {this.onChange(this._ngbTimeAdapter.toModel(null));}}static{this.ɵfac=function NgbTimepicker_Factory(t){return new(t||NgbTimepicker)(i0.ɵɵdirectiveInject(NgbTimepickerConfig),i0.ɵɵdirectiveInject(NgbTimeAdapter),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(NgbTimepickerI18n));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbTimepicker,selectors:[["ngb-timepicker"]],inputs:{meridian:"meridian",spinners:"spinners",seconds:"seconds",hourStep:"hourStep",minuteStep:"minuteStep",secondStep:"secondStep",readonlyInputs:"readonlyInputs",size:"size"},exportAs:["ngbTimepicker"],standalone:true,features:[i0.ɵɵProvidersFeature([{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbTimepicker),multi:true}]),i0.ɵɵNgOnChangesFeature,i0.ɵɵStandaloneFeature],decls:16,vars:25,consts:function(){let i18n_57;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_58=goog.getMsg("HH");i18n_57=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_58;}else {i18n_57=$localize`:@@ngb.timepicker.HH:HH`;}let i18n_59;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_60=goog.getMsg("Hours");i18n_59=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_60;}else {i18n_59=$localize`:@@ngb.timepicker.hours:Hours`;}let i18n_61;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_62=goog.getMsg("MM");i18n_61=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_62;}else {i18n_61=$localize`:@@ngb.timepicker.MM:MM`;}let i18n_63;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_64=goog.getMsg("Minutes");i18n_63=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS_64;}else {i18n_63=$localize`:@@ngb.timepicker.minutes:Minutes`;}let i18n_65;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__66=goog.getMsg("Increment hours");i18n_65=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__66;}else {i18n_65=$localize`:@@ngb.timepicker.increment-hours:Increment hours`;}let i18n_67;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__68=goog.getMsg("Decrement hours");i18n_67=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__68;}else {i18n_67=$localize`:@@ngb.timepicker.decrement-hours:Decrement hours`;}let i18n_69;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__70=goog.getMsg("Increment minutes");i18n_69=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__70;}else {i18n_69=$localize`:@@ngb.timepicker.increment-minutes:Increment minutes`;}let i18n_71;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__72=goog.getMsg("Decrement minutes");i18n_71=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__72;}else {i18n_71=$localize`:@@ngb.timepicker.decrement-minutes:Decrement minutes`;}let i18n_73;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__74=goog.getMsg("SS");i18n_73=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__74;}else {i18n_73=$localize`:@@ngb.timepicker.SS:SS`;}let i18n_75;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__76=goog.getMsg("Seconds");i18n_75=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__76;}else {i18n_75=$localize`:@@ngb.timepicker.seconds:Seconds`;}let i18n_77;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___78=goog.getMsg("Increment seconds");i18n_77=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___78;}else {i18n_77=$localize`:@@ngb.timepicker.increment-seconds:Increment seconds`;}let i18n_79;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___80=goog.getMsg("Decrement seconds");i18n_79=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___80;}else {i18n_79=$localize`:@@ngb.timepicker.decrement-seconds:Decrement seconds`;}let i18n_81;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___82=goog.getMsg("{$interpolation}",{"interpolation":"\uFFFD0\uFFFD"},{original_code:{"interpolation":"{{\n\t\t\t\t\t\t\ti18n.getAfternoonPeriod()\n\t\t\t\t\t\t}}"}});i18n_81=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___82;}else {i18n_81=$localize`:@@ngb.timepicker.PM:${"\uFFFD0\uFFFD"}:INTERPOLATION:`;}let i18n_83;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___84=goog.getMsg("{$interpolation}",{"interpolation":"\uFFFD0\uFFFD"},{original_code:{"interpolation":"{{ i18n.getMorningPeriod() }}"}});i18n_83=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS___84;}else {i18n_83=$localize`:@@ngb.timepicker.AM:${"\uFFFD0\uFFFD"}:INTERPOLATION:`;}return [[3,"disabled"],[1,"ngb-tp"],[1,"ngb-tp-input-container","ngb-tp-hour"],["tabindex","-1","type","button","class","btn btn-link",3,"btn-sm","btn-lg","disabled","click",4,"ngIf"],["type","text","maxlength","2","inputmode","numeric","placeholder",i18n_57,"aria-label",i18n_59,1,"ngb-tp-input","form-control",3,"value","readOnly","disabled","change","blur","input","keydown.ArrowUp","keydown.ArrowDown"],[1,"ngb-tp-spacer"],[1,"ngb-tp-input-container","ngb-tp-minute"],["type","text","maxlength","2","inputmode","numeric","placeholder",i18n_61,"aria-label",i18n_63,1,"ngb-tp-input","form-control",3,"value","readOnly","disabled","change","blur","input","keydown.ArrowUp","keydown.ArrowDown"],["class","ngb-tp-spacer",4,"ngIf"],["class","ngb-tp-input-container ngb-tp-second",4,"ngIf"],["class","ngb-tp-meridian",4,"ngIf"],["tabindex","-1","type","button",1,"btn","btn-link",3,"disabled","click"],[1,"chevron","ngb-tp-chevron"],[1,"visually-hidden"],i18n_65,[1,"chevron","ngb-tp-chevron","bottom"],i18n_67,i18n_69,i18n_71,[1,"ngb-tp-input-container","ngb-tp-second"],["type","text","maxlength","2","inputmode","numeric","placeholder",i18n_73,"aria-label",i18n_75,1,"ngb-tp-input","form-control",3,"value","readOnly","disabled","change","blur","input","keydown.ArrowUp","keydown.ArrowDown"],i18n_77,i18n_79,[1,"ngb-tp-meridian"],["type","button",1,"btn","btn-outline-primary",3,"disabled","click"],[4,"ngIf","ngIfElse"],["am",""],i18n_81,i18n_83];},template:function NgbTimepicker_Template(rf,ctx){if(rf&1){i0.ɵɵelementStart(0,"fieldset",0)(1,"div",1)(2,"div",2);i0.ɵɵtemplate(3,NgbTimepicker_button_3_Template,4,7,"button",3);i0.ɵɵelementStart(4,"input",4);i0.ɵɵlistener("change",function NgbTimepicker_Template_input_change_4_listener($event){return ctx.updateHour($event.target.value);})("blur",function NgbTimepicker_Template_input_blur_4_listener(){return ctx.handleBlur();})("input",function NgbTimepicker_Template_input_input_4_listener($event){return ctx.formatInput($event.target);})("keydown.ArrowUp",function NgbTimepicker_Template_input_keydown_ArrowUp_4_listener($event){ctx.changeHour(ctx.hourStep);return $event.preventDefault();})("keydown.ArrowDown",function NgbTimepicker_Template_input_keydown_ArrowDown_4_listener($event){ctx.changeHour(-ctx.hourStep);return $event.preventDefault();});i0.ɵɵelementEnd();i0.ɵɵtemplate(5,NgbTimepicker_button_5_Template,4,7,"button",3);i0.ɵɵelementEnd();i0.ɵɵelementStart(6,"div",5);i0.ɵɵtext(7,":");i0.ɵɵelementEnd();i0.ɵɵelementStart(8,"div",6);i0.ɵɵtemplate(9,NgbTimepicker_button_9_Template,4,7,"button",3);i0.ɵɵelementStart(10,"input",7);i0.ɵɵlistener("change",function NgbTimepicker_Template_input_change_10_listener($event){return ctx.updateMinute($event.target.value);})("blur",function NgbTimepicker_Template_input_blur_10_listener(){return ctx.handleBlur();})("input",function NgbTimepicker_Template_input_input_10_listener($event){return ctx.formatInput($event.target);})("keydown.ArrowUp",function NgbTimepicker_Template_input_keydown_ArrowUp_10_listener($event){ctx.changeMinute(ctx.minuteStep);return $event.preventDefault();})("keydown.ArrowDown",function NgbTimepicker_Template_input_keydown_ArrowDown_10_listener($event){ctx.changeMinute(-ctx.minuteStep);return $event.preventDefault();});i0.ɵɵelementEnd();i0.ɵɵtemplate(11,NgbTimepicker_button_11_Template,4,7,"button",3);i0.ɵɵelementEnd();i0.ɵɵtemplate(12,NgbTimepicker_div_12_Template,2,0,"div",8);i0.ɵɵtemplate(13,NgbTimepicker_div_13_Template,4,9,"div",9);i0.ɵɵtemplate(14,NgbTimepicker_div_14_Template,1,0,"div",8);i0.ɵɵtemplate(15,NgbTimepicker_div_15_Template,5,9,"div",10);i0.ɵɵelementEnd()();}if(rf&2){i0.ɵɵclassProp("disabled",ctx.disabled);i0.ɵɵproperty("disabled",ctx.disabled);i0.ɵɵadvance(3);i0.ɵɵproperty("ngIf",ctx.spinners);i0.ɵɵadvance(1);i0.ɵɵclassProp("form-control-sm",ctx.isSmallSize)("form-control-lg",ctx.isLargeSize);i0.ɵɵproperty("value",ctx.formatHour(ctx.model==null?null:ctx.model.hour))("readOnly",ctx.readonlyInputs)("disabled",ctx.disabled);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.spinners);i0.ɵɵadvance(4);i0.ɵɵproperty("ngIf",ctx.spinners);i0.ɵɵadvance(1);i0.ɵɵclassProp("form-control-sm",ctx.isSmallSize)("form-control-lg",ctx.isLargeSize);i0.ɵɵproperty("value",ctx.formatMinSec(ctx.model==null?null:ctx.model.minute))("readOnly",ctx.readonlyInputs)("disabled",ctx.disabled);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.spinners);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.seconds);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.seconds);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.meridian);i0.ɵɵadvance(1);i0.ɵɵproperty("ngIf",ctx.meridian);}},dependencies:[NgIf],styles:["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"],encapsulation:2});}} exports("NgbTimepicker", NgbTimepicker);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTimepicker,[{type:Component,args:[{exportAs:'ngbTimepicker',selector:'ngb-timepicker',standalone:true,imports:[NgIf],encapsulation:ViewEncapsulation.None,template:`
		<fieldset [disabled]="disabled" [class.disabled]="disabled">
			<div class="ngb-tp">
				<div class="ngb-tp-input-container ngb-tp-hour">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeHour(hourStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="HH"
						i18n-placeholder="@@ngb.timepicker.HH"
						[value]="formatHour(model?.hour)"
						(change)="updateHour($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Hours"
						i18n-aria-label="@@ngb.timepicker.hours"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeHour(-hourStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
					</button>
				</div>
				<div class="ngb-tp-spacer">:</div>
				<div class="ngb-tp-input-container ngb-tp-minute">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeMinute(minuteStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="MM"
						i18n-placeholder="@@ngb.timepicker.MM"
						[value]="formatMinSec(model?.minute)"
						(change)="updateMinute($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Minutes"
						i18n-aria-label="@@ngb.timepicker.minutes"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeMinute(-minuteStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
					</button>
				</div>
				<div *ngIf="seconds" class="ngb-tp-spacer">:</div>
				<div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeSecond(secondStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
					</button>
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="SS"
						i18n-placeholder="@@ngb.timepicker.SS"
						[value]="formatMinSec(model?.second)"
						(change)="updateSecond($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Seconds"
						i18n-aria-label="@@ngb.timepicker.seconds"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()"
					/>
					<button
						*ngIf="spinners"
						tabindex="-1"
						type="button"
						(click)="changeSecond(-secondStep)"
						class="btn btn-link"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[class.disabled]="disabled"
						[disabled]="disabled"
					>
						<span class="chevron ngb-tp-chevron bottom"></span>
						<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
					</button>
				</div>
				<div *ngIf="meridian" class="ngb-tp-spacer"></div>
				<div *ngIf="meridian" class="ngb-tp-meridian">
					<button
						type="button"
						class="btn btn-outline-primary"
						[class.btn-sm]="isSmallSize"
						[class.btn-lg]="isLargeSize"
						[disabled]="disabled"
						[class.disabled]="disabled"
						(click)="toggleMeridian()"
					>
						<ng-container *ngIf="model && model.hour >= 12; else am" i18n="@@ngb.timepicker.PM">{{
							i18n.getAfternoonPeriod()
						}}</ng-container>
						<ng-template #am i18n="@@ngb.timepicker.AM">{{ i18n.getMorningPeriod() }}</ng-template>
					</button>
				</div>
			</div>
		</fieldset>
	`,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbTimepicker),multi:true}],styles:["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"]}]}],function(){return [{type:NgbTimepickerConfig},{type:NgbTimeAdapter},{type:i0.ChangeDetectorRef},{type:NgbTimepickerI18n}];},{meridian:[{type:Input}],spinners:[{type:Input}],seconds:[{type:Input}],hourStep:[{type:Input}],minuteStep:[{type:Input}],secondStep:[{type:Input}],readonlyInputs:[{type:Input}],size:[{type:Input}]});})();class NgbTimepickerModule{static{this.ɵfac=function NgbTimepickerModule_Factory(t){return new(t||NgbTimepickerModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbTimepickerModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbTimepickerModule", NgbTimepickerModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTimepickerModule,[{type:NgModule,args:[{imports:[NgbTimepicker],exports:[NgbTimepicker]}]}],null,null);})();const ngbToastFadeInTransition=(element,animation)=>{const{classList}=element;if(animation){classList.add('fade');}else {classList.add('show');return;}reflow(element);classList.add('show','showing');return ()=>{classList.remove('showing');};};const ngbToastFadeOutTransition=({classList})=>{classList.add('showing');return ()=>{classList.remove('show','showing');};};/**
             * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
             * and customize the values of its properties in order to provide default values for all the toasts used in the
             * application.
             *
             * @since 5.0.0
             */class NgbToastConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.autohide=true;this.delay=5000;this.ariaLive='polite';}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbToastConfig_Factory(t){return new(t||NgbToastConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbToastConfig,factory:NgbToastConfig.ɵfac,providedIn:'root'});}} exports("NgbToastConfig", NgbToastConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbToastConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();/**
             * This directive allows the usage of HTML markup or other directives
             * inside of the toast's header.
             *
             * @since 5.0.0
             */class NgbToastHeader{static{this.ɵfac=function NgbToastHeader_Factory(t){return new(t||NgbToastHeader)();};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbToastHeader,selectors:[["","ngbToastHeader",""]],standalone:true});}} exports("NgbToastHeader", NgbToastHeader);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbToastHeader,[{type:Directive,args:[{selector:'[ngbToastHeader]',standalone:true}]}],null,null);})();/**
             * Toasts provide feedback messages as notifications to the user.
             * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
             *
             * @since 5.0.0
             */class NgbToast{constructor(ariaLive,config,_zone,_element){this.ariaLive=ariaLive;this._zone=_zone;this._element=_element;/**
                     * A template like `<ng-template ngbToastHeader></ng-template>` can be
                     * used in the projected content to allow markup usage.
                     */this.contentHeaderTpl=null;/**
                     * An event fired after the animation triggered by calling `.show()` method has finished.
                     *
                     * @since 8.0.0
                     */this.shown=new EventEmitter();/**
                     * An event fired after the animation triggered by calling `.hide()` method has finished.
                     *
                     * It can only occur in 2 different scenarios:
                     * - `autohide` timeout fires
                     * - user clicks on a closing cross
                     *
                     * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
                     * to the user to take care of that.
                     *
                     * @since 8.0.0
                     */this.hidden=new EventEmitter();if(this.ariaLive==null){this.ariaLive=config.ariaLive;}this.delay=config.delay;this.autohide=config.autohide;this.animation=config.animation;}ngAfterContentInit(){this._zone.onStable.asObservable().pipe(take(1)).subscribe(()=>{this._init();this.show();});}ngOnChanges(changes){if('autohide'in changes){this._clearTimeout();this._init();}}/**
                 * Triggers toast closing programmatically.
                 *
                 * The returned observable will emit and be completed once the closing transition has finished.
                 * If the animations are turned off this happens synchronously.
                 *
                 * Alternatively you could listen or subscribe to the `(hidden)` output
                 *
                 * @since 8.0.0
                 */hide(){this._clearTimeout();const transition=ngbRunTransition(this._zone,this._element.nativeElement,ngbToastFadeOutTransition,{animation:this.animation,runningTransition:'stop'});transition.subscribe(()=>{this.hidden.emit();});return transition;}/**
                 * Triggers toast opening programmatically.
                 *
                 * The returned observable will emit and be completed once the opening transition has finished.
                 * If the animations are turned off this happens synchronously.
                 *
                 * Alternatively you could listen or subscribe to the `(shown)` output
                 *
                 * @since 8.0.0
                 */show(){const transition=ngbRunTransition(this._zone,this._element.nativeElement,ngbToastFadeInTransition,{animation:this.animation,runningTransition:'continue'});transition.subscribe(()=>{this.shown.emit();});return transition;}_init(){if(this.autohide&&!this._timeoutID){this._timeoutID=setTimeout(()=>this.hide(),this.delay);}}_clearTimeout(){if(this._timeoutID){clearTimeout(this._timeoutID);this._timeoutID=null;}}static{this.ɵfac=function NgbToast_Factory(t){return new(t||NgbToast)(i0.ɵɵinjectAttribute('aria-live'),i0.ɵɵdirectiveInject(NgbToastConfig),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(i0.ElementRef));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbToast,selectors:[["ngb-toast"]],contentQueries:function NgbToast_ContentQueries(rf,ctx,dirIndex){if(rf&1){i0.ɵɵcontentQuery(dirIndex,NgbToastHeader,7,TemplateRef);}if(rf&2){let _t;i0.ɵɵqueryRefresh(_t=i0.ɵɵloadQuery())&&(ctx.contentHeaderTpl=_t.first);}},hostAttrs:["role","alert","aria-atomic","true",1,"toast"],hostVars:3,hostBindings:function NgbToast_HostBindings(rf,ctx){if(rf&2){i0.ɵɵattribute("aria-live",ctx.ariaLive);i0.ɵɵclassProp("fade",ctx.animation);}},inputs:{animation:"animation",delay:"delay",autohide:"autohide",header:"header"},outputs:{shown:"shown",hidden:"hidden"},exportAs:["ngbToast"],standalone:true,features:[i0.ɵɵNgOnChangesFeature,i0.ɵɵStandaloneFeature],ngContentSelectors:_c3,decls:5,vars:1,consts:function(){let i18n_85;if(typeof ngI18nClosureMode!=="undefined"&&ngI18nClosureMode){/**
             * @suppress {msgDescriptions}
             */const MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__86=goog.getMsg("Close");i18n_85=MSG_E__SPRO_REBORN_SOURCE_FRONT_END_NODE_MODULES__NG_BOOTSTRAP_NG_BOOTSTRAP_FESM2022_NG_BOOTSTRAP_MJS__86;}else {i18n_85=$localize`:@@ngb.toast.close-aria:Close`;}return [["headerTpl",""],[3,"ngIf"],[1,"toast-body"],[1,"me-auto"],[1,"toast-header"],[3,"ngTemplateOutlet"],["type","button","aria-label",i18n_85,1,"btn-close",3,"click"]];},template:function NgbToast_Template(rf,ctx){if(rf&1){i0.ɵɵprojectionDef();i0.ɵɵtemplate(0,NgbToast_ng_template_0_Template,2,1,"ng-template",null,0,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(2,NgbToast_ng_template_2_Template,3,1,"ng-template",1);i0.ɵɵelementStart(3,"div",2);i0.ɵɵprojection(4);i0.ɵɵelementEnd();}if(rf&2){i0.ɵɵadvance(2);i0.ɵɵproperty("ngIf",ctx.contentHeaderTpl||ctx.header);}},dependencies:[NgIf,NgTemplateOutlet],styles:["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"],encapsulation:2});}} exports("NgbToast", NgbToast);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbToast,[{type:Component,args:[{selector:'ngb-toast',exportAs:'ngbToast',standalone:true,imports:[NgIf,NgTemplateOutlet],encapsulation:ViewEncapsulation.None,host:{role:'alert','[attr.aria-live]':'ariaLive','aria-atomic':'true',class:'toast','[class.fade]':'animation'},template:`
		<ng-template #headerTpl>
			<strong class="me-auto">{{ header }}</strong>
		</ng-template>
		<ng-template [ngIf]="contentHeaderTpl || header">
			<div class="toast-header">
				<ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					i18n-aria-label="@@ngb.toast.close-aria"
					(click)="hide()"
				>
				</button>
			</div>
		</ng-template>
		<div class="toast-body">
			<ng-content></ng-content>
		</div>
	`,styles:["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"]}]}],function(){return [{type:undefined,decorators:[{type:Attribute,args:['aria-live']}]},{type:NgbToastConfig},{type:i0.NgZone},{type:i0.ElementRef}];},{animation:[{type:Input}],delay:[{type:Input}],autohide:[{type:Input}],header:[{type:Input}],contentHeaderTpl:[{type:ContentChild,args:[NgbToastHeader,{read:TemplateRef,static:true}]}],shown:[{type:Output}],hidden:[{type:Output}]});})();class NgbToastModule{static{this.ɵfac=function NgbToastModule_Factory(t){return new(t||NgbToastModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbToastModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbToastModule", NgbToastModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbToastModule,[{type:NgModule,args:[{imports:[NgbToast,NgbToastHeader],exports:[NgbToast,NgbToastHeader]}]}],null,null);})();/**
             * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the tooltips used in the application.
             */class NgbTooltipConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.autoClose=true;this.placement='auto';this.popperOptions=options=>options;this.triggers='hover focus';this.disableTooltip=false;this.openDelay=0;this.closeDelay=0;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbTooltipConfig_Factory(t){return new(t||NgbTooltipConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbTooltipConfig,factory:NgbTooltipConfig.ɵfac,providedIn:'root'});}} exports("NgbTooltipConfig", NgbTooltipConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTooltipConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();let nextId=0;class NgbTooltipWindow{static{this.ɵfac=function NgbTooltipWindow_Factory(t){return new(t||NgbTooltipWindow)();};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbTooltipWindow,selectors:[["ngb-tooltip-window"]],hostAttrs:["role","tooltip"],hostVars:5,hostBindings:function NgbTooltipWindow_HostBindings(rf,ctx){if(rf&2){i0.ɵɵhostProperty("id",ctx.id);i0.ɵɵclassMap("tooltip"+(ctx.tooltipClass?" "+ctx.tooltipClass:""));i0.ɵɵclassProp("fade",ctx.animation);}},inputs:{animation:"animation",id:"id",tooltipClass:"tooltipClass"},standalone:true,features:[i0.ɵɵStandaloneFeature],ngContentSelectors:_c3,decls:3,vars:0,consts:[["data-popper-arrow","",1,"tooltip-arrow"],[1,"tooltip-inner"]],template:function NgbTooltipWindow_Template(rf,ctx){if(rf&1){i0.ɵɵprojectionDef();i0.ɵɵelement(0,"div",0);i0.ɵɵelementStart(1,"div",1);i0.ɵɵprojection(2);i0.ɵɵelementEnd();}},styles:["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"],encapsulation:2,changeDetection:0});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTooltipWindow,[{type:Component,args:[{selector:'ngb-tooltip-window',standalone:true,changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,host:{'[class]':'"tooltip" + (tooltipClass ? " " + tooltipClass : "")','[class.fade]':'animation',role:'tooltip','[id]':'id'},template:`<div class="tooltip-arrow" data-popper-arrow></div
		><div class="tooltip-inner"><ng-content></ng-content></div>`,styles:["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"]}]}],null,{animation:[{type:Input}],id:[{type:Input}],tooltipClass:[{type:Input}]});})();/**
             * A lightweight and extensible directive for fancy tooltip creation.
             */class NgbTooltip{constructor(_elementRef,_renderer,injector,viewContainerRef,config,_ngZone,_document,_changeDetector,applicationRef){this._elementRef=_elementRef;this._renderer=_renderer;this._ngZone=_ngZone;this._document=_document;this._changeDetector=_changeDetector;/**
                     * An event emitted when the tooltip opening animation has finished. Contains no payload.
                     */this.shown=new EventEmitter();/**
                     * An event emitted when the tooltip closing animation has finished. Contains no payload.
                     */this.hidden=new EventEmitter();this._ngbTooltipWindowId=`ngb-tooltip-${nextId++}`;this._windowRef=null;this.animation=config.animation;this.autoClose=config.autoClose;this.placement=config.placement;this.popperOptions=config.popperOptions;this.triggers=config.triggers;this.container=config.container;this.disableTooltip=config.disableTooltip;this.tooltipClass=config.tooltipClass;this.openDelay=config.openDelay;this.closeDelay=config.closeDelay;this._popupService=new PopupService(NgbTooltipWindow,injector,viewContainerRef,_renderer,this._ngZone,applicationRef);this._positioning=ngbPositioning();}/**
                 * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
                 *
                 * If the content if falsy, the tooltip won't open.
                 */set ngbTooltip(value){this._ngbTooltip=value;if(!value&&this._windowRef){this.close();}}get ngbTooltip(){return this._ngbTooltip;}/**
                 * Opens the tooltip.
                 *
                 * This is considered to be a "manual" triggering.
                 * The `context` is an optional value to be injected into the tooltip template when it is created.
                 */open(context){if(!this._windowRef&&this._ngbTooltip&&!this.disableTooltip){const{windowRef,transition$}=this._popupService.open(this._ngbTooltip,context??this.tooltipContext,this.animation);this._windowRef=windowRef;this._windowRef.setInput('animation',this.animation);this._windowRef.setInput('tooltipClass',this.tooltipClass);this._windowRef.setInput('id',this._ngbTooltipWindowId);this._renderer.setAttribute(this._getPositionTargetElement(),'aria-describedby',this._ngbTooltipWindowId);if(this.container==='body'){this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);}// We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening tooltip from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();// We need to mark for check, because tooltip won't work inside the OnPush component.
            // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the tooltip from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();// Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(()=>{this._positioning.createPopper({hostElement:this._getPositionTargetElement(),targetElement:this._windowRef.location.nativeElement,placement:this.placement,appendToBody:this.container==='body',baseClass:'bs-tooltip',updatePopperOptions:options=>this.popperOptions(options)});Promise.resolve().then(()=>{// This update is required for correct arrow placement
            this._positioning.update();this._zoneSubscription=this._ngZone.onStable.subscribe(()=>this._positioning.update());});});ngbAutoClose(this._ngZone,this._document,this.autoClose,()=>this.close(),this.hidden,[this._windowRef.location.nativeElement],[this._elementRef.nativeElement]);transition$.subscribe(()=>this.shown.emit());}}/**
                 * Closes the tooltip.
                 *
                 * This is considered to be a "manual" triggering of the tooltip.
                 */close(animation=this.animation){if(this._windowRef!=null){this._renderer.removeAttribute(this._getPositionTargetElement(),'aria-describedby');this._popupService.close(animation).subscribe(()=>{this._windowRef=null;this._positioning.destroy();this._zoneSubscription?.unsubscribe();this.hidden.emit();this._changeDetector.markForCheck();});}}/**
                 * Toggles the tooltip.
                 *
                 * This is considered to be a "manual" triggering of the tooltip.
                 */toggle(){if(this._windowRef){this.close();}else {this.open();}}/**
                 * Returns `true`, if the popover is currently shown.
                 */isOpen(){return this._windowRef!=null;}ngOnInit(){this._unregisterListenersFn=listenToTriggers(this._elementRef.nativeElement,this.triggers,this.isOpen.bind(this),this.open.bind(this),this.close.bind(this),+this.openDelay,+this.closeDelay);}ngOnChanges({tooltipClass}){if(tooltipClass&&this.isOpen()){this._windowRef.instance.tooltipClass=tooltipClass.currentValue;}}ngOnDestroy(){this.close(false);// This check is needed as it might happen that ngOnDestroy is called before ngOnInit
            // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
            this._unregisterListenersFn?.();}_getPositionTargetElement(){return (isString(this.positionTarget)?this._document.querySelector(this.positionTarget):this.positionTarget)||this._elementRef.nativeElement;}static{this.ɵfac=function NgbTooltip_Factory(t){return new(t||NgbTooltip)(i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.Renderer2),i0.ɵɵdirectiveInject(i0.Injector),i0.ɵɵdirectiveInject(i0.ViewContainerRef),i0.ɵɵdirectiveInject(NgbTooltipConfig),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(DOCUMENT),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(i0.ApplicationRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbTooltip,selectors:[["","ngbTooltip",""]],inputs:{animation:"animation",autoClose:"autoClose",placement:"placement",popperOptions:"popperOptions",triggers:"triggers",positionTarget:"positionTarget",container:"container",disableTooltip:"disableTooltip",tooltipClass:"tooltipClass",tooltipContext:"tooltipContext",openDelay:"openDelay",closeDelay:"closeDelay",ngbTooltip:"ngbTooltip"},outputs:{shown:"shown",hidden:"hidden"},exportAs:["ngbTooltip"],standalone:true,features:[i0.ɵɵNgOnChangesFeature]});}} exports("NgbTooltip", NgbTooltip);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTooltip,[{type:Directive,args:[{selector:'[ngbTooltip]',standalone:true,exportAs:'ngbTooltip'}]}],function(){return [{type:i0.ElementRef},{type:i0.Renderer2},{type:i0.Injector},{type:i0.ViewContainerRef},{type:NgbTooltipConfig},{type:i0.NgZone},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:i0.ChangeDetectorRef},{type:i0.ApplicationRef}];},{animation:[{type:Input}],autoClose:[{type:Input}],placement:[{type:Input}],popperOptions:[{type:Input}],triggers:[{type:Input}],positionTarget:[{type:Input}],container:[{type:Input}],disableTooltip:[{type:Input}],tooltipClass:[{type:Input}],tooltipContext:[{type:Input}],openDelay:[{type:Input}],closeDelay:[{type:Input}],shown:[{type:Output}],hidden:[{type:Output}],ngbTooltip:[{type:Input}]});})();class NgbTooltipModule{static{this.ɵfac=function NgbTooltipModule_Factory(t){return new(t||NgbTooltipModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbTooltipModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbTooltipModule", NgbTooltipModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTooltipModule,[{type:NgModule,args:[{imports:[NgbTooltip],exports:[NgbTooltip]}]}],null,null);})();/**
             * A component that helps with text highlighting.
             *
             * It splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
             * highlighting:
             *
             * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
             */class NgbHighlight{constructor(){/**
                     * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
                     */this.highlightClass='ngb-highlight';/**
                     * Boolean option to determine if the highlighting should be sensitive to accents or not.
                     *
                     * This feature is only available for browsers that implement the `String.normalize` function
                     * (typically not Internet Explorer).
                     * If you want to use this feature in a browser that does not implement `String.normalize`,
                     * you will have to include a polyfill in your application (`unorm` for example).
                     *
                     * @since 9.1.0
                     */this.accentSensitive=true;}ngOnChanges(changes){if(!this.accentSensitive&&!String.prototype.normalize){console.warn('The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser '+'that does not implement the `String.normalize` function. '+'You will have to include a polyfill in your application to use this feature in the current browser.');this.accentSensitive=true;}const result=toString(this.result);const terms=Array.isArray(this.term)?this.term:[this.term];const prepareTerm=term=>this.accentSensitive?term:removeAccents(term);const escapedTerms=terms.map(term=>regExpEscape(prepareTerm(toString(term)))).filter(term=>term);const toSplit=this.accentSensitive?result:removeAccents(result);const parts=escapedTerms.length?toSplit.split(new RegExp(`(${escapedTerms.join('|')})`,'gmi')):[result];if(this.accentSensitive){this.parts=parts;}else {let offset=0;this.parts=parts.map(part=>result.substring(offset,offset+=part.length));}}static{this.ɵfac=function NgbHighlight_Factory(t){return new(t||NgbHighlight)();};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbHighlight,selectors:[["ngb-highlight"]],inputs:{highlightClass:"highlightClass",result:"result",term:"term",accentSensitive:"accentSensitive"},standalone:true,features:[i0.ɵɵNgOnChangesFeature,i0.ɵɵStandaloneFeature],decls:1,vars:1,consts:[["ngFor","",3,"ngForOf"],[3,"class",4,"ngIf","ngIfElse"],["even",""]],template:function NgbHighlight_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbHighlight_ng_template_0_Template,3,2,"ng-template",0);}if(rf&2){i0.ɵɵproperty("ngForOf",ctx.parts);}},dependencies:[NgIf,NgFor],styles:[".ngb-highlight{font-weight:700}\n"],encapsulation:2,changeDetection:0});}} exports("NgbHighlight", NgbHighlight);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbHighlight,[{type:Component,args:[{selector:'ngb-highlight',standalone:true,imports:[NgIf,NgFor],changeDetection:ChangeDetectionStrategy.OnPush,encapsulation:ViewEncapsulation.None,template:`<ng-template ngFor [ngForOf]="parts" let-part let-isOdd="odd">`+`<span *ngIf="isOdd; else even" [class]="highlightClass">{{part}}</span><ng-template #even>{{part}}</ng-template>`+`</ng-template>`,styles:[".ngb-highlight{font-weight:700}\n"]}]}],null,{highlightClass:[{type:Input}],result:[{type:Input,args:[{required:true}]}],term:[{type:Input,args:[{required:true}]}],accentSensitive:[{type:Input}]});})();class NgbTypeaheadWindow{constructor(){this.activeIdx=0;/**
                     * Flag indicating if the first row should be active initially
                     */this.focusFirst=true;/**
                     * A function used to format a given result before display. This function should return a formatted string without any
                     * HTML markup
                     */this.formatter=toString;/**
                     * Event raised when user selects a particular result row
                     */this.selectEvent=new EventEmitter();this.activeChangeEvent=new EventEmitter();}hasActive(){return this.activeIdx>-1&&this.activeIdx<this.results.length;}getActive(){return this.results[this.activeIdx];}markActive(activeIdx){this.activeIdx=activeIdx;this._activeChanged();}next(){if(this.activeIdx===this.results.length-1){this.activeIdx=this.focusFirst?(this.activeIdx+1)%this.results.length:-1;}else {this.activeIdx++;}this._activeChanged();}prev(){if(this.activeIdx<0){this.activeIdx=this.results.length-1;}else if(this.activeIdx===0){this.activeIdx=this.focusFirst?this.results.length-1:-1;}else {this.activeIdx--;}this._activeChanged();}resetActive(){this.activeIdx=this.focusFirst?0:-1;this._activeChanged();}select(item){this.selectEvent.emit(item);}ngOnInit(){this.resetActive();}_activeChanged(){this.activeChangeEvent.emit(this.activeIdx>=0?this.id+'-'+this.activeIdx:undefined);}static{this.ɵfac=function NgbTypeaheadWindow_Factory(t){return new(t||NgbTypeaheadWindow)();};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbTypeaheadWindow,selectors:[["ngb-typeahead-window"]],hostAttrs:["role","listbox"],hostVars:3,hostBindings:function NgbTypeaheadWindow_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("mousedown",function NgbTypeaheadWindow_mousedown_HostBindingHandler($event){return $event.preventDefault();});}if(rf&2){i0.ɵɵhostProperty("id",ctx.id);i0.ɵɵclassMap("dropdown-menu show"+(ctx.popupClass?" "+ctx.popupClass:""));}},inputs:{id:"id",focusFirst:"focusFirst",results:"results",term:"term",formatter:"formatter",resultTemplate:"resultTemplate",popupClass:"popupClass"},outputs:{selectEvent:"select",activeChangeEvent:"activeChange"},exportAs:["ngbTypeaheadWindow"],standalone:true,features:[i0.ɵɵStandaloneFeature],decls:3,vars:1,consts:[["rt",""],["ngFor","",3,"ngForOf"],[3,"result","term"],["type","button","role","option",1,"dropdown-item",3,"id","mouseenter","click"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function NgbTypeaheadWindow_Template(rf,ctx){if(rf&1){i0.ɵɵtemplate(0,NgbTypeaheadWindow_ng_template_0_Template,1,2,"ng-template",null,0,i0.ɵɵtemplateRefExtractor);i0.ɵɵtemplate(2,NgbTypeaheadWindow_ng_template_2_Template,2,9,"ng-template",1);}if(rf&2){i0.ɵɵadvance(2);i0.ɵɵproperty("ngForOf",ctx.results);}},dependencies:[NgbHighlight,NgFor,NgTemplateOutlet],encapsulation:2});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTypeaheadWindow,[{type:Component,args:[{selector:'ngb-typeahead-window',exportAs:'ngbTypeaheadWindow',standalone:true,imports:[NgbHighlight,NgFor,NgTemplateOutlet],encapsulation:ViewEncapsulation.None,host:{'(mousedown)':'$event.preventDefault()','[class]':'"dropdown-menu show" + (popupClass ? " " + popupClass : "")',role:'listbox','[id]':'id'},template:`
		<ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
			<ngb-highlight [result]="formatter(result)" [term]="term"></ngb-highlight>
		</ng-template>
		<ng-template ngFor [ngForOf]="results" let-result let-idx="index">
			<button
				type="button"
				class="dropdown-item"
				role="option"
				[id]="id + '-' + idx"
				[class.active]="idx === activeIdx"
				(mouseenter)="markActive(idx)"
				(click)="select(result)"
			>
				<ng-template
					[ngTemplateOutlet]="resultTemplate || rt"
					[ngTemplateOutletContext]="{ result: result, term: term, formatter: formatter }"
				></ng-template>
			</button>
		</ng-template>
	`}]}],null,{id:[{type:Input}],focusFirst:[{type:Input}],results:[{type:Input}],term:[{type:Input}],formatter:[{type:Input}],resultTemplate:[{type:Input}],popupClass:[{type:Input}],selectEvent:[{type:Output,args:['select']}],activeChangeEvent:[{type:Output,args:['activeChange']}]});})();/**
             * A configuration service for the [`NgbTypeahead`](#/components/typeahead/api#NgbTypeahead) component.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all the typeaheads used in the application.
             */class NgbTypeaheadConfig{constructor(){this.editable=true;this.focusFirst=true;this.selectOnExact=false;this.showHint=false;this.placement=['bottom-start','bottom-end','top-start','top-end'];this.popperOptions=options=>options;}static{this.ɵfac=function NgbTypeaheadConfig_Factory(t){return new(t||NgbTypeaheadConfig)();};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbTypeaheadConfig,factory:NgbTypeaheadConfig.ɵfac,providedIn:'root'});}} exports("NgbTypeaheadConfig", NgbTypeaheadConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTypeaheadConfig,[{type:Injectable,args:[{providedIn:'root'}]}],null,null);})();const ARIA_LIVE_DELAY=new InjectionToken('live announcer delay',{providedIn:'root',factory:ARIA_LIVE_DELAY_FACTORY});function ARIA_LIVE_DELAY_FACTORY(){return 100;}function getLiveElement(document,lazyCreate=false){let element=document.body.querySelector('#ngb-live');if(element==null&&lazyCreate){element=document.createElement('div');element.setAttribute('id','ngb-live');element.setAttribute('aria-live','polite');element.setAttribute('aria-atomic','true');element.classList.add('visually-hidden');document.body.appendChild(element);}return element;}class Live{constructor(_document,_delay){this._document=_document;this._delay=_delay;}ngOnDestroy(){const element=getLiveElement(this._document);if(element){// if exists, it will always be attached to the <body>
            element.parentElement.removeChild(element);}}say(message){const element=getLiveElement(this._document,true);const delay=this._delay;if(element!=null){element.textContent='';const setText=()=>element.textContent=message;if(delay===null){setText();}else {setTimeout(setText,delay);}}}static{this.ɵfac=function Live_Factory(t){return new(t||Live)(i0.ɵɵinject(DOCUMENT),i0.ɵɵinject(ARIA_LIVE_DELAY));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:Live,factory:Live.ɵfac,providedIn:'root'});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(Live,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:undefined,decorators:[{type:Inject,args:[ARIA_LIVE_DELAY]}]}];},null);})();let nextWindowId=0;/**
             * A directive providing a simple way of creating powerful typeaheads from any text input.
             */class NgbTypeahead{constructor(_elementRef,viewContainerRef,_renderer,injector,config,ngZone,_live,_document,_ngZone,_changeDetector,applicationRef){this._elementRef=_elementRef;this._renderer=_renderer;this._live=_live;this._document=_document;this._ngZone=_ngZone;this._changeDetector=_changeDetector;this._subscription=null;this._closed$=new Subject();this._inputValueBackup=null;this._inputValueForSelectOnExact=null;this._windowRef=null;/**
                     * The value for the `autocomplete` attribute for the `<input>` element.
                     *
                     * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
                     *
                     * @since 2.1.0
                     */this.autocomplete='off';/**
                     * The preferred placement of the typeahead, among the [possible values](#/guides/positioning#api).
                     *
                     * The default order of preference is `"bottom-start bottom-end top-start top-end"`
                     *
                     * Please see the [positioning overview](#/positioning) for more details.
                     */this.placement='bottom-start';/**
                     * An event emitted right before an item is selected from the result list.
                     *
                     * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
                     */this.selectItem=new EventEmitter();this.activeDescendant=null;this.popupId=`ngb-typeahead-${nextWindowId++}`;this._onTouched=()=>{};this._onChange=_=>{};this.container=config.container;this.editable=config.editable;this.focusFirst=config.focusFirst;this.selectOnExact=config.selectOnExact;this.showHint=config.showHint;this.placement=config.placement;this.popperOptions=config.popperOptions;this._valueChanges=fromEvent(_elementRef.nativeElement,'input').pipe(map($event=>$event.target.value));this._resubscribeTypeahead=new BehaviorSubject(null);this._popupService=new PopupService(NgbTypeaheadWindow,injector,viewContainerRef,_renderer,this._ngZone,applicationRef);this._positioning=ngbPositioning();}ngOnInit(){this._subscribeToUserInput();}ngOnChanges({ngbTypeahead}){if(ngbTypeahead&&!ngbTypeahead.firstChange){this._unsubscribeFromUserInput();this._subscribeToUserInput();}}ngOnDestroy(){this._closePopup();this._unsubscribeFromUserInput();}registerOnChange(fn){this._onChange=fn;}registerOnTouched(fn){this._onTouched=fn;}writeValue(value){this._writeInputValue(this._formatItemForInput(value));if(this.showHint){this._inputValueBackup=value;}}setDisabledState(isDisabled){this._renderer.setProperty(this._elementRef.nativeElement,'disabled',isDisabled);}/**
                 * Dismisses typeahead popup window
                 */dismissPopup(){if(this.isPopupOpen()){this._resubscribeTypeahead.next(null);this._closePopup();if(this.showHint&&this._inputValueBackup!==null){this._writeInputValue(this._inputValueBackup);}this._changeDetector.markForCheck();}}/**
                 * Returns true if the typeahead popup window is displayed
                 */isPopupOpen(){return this._windowRef!=null;}handleBlur(){this._resubscribeTypeahead.next(null);this._onTouched();}handleKeyDown(event){if(!this.isPopupOpen()){return;}/* eslint-disable-next-line deprecation/deprecation */switch(event.which){case Key.ArrowDown:event.preventDefault();this._windowRef.instance.next();this._showHint();break;case Key.ArrowUp:event.preventDefault();this._windowRef.instance.prev();this._showHint();break;case Key.Enter:case Key.Tab:{const result=this._windowRef.instance.getActive();if(isDefined(result)){event.preventDefault();event.stopPropagation();this._selectResult(result);}this._closePopup();break;}}}_openPopup(){if(!this.isPopupOpen()){this._inputValueBackup=this._elementRef.nativeElement.value;const{windowRef}=this._popupService.open();this._windowRef=windowRef;this._windowRef.setInput('id',this.popupId);this._windowRef.setInput('popupClass',this.popupClass);this._windowRef.instance.selectEvent.subscribe(result=>this._selectResultClosePopup(result));this._windowRef.instance.activeChangeEvent.subscribe(activeId=>this.activeDescendant=activeId);if(this.container==='body'){this._renderer.setStyle(this._windowRef.location.nativeElement,'z-index','1055');this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);}this._changeDetector.markForCheck();// Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(()=>{if(this._windowRef){this._positioning.createPopper({hostElement:this._elementRef.nativeElement,targetElement:this._windowRef.location.nativeElement,placement:this.placement,appendToBody:this.container==='body',updatePopperOptions:options=>this.popperOptions(addPopperOffset([0,2])(options))});this._zoneSubscription=this._ngZone.onStable.subscribe(()=>this._positioning.update());}});ngbAutoClose(this._ngZone,this._document,'outside',()=>this.dismissPopup(),this._closed$,[this._elementRef.nativeElement,this._windowRef.location.nativeElement]);}}_closePopup(){this._popupService.close().subscribe(()=>{this._positioning.destroy();this._zoneSubscription?.unsubscribe();this._closed$.next();this._windowRef=null;this.activeDescendant=null;});}_selectResult(result){let defaultPrevented=false;this.selectItem.emit({item:result,preventDefault:()=>{defaultPrevented=true;}});this._resubscribeTypeahead.next(null);if(!defaultPrevented){this.writeValue(result);this._onChange(result);}}_selectResultClosePopup(result){this._selectResult(result);this._closePopup();}_showHint(){if(this.showHint&&this._windowRef?.instance.hasActive()&&this._inputValueBackup!=null){const userInputLowerCase=this._inputValueBackup.toLowerCase();const formattedVal=this._formatItemForInput(this._windowRef.instance.getActive());if(userInputLowerCase===formattedVal.substring(0,this._inputValueBackup.length).toLowerCase()){this._writeInputValue(this._inputValueBackup+formattedVal.substring(this._inputValueBackup.length));this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement,[this._inputValueBackup.length,formattedVal.length]);}else {this._writeInputValue(formattedVal);}}}_formatItemForInput(item){return item!=null&&this.inputFormatter?this.inputFormatter(item):toString(item);}_writeInputValue(value){this._renderer.setProperty(this._elementRef.nativeElement,'value',toString(value));}_subscribeToUserInput(){const results$=this._valueChanges.pipe(tap(value=>{this._inputValueBackup=this.showHint?value:null;this._inputValueForSelectOnExact=this.selectOnExact?value:null;this._onChange(this.editable?value:undefined);}),this.ngbTypeahead?this.ngbTypeahead:()=>of([]));this._subscription=this._resubscribeTypeahead.pipe(switchMap(()=>results$)).subscribe(results=>{if(!results||results.length===0){this._closePopup();}else {// when there is only one result and this matches the input value
            if(this.selectOnExact&&results.length===1&&this._formatItemForInput(results[0])===this._inputValueForSelectOnExact){this._selectResult(results[0]);this._closePopup();}else {this._openPopup();this._windowRef.instance.focusFirst=this.focusFirst;this._windowRef.instance.results=results;this._windowRef.instance.term=this._elementRef.nativeElement.value;if(this.resultFormatter){this._windowRef.instance.formatter=this.resultFormatter;}if(this.resultTemplate){this._windowRef.instance.resultTemplate=this.resultTemplate;}this._windowRef.instance.resetActive();// The observable stream we are subscribing to might have async steps
            // and if a component containing typeahead is using the OnPush strategy
            // the change detection turn wouldn't be invoked automatically.
            this._windowRef.changeDetectorRef.detectChanges();this._showHint();}}// live announcer
            const count=results?results.length:0;this._live.say(count===0?'No results available':`${count} result${count===1?'':'s'} available`);});}_unsubscribeFromUserInput(){if(this._subscription){this._subscription.unsubscribe();}this._subscription=null;}static{this.ɵfac=function NgbTypeahead_Factory(t){return new(t||NgbTypeahead)(i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.ViewContainerRef),i0.ɵɵdirectiveInject(i0.Renderer2),i0.ɵɵdirectiveInject(i0.Injector),i0.ɵɵdirectiveInject(NgbTypeaheadConfig),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(Live),i0.ɵɵdirectiveInject(DOCUMENT),i0.ɵɵdirectiveInject(i0.NgZone),i0.ɵɵdirectiveInject(i0.ChangeDetectorRef),i0.ɵɵdirectiveInject(i0.ApplicationRef));};}static{this.ɵdir=/* @__PURE__ */i0.ɵɵdefineDirective({type:NgbTypeahead,selectors:[["input","ngbTypeahead",""]],hostAttrs:["autocapitalize","off","autocorrect","off","role","combobox"],hostVars:7,hostBindings:function NgbTypeahead_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("blur",function NgbTypeahead_blur_HostBindingHandler(){return ctx.handleBlur();})("keydown",function NgbTypeahead_keydown_HostBindingHandler($event){return ctx.handleKeyDown($event);});}if(rf&2){i0.ɵɵhostProperty("autocomplete",ctx.autocomplete);i0.ɵɵattribute("aria-autocomplete",ctx.showHint?"both":"list")("aria-activedescendant",ctx.activeDescendant)("aria-owns",ctx.isPopupOpen()?ctx.popupId:null)("aria-expanded",ctx.isPopupOpen());i0.ɵɵclassProp("open",ctx.isPopupOpen());}},inputs:{autocomplete:"autocomplete",container:"container",editable:"editable",focusFirst:"focusFirst",inputFormatter:"inputFormatter",ngbTypeahead:"ngbTypeahead",resultFormatter:"resultFormatter",resultTemplate:"resultTemplate",selectOnExact:"selectOnExact",showHint:"showHint",placement:"placement",popperOptions:"popperOptions",popupClass:"popupClass"},outputs:{selectItem:"selectItem"},exportAs:["ngbTypeahead"],standalone:true,features:[i0.ɵɵProvidersFeature([{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbTypeahead),multi:true}]),i0.ɵɵNgOnChangesFeature]});}} exports("NgbTypeahead", NgbTypeahead);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTypeahead,[{type:Directive,args:[{selector:'input[ngbTypeahead]',exportAs:'ngbTypeahead',standalone:true,host:{'(blur)':'handleBlur()','[class.open]':'isPopupOpen()','(keydown)':'handleKeyDown($event)','[autocomplete]':'autocomplete',autocapitalize:'off',autocorrect:'off',role:'combobox','[attr.aria-autocomplete]':'showHint ? "both" : "list"','[attr.aria-activedescendant]':'activeDescendant','[attr.aria-owns]':'isPopupOpen() ? popupId : null','[attr.aria-expanded]':'isPopupOpen()'},providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>NgbTypeahead),multi:true}]}]}],function(){return [{type:i0.ElementRef},{type:i0.ViewContainerRef},{type:i0.Renderer2},{type:i0.Injector},{type:NgbTypeaheadConfig},{type:i0.NgZone},{type:Live},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:i0.NgZone},{type:i0.ChangeDetectorRef},{type:i0.ApplicationRef}];},{autocomplete:[{type:Input}],container:[{type:Input}],editable:[{type:Input}],focusFirst:[{type:Input}],inputFormatter:[{type:Input}],ngbTypeahead:[{type:Input}],resultFormatter:[{type:Input}],resultTemplate:[{type:Input}],selectOnExact:[{type:Input}],showHint:[{type:Input}],placement:[{type:Input}],popperOptions:[{type:Input}],popupClass:[{type:Input}],selectItem:[{type:Output}]});})();class NgbTypeaheadModule{static{this.ɵfac=function NgbTypeaheadModule_Factory(t){return new(t||NgbTypeaheadModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbTypeaheadModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbTypeaheadModule", NgbTypeaheadModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbTypeaheadModule,[{type:NgModule,args:[{imports:[NgbHighlight,NgbTypeahead],exports:[NgbHighlight,NgbTypeahead]}]}],null,null);})();/**
             * A reference to the currently opened (active) offcanvas.
             *
             * Instances of this class can be injected into your component passed as offcanvas content.
             * So you can `.close()` or `.dismiss()` the offcanvas window from your component.
             *
             * @since 12.1.0
             */class NgbActiveOffcanvas{/**
                 * Closes the offcanvas with an optional `result` value.
                 *
                 * The `NgbOffcanvasRef.result` promise will be resolved with the provided value.
                 */close(result){}/**
                 * Dismisses the offcanvas with an optional `reason` value.
                 *
                 * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
                 */dismiss(reason){}} exports("NgbActiveOffcanvas", NgbActiveOffcanvas);/**
             * A reference to the newly opened offcanvas returned by the `NgbOffcanvas.open()` method.
             *
             * @since 12.1.0
             */class NgbOffcanvasRef{/**
                 * The instance of a component used for the offcanvas content.
                 *
                 * When a `TemplateRef` is used as the content or when the offcanvas is closed, will return `undefined`.
                 */get componentInstance(){if(this._contentRef&&this._contentRef.componentRef){return this._contentRef.componentRef.instance;}}/**
                 * The observable that emits when the offcanvas is closed via the `.close()` method.
                 *
                 * It will emit the result passed to the `.close()` method.
                 */get closed(){return this._closed.asObservable().pipe(takeUntil(this._hidden));}/**
                 * The observable that emits when the offcanvas is dismissed via the `.dismiss()` method.
                 *
                 * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
                 * reasons like backdrop click or ESC key press.
                 */get dismissed(){return this._dismissed.asObservable().pipe(takeUntil(this._hidden));}/**
                 * The observable that emits when both offcanvas window and backdrop are closed and animations were finished.
                 * At this point offcanvas and backdrop elements will be removed from the DOM tree.
                 *
                 * This observable will be completed after emitting.
                 */get hidden(){return this._hidden.asObservable();}/**
                 * The observable that emits when offcanvas is fully visible and animation was finished.
                 * The offcanvas DOM element is always available synchronously after calling 'offcanvas.open()' service.
                 *
                 * This observable will be completed after emitting.
                 * It will not emit, if offcanvas is closed before open animation is finished.
                 */get shown(){return this._panelCmptRef.instance.shown.asObservable();}constructor(_panelCmptRef,_contentRef,_backdropCmptRef,_beforeDismiss){this._panelCmptRef=_panelCmptRef;this._contentRef=_contentRef;this._backdropCmptRef=_backdropCmptRef;this._beforeDismiss=_beforeDismiss;this._closed=new Subject();this._dismissed=new Subject();this._hidden=new Subject();_panelCmptRef.instance.dismissEvent.subscribe(reason=>{this.dismiss(reason);});if(_backdropCmptRef){_backdropCmptRef.instance.dismissEvent.subscribe(reason=>{this.dismiss(reason);});}this.result=new Promise((resolve,reject)=>{this._resolve=resolve;this._reject=reject;});this.result.then(null,()=>{});}/**
                 * Closes the offcanvas with an optional `result` value.
                 *
                 * The `NgbMobalRef.result` promise will be resolved with the provided value.
                 */close(result){if(this._panelCmptRef){this._closed.next(result);this._resolve(result);this._removeOffcanvasElements();}}_dismiss(reason){this._dismissed.next(reason);this._reject(reason);this._removeOffcanvasElements();}/**
                 * Dismisses the offcanvas with an optional `reason` value.
                 *
                 * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
                 */dismiss(reason){if(this._panelCmptRef){if(!this._beforeDismiss){this._dismiss(reason);}else {const dismiss=this._beforeDismiss();if(isPromise(dismiss)){dismiss.then(result=>{if(result!==false){this._dismiss(reason);}},()=>{});}else if(dismiss!==false){this._dismiss(reason);}}}}_removeOffcanvasElements(){const panelTransition$=this._panelCmptRef.instance.hide();const backdropTransition$=this._backdropCmptRef?this._backdropCmptRef.instance.hide():of(undefined);// hiding panel
            panelTransition$.subscribe(()=>{const{nativeElement}=this._panelCmptRef.location;nativeElement.parentNode.removeChild(nativeElement);this._panelCmptRef.destroy();if(this._contentRef&&this._contentRef.viewRef){this._contentRef.viewRef.destroy();}this._panelCmptRef=null;this._contentRef=null;});// hiding backdrop
            backdropTransition$.subscribe(()=>{if(this._backdropCmptRef){const{nativeElement}=this._backdropCmptRef.location;nativeElement.parentNode.removeChild(nativeElement);this._backdropCmptRef.destroy();this._backdropCmptRef=null;}});// all done
            zip(panelTransition$,backdropTransition$).subscribe(()=>{this._hidden.next();this._hidden.complete();});}} exports("NgbOffcanvasRef", NgbOffcanvasRef);var OffcanvasDismissReasons; exports("OffcanvasDismissReasons", OffcanvasDismissReasons);(function(OffcanvasDismissReasons){OffcanvasDismissReasons[OffcanvasDismissReasons["BACKDROP_CLICK"]=0]="BACKDROP_CLICK";OffcanvasDismissReasons[OffcanvasDismissReasons["ESC"]=1]="ESC";})(OffcanvasDismissReasons||(exports("OffcanvasDismissReasons", OffcanvasDismissReasons={})));class NgbOffcanvasBackdrop{constructor(_el,_zone){this._el=_el;this._zone=_zone;this.dismissEvent=new EventEmitter();}ngOnInit(){this._zone.onStable.asObservable().pipe(take(1)).subscribe(()=>{ngbRunTransition(this._zone,this._el.nativeElement,(element,animation)=>{if(animation){reflow(element);}element.classList.add('show');},{animation:this.animation,runningTransition:'continue'});});}hide(){return ngbRunTransition(this._zone,this._el.nativeElement,({classList})=>classList.remove('show'),{animation:this.animation,runningTransition:'stop'});}dismiss(){if(!this.static){this.dismissEvent.emit(OffcanvasDismissReasons.BACKDROP_CLICK);}}static{this.ɵfac=function NgbOffcanvasBackdrop_Factory(t){return new(t||NgbOffcanvasBackdrop)(i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbOffcanvasBackdrop,selectors:[["ngb-offcanvas-backdrop"]],hostVars:6,hostBindings:function NgbOffcanvasBackdrop_HostBindings(rf,ctx){if(rf&1){i0.ɵɵlistener("mousedown",function NgbOffcanvasBackdrop_mousedown_HostBindingHandler(){return ctx.dismiss();});}if(rf&2){i0.ɵɵclassMap("offcanvas-backdrop"+(ctx.backdropClass?" "+ctx.backdropClass:""));i0.ɵɵclassProp("show",!ctx.animation)("fade",ctx.animation);}},inputs:{animation:"animation",backdropClass:"backdropClass",static:"static"},outputs:{dismissEvent:"dismiss"},standalone:true,features:[i0.ɵɵStandaloneFeature],decls:0,vars:0,template:function NgbOffcanvasBackdrop_Template(rf,ctx){},encapsulation:2});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbOffcanvasBackdrop,[{type:Component,args:[{selector:'ngb-offcanvas-backdrop',standalone:true,encapsulation:ViewEncapsulation.None,template:'',host:{'[class]':'"offcanvas-backdrop" + (backdropClass ? " " + backdropClass : "")','[class.show]':'!animation','[class.fade]':'animation','(mousedown)':'dismiss()'}}]}],function(){return [{type:i0.ElementRef},{type:i0.NgZone}];},{animation:[{type:Input}],backdropClass:[{type:Input}],static:[{type:Input}],dismissEvent:[{type:Output,args:['dismiss']}]});})();class NgbOffcanvasPanel{constructor(_document,_elRef,_zone){this._document=_document;this._elRef=_elRef;this._zone=_zone;this._closed$=new Subject();this._elWithFocus=null;// element that is focused prior to offcanvas opening
            this.keyboard=true;this.position='start';this.dismissEvent=new EventEmitter();this.shown=new Subject();this.hidden=new Subject();}dismiss(reason){this.dismissEvent.emit(reason);}ngOnInit(){this._elWithFocus=this._document.activeElement;this._zone.onStable.asObservable().pipe(take(1)).subscribe(()=>{this._show();});}ngOnDestroy(){this._disableEventHandling();}hide(){const{nativeElement}=this._elRef;const context={animation:this.animation,runningTransition:'stop'};const offcanvasTransition$=ngbRunTransition(this._zone,this._elRef.nativeElement,element=>{nativeElement.classList.remove('showing');nativeElement.classList.add('hiding');return ()=>nativeElement.classList.remove('show','hiding');},context);offcanvasTransition$.subscribe(()=>{this.hidden.next();this.hidden.complete();});this._disableEventHandling();this._restoreFocus();return offcanvasTransition$;}_show(){const context={animation:this.animation,runningTransition:'continue'};const offcanvasTransition$=ngbRunTransition(this._zone,this._elRef.nativeElement,(element,animation)=>{if(animation){reflow(element);}element.classList.add('show','showing');return ()=>element.classList.remove('showing');},context);offcanvasTransition$.subscribe(()=>{this.shown.next();this.shown.complete();});this._enableEventHandling();this._setFocus();}_enableEventHandling(){const{nativeElement}=this._elRef;this._zone.runOutsideAngular(()=>{fromEvent(nativeElement,'keydown').pipe(takeUntil(this._closed$),/* eslint-disable-next-line deprecation/deprecation */filter(e=>e.which===Key.Escape)).subscribe(event=>{if(this.keyboard){requestAnimationFrame(()=>{if(!event.defaultPrevented){this._zone.run(()=>this.dismiss(OffcanvasDismissReasons.ESC));}});}});});}_disableEventHandling(){this._closed$.next();}_setFocus(){const{nativeElement}=this._elRef;if(!nativeElement.contains(document.activeElement)){const autoFocusable=nativeElement.querySelector(`[ngbAutofocus]`);const firstFocusable=getFocusableBoundaryElements(nativeElement)[0];const elementToFocus=autoFocusable||firstFocusable||nativeElement;elementToFocus.focus();}}_restoreFocus(){const body=this._document.body;const elWithFocus=this._elWithFocus;let elementToFocus;if(elWithFocus&&elWithFocus['focus']&&body.contains(elWithFocus)){elementToFocus=elWithFocus;}else {elementToFocus=body;}this._zone.runOutsideAngular(()=>{setTimeout(()=>elementToFocus.focus());this._elWithFocus=null;});}static{this.ɵfac=function NgbOffcanvasPanel_Factory(t){return new(t||NgbOffcanvasPanel)(i0.ɵɵdirectiveInject(DOCUMENT),i0.ɵɵdirectiveInject(i0.ElementRef),i0.ɵɵdirectiveInject(i0.NgZone));};}static{this.ɵcmp=/* @__PURE__ */i0.ɵɵdefineComponent({type:NgbOffcanvasPanel,selectors:[["ngb-offcanvas-panel"]],hostAttrs:["role","dialog","tabindex","-1"],hostVars:5,hostBindings:function NgbOffcanvasPanel_HostBindings(rf,ctx){if(rf&2){i0.ɵɵattribute("aria-modal",true)("aria-labelledby",ctx.ariaLabelledBy)("aria-describedby",ctx.ariaDescribedBy);i0.ɵɵclassMap("offcanvas offcanvas-"+ctx.position+(ctx.panelClass?" "+ctx.panelClass:""));}},inputs:{animation:"animation",ariaLabelledBy:"ariaLabelledBy",ariaDescribedBy:"ariaDescribedBy",keyboard:"keyboard",panelClass:"panelClass",position:"position"},outputs:{dismissEvent:"dismiss"},standalone:true,features:[i0.ɵɵStandaloneFeature],ngContentSelectors:_c3,decls:1,vars:0,template:function NgbOffcanvasPanel_Template(rf,ctx){if(rf&1){i0.ɵɵprojectionDef();i0.ɵɵprojection(0);}},encapsulation:2});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbOffcanvasPanel,[{type:Component,args:[{selector:'ngb-offcanvas-panel',standalone:true,template:'<ng-content></ng-content>',encapsulation:ViewEncapsulation.None,host:{'[class]':'"offcanvas offcanvas-" + position  + (panelClass ? " " + panelClass : "")',role:'dialog',tabindex:'-1','[attr.aria-modal]':'true','[attr.aria-labelledby]':'ariaLabelledBy','[attr.aria-describedby]':'ariaDescribedBy'}}]}],function(){return [{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:i0.ElementRef},{type:i0.NgZone}];},{animation:[{type:Input}],ariaLabelledBy:[{type:Input}],ariaDescribedBy:[{type:Input}],keyboard:[{type:Input}],panelClass:[{type:Input}],position:[{type:Input}],dismissEvent:[{type:Output,args:['dismiss']}]});})();class NgbOffcanvasStack{constructor(_applicationRef,_injector,_document,_scrollBar,_ngZone){this._applicationRef=_applicationRef;this._injector=_injector;this._document=_document;this._scrollBar=_scrollBar;this._ngZone=_ngZone;this._activePanelCmptHasChanged=new Subject();this._scrollBarRestoreFn=null;this._backdropAttributes=['animation','backdropClass'];this._panelAttributes=['animation','ariaDescribedBy','ariaLabelledBy','keyboard','panelClass','position'];this._activeInstance=new EventEmitter();// Trap focus on active PanelCmpt
            this._activePanelCmptHasChanged.subscribe(()=>{if(this._panelCmpt){ngbFocusTrap(this._ngZone,this._panelCmpt.location.nativeElement,this._activePanelCmptHasChanged);}});}_restoreScrollBar(){const scrollBarRestoreFn=this._scrollBarRestoreFn;if(scrollBarRestoreFn){this._scrollBarRestoreFn=null;scrollBarRestoreFn();}}_hideScrollBar(){if(!this._scrollBarRestoreFn){this._scrollBarRestoreFn=this._scrollBar.hide();}}open(contentInjector,content,options){const containerEl=options.container instanceof HTMLElement?options.container:isDefined(options.container)?this._document.querySelector(options.container):this._document.body;if(!containerEl){throw new Error(`The specified offcanvas container "${options.container||'body'}" was not found in the DOM.`);}if(!options.scroll){this._hideScrollBar();}const activeOffcanvas=new NgbActiveOffcanvas();const contentRef=this._getContentRef(options.injector||contentInjector,content,activeOffcanvas);let backdropCmptRef=options.backdrop!==false?this._attachBackdrop(containerEl):undefined;let panelCmptRef=this._attachWindowComponent(containerEl,contentRef.nodes);let ngbOffcanvasRef=new NgbOffcanvasRef(panelCmptRef,contentRef,backdropCmptRef,options.beforeDismiss);this._registerOffcanvasRef(ngbOffcanvasRef);this._registerPanelCmpt(panelCmptRef);ngbOffcanvasRef.hidden.pipe(finalize(()=>this._restoreScrollBar())).subscribe();activeOffcanvas.close=result=>{ngbOffcanvasRef.close(result);};activeOffcanvas.dismiss=reason=>{ngbOffcanvasRef.dismiss(reason);};this._applyPanelOptions(panelCmptRef.instance,options);if(backdropCmptRef&&backdropCmptRef.instance){this._applyBackdropOptions(backdropCmptRef.instance,options);backdropCmptRef.changeDetectorRef.detectChanges();}panelCmptRef.changeDetectorRef.detectChanges();return ngbOffcanvasRef;}get activeInstance(){return this._activeInstance;}dismiss(reason){this._offcanvasRef?.dismiss(reason);}hasOpenOffcanvas(){return !!this._offcanvasRef;}_attachBackdrop(containerEl){let backdropCmptRef=createComponent(NgbOffcanvasBackdrop,{environmentInjector:this._applicationRef.injector,elementInjector:this._injector});this._applicationRef.attachView(backdropCmptRef.hostView);containerEl.appendChild(backdropCmptRef.location.nativeElement);return backdropCmptRef;}_attachWindowComponent(containerEl,projectableNodes){let panelCmptRef=createComponent(NgbOffcanvasPanel,{environmentInjector:this._applicationRef.injector,elementInjector:this._injector,projectableNodes});this._applicationRef.attachView(panelCmptRef.hostView);containerEl.appendChild(panelCmptRef.location.nativeElement);return panelCmptRef;}_applyPanelOptions(windowInstance,options){this._panelAttributes.forEach(optionName=>{if(isDefined(options[optionName])){windowInstance[optionName]=options[optionName];}});}_applyBackdropOptions(backdropInstance,options){this._backdropAttributes.forEach(optionName=>{if(isDefined(options[optionName])){backdropInstance[optionName]=options[optionName];}});backdropInstance.static=options.backdrop==='static';}_getContentRef(contentInjector,content,activeOffcanvas){if(!content){return new ContentRef([]);}else if(content instanceof TemplateRef){return this._createFromTemplateRef(content,activeOffcanvas);}else if(isString(content)){return this._createFromString(content);}else {return this._createFromComponent(contentInjector,content,activeOffcanvas);}}_createFromTemplateRef(templateRef,activeOffcanvas){const context={$implicit:activeOffcanvas,close(result){activeOffcanvas.close(result);},dismiss(reason){activeOffcanvas.dismiss(reason);}};const viewRef=templateRef.createEmbeddedView(context);this._applicationRef.attachView(viewRef);return new ContentRef([viewRef.rootNodes],viewRef);}_createFromString(content){const component=this._document.createTextNode(`${content}`);return new ContentRef([[component]]);}_createFromComponent(contentInjector,componentType,context){const elementInjector=Injector.create({providers:[{provide:NgbActiveOffcanvas,useValue:context}],parent:contentInjector});const componentRef=createComponent(componentType,{environmentInjector:this._applicationRef.injector,elementInjector});const componentNativeEl=componentRef.location.nativeElement;this._applicationRef.attachView(componentRef.hostView);return new ContentRef([[componentNativeEl]],componentRef.hostView,componentRef);}_registerOffcanvasRef(ngbOffcanvasRef){const unregisterOffcanvasRef=()=>{this._offcanvasRef=undefined;this._activeInstance.emit(this._offcanvasRef);};this._offcanvasRef=ngbOffcanvasRef;this._activeInstance.emit(this._offcanvasRef);ngbOffcanvasRef.result.then(unregisterOffcanvasRef,unregisterOffcanvasRef);}_registerPanelCmpt(ngbPanelCmpt){this._panelCmpt=ngbPanelCmpt;this._activePanelCmptHasChanged.next();ngbPanelCmpt.onDestroy(()=>{this._panelCmpt=undefined;this._activePanelCmptHasChanged.next();});}static{this.ɵfac=function NgbOffcanvasStack_Factory(t){return new(t||NgbOffcanvasStack)(i0.ɵɵinject(i0.ApplicationRef),i0.ɵɵinject(i0.Injector),i0.ɵɵinject(DOCUMENT),i0.ɵɵinject(ScrollBar),i0.ɵɵinject(i0.NgZone));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbOffcanvasStack,factory:NgbOffcanvasStack.ɵfac,providedIn:'root'});}}(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbOffcanvasStack,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:i0.ApplicationRef},{type:i0.Injector},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:ScrollBar},{type:i0.NgZone}];},null);})();/**
             * A configuration service for the [`NgbOffcanvas`](#/components/offcanvas/api#NgbOffcanvas) service.
             *
             * You can inject this service, typically in your root component, and customize the values of its properties in
             * order to provide default values for all offcanvases used in the application.
             *
             * @since 12.1.0
             */class NgbOffcanvasConfig{constructor(_ngbConfig){this._ngbConfig=_ngbConfig;this.backdrop=true;this.keyboard=true;this.position='start';this.scroll=false;}get animation(){return this._animation===undefined?this._ngbConfig.animation:this._animation;}set animation(animation){this._animation=animation;}static{this.ɵfac=function NgbOffcanvasConfig_Factory(t){return new(t||NgbOffcanvasConfig)(i0.ɵɵinject(NgbConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbOffcanvasConfig,factory:NgbOffcanvasConfig.ɵfac,providedIn:'root'});}} exports("NgbOffcanvasConfig", NgbOffcanvasConfig);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbOffcanvasConfig,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:NgbConfig}];},null);})();/**
             * A service for opening an offcanvas.
             *
             * Creating an offcanvas is straightforward: create a component or a template and pass it as an argument to
             * the `.open()` method.
             *
             * @since 12.1.0
             */class NgbOffcanvas{constructor(_injector,_offcanvasStack,_config){this._injector=_injector;this._offcanvasStack=_offcanvasStack;this._config=_config;}/**
                 * Opens a new offcanvas panel with the specified content and supplied options.
                 *
                 * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
                 * then instances of those components can be injected with an instance of the `NgbActiveOffcanvas` class. You can then
                 * use `NgbActiveOffcanvas` methods to close / dismiss offcanvas from "inside" of your component.
                 *
                 * Also see the [`NgbOffcanvasOptions`](#/components/offcanvas/api#NgbOffcanvasOptions) for the list of supported
                 * options.
                 */open(content,options={}){const combinedOptions={...this._config,animation:this._config.animation,...options};return this._offcanvasStack.open(this._injector,content,combinedOptions);}/**
                 * Returns an observable that holds the active offcanvas instance.
                 */get activeInstance(){return this._offcanvasStack.activeInstance;}/**
                 * Dismisses the currently displayed offcanvas with the supplied reason.
                 */dismiss(reason){this._offcanvasStack.dismiss(reason);}/**
                 * Indicates if there is currently an open offcanvas in the application.
                 */hasOpenOffcanvas(){return this._offcanvasStack.hasOpenOffcanvas();}static{this.ɵfac=function NgbOffcanvas_Factory(t){return new(t||NgbOffcanvas)(i0.ɵɵinject(i0.Injector),i0.ɵɵinject(NgbOffcanvasStack),i0.ɵɵinject(NgbOffcanvasConfig));};}static{this.ɵprov=/* @__PURE__ */i0.ɵɵdefineInjectable({token:NgbOffcanvas,factory:NgbOffcanvas.ɵfac,providedIn:'root'});}} exports("NgbOffcanvas", NgbOffcanvas);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbOffcanvas,[{type:Injectable,args:[{providedIn:'root'}]}],function(){return [{type:i0.Injector},{type:NgbOffcanvasStack},{type:NgbOffcanvasConfig}];},null);})();class NgbOffcanvasModule{static{this.ɵfac=function NgbOffcanvasModule_Factory(t){return new(t||NgbOffcanvasModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbOffcanvasModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({});}} exports("NgbOffcanvasModule", NgbOffcanvasModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbOffcanvasModule,[{type:NgModule,args:[{}]}],null,null);})();const NGB_MODULES=[NgbAccordionModule,NgbAlertModule,NgbCarouselModule,NgbCollapseModule,NgbDatepickerModule,NgbDropdownModule,NgbModalModule,NgbNavModule,NgbOffcanvasModule,NgbPaginationModule,NgbPopoverModule,NgbProgressbarModule,NgbRatingModule,NgbScrollSpyModule,NgbTimepickerModule,NgbToastModule,NgbTooltipModule,NgbTypeaheadModule];class NgbModule{static{this.ɵfac=function NgbModule_Factory(t){return new(t||NgbModule)();};}static{this.ɵmod=/* @__PURE__ */i0.ɵɵdefineNgModule({type:NgbModule});}static{this.ɵinj=/* @__PURE__ */i0.ɵɵdefineInjector({imports:[NGB_MODULES,NgbAccordionModule,NgbAlertModule,NgbCarouselModule,NgbCollapseModule,NgbDatepickerModule,NgbDropdownModule,NgbModalModule,NgbNavModule,NgbOffcanvasModule,NgbPaginationModule,NgbPopoverModule,NgbProgressbarModule,NgbRatingModule,NgbScrollSpyModule,NgbTimepickerModule,NgbToastModule,NgbTooltipModule,NgbTypeaheadModule]});}} exports("NgbModule", NgbModule);(function(){(typeof ngDevMode==="undefined"||ngDevMode)&&i0.ɵsetClassMetadata(NgbModule,[{type:NgModule,args:[{imports:NGB_MODULES,exports:NGB_MODULES}]}],null,null);})();

        })
    };
}));
//# sourceMappingURL=ng-bootstrap.js.map
