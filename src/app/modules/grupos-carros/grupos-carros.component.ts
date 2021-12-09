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
  @ViewChild('loader', { read: ViewContainerRef, static: true }) loader: ViewContainerRef;
  @ViewChild('mensagem', { read: ViewContainerRef, static: true }) mensagem: ViewContainerRef;

  inscrito: boolean = true;

  constructor(
    private gruposCarrosService: GruposCarrosService,
    private compiler: Compiler 
  ) { }

  ngOnInit(): void {
    this.getGruposCarros();
    this.loaderRender();
  }

  ngOnDestroy(): void {
    this.inscrito = false;
  }

  getGruposCarros(): void {
    this.gruposCarrosService.gruposCarros()
      .pipe(take(1))
      .subscribe(
        dados => {
          this.loader.clear();
          // this.autocompleteRender(dados);
        },
        erro => {
          this.loader.clear();
          this.loaderMensagem(`Ocorreu um erro: ${erro.statusText}`);
        }
      )
  }

  private loaderRender(): void {
    import('../../shared/components/loader/loader.module').then(({ LoaderModule }) => {
      const module = this.compiler.compileModuleSync(LoaderModule);
      const ngModule = module.create(this.autocomplete.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(LoaderModule.componentToRender());
      const ref = this.loader.createComponent(component);
      ref.instance.mensagem = 'Estamos preparando os dados de grupos de carros para você';
    });
  }

  /* private autocompleteRender(dados: GruposCarros): void {
    import('../../shared/components/autocomplete/autocomplete.module').then(({ AutocompleteModule }) => {
      const module = this.compiler.compileModuleSync(AutocompleteModule);
      const ngModule = module.create(this.autocomplete.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(AutocompleteModule.componentToRender());
      const ref = this.autocomplete.createComponent(component);
      ref.instance.data = dados.data;
      ref.instance.keyword = 'codigo';
      ref.instance.placeholder = 'Selecione o grupo de carros para obter informações';
      ref.instance.titulo = 'Grupo de Carros';
      ref.instance.aoSelecionar
        .pipe(takeWhile(() => this.inscrito))
        .subscribe(
          (sucesso: GruposCarros) => this.informacoesRender(sucesso),
          erro => console.log('método autocompleteRender -> ', erro)
        );
    });
  } */

  private informacoesRender(dados: GruposCarros, limpar: boolean = true): void {
    limpar && this.informacoes.clear();
    import('../../shared/components/informacoes/informacoes.module').then(({ InformacoesModule }) => {
      const module = this.compiler.compileModuleSync(InformacoesModule);
      const ngModule = module.create(this.informacoes.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(InformacoesModule.componentToRender());
      const ref = this.informacoes.createComponent(component);
      ref.instance.tipo = 'grupos-carros';
      ref.instance.dados = dados;
    });
  }

  private loaderMensagem(mensagem: string): void {
    import('../../shared/components/mensagens/mensagens.module').then(({ MensagensModule }) => {
      const module = this.compiler.compileModuleSync(MensagensModule);
      const ngModule = module.create(this.autocomplete.injector);
      const component = ngModule.componentFactoryResolver.resolveComponentFactory(MensagensModule.componentToRender());
      const ref = this.loader.createComponent(component);
      ref.instance.mensagem = mensagem;
    });
  }

}
