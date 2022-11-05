import { Component, OnInit ,Input} from '@angular/core';
import {Producto} from '../../models/producto.model'
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  @Input('product') product!: Producto;
  constructor() { }

  ngOnInit(): void {
  }

}
