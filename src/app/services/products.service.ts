import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //servicio de angular para hacer requests
import{Producto,ProductDTO, UpdateProductDTO} from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl= 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get<Producto[]>(this.apiUrl);
  }
  getProduct(id:string){
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
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
}
