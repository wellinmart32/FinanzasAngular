import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductosComponent } from './productos.component';
import { ApiService } from '../../services/api/api.service';
import { SharedDataService } from '../../services/general/shared-data.service';
import { MensajesService } from '../../services/general/mensajes.service';
import { firstValueFrom, of, share, throwError } from 'rxjs';

import { SearchFilterPipe } from '../../shared/custom/search-filter.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from '../../shared/custom/spinner.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrearEditarProductoComponent } from '../../pages/productos/crear-editar-producto/crear-editar-producto.component'


describe('Componente: Productos', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let sharedDataService: jasmine.SpyObj<SharedDataService>;
  let mensajesService: jasmine.SpyObj<MensajesService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['obtenerDatos', 'eliminarRegistro']);
    apiService.obtenerDatos.and.returnValue(of()); // O cualquier observable que desees usar
    sharedDataService = jasmine.createSpyObj('SharedDataService', ['actualizarProducto']);
    mensajesService = jasmine.createSpyObj('MensajesService', ['mostrarMensajeExitoso', 'mostrarMensajeError', 'mostrarMensajeConfirmacion']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'pages/productos/crear-editar', component: CrearEditarProductoComponent }
      ]), FontAwesomeModule, FormsModule],
      declarations: [ProductosComponent, SearchFilterPipe, SpinnerComponent],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: SharedDataService, useValue: sharedDataService },
        { provide: MensajesService, useValue: mensajesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;

    spyOn(component.router, 'navigateByUrl').and.callThrough();
    spyOn(component, 'getProductos');
  });

  afterEach(() => {
    apiService.obtenerDatos.calls.reset();
    apiService.eliminarRegistro.calls.reset();
    sharedDataService.actualizarProducto.calls.reset();
    mensajesService.mostrarMensajeExitoso.calls.reset();
    mensajesService.mostrarMensajeError.calls.reset();
    mensajesService.mostrarMensajeConfirmacion.calls.reset();
  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar productosList en ngOnInit', fakeAsync(() => {
    // Arrange
    const mockProductos = [{ id: 1, name: 'Producto 1' }, { id: 2, name: 'Producto 2' }];
    apiService.obtenerDatos.and.returnValue(of(mockProductos));

    // Act
    fixture.detectChanges();
    component.ngOnInit();
    tick();

    // Assert
    // expect(apiService.obtenerDatos).toHaveBeenCalledWith('bp/products');
    expect(component.getProductos).toHaveBeenCalled();
    // expect(component.productosList).toEqual(mockProductos);
  }));

  it('debería navegar a /pages/productos/crear-editar en agregarProducto', () => {
    // Arrange

    // Act
    component.agregarProducto();

    // Assert
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/pages/productos/crear-editar');
  });

  it('debería actualizar producto en sharedData y navegar a /pages/productos/crear-editar en editarProducto', () => {
    // Arrange
    const mockProducto = { id: 1, name: 'Producto 1' };

    // Act
    component.editarProducto(mockProducto);

    // Assert
    expect(sharedDataService.actualizarProducto).toHaveBeenCalledWith(mockProducto);
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/pages/productos/crear-editar');
  });

  it('debería mostrar diálogo de confirmación y eliminar producto en eliminarProducto', fakeAsync(() => {
    // Arrange
    const mockProducto = { id: 1, name: 'Producto 1' };
    mensajesService.mostrarMensajeConfirmacion.and.returnValue(firstValueFrom(of(true)));

    apiService.eliminarRegistro.and.returnValue(throwError({ status: 200 }));

    // Act
    component.eliminarProducto(mockProducto);
    tick();

    // Assert
    expect(mensajesService.mostrarMensajeConfirmacion).toHaveBeenCalledWith('¿Estas seguro de eliminar el producto Producto 1?');
    expect(apiService.eliminarRegistro).toHaveBeenCalledWith('bp/products', jasmine.any(Object));
    expect(mensajesService.mostrarMensajeExitoso).toHaveBeenCalledWith('Producto eliminado satisfactoriamente.');
    expect(component.getProductos).toHaveBeenCalled();
  }));

  it('debería manejar error al eliminar producto', fakeAsync(() => {
    // Arrange
    const mockProducto = { id: 1, name: 'Producto 1' };
    mensajesService.mostrarMensajeConfirmacion.and.returnValue(firstValueFrom(of(true)));
    apiService.eliminarRegistro.and.throwError('Error');

    // Act
    component.eliminarProducto(mockProducto);
    tick();

    // Assert
    expect(mensajesService.mostrarMensajeError).toHaveBeenCalledWith('Error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
  }));
});
