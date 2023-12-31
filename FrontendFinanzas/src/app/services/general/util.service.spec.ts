import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  describe('formatearFecha', () => {
    it('debería formatear la fecha correctamente', () => {
      // Arrange
      const dateString = '25/12/2023';

      // Act
      const formattedDate = service.formatearFecha(dateString);

      const expectedDate = new Date('2023-12-25T00:00:00.000Z').toISOString().substring(0, 10);

      // Assert
      expect(formattedDate).toBe(expectedDate);
    });

    it('debería manejar cadena de fecha inválida', () => {
      // Arrange
      const dateString = 'fecha-invalida';

      // Act
      const formattedDate = service.formatearFecha(dateString);

      // Assert
      expect(formattedDate).toBe('');
    });
  });

  describe('desformatearFecha', () => {
    it('debería desformatear la fecha correctamente', () => {
      // Arrange
      const formattedDate = '2023-12-25';

      // Act
      const unformattedDate = service.desformatearFecha(formattedDate);

      // Assert
      expect(unformattedDate).toBe('25/12/2023');
    });

    it('debería manejar fecha con formato inválido', () => {
      // Arrange
      const formattedDate = 'fecha-con-formato-invalido';

      // Act
      const unformattedDate = service.desformatearFecha(formattedDate);

      // Assert
      expect(unformattedDate).toBe('/con/fecha');
    });
  });
});
