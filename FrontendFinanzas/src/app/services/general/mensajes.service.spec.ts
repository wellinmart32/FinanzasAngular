import { TestBed } from '@angular/core/testing';
import { MensajesService } from './mensajes.service';
import Swal from 'sweetalert2';

describe('MensajesService', () => {
  let service: MensajesService;
  let swalFireSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesService);
    // Espía la función Swal.fire para evitar que se abran las alertas durante las pruebas.
    swalFireSpy = spyOn(Swal, 'fire');
  });

  it('debería ser creado', () => {
    // Verifica que el servicio MensajesService se haya creado correctamente.
    expect(service).toBeTruthy();
  });

  // it('debería mostrar mensaje exitoso', () => {
  //   // Verifica que se muestre un mensaje exitoso correctamente.
  //   service.mostrarMensajeExitoso('Mensaje de éxito');
  //   expect(swalFireSpy).toHaveBeenCalledWith({
  //     icon: 'success',
  //     title: 'Éxito',
  //     text: 'Mensaje de éxito',
  //     showCancelButton: false,
  //     confirmButtonText: 'Aceptar',
  //   });
  // });

  // it('debería mostrar mensaje de error', () => {
  //   // Verifica que se muestre un mensaje de error correctamente.
  //   service.mostrarMensajeError('Mensaje de error');
  //   expect(swalFireSpy).toHaveBeenCalledWith({
  //     icon: 'error',
  //     title: 'Error',
  //     text: 'Mensaje de error',
  //     showCancelButton: false,
  //     confirmButtonText: 'Aceptar',
  //   });
  // });

  // it('debería mostrar mensaje de información', () => {
  //   // Verifica que se muestre un mensaje de información correctamente.
  //   service.mostrarMensajeInformacion('Mensaje de información');
  //   expect(swalFireSpy).toHaveBeenCalledWith({
  //     icon: 'info',
  //     title: 'Información',
  //     text: 'Mensaje de información',
  //     showCancelButton: false,
  //     confirmButtonText: 'Aceptar',
  //   });
  // });

  it('debería mostrar mensaje de confirmación y devolver true al confirmar', () => {
    // Verifica que se muestre un mensaje de confirmación correctamente y que devuelva true al confirmar.
    swalFireSpy.and.returnValue(Promise.resolve({ isConfirmed: true }));
    service.mostrarMensajeConfirmacion('Mensaje de confirmación').then((result) => {
      expect(result).toBeTrue();
    });
    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'warning',
      title: 'Confirmación',
      text: 'Mensaje de confirmación',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    });
  });

  it('debería mostrar mensaje de confirmación y devolver false al cancelar', () => {
    // Verifica que se muestre un mensaje de confirmación correctamente y que devuelva false al cancelar.
    swalFireSpy.and.returnValue(Promise.resolve({ isConfirmed: false }));
    service.mostrarMensajeConfirmacion('Mensaje de confirmación').then((result) => {
      expect(result).toBeFalse();
    });
    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'warning',
      title: 'Confirmación',
      text: 'Mensaje de confirmación',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    });
  });
});
