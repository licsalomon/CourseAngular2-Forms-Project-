import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, Directive } from '@angular/core';

@Directive (
//   {
//   selector: 'app-based-form',
//   templateUrl: '<div></div>',
// }
)
export abstract class BasedFormComponent implements OnInit {
  form!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): any;

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    }else{
      console.log('invalid form');
      this.checkFormValidations(this.form);
    }
  }
  checkFormValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log(field);
      const control = formGroup.get(field);
      control?.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkFormValidations(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }
  verificaValidTouched(campo: string) {
    return !this.form.get(campo)!.valid &&
    this.form.get(campo)!.touched;
  }
  verificaRequired(campo: string) {
    return (this.form.get(campo)!.hasError('required') &&
    this.form.get(campo)!.touched);
  }
  verificaEmailValid() {
    let email = this.form.get('email');
    if (email?.errors) {
      console.log("notvalidemail");
      return email.errors['emailNotValid'] && email.touched;
    }
  }
  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }
  getCampo(campo: string) {
    return this.form.get(campo);
  }
}
