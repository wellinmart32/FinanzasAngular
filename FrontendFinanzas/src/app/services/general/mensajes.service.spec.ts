import { TestBed } from '@angular/core/testing';
import { MensajesService } from './mensajes.service';
import Swal from 'sweetalert2';

describe('MensajesService', () => {
  let service: MensajesService;
  let swalFireSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesService);
    swalFireSpy = spyOn(Swal, 'fire');
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería mostrar mensaje exitoso', async () => {
    service.mostrarMensajeExitoso('Mensaje de éxito');
    await Promise.resolve();
    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Éxito',
      text: 'Mensaje de éxito',
      showCancelButton: false,
      cancelButtonText: '',
      confirmButtonText: 'Aceptar',
    });
  });

  it('debería mostrar mensaje de error', async () => {
    service.mostrarMensajeError('Mensaje de error');
    await Promise.resolve();
    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Error',
      text: 'Mensaje de error',
      showCancelButton: false,
      cancelButtonText: '',
      confirmButtonText: 'Aceptar',
    });
  });

  it('debería mostrar mensaje de información', async () => {
    service.mostrarMensajeInformacion('Mensaje de información');
    await Promise.resolve();
    expect(swalFireSpy).toHaveBeenCalledWith({
      icon: 'info',
      title: 'Información',
      text: 'Mensaje de información',
      showCancelButton: false,
      cancelButtonText: '',
      confirmButtonText: 'Aceptar',
    });
  });

  it('debería mostrar mensaje de confirmación y devolver true al confirmar', () => {
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
