import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http'; //servicio de angular para hacer requests
import {catchError, retry, retryWhen,map} from 'rxjs/operators'

import{Producto,ProductDTO, UpdateProductDTO} from '../models/producto.model';

import {environment} from './../../environments/environment'
import { throwError,zip } from 'rxjs';

import { checkTime } from '../interceptors/time.interceptor';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl= 'https://young-sands-07814.herokuapp.com/api/products';
  //private apiUrl= 'https://young-sands-07814.herokuaaaaapp.com/api/products';

  //private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http:HttpClient) { }

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params= params.set('offset',limit);
    }
    return this.http.get<Producto[]>(this.apiUrl,{params,context:checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item=>{
        return{
          ...item,
          taxes: .19 * item.price
        }
      })) //map para transformar los objetos que nos mandan
    );
  }
  getProduct(id:string){
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(  (error:HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('el producto no existe ');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas autorizado ');
        }

        return throwError('Ups algo salio mal');
      })
    );
  }

  getSingleProduct(){
    return this.http.get<Producto>('https://fakestoreapi.com/products/1');
  }

  // Crear producto
  create(data: ProductDTO){
    return this.http.post<Producto>(this.apiUrl , data);

  }
  update(dto: UpdateProductDTO, id:string){
    return this.http.put<Producto>(`${this.apiUrl}/${id}`,dto);
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit:number, offset:number){
    return this.http.get<Producto[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }

  fetchReadAndUpdate(id:string, dto:UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update({title:'nuevo'},id)
    );

  }
}
