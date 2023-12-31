import { TestBed } from '@angular/core/testing';
import { SharedDataService } from './shared-data.service';

describe('SharedDataService', () => {
  let servicio: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(SharedDataService);
  });

  it('debería ser creado', () => {
    expect(servicio).toBeTruthy();
  });

  it('debería tener un valor inicial para producto', () => {
    servicio.productoActual.subscribe((producto) => {
      expect(producto).toEqual(new Object({}));
    });
  });

  it('debería actualizar el valor de producto cuando se llama a actualizarProducto', () => {
    const nuevoProducto = { id: 1, nombre: 'Nuevo Producto' };

    servicio.actualizarProducto(nuevoProducto);

    servicio.productoActual.subscribe((producto) => {
      expect(producto).toEqual(nuevoProducto);
    });
  });
});
