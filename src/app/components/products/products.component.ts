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
  total:number=0;
  showProductDetail:boolean= false;
  productChosen!: Producto; // el producto seleccionado para ver detalles

  // para usar el servicio dentro del componente
  //hacemos inyeccion de dependenicas
  constructor(private storeService:StoreService, private productService:ProductsService) {
    this.myShoppingCart= this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // se debe correr el subscribe
    this.productService.getAllProducts()
    .subscribe(data=> {
      this.products=data;
    });
  }

  onAddShoppingCart(product: Producto){
    console.log(product);
    this.storeService.addShoppingCart(product);
    this.total=this.storeService.getTotal();

  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id:string){
    console.log('id',id);
    this.productService.getProduct(id)
    .subscribe(data=> {
      this.toggleProductDetail();
      this.productChosen=data;
    })
  }


}
