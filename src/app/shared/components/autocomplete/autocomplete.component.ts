import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() onSelect: Function;
  @Input() data: Array<object>;
  @Input() keyword: string;
  @Input() placeholder: string;
  @Input() titulo: string;

  constructor() { }

  ngOnInit(): void { }

  selectEvent(item: object) {
    this.onSelect(item);
  }

  onFocused(): void {
    console.log('está com foco');
  }

}
