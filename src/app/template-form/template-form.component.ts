import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, from, pipe, fromEvent } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  constructor(private htpp: HttpClient) { }
  user: any =
    {
      name: null,
      email: null
    }
  ngOnInit(): void {
  }
  isValid: boolean = false;
  onSubmit(f: any) {
    console.log(f);
    // console.log(this.user);
    /*if (f.controls.valid) {
      this.isValid = true
    }
    else {
      this.isValid = false
    }*/
    
    this.htpp.post('https://httpbin.org/post', JSON.stringify(f.value))
      .subscribe((dados: any) => {
        console.log(dados);
        f.form.reset();
      });
  }
  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }
  loadCep(cep: string, form: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        this.htpp.get(`https://viacep.com.br/ws/${cep}/json/`)
          // .pipe(map((data: any) => data.json()))
          .subscribe(data => this.populaDadosForm(data, form));
      } else {
        this.limpa_formulário_cep(form);
        alert('cep não encontrado');
      }

    }
  }

  populaDadosForm(dados: any, formulario: any) {
    formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

  }
  limpa_formulário_cep(formulario: any) {
    // Limpa valores do formulário de cep.
    formulario.form.patchValue({
      endereco: {
        cep: null,
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }



}