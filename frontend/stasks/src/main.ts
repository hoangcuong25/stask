import { NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Kiểm tra xem ứng dụng có đang được chạy bởi Single-SPA (Front-end Root) hay không
const isSingleSpa = typeof window !== 'undefined' && (
  !!(window as any).singleSpaNavigate ||
  window.location.port === '9000' ||
  window !== window.top
);

// Khởi tạo Single-SPA lifecycles cho MFE sWork
const lifecycles = singleSpaAngular({
  bootstrapFunction: () => {
    return bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...(appConfig.providers || []),
        getSingleSpaExtraProviders()
      ]
    });
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

// Nếu chạy Standalone trực tiếp (ở localhost:4250)
if (!isSingleSpa) {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error('[sWork Standalone] Error:', err));
}

