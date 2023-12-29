import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  obtenerDatos(endpoint: string, params?: HttpParams): Observable<any> {
    let headers = this.headers;
    return params ? this.http.get<any>(`${this.baseUrl}/${endpoint}`, { params, headers }) : this.http.get<any>(`${this.baseUrl}/${endpoint}`, { headers });
  }

  crearRegistro(endpoint: string, body: any, params?: HttpParams): Observable<any> {
    let headers = this.headers;
    return params ? this.http.post<any>(`${this.baseUrl}/${endpoint}`, body, { params, headers }) : this.http.post<any>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  editarRegistro(endpoint: string, body: any, params?: HttpParams): Observable<any> {
    let headers = this.headers;
    return params ? this.http.put<any>(`${this.baseUrl}/${endpoint}`, body, { params, headers }) : this.http.put<any>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  eliminarRegistro(endpoint: string, params?: HttpParams): Observable<any> {
    let headers = this.headers;
    return params ? this.http.delete<any>(`${this.baseUrl}/${endpoint}`, { params, headers }) : this.http.delete<any>(`${this.baseUrl}/${endpoint}`, { headers });
  }

}
