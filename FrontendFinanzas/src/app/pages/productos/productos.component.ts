import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  @ViewChild('dropdownCheckbox') dropdownCheckbox!: ElementRef<HTMLInputElement>;

  productosList: any[] = [];
  errorMessage: string = '';
  itemsPerPage: number = 1;
  currentPage: number = 1;
  searchTerm: string = '';

  mostrarDropdown = false;

  itemsPerPageList = [
    {
      value: 1,
      label: '1'
    }, {
      value: 5,
      label: '5'
    }, {
      value: 10,
      label: '10'
    }, {
      value: 20,
      label: '20'
    },
  ]

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  // Agrega la propiedad noResults
  noResults: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    let endpoint = "/bp/products";
    this.apiService.obtenerDatos(endpoint).subscribe(
      (data: any) => {
        console.log(data);
        this.productosList = data;
      },
      error => {
        this.errorMessage = 'Error al obtener productos financieros. Por favor, inténtalo de nuevo más tarde.';
        console.error(this.errorMessage, error);
      }
    );
  }

  get paginatedProductos(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productosList.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.productosList.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  editarProducto(producto: any){

  }

  eliminarProducto(producto: any){

  }

  toggleDropdown(event: any) {
    event.stopPropagation();
    this.mostrarDropdown = !this.mostrarDropdown;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    // Ocultar el Drop Down si se hace clic fuera de él
    if (!event.target['closest']('.dropdown')) {
      this.mostrarDropdown = false;
      // Cambiar el valor de la casilla de verificación a false
      
      this.dropdownCheckbox.nativeElement.checked = false;
      
    }
  }
}
