import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería realizar una solicitud GET exitosa', () => {
    const endpoint = 'ejemplo';
    const mockResponse = { data: 'Ejemplo de respuesta' };

    service.obtenerDatos(endpoint).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería manejar un error en la solicitud GET', () => {
    const endpoint = 'errorEndpoint';

    service.obtenerDatos(endpoint).subscribe(
      () => { },
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${endpoint}`);
    req.error(new ErrorEvent('Network error'));
  });

  it('debería realizar una solicitud POST exitosa', () => {
    const endpoint = 'ejemplo';
    const mockBody = { data: 'Ejemplo de cuerpo' };
    const mockResponse = { data: 'Ejemplo de respuesta' };

    service.crearRegistro(endpoint, mockBody).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${endpoint}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBody);
    req.flush(mockResponse);
  });

  it('debería realizar una solicitud PUT exitosa', () => {
    const endpoint = 'ejemplo';
    const mockBody = { data: 'Ejemplo de cuerpo' };
    const mockResponse = { data: 'Ejemplo de respuesta' };

    service.editarRegistro(endpoint, mockBody).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${endpoint}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockBody);
    req.flush(mockResponse);
  });

  it('debería realizar una solicitud DELETE exitosa', () => {
    const endpoint = 'ejemplo';
    const mockResponse = { data: 'Ejemplo de respuesta' };

    service.eliminarRegistro(endpoint).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${endpoint}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
