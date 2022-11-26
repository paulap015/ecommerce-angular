import { Component, OnInit } from '@angular/core';
import{ProductDTO,Producto,UpdateProductDTO} from '../../models/producto.model';
import { zip } from 'rxjs';
import {switchMap} from 'rxjs/operators'
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
  limit=10;
  offset=0;
  statusDetail:'loading' |'success'  | 'error'|'init' ='init';
  // para usar el servicio dentro del componente
  //hacemos inyeccion de dependenicas
  constructor(private storeService:StoreService, private productService:ProductsService) {
    this.myShoppingCart= this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // se debe correr el subscribe
    //this.productService.getProductsByPage(this.limit,this.offset)
    this.productService.getAllProducts(this.limit,this.offset)
    .subscribe(data=> {
      this.products=data;
      //this.offset += this.limit;
    });
  }
  loadMore(){
    this.productService.getProductsByPage(this.limit,this.offset)
    .subscribe(data=> {
      this.products=this.products.concat(data);
      this.offset+=this.limit;
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
    this.statusDetail='loading';
    this.toggleProductDetail();
    this.productService.getProduct(id)
    .subscribe(data=> {
      this.productChosen=data;
      this.statusDetail='success';
    },errorMessage => {
      window.alert(errorMessage);
      this.statusDetail='error';
    })
  }

  readAndUpdate(id:string){
    this.productService.getProduct(id)
    .pipe(
      switchMap((product)=> this.productService.update({title:'change'},product.id)
      )
    )
    .subscribe(data => {
      console.log(data);
    });
    this.productService.fetchReadAndUpdate(id, {title:'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    });
  }


  createNewProduct(){
    const producto:ProductDTO={
      categoryId: 4,
      title: 'new Toy',
      price: 200,
      images: ['https://placeimg.com/640/480/any?random=${Math.random()}',
               'https://placeimg.com/640/480/any?random=${Math.random()}',
               'https://placeimg.com/640/480/any?random=${Math.random()}'],
      description: 'Es un nuevo producto claro que si '
    }
    this.productService.create(producto)
    .subscribe(data=> {
      console.log('created',data);
      this.products.unshift(data);
    }) ;
  }


  updateProduct(){
    const changes : UpdateProductDTO={
      title:'Nuevo titulo maravilloso',
    }
    const id = this.productChosen.id;
    this.productService.update(changes, id)
    .subscribe( data  => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen=data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;

    this.productService.delete(id).subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail=false;
    });
  }

}
