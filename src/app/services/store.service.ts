import { Injectable } from '@angular/core';
import{Producto} from '../models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  private myShoppingCart: Producto[]=[];


  addShoppingCart(product: Producto){
    console.log(product);
    this.myShoppingCart.push(product);

  }
  getTotal(){
    return this.myShoppingCart.reduce((sum,item)=>sum+item.price,0);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }
}
