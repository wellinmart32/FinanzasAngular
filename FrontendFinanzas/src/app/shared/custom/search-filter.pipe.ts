import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      // Realiza aquí la lógica específica de filtrado
      // En este ejemplo, se filtra si el nombre del producto contiene el término de búsqueda
      return item.name.toLowerCase().includes(searchTerm);
    });
  }

}
