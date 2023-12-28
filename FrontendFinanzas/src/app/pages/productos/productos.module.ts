import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchFilterPipe } from '../../shared/custom/search-filter.pipe';

@NgModule({
  declarations: [
    ProductosComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ]
})
export class ProductosModule { }
