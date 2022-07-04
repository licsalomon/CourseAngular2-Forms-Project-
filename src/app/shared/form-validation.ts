import { FormArray, FormControl, FormGroup } from '@angular/forms';


export class FormValidations {
  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /* const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1;
        }
      } */
      const totalChecked = formArray.controls
        .map((v) => v.value)
        .reduce((total, current) => (current ? total + current : total), 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }
  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('one field is required');
      }
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }
      const field = (<FormGroup>formControl.root).get(otherField);
      if (!field) {
        throw new Error('one valid field is required');
      }
      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }
      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldname: string, validatorName: string, validatorValue?: any) {
    let config: Record<string, string> = {
      'required': `${fieldname} is required.`,
      'minlength': `${fieldname} has to be at least ${validatorValue.requiredLength} characters`,
      'cepInvalido': 'Invalid CEP',
      'invalidEmail': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido',
      'email': 'Email not valid'
    };
    return config[validatorName];
  }

}
