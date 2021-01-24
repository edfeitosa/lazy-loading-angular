import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { AgenciasService } from '../../services/agencias.service';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss']
})
export class AgenciasComponent implements OnInit {

  constructor(
    private agenciasService: AgenciasService
  ) { }

  ngOnInit(): void {
    this.getAgencias();
  }

  getAgencias(): void {
    this.agenciasService.agencias()
      .pipe(take(1))
      .subscribe(
        dados => console.log(dados.data),
        erro => console.log(erro)
      )
  }

}
