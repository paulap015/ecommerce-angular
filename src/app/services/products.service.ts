import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //servicio de angular para hacer requests
import{Producto} from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl= 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getSingleProduct(){
    return this.http.get<Producto>('https://fakestoreapi.com/products/1');
  }

  getProduct(id:string){
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
}
