import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  mostrarMensajeExitoso(mensaje: string): void {
    this.mostrarMensaje('success', 'Éxito', mensaje);
  }

  mostrarMensajeError(mensaje: string): void {
    this.mostrarMensaje('error', 'Error', mensaje);
  }

  mostrarMensajeInformacion(mensaje: string): void {
    this.mostrarMensaje('info', 'Información', mensaje);
  }

  mostrarMensajeConfirmacion(mensaje: string): Promise<boolean> {
    return this.mostrarMensaje('warning', 'Confirmación', mensaje, 'Si', 'No');
  }

  private mostrarMensaje(
    icon: SweetAlertIcon,
    titulo: string,
    mensaje: string,
    confirmButtonText?: string,
    cancelButtonText?: string
  ): Promise<boolean> {
    return Swal.fire({
      icon,
      title: titulo,
      text: mensaje,
      confirmButtonText: confirmButtonText || 'Aceptar',
      showCancelButton: cancelButtonText ? true : false,
      cancelButtonText: cancelButtonText || '',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

}
