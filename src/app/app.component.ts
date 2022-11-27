import { Component } from '@angular/core';
import {Product} from './product.model';
import {Producto} from './models/producto.model'
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent : string = 'https://www.w3schools.com/howto/img_avatar.png';
  frasePadre:string='being part of something special makes you special';
  showImg=true;
  token:string ='';
  imgRta= '';
  constructor(
    private authService:AuthService,
    private userService:UsersService,
    private fileService:FilesService
    ){

  }
  downloadPDF(){
    this.fileService.getFile(
      'Mypdf.pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf'
      )
    .subscribe()
  }
  onUpload(event:Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta=rta.location;
      })
    }

  }

  public onLoaded(img : string){
    console.log('log padre ', img)
  }

  public toggleImg(){
    this.showImg=!this.showImg;
  }

  createUser(){
    this.userService.create({name:'Pau',email:'pau@mail.com',password:'123'})
    .subscribe(rta=> {
      console.log(rta);
    });
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
    // console.log(this.login);
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
