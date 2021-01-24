import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciasRoutingModule } from './agencias-routing.module';
import { AgenciasComponent } from './agencias.component';
import { AgenciasService } from '../../services/agencias.service';

@NgModule({
  declarations: [
    AgenciasComponent
  ],
  imports: [
    CommonModule,
    AgenciasRoutingModule
  ],
  providers: [
    AgenciasService
  ]
})
export class AgenciasModule { }
