import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EstadoBr } from '../model/estado-br';
import { CidadesBr } from '../model/cidade-br';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/data/estadosBr.json');
    // .pipe(map((data: any) => {data.json()}));
  }
  // getCidades(idEstado: number) {
  //   return this.http.get<CidadesBr[]>('assets/data/cidades.json')
  //   .pipe(
  //     map((cidades: CidadesBr[]) => {
  //        // tslint:disable-next-line:triple-equals
  //       cidades.filter(c => c.estado == idEstado.toString())
  //     })
  //   );
  // }
  getCidades(idEstado: number) {
    return this.http.get<CidadesBr[]>('assets/data/cidades.json')
    .pipe(
      // tslint:disable-next-line:triple-equals
      map((cidades: CidadesBr[]) => cidades.filter(c => c.estado == idEstado.toString()))
    );
  }
  getCargos() {
    return [
      { name: 'Dev', level: 'Junior', desc: 'Dev jr' },
      { name: 'Gest', level: 'Senior', desc: 'Gest sr' },
      { name: 'Anal', level: 'Pleno', desc: 'Anal pleno' },
    ];
  }
  getTechnologies() {
    return [
      { name: 'JS', desc: 'JavaScript' },
      { name: 'React', desc: 'ReactJS' },
      { name: 'Ang', desc: 'Angular2' },
      { name: 'PHP', desc: 'PHP' },
    ];
  }
  getNewsletter() {
    return [
      { value: 's', desc: 'yes' },
      { value: 'n', desc: 'no' },
    ];
  }
}
