import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
// import { TemplateFormComponent } from './template-form/template-form.component';
// import { DataFormComponent } from './data-form/data-form.component';
// import { FormDebugComponent } from './shared/form-debug/form-debug.component';
// import { ControlErrorFieldComponent } from './shared/control-error-field/control-error-field.component';
import { DataFormModule } from './data-form/data-form.module';
import { TemplateFormModule } from './template-form/template-form.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // TemplateFormComponent,
    // DataFormComponent,
    // FormDebugComponent,
    // ControlErrorFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataFormModule,
    TemplateFormModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
