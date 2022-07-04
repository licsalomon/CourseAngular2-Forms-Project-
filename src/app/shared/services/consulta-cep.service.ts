import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaCepService {
  constructor(private http: HttpClient) {}
  loadCep(cep: string) {
    //Nova variável "cep" somente com dígitos.
    // let cep = this.form.get('endereco.cep')?.value;
    // cep = cep.replace(/\D/g, '');
    // //Verifica se campo cep possui valor informado.
    // if (cep != '') {
    //   //Expressão regular para validar o CEP.
    //   var validacep = /^[0-9]{8}$/;

    //   //Valida o formato do CEP.
    //   if (validacep.test(cep)) {
       return this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`)
  //     }
  //   }
  // }
}
}
