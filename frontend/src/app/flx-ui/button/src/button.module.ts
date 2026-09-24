/**
 * @license
 * Copyright @fpt-is/flx. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';


import { FlxButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';

const FLX_BUTTON_COMPONENTS = [
  FlxButtonComponent,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...FLX_BUTTON_COMPONENTS,
  ],
  exports: [
    ...FLX_BUTTON_COMPONENTS,
  ],
})
export class FlxButtonModule { }
