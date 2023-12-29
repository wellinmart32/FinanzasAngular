import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
//ronnyts
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/general/shared-data.service';
import { MensajesService } from '../../services/general/mensajes.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  @ViewChild('dropdownCheckbox') dropdownCheckbox!: ElementRef<HTMLInputElement>;

  productosList: any[] = [];
  errorMessage: string = '';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  searchTerm: string = '';

  mostrarDropdown: boolean = false;
  mostrarSpinner: boolean = false;

  itemsPerPageList = [
    {
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

  constructor(private apiService: ApiService,
    private router: Router,
    private sharedData: SharedDataService,
    private mensajesService: MensajesService) { }

  ngOnInit(): void {
    this.getProductos();
  }
  //ronnyts
  agregarProducto() {
    this.router.navigateByUrl('/pages/productos/crear-editar');
  }

  getProductos() {
    let endpoint = "bp/products";
    this.productosList = [];
    this.mostrarSpinner = true;
    this.apiService.obtenerDatos(endpoint).subscribe(
      (data: any) => {
        console.log(data);
        this.mostrarSpinner = false;
        this.productosList = data;
      },
      error => {
        this.mostrarSpinner = false;
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

  editarProducto(producto: any) {
    console.log(producto);
    this.sharedData.actualizarProducto(producto);
    this.router.navigateByUrl('/pages/productos/crear-editar');
  }

  async eliminarProducto(producto: any) {
    const id = producto.id;
    const conf = await this.mensajesService.mostrarMensajeConfirmacion("Estas seguro de eliminar el producto " + producto.name + " ?")
    if (conf) {
      this.mostrarSpinner = true;
      // Acciones a realizar si el usuario confirmó
      let parametros = new HttpParams().set('id', id);
      let endpoint = "bp/products";

      this.apiService.eliminarRegistro(endpoint, parametros).subscribe(
        (data: any) => {
          this.mostrarSpinner = false;
          this.mensajesService.mostrarMensajeExitoso("Producto eliminado satisfactoriamente.");
          this.getProductos();
        },
        error => {
          this.mostrarSpinner = false;
          if (error.status === 200) {
            this.mensajesService.mostrarMensajeExitoso("Producto eliminado satisfactoriamente.");
            this.getProductos();
          } else {
            this.mensajesService.mostrarMensajeError("Error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.");
            this.errorMessage = 'Error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.';
          }
        }
      )
    }
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
