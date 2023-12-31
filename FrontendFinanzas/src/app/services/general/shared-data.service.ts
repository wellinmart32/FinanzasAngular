import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
// export class SharedDataService {
//   private productoSource: BehaviorSubject<any> = new BehaviorSubject<any>({});
//   productoActual: Observable<any> = this.productoSource.asObservable();

//   actualizarProducto(producto: any): void {
//     this.productoSource.next(producto);
//   }
// }
