import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacoesComponent } from './informacoes.component';

@NgModule({
  declarations: [
    InformacoesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InformacoesModule {
  static componentToRender = () => InformacoesComponent;
}
