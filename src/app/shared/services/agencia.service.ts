import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Agencia } from '../interfaces/agencia.interface';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  private informacoesAgencia = new Subject<Agencia>();
  agencia$ = this.informacoesAgencia.asObservable();

  constructor() { }

  atualizaDadosAgencia(dados: Agencia): void {
    this.informacoesAgencia.next(dados);
  }
}
