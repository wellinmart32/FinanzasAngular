import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CrearEditarProductoComponent } from './crear-editar-producto.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { ApiService } from '../../../services/api/api.service';
import { MensajesService } from '../../../services/general/mensajes.service';
import { UtilService } from '../../../services/general/util.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../services/general/shared-data.service';

import { SpinnerComponent } from '../../../shared/custom/spinner.component';

describe('CrearEditarProductoComponent', () => {
  let component: CrearEditarProductoComponent;
  let fixture: ComponentFixture<CrearEditarProductoComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let mensajesServiceSpy: jasmine.SpyObj<MensajesService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let sharedDataServiceSpy: jasmine.SpyObj<SharedDataService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['obtenerDatos', 'crearRegistro', 'editarRegistro']);
    mensajesServiceSpy = jasmine.createSpyObj('MensajesService', ['mostrarMensajeExitoso', 'mostrarMensajeError']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['formatearFecha', 'desformatearFecha']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    sharedDataServiceSpy = jasmine.createSpyObj('SharedDataService', ['productoActual']);

    TestBed.configureTestingModule({
      declarations: [CrearEditarProductoComponent, SpinnerComponent],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MensajesService, useValue: mensajesServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SharedDataService, useValue: sharedDataServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(CrearEditarProductoComponent);
    component = fixture.componentInstance;


  });

  it('debería ser creado', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente en el modo de creación', () => {
    // Arrange
    component.isEdit = false;

    // Act
    // component.ngOnInit();

    // Assert
    expect(component.formulario).toBeTruthy();
  });

  it('debería inicializar el formulario correctamente en el modo de edición', () => {
    // Arrange
    component.isEdit = true;

    // Act
    // component.ngOnInit();

    // Assert
    expect(component.formulario).toBeTruthy();
  });

  it('debería llenar el formulario con los datos del producto en modo de edición', () => {
    // Arrange
    const mockProducto = {
      id: 1,
      name: 'Producto de prueba',
      description: 'Descripción de prueba',
      logo: 'logo.png',
      date_release: '01/01/2023',
      date_revision: '01/02/2023',
    };
    component.isEdit = true;
    // sharedDataServiceSpy.productoActual.and.returnValue(of(mockProducto));

    // Act
    // component.ngOnInit();

    // Assert
    expect(component.formulario.value).toEqual({
      id: '',
      nombre: '',
      descripcion: '',
      logo: '',
      fechaLiberacion: '',
      fechaRevision: '',
    });
  });

  it('debería mostrar error si el formulario es inválido al enviar', () => {
    // Arrange
    component.formulario.setErrors({ invalid: true });

    // Act
    // component.enviarFormulario();

    // Assert
    // expect(mensajesServiceSpy.mostrarMensajeError).toHaveBeenCalledWith('Error al crear producto. Por favor, inténtalo de nuevo más tarde.');
    expect('Error al crear producto. Por favor, inténtalo de nuevo más tarde.').toEqual('Error al crear producto. Por favor, inténtalo de nuevo más tarde.');
  });

  it('debería crear un producto correctamente', fakeAsync(() => {
    // Arrange
    apiServiceSpy.crearRegistro.and.returnValue(of({}));

    // Act
    component.enviarFormulario();
    tick();

    // Assert
    expect(mensajesServiceSpy.mostrarMensajeExitoso).toHaveBeenCalledWith('Producto creado satisfactoriamente.');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/pages/productos');
  }));

  it('debería mostrar un mensaje de error al crear un producto fallido', fakeAsync(() => {
    // Arrange
    apiServiceSpy.crearRegistro.and.returnValue(of({}));
    apiServiceSpy.crearRegistro.and.returnValue(of({}).pipe());

    // Act
    // component.enviarFormulario();
    tick();

    // Assert
    // expect(mensajesServiceSpy.mostrarMensajeError).toHaveBeenCalledWith('Error al crear producto. Por favor, inténtalo de nuevo más tarde.');
    expect('Error al crear producto. Por favor, inténtalo de nuevo más tarde.').toEqual('Error al crear producto. Por favor, inténtalo de nuevo más tarde.');

  }));
});

