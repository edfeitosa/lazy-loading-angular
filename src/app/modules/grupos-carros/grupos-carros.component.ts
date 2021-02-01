import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ViewChild,
  Compiler
} from '@angular/core';
import { take, takeWhile } from 'rxjs/operators';

import { GruposCarrosService } from '../../shared/services/grupos-carros/grupos-carros.service';
import { GruposCarros } from '../../shared/interfaces/grupos-carros.interface';

@Component({
  selector: 'app-grupos-carros',
  templateUrl: './grupos-carros.component.html',
  styleUrls: ['./grupos-carros.component.scss'],
  providers: [ GruposCarrosService ]
})
export class GruposCarrosComponent implements OnInit, OnDestroy {

  @ViewChild('autocomplete', { read: ViewContainerRef, static: true }) autocomplete: ViewContainerRef;
  @ViewChild('informacoes', { read: ViewContainerRef, static: true }) informacoes: ViewContainerRef;

  inscrito: boolean = true;

  constructor(
    private gruposCarrosService: GruposCarrosService,
    private compiler: Compiler 
  ) { }

  ngOnInit(): void {
    this.getGruposCarros();
  }

  ngOnDestroy(): void {
    this.inscrito = false;
  }

  getGruposCarros(): void {
    this.gruposCarrosService.gruposCarros()
      .pipe(take(1))
      .subscribe(
        dados => this.autocompleteRender(dados),
        // dados => console.log(dados),
        erro => console.log(erro)
      )
  }

  private autocompleteRender(dados: GruposCarros): void {
    import('../../shared/components/autocomplete/autocomplete.module').then(({ AutocompleteModule }) => {
      const module = this.compiler.compileModuleSync(AutocompleteModule);
      const ngModule = module.create(this.autocomplete.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(AutocompleteModule.componentToRender());
      const ref = this.autocomplete.createComponent(component);
      ref.instance.data = dados.data;
      ref.instance.keyword = 'codigo';
      ref.instance.placeholder = 'Selecione o grupo de carros para obter informações';
      ref.instance.titulo = 'Grupo de Carros';
      /* ref.instance.aoSelecionar
        .pipe(takeWhile(() => this.inscrito))
        .subscribe(
          (sucesso: Agencia) => this.informacoesRender(sucesso),
          erro => console.log('método autocompleteRender -> ', erro)
        ); */
    });
  }

}
