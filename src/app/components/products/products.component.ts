import { Component, OnInit } from '@angular/core';
import{Producto} from '../../models/producto.model';

import {StoreService} from '../../services/store.service'
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Producto[]=[];
  products : Producto[] = [];
  producto:Producto={
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: ''
  };
  today:Date=new Date();
  date:Date=new Date(2021,5,10);
  // para usar el servicio dentro del componente
  //hacemos inyeccion de dependenicas
  constructor(private storeService:StoreService, private productService:ProductsService) {
    this.myShoppingCart= this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .subscribe(data=> {
      this.products=data;
    });
  }
  total:number=0;
  onAddShoppingCart(product: Producto){
    console.log(product);
    this.storeService.addShoppingCart(product);
    this.total=this.storeService.getTotal();
    // this.myShoppingCart.push(product);
    // this.total=this.myShoppingCart.reduce((sum,item)=>sum+item.price,0);
  }
  onShowProduct(product: Producto){
    console.log('mostrando producto')
    this.productService.getSingleProduct().subscribe(data=>{
      this.producto=data;
    });
  }


}
