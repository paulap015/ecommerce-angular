import { Component, OnInit ,Input,Output, EventEmitter} from '@angular/core';
import {Producto} from '../../models/producto.model'
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  @Input('product') product!: Producto;
  @Output()addedProduct = new EventEmitter<Producto>(); // enviando un obj completo
  onAddCart(){
    this.addedProduct.emit(this.product);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
