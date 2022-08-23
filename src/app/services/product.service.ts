import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "http://127.0.0.1:8000/api";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiURL + '/products')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURL + '/products', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiURL + '/products/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiURL + '/products/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: number){
    return this.httpClient.delete<Product>(this.apiURL + '/products/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
