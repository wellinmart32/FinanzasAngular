import { Component, Input } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { HttpParams } from '@angular/common/http';
import { MensajesService } from '../../../services/general/mensajes.service';
import { UtilService } from '../../../services/general/util.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../services/general/shared-data.service';

const today = new Date();
today.setUTCHours(0, 0, 0, 0);
const dd = String(today.getUTCDate()).padStart(2, '0');
const mm = String(today.getUTCMonth() + 1).padStart(2, '0'); // El mes es devuelto de 0 a 11, entonces se suma 1
const yyyy = today.getUTCFullYear();

const todayDatePattern = new RegExp(`^${dd}/${mm}/${yyyy}$`);
const datePattern = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

@Component({
  selector: 'app-crear-editar-producto',
  templateUrl: './crear-editar-producto.component.html',
  styleUrl: './crear-editar-producto.component.scss'
})


export class CrearEditarProductoComponent {
  @Input() isEdit: boolean = false;

  formulario: FormGroup;

  errorMessage: string = '';
  mostrarSpinner: boolean = false;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private mensajesService: MensajesService,
    private util: UtilService,
    private router: Router,
    private sharedData: SharedDataService) {

    this.formulario = this.fb.group({
      id: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
        [this.idAsyncValidator()]
      ],
      nombre: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ]],
      logo: ['', [Validators.required]],
      fechaLiberacion: ['', [
        Validators.required,
        Validators.pattern(datePattern), // Fecha debe ser hoy o despues
        this.fechaLiberacionValidator,
      ]],
      fechaRevision: ['', [
        Validators.required
      ]],
    });
  }

  ngOnInit() {
    this.mostrarSpinner = true;
    this.sharedData.productoActual.subscribe(producto => {
      // Lógica cuando el producto cambia
      if (producto) {
        this.isEdit = true;
        this.mostrarSpinner = false;
        this.llenarFormulario(producto);
      }
    });
    if (!this.isEdit) this.mostrarSpinner = false;
  }

  llenarFormulario(producto: any) {
    let editForm = {
      id: producto.id,
      nombre: producto.name,
      descripcion: producto.description,
      logo: producto.logo,
      fechaLiberacion: this.util.desformatearFecha(producto.date_release),
      fechaRevision: this.util.desformatearFecha(producto.date_revision),
    }
    this.formulario.patchValue(editForm);
  }

  errorOnValidator(controlName: string) {
    let control: any = this.formulario.get(controlName);
    return (
      control.invalid &&
      control.touched
    );
  }

  controlHasError(controlName: string, errorType: string): boolean {
    const control = this.formulario.get(controlName);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }

  idAsyncValidator(): ValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      let id = control.value;
      if (!id || id.length < 3 || id.length > 10) {
        return Promise.resolve(null);
      }

      let parametros = new HttpParams().set('id', control.value);

      let endpoint = "bp/products/verification";

      return this.apiService.obtenerDatos(endpoint, parametros).toPromise()
        .then(data => {
          if (this.isEdit) {
            return null;
          } else if (data === true) {
            return { 'invalidId': true };
          } else {
            return null;
          }
        })
        .catch(() => null); // Manejar errores de la petición, retornar null en caso de error
    };
  }


  // Función personalizada de validación
  fechaLiberacionValidator(control: FormControl) {
    const inputDate = control.value;

    // Validar el formato con la expresión regular
    if (!datePattern.test(inputDate)) {
      return { invalidFormat: true };
    }

    // Obtener las partes del inputDate
    const [inputDay, inputMonth, inputYear] = inputDate.split('/');
    const parsedInputDate = new Date(inputYear + '-' + inputMonth + '-' + inputDay);

    // Comparar las fechas
    if (
      parsedInputDate.toString() === 'Invalid Date' ||
      parsedInputDate.getTime() < today.getTime()
    ) {
      return { dateIsPast: true };
    }

    return null; // La fecha es válida
  }

  llenarFechaRevision(evento: any) {
    let fechaLiberacion = evento.target.value;
    if (fechaLiberacion.length != 10) {
      return;
    } else {
      let anioString = fechaLiberacion.substring(6, 10);
      let anio = parseInt(anioString, 10) + 1;
      // Crear la nueva cadena de fecha con el año sumado
      let fechaRevision = `${fechaLiberacion.substring(0, 6)}${anio}${fechaLiberacion.substring(10)}`;
      this.formulario.get('fechaRevision')?.setValue(fechaRevision);

    }
  }

  volverFormulario() {
    this.router.navigateByUrl('/pages/productos');
  }

  reiniciarFormulario() {
    this.formulario.reset();
  }

  enviarFormulario() {
    if (this.isEdit) {
      this.editarProducto();
    } else {
      this.crearProducto();
    }
  }

  crearProducto() {
    this.mostrarSpinner = true;
    let endpoint = "bp/products";
    let body = {
      id: this.formulario.get("id")?.value,
      name: this.formulario.get("nombre")?.value,
      description: this.formulario.get("descripcion")?.value,
      logo: this.formulario.get("logo")?.value,
      date_release: this.util.formatearFecha(this.formulario.get("fechaLiberacion")?.value),
      date_revision: this.util.formatearFecha(this.formulario.get("fechaRevision")?.value),
    }
    this.apiService.crearRegistro(endpoint, body).subscribe(
      (data: any) => {
        this.mostrarSpinner = false;
        this.mensajesService.mostrarMensajeExitoso("Producto creado satisfactoriamente.");
        this.router.navigateByUrl('/pages/productos');
      },
      error => {
        this.mostrarSpinner = false;
        this.mensajesService.mostrarMensajeError('Error al crear producto. Por favor, inténtalo de nuevo más tarde.');
        this.errorMessage = 'Error al crear producto. Por favor, inténtalo de nuevo más tarde.';
        console.error(this.errorMessage, error);
      }
    );
  }

  editarProducto() {
    this.mostrarSpinner = true;
    let endpoint = "bp/products";
    let body = {
      id: this.formulario.get("id")?.value,
      name: this.formulario.get("nombre")?.value,
      description: this.formulario.get("descripcion")?.value,
      logo: this.formulario.get("logo")?.value,
      date_release: this.util.formatearFecha(this.formulario.get("fechaLiberacion")?.value),
      date_revision: this.util.formatearFecha(this.formulario.get("fechaRevision")?.value),
    }
    this.apiService.editarRegistro(endpoint, body).subscribe(
      (data: any) => {
        this.mostrarSpinner = false;
        this.mensajesService.mostrarMensajeExitoso("Producto actualizado satisfactoriamente.");
        this.router.navigateByUrl('/pages/productos');
      },
      error => {
        this.mostrarSpinner = false;
        this.mensajesService.mostrarMensajeError('Error al actualizar producto. Por favor, inténtalo de nuevo más tarde.');
        this.errorMessage = 'Error al actualizar producto. Por favor, inténtalo de nuevo más tarde.';
        console.error(this.errorMessage, error);
      }
    );
  }

}
