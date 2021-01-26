import { Component, OnInit, Input } from '@angular/core';

import { AgenciaService } from '../../services/agencia.service';
import { Agencia } from '../../interfaces/agencia.interface';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() data: Array<object>;
  @Input() keyword: string;
  @Input() placeholder: string;
  @Input() titulo: string;

  constructor(
    private agenciaService: AgenciaService
  ) { }

  ngOnInit(): void { }

  selectEvent(item: Agencia): void {
    this.agenciaService.atualizaDadosAgencia(item);
  }

  onFocused(): void { }

}
