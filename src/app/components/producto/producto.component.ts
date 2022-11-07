import { Component, OnInit ,Input,Output, EventEmitter} from '@angular/core';
import {Producto} from '../../models/producto.model'
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  // @Input('product') product!: Producto;

  @Input('product') product: Producto = {
    id:'',
    price:0,
    images: [],
    title:'',
    category:{
      id:'',
      name:''
    },
    description:''
  };

  @Output()addedProduct = new EventEmitter<Producto>(); // enviando un obj completo
  onAddCart(){
    this.addedProduct.emit(this.product);
  }

  @Output()showProduct = new EventEmitter<string>();
  onShowDetail(){
    this.showProduct.emit(this.product.id);

  }

  constructor() { }

  ngOnInit(): void {
  }

}
