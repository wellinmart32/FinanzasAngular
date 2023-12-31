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
    return this.mostrarMensaje('warning', 'Confirmación', mensaje, 'Cancelar', 'Confirmar');
  }

  // private mostrarMensaje(
  //   icon: SweetAlertIcon,
  //   titulo: string,
  //   mensaje: string,
  //   cancelButtonText?: string,
  //   confirmButtonText?: string
  // ): Promise<boolean> {
  //   return Swal.fire({
  //     icon,
  //     title: titulo,
  //     text: mensaje,
  //     showCancelButton: cancelButtonText ? true : false,
  //     cancelButtonText: cancelButtonText || '',
  //     confirmButtonText: confirmButtonText || 'Aceptar'
  //   }).then((result) => {
  //     return result.isConfirmed;
  //   });
  // }

  private async mostrarMensaje(
    icon: SweetAlertIcon,
    titulo: string,
    mensaje: string,
    cancelButtonText?: string,
    confirmButtonText?: string
  ): Promise<boolean> {
    const result = await Swal.fire({
      icon,
      title: titulo,
      text: mensaje,
      showCancelButton: cancelButtonText ? true : false,
      cancelButtonText: cancelButtonText || '',
      confirmButtonText: confirmButtonText || 'Aceptar'
    });

    return result.isConfirmed;
  }


}
