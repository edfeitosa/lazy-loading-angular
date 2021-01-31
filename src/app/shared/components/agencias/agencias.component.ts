import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ViewChild,
  Compiler
} from '@angular/core';
import { take, takeWhile } from 'rxjs/operators';

import { AgenciasService } from '../../services/agencias.service';
import { Agencias } from '../../interfaces/agencias.interface';
import { Agencia } from '../../interfaces/agencia.interface';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss'],
  providers: [ AgenciasService ]
})
export class AgenciasComponent implements OnInit, OnDestroy {

  @ViewChild('autocomplete', { read: ViewContainerRef, static: true }) autocomplete: ViewContainerRef;
  @ViewChild('informacoes', { read: ViewContainerRef, static: true }) informacoes: ViewContainerRef;

  inscrito: boolean = true;

  constructor(
    private agenciasService: AgenciasService,
    private compiler: Compiler
  ) { }

  ngOnInit(): void {
    this.getAgencias();
  }

  ngOnDestroy(): void {
    this.inscrito = false;
  }

  getAgencias(): void {
    this.agenciasService.agencias()
      .pipe(take(1))
      .subscribe(
        dados => this.autocompleteRender(dados),
        erro => console.log(erro)
      )
  }

  private autocompleteRender(dados: Agencias): void {
    import('../autocomplete/autocomplete.module').then(({ AutocompleteModule }) => {
      const module = this.compiler.compileModuleSync(AutocompleteModule);
      const ngModule = module.create(this.autocomplete.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(AutocompleteModule.componentToRender());
      const ref = this.autocomplete.createComponent(component);
      ref.instance.data = dados.data;
      ref.instance.keyword = 'nome';
      ref.instance.placeholder = 'Selecione a agência para obter informações';
      ref.instance.titulo = 'Nome da Agência';
      ref.instance.aoSelecionar
        .pipe(takeWhile(() => this.inscrito))
        .subscribe(
          (sucesso: Agencia) => this.informacoesRender(sucesso),
          erro => console.log('método autocompleteRender -> ', erro)
        );
    });
  }

  private informacoesRender(dados: Agencia, limpar: boolean = true): void {
    limpar && this.informacoes.clear();
    import('../informacoes/informacoes.module').then(({ InformacoesModule }) => {
      const module = this.compiler.compileModuleSync(InformacoesModule);
      const ngModule = module.create(this.informacoes.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(InformacoesModule.componentToRender());
      const ref = this.informacoes.createComponent(component);
      ref.instance.tipo = 'agencias';
      ref.instance.dados = dados;
    });
  }

}
