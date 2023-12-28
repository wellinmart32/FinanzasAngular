import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
  headers = new HttpHeaders().set(
    'authorId', '12345'
  )

  constructor(private http: HttpClient) { }

  obtenerDatos(endpoint: string): Observable<any> {
    let headers = this.headers;
    return this.http.get(this.baseUrl + endpoint, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los registros', error);
        return throwError(error);
      })
    );
  }

}
