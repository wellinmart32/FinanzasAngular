import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  formatearFecha(dateString: string): string {
    const [day, month, year] = dateString.split('/');

    // Crear un objeto Date usando los componentes de la cadena
    const formattedDate = new Date(`${year}-${month}-${day}`);

    // Verificar si el objeto Date es válido
    if (isNaN(formattedDate.getTime())) {
      console.error('Fecha no válida:', dateString);
      return '';  // O puedes devolver un valor predeterminado o lanzar un error, según tus necesidades.
    }

    // Formatear la fecha en el formato deseado
    const formattedYear = formattedDate.getFullYear();
    const formattedMonth = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = formattedDate.getDate().toString().padStart(2, '0');

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  }

  desformatearFecha(fechaString: string): string {
    // Extraer los primeros 10 caracteres
    const substringFecha = fechaString.substring(0, 10);

    // Dividir la fecha en partes (año, mes, día)
    const partesFecha = substringFecha.split("-");

    // Construir la nueva cadena con el formato "dd/mm/yyyy"
    const nuevaFecha = `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;

    return nuevaFecha;
  }

}
