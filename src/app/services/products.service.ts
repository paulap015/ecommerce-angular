import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'; //servicio de angular para hacer requests
import{Producto,ProductDTO, UpdateProductDTO} from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl= 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(private http:HttpClient) { }

  getAllProducts(limit?:number, offset?:number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params= params.set('offset',limit);
    }
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

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit:number, offset:number){
    return this.http.get<Producto[]>(this.apiUrl, {
      params:{limit,offset}
    });
  }
}
