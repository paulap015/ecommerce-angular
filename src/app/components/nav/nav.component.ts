import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu=false; // el menu no se muestra
  counter=0;
  profile: User| null=null;
  constructor(
    private storeService: StoreService,
    private authService :AuthService
    ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu(){
    this.activeMenu=!this.activeMenu;
  }
  login(){

    this.authService.loginAndGet('pau@mail.com','123')
    .subscribe(user => {
      this.profile = user;
    });
  }

  // getProfile(){
  //   this.authService.profile()
  //   .subscribe(user=> {
  //     console.log(user);
  //     this.profile=user;
  //   });
  // }
}
