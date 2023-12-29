import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchFilterPipe } from '../../shared/custom/search-filter.pipe';
import { CrearEditarProductoComponent } from './crear-editar-producto/crear-editar-producto.component';
import { CustomModule } from '../../shared/custom/custom.module';

@NgModule({
  declarations: [
    ProductosComponent,
    SearchFilterPipe,
    CrearEditarProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CustomModule
  ]
})
export class ProductosModule { }
