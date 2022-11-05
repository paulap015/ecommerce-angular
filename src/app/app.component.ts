import { Component } from '@angular/core';
import {Product} from './product.model';
import {Producto} from './models/producto.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent : string = 'https://www.w3schools.com/howto/img_avatar.png';
  frasePadre:string='being part of something special makes you special';
  showImg=true;
  public onLoaded(img : string){
    console.log('log padre ', img)
  }

  public toggleImg(){
    this.showImg=!this.showImg;
  }
  // ------------------Fundamentos abajo
  title = 'commerceVirtual';
  inRegister=false;
  inLogin=false;
  inProducts=false;

  register = {
    name:'',
    email:'',
    password:''
  }
  login={
    email:'',
    password:''
  }
  haEntrado=false;
  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'

    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ]
  public onRegister(){
    console.log(this.register);
    this.inLogin=false;
    this.inProducts=false;
    this.inRegister=true;
  }
  public onLogin(){
    console.log(this.login);
    this.inRegister=false;
    this.inProducts=false;
    this.inLogin=true;
    this.haEntrado=true;
  }
  public onProducts(){
    this.inRegister=false;
    this.inProducts=true;
    this.inLogin=false;
  }
  widthImg =10;
}
