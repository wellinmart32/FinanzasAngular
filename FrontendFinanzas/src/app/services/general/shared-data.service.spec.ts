import { TestBed } from '@angular/core/testing';
import { SharedDataService } from './shared-data.service';

describe('SharedDataService', () => {
  let service: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataService);
  });

  it('should be created', () => {
    // Verifica que el servicio SharedDataService se haya creado correctamente.
    expect(service).toBeTruthy();
  });

  it('should have initial producto value as null', () => {
    // Verifica que el valor inicial del producto en SharedDataService sea null.
    service.productoActual.subscribe((producto) => {
      expect(producto).toBeNull();
    });
  });

  it('should update producto value when actualizarProducto is called', () => {
    // Verifica que el valor del producto se actualice correctamente cuando se llama a actualizarProducto.
    const nuevoProducto = { id: 1, nombre: 'Nuevo Producto' };

    service.actualizarProducto(nuevoProducto);

    service.productoActual.subscribe((producto) => {
      expect(producto).toEqual(nuevoProducto);
    });
  });
});
