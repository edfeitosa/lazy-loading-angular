import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

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
  @Output() aoSelecionar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  selectEvent(item: Agencia): void {
    this.aoSelecionar.emit(item);
  }

  onFocused(): void { }

}
