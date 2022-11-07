import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import{Producto} from '../models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  private myShoppingCart: Producto[]=[];
  private myCart = new BehaviorSubject<Producto[]>([]);

  myCart$ = this.myCart.asObservable();
  addShoppingCart(product: Producto){
    console.log(product);
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }
  getTotal(){
    return this.myShoppingCart.reduce((sum,item)=>sum+item.price,0);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }
}
