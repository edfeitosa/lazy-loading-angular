import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from '../../../../environments/environment';
import { GruposCarros } from '../../interfaces/grupos-carros.interface';

@Injectable({
  providedIn: 'any'
})
export class GruposCarrosService {

  constructor(
    private http: HttpClient
  ) { }

  gruposCarros(): Observable<GruposCarros> {
    return this.http.get<GruposCarros>(`${environment.URL_SERVICE}/grupos-carros`)
      .pipe(
        take(1),
        tap(sucesso => sucesso),
        catchError(erro => throwError(erro))
      )
  }
}
