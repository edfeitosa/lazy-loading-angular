import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from '../../../../environments/environment';
import { Agencias } from '../../interfaces/agencias.interface';

@Injectable({
  providedIn: 'any'
})
export class AgenciasService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Agencias> {
    return this.http.get<Agencias>(`${environment.URL_SERVICE}/agencias`)
      .pipe(
        take(1),
        tap(sucesso => sucesso),
        catchError(erro => throwError(erro))
      )
  }

  getId(id: string): Observable<Agencias> {
    return this.http.get<Agencias>(`${environment.URL_SERVICE}/agencias/${id}`)
      .pipe(
        take(1),
        tap(sucesso => sucesso),
        catchError(erro => throwError(erro))
      )
  }
}
