import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ControlErrorFieldComponent } from './control-error-field/control-error-field.component';
import { HttpClientModule } from '@angular/common/http';


import { DropdownService } from './services/dropdown.service';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';
// import { BasedFormComponent } from './based-form/based-form.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    ControlErrorFieldComponent,
    ErrorMsgComponent,
    InputFieldComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    ControlErrorFieldComponent,
    ErrorMsgComponent,
    InputFieldComponent,
  ],
  providers: [
    DropdownService,
  ]
})
export class SharedModule { }
