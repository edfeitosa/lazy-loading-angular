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

import { AgenciaService } from '../../services/agencia.service';
import { Agencia } from '../../interfaces/agencia.interface';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss']
})
export class AgenciasComponent implements OnInit, OnDestroy {

  @ViewChild('autocomplete', { read: ViewContainerRef, static: true }) autocomplete: ViewContainerRef;
  @ViewChild('informacoes', { read: ViewContainerRef, static: true }) informacoes: ViewContainerRef;

  inscrito: boolean = true;

  constructor(
    private agenciasService: AgenciasService,
    private agenciaService: AgenciaService,
    private compiler: Compiler
  ) { }

  ngOnInit(): void {
    this.getAgencias();
    this.getAgencia();
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

  getAgencia(): void {
    this.agenciaService.agencia$
    .pipe(takeWhile(() => this.inscrito))
    .subscribe(
      dados => {
        this.informacoes.clear();
        this.informacoesRender(dados)
      });
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
    });
  }

  private informacoesRender(dados: Agencia): void {
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
