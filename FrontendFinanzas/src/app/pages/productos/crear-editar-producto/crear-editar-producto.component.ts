import { Component } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {

    this.formulario = this.fb.group({
      id: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        // this.idValidator
      ]],
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

  idValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Aquí puedes implementar tu propia lógica de validación para el ID
      const valid = false;

      return valid ? null : { 'invalidId': { value: control.value } };
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
    console.log(evento.target.value);
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

  reiniciarFormulario() {
    this.formulario.reset();
  }

  enviarFormulario() {
    // Lógica para enviar el formulario
  }
}
