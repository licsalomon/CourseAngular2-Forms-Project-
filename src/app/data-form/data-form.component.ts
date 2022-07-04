
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';

import { EstadoBr } from './../shared/model/estado-br';
import { DropdownService } from './../shared/services/dropdown.service';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { ValidEmailService } from './valid-email.service';
import { FormValidations } from './../shared/form-validation';
import { BasedFormComponent } from './../shared/based-form/based-form.component';
import { CidadesBr } from './../shared/model/cidade-br';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent extends BasedFormComponent implements OnInit {
  // form!: FormGroup;
  estados!: EstadoBr[];
  // estados!: Observable<EstadoBr[]>;
  cargos!: any[];
  technologies!: any[];
  newsletterOps!: any[];
  frameworks: any[] = ['Angular', 'React', 'Vue', 'Sencha'];
  cidades!: CidadesBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private validEmailService: ValidEmailService
  ) {
    super();
  }

  override ngOnInit() {
    /* this.form = new FormGroup({
       name: new FormControl(null),
       email: new FormControl(null),
     });*/

    // this.estados = this.dropdownService.getEstadosBr();
    this.dropdownService
      .getEstadosBr()
      .subscribe((dados) => (this.estados = dados));

    // .subscribe(arg =>
    //   {
    //   this.estados = arg
    //   console.log(arg, "arg");
    // }
    // );
    // this.validEmailService.validEmail('email@email1.com').subscribe();

    //call services from dropdown service***********
    this.cargos = this.dropdownService.getCargos();
    this.technologies = this.dropdownService.getTechnologies();
    this.newsletterOps = this.dropdownService.getNewsletter();

    //criacao de formulario*************
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [
        null,
        [Validators.required, Validators.email],
        [this.validEmails.bind(this)],
      ],
      confirmEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        rua: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null],
      technologies: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(),
    });
    this.form
      .get('endereco.cep')
      ?.statusChanges.pipe(
        distinctUntilChanged(),
        tap((value) => console.log('status cep', value)),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepService.loadCep(this.form.get('endereco.cep')!.value)
            : empty()
        )
      )
      .subscribe((data) => (data ? this.populaDadosForm(data) : {}));
      
//formularios aninhados, cidade dentro de estado, me subscribo ás novidades*********
      this.form.get('endereco.estado')!.valueChanges
      .pipe(
        // tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map((estados1: any[]) => estados1 && estados1.length > 0 ? estados1[0].id : empty()),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        // tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);
      // this.dropdownService.getCidades(8).subscribe(console.log);
  }

  buildFrameworks() {
    const values = this.frameworks.map((v) => new FormControl(false));
    return this.formBuilder.array(
      values
      // FormValidations.requiredMinCheckbox(1)
    );
  }
  getFrameworksControls() {
    return this.form.get('frameworks')
      ? (<FormArray>this.form.get('frameworks')).controls
      : null;
  }

  // requiredMinCheckbox(min = 1){
  //   const validator = (formArray: FormArray) => {
  //     const totalChecked = formArray.controls
  //     .map(v => v.value)
  //     .reduce((total, current) => current ? total + current : total, 0);
  //     return totalChecked >= min ? null : { require: true };
  //   };
  //   return validator;
  // }

  //submit the form**************
  submit() {
    // throw new Error('Method not implemented.');
    let valueSubmit = Object.assign({}, this.form.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => (v ? this.frameworks[i] : null))
        .filter((v: any) => v !== null),
    });
    console.log(valueSubmit);

    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .subscribe(
        (dados: any) => {
          console.log(dados);
          // this.onCancel();
        },
        (error: any) => alert(`erro ${error}`)
      );
  }

  //cancel button****************
  onCancel() {
    this.form.reset();
  }

  //load cep from server*************
  loadCep() {
    let cep = this.form.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '');
    //   //Verifica se campo cep possui valor informado.
    if (cep !== '' && cep != null) {
      return this.cepService.loadCep(cep).subscribe((data: any) => {
        this.populaDadosForm(data);
      });
    }
    return;
    //     //Expressão regular para validar o CEP.
    //     var validacep = /^[0-9]{8}$/;

    //     //Valida o formato do CEP.
    //     if (validacep.test(cep)) {
    //       this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    //         // .pipe(map((data: any) => data.json()))
    //         .subscribe(data => this.populaDadosForm(data));
    //     } else {
    //       this.limpa_formulário_cep();
    //       alert('cep não encontrado');
    //     }

    //   }
  }

  //load data in cep fields**************
  populaDadosForm(dados: any) {
    this.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }
  limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    this.form.patchValue({
      endereco: {
        cep: null,
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }

  //select input options**********
  setCargo() {
    const cargo = { name: 'Gest', level: 'Senior', desc: 'Gest sr' };
    this.form.get('cargo')?.setValue(cargo);
  }
  compareCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.name === obj2.name : obj1 === obj2;
  }

  //select input options**********
  setTechnologies() {
    this.form.get('technologies')?.setValue(['JS', 'React', 'Ang']);
  }

  //validation of emails from valiEmailService*************
  validEmails(formControl: FormControl) {
    return this.validEmailService
      .validEmail(formControl.value)
      .pipe(map((data: any) => (data ? { invalidEmail: true } : null)));
  }
}
