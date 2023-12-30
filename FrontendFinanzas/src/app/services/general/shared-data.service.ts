import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private productoSource = new BehaviorSubject<any>(null);
  productoActual = this.productoSource.asObservable();

  actualizarProducto(producto: any) {
    this.productoSource.next(producto);
  }
}
