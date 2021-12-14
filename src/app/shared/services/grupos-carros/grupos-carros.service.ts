import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from '../../../../environments/environment';
import { Grupo } from '../../interfaces/grupos.interface';

@Injectable({
  providedIn: 'any'
})
export class GruposCarrosService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${environment.URL_SERVICE}/grupos`)
      .pipe(
        take(1),
        tap(sucesso => sucesso),
        catchError(erro => throwError(erro))
      )
  }

  getId(id: string): Observable<Grupo> {
    return this.http.get<Grupo>(`${environment.URL_SERVICE}/grupos/${id}`)
      .pipe(
        take(1),
        tap(sucesso => sucesso),
        catchError(erro => throwError(erro))
      )
  }
}
