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
  token='';
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
    // this.authService.login('pau@mail.com','123')
    // .subscribe(rta=>{
    //   console.log(rta.access_token);
    //   this.token=rta.access_token;
    // });
    this.authService.login('pau@mail.com','123')
      .pipe(
        switchMap((token) => {
          this.token = token.access_token;
          return this.authService.profile(token.access_token);
        })
      )
      .subscribe(user => {
        this.profile = user;
      });
  }

  getProfile(){
    this.authService.profile(this.token)
    .subscribe(user=> {
      console.log(user);
      this.profile=user;
    });
  }
}
