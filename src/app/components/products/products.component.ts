import { Component, OnInit } from '@angular/core';
import{Producto} from '../../models/producto.model';

import {StoreService} from '../../services/store.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Producto[]=[];

  // para usar el servicio dentro del componente
  //hacemos inyeccion de dependenicas
  constructor(private storeService:StoreService) {
    this.myShoppingCart= this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  }
  total:number=0;
  onAddShoppingCart(product: Producto){
    console.log(product);
    this.storeService.addShoppingCart(product);
    this.total=this.storeService.getTotal();
    // this.myShoppingCart.push(product);
    // this.total=this.myShoppingCart.reduce((sum,item)=>sum+item.price,0);
  }
  products : Producto[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'

    },
    { id:'2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id:'3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id:'4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      id:'5',
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      id:'6',
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ];
}
