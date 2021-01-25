import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  Compiler
} from '@angular/core';
import { take } from 'rxjs/operators';

import { AgenciasService } from '../../services/agencias.service';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss']
})
export class AgenciasComponent implements OnInit {

  @ViewChild('autocomplete', { read: ViewContainerRef, static: true }) 
    autocomplete: ViewContainerRef;

  constructor(
    private agenciasService: AgenciasService,
    private compiler: Compiler
  ) { }

  ngOnInit(): void {
    this.getAgencias();
  }

  getAgencias(): void {
    this.agenciasService.agencias()
      .pipe(take(1))
      .subscribe(
        dados => {
          this.autocompleteRender(dados.data);
        },
        erro => console.log(erro)
      )
  }

  onSelect(item: any): void {
    console.log(item);
  }

  autocompleteRender(dados: Array<object>): void {
    import('../autocomplete/autocomplete.module').then(({ AutocompleteModule }) => {
      const module = this.compiler.compileModuleSync(AutocompleteModule);
      const ngModule = module.create(this.autocomplete.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(AutocompleteModule.componentToRender());
      const ref = this.autocomplete.createComponent(component);
      ref.instance.onSelect = this.onSelect;
      ref.instance.data = dados;
      ref.instance.keyword = 'nome';
      ref.instance.placeholder = 'Selecione a agência para obter informações';
      ref.instance.titulo = 'Nome da Agência';
    });
  }

}
